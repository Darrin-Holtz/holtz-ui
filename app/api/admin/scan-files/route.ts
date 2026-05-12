import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { utapi } from "@/lib/utapi";
import { scanAndEnforce } from "@/lib/virusTotal";
import { adminScanRatelimit } from "@/lib/ratelimit";

export const dynamic = "force-dynamic";
// Scanning can take a long time — allow up to 5 minutes for the route
export const maxDuration = 300;

// Rate limit: VirusTotal free tier allows 4 requests/minute.
// We wait 16 seconds between scans to stay safely under the limit.
const VT_DELAY_MS = 16_000;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function POST(req: NextRequest) {
  // Verify the admin secret passed as: Authorization: Bearer <secret>
  const authHeader = req.headers.get("authorization") ?? "";
  const secret = process.env.ADMIN_SCAN_SECRET;

  if (!secret) {
    return NextResponse.json(
      { error: "ADMIN_SCAN_SECRET is not configured on this server." },
      { status: 500 }
    );
  }

  if (authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  // Rate limit by a fixed key — 5 scans per hour globally
  const { success: rateLimitOk } = await adminScanRatelimit.limit("admin_scan");
  if (!rateLimitOk) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Try again later." },
      { status: 429 }
    );
  }

  // Fetch all product file keys from the database
  const products = await prisma.product.findMany({
    select: { id: true, name: true, productFile: true },
  });

  const results: {
    productId: string;
    productName: string;
    fileKey: string;
    status: "clean" | "flagged_deleted" | "skipped" | "error";
    detail?: string;
  }[] = [];

  for (const product of products) {
    const fileKey = product.productFile;

    // Skip products that already store a full URL (legacy absolute URLs don't have a key to delete)
    const isAbsoluteUrl =
      fileKey.startsWith("http://") || fileKey.startsWith("https://");

    if (isAbsoluteUrl) {
      results.push({
        productId: product.id,
        productName: product.name,
        fileKey,
        status: "skipped",
        detail: "Legacy absolute URL — scan manually if needed.",
      });
      continue;
    }

    // Generate a short-lived signed URL so VirusTotal (and we) can download the file
    let signedUrl: string;
    try {
      const signed = await utapi.generateSignedURL(fileKey, { expiresIn: "10m" });
      signedUrl = signed.ufsUrl;
    } catch (err) {
      results.push({
        productId: product.id,
        productName: product.name,
        fileKey,
        status: "error",
        detail: `Could not generate signed URL: ${String(err)}`,
      });
      continue;
    }

    try {
      const clean = await scanAndEnforce(signedUrl, fileKey);

      if (clean) {
        results.push({
          productId: product.id,
          productName: product.name,
          fileKey,
          status: "clean",
        });
      } else {
        // scanAndEnforce already deleted the file from UploadThing
        results.push({
          productId: product.id,
          productName: product.name,
          fileKey,
          status: "flagged_deleted",
          detail: "File was flagged by VirusTotal and deleted from UploadThing.",
        });
      }
    } catch (err) {
      results.push({
        productId: product.id,
        productName: product.name,
        fileKey,
        status: "error",
        detail: String(err),
      });
    }

    // Respect VirusTotal free-tier rate limit between each scan
    await sleep(VT_DELAY_MS);
  }

  const summary = {
    total: results.length,
    clean: results.filter((r) => r.status === "clean").length,
    flagged: results.filter((r) => r.status === "flagged_deleted").length,
    skipped: results.filter((r) => r.status === "skipped").length,
    errors: results.filter((r) => r.status === "error").length,
  };

  console.log("[Admin Scan] Complete.", summary);

  return NextResponse.json({ summary, results });
}
