import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/lib/db";
import { utapi } from "@/lib/utapi";
import { createHash } from "crypto";
import { redirect } from "next/navigation";
import { downloadRatelimit } from "@/lib/ratelimit";

export const dynamic = "force-dynamic";

function isAbsoluteUrl(value: string) {
  return value.startsWith("http://") || value.startsWith("https://");
}

function hashIpAddress(ipAddress: string | null) {
  if (!ipAddress) return null;

  const salt = process.env.DOWNLOAD_AUDIT_SALT ?? "dev-download-audit-salt";
  return createHash("sha256").update(`${salt}:${ipAddress}`).digest("hex");
}

function getRequestIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (!forwardedFor) return null;

  const firstIp = forwardedFor.split(",")[0]?.trim();
  return firstIp || null;
}

const defaultAllowedHosts = ["utfs.io", "uploadthing.com", "ufs.sh"];

function getAllowedDownloadHosts() {
  const envHosts = process.env.ALLOWED_DOWNLOAD_HOSTS;
  if (!envHosts) return defaultAllowedHosts;

  return envHosts
    .split(",")
    .map((host) => host.trim().toLowerCase())
    .filter(Boolean);
}

function isHostAllowed(urlString: string, allowedHosts: string[]) {
  try {
    const host = new URL(urlString).hostname.toLowerCase();
    return allowedHosts.some((allowed) => host === allowed || host.endsWith(`.${allowed}`));
  } catch {
    return false;
  }
}

async function writeDownloadAuditLog(input: {
  purchaseId: string;
  userId: string | null;
  ipHash: string | null;
  userAgent: string | null;
  outcome: string;
  reason?: string;
}) {
  try {
    await prisma.downloadAudit.create({
      data: {
        purchaseId: input.purchaseId,
        userId: input.userId,
        ipHash: input.ipHash,
        userAgent: input.userAgent,
        outcome: input.outcome,
        reason: input.reason,
      },
    });
  } catch (error) {
    // Never block download flow because of audit logging failures.
    console.error("Failed to write download audit log", error);
  }
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ purchaseId: string }> }
) {
  const { purchaseId } = await params;
  const ipHash = hashIpAddress(getRequestIp(req));
  const userAgent = req.headers.get("user-agent");

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    await writeDownloadAuditLog({
      purchaseId,
      userId: null,
      ipHash,
      userAgent,
      outcome: "BLOCKED",
      reason: "unauthenticated",
    });
    redirect("/api/auth/login");
  }

  // Rate limit by user ID — 20 requests per minute
  const { success: rateLimitOk } = await downloadRatelimit.limit(user.id);
  if (!rateLimitOk) {
    await writeDownloadAuditLog({
      purchaseId,
      userId: user.id,
      ipHash,
      userAgent,
      outcome: "BLOCKED",
      reason: "rate_limited",
    });
    return new Response("Too many requests. Please wait a moment and try again.", { status: 429 });
  }

  const purchase = await prisma.purchase.findUnique({
    where: {
      id: purchaseId,
    },
    select: {
      buyerId: true,
      product: {
        select: {
          productFile: true,
        },
      },
    },
  });

  if (!purchase || purchase.buyerId !== user.id) {
    await writeDownloadAuditLog({
      purchaseId,
      userId: user.id,
      ipHash,
      userAgent,
      outcome: "BLOCKED",
      reason: "forbidden",
    });
    return new Response("Forbidden", { status: 403 });
  }

  const allowedHosts = getAllowedDownloadHosts();
  let sourceUrl = purchase.product.productFile;

  if (!isAbsoluteUrl(sourceUrl)) {
    try {
      const signed = await utapi.generateSignedURL(sourceUrl, {
        expiresIn: "5m",
      });
      sourceUrl = signed.ufsUrl;
    } catch (error) {
      console.error("Failed to generate signed download URL", error);
      await writeDownloadAuditLog({
        purchaseId,
        userId: user.id,
        ipHash,
        userAgent,
        outcome: "ERROR",
        reason: "signed_url_generation_failed",
      });
      return new Response("Unable to prepare secure download", { status: 500 });
    }
  } else if (!isHostAllowed(sourceUrl, allowedHosts)) {
    await writeDownloadAuditLog({
      purchaseId,
      userId: user.id,
      ipHash,
      userAgent,
      outcome: "BLOCKED",
      reason: "disallowed_legacy_source_host",
    });
    return new Response("Blocked download source", { status: 403 });
  }

  if (!isHostAllowed(sourceUrl, allowedHosts)) {
    await writeDownloadAuditLog({
      purchaseId,
      userId: user.id,
      ipHash,
      userAgent,
      outcome: "BLOCKED",
      reason: "disallowed_signed_source_host",
    });
    return new Response("Blocked download source", { status: 403 });
  }

  await writeDownloadAuditLog({
    purchaseId,
    userId: user.id,
    ipHash,
    userAgent,
    outcome: "SUCCESS",
  });

  return Response.redirect(sourceUrl, 302);
}
