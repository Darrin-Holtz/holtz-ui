/**
 * One-off script to scan all existing product files in UploadThing for malware.
 *
 * Usage:
 *   npx tsx scripts/scan-existing-files.ts
 *
 * Requires VIRUSTOTAL_API_KEY and UPLOADTHING_TOKEN to be set in .env
 */

import "dotenv/config";
import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { UTApi } from "uploadthing/server";
import { scanAndEnforce } from "../lib/virusTotal";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });
const utapi = new UTApi();

const VT_DELAY_MS = 16_000; // 4 req/min free tier → 16s between scans

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  if (!process.env.VIRUSTOTAL_API_KEY) {
    console.error("❌  VIRUSTOTAL_API_KEY is not set in .env");
    process.exit(1);
  }

  const products = await prisma.product.findMany({
    select: { id: true, name: true, productFile: true },
    orderBy: { createdAt: "asc" },
  });

  console.log(`\nFound ${products.length} product(s) to scan.\n`);

  const summary = { clean: 0, flagged: 0, skipped: 0, errors: 0 };

  for (let i = 0; i < products.length; i++) {
    const { id, name, productFile } = products[i];
    const progress = `[${i + 1}/${products.length}]`;

    const isAbsoluteUrl =
      productFile.startsWith("http://") || productFile.startsWith("https://");

    if (isAbsoluteUrl) {
      console.log(`${progress} SKIPPED  "${name}" — legacy absolute URL`);
      summary.skipped++;
      continue;
    }

    // Generate a short-lived signed URL for the download
    let signedUrl: string;
    try {
      const signed = await utapi.generateSignedURL(productFile, { expiresIn: "10m" });
      signedUrl = signed.ufsUrl;
    } catch (err) {
      console.error(`${progress} ERROR    "${name}" — could not get signed URL: ${err}`);
      summary.errors++;
      continue;
    }

    console.log(`${progress} Scanning "${name}" (key: ${productFile}) …`);

    try {
      const clean = await scanAndEnforce(signedUrl, productFile);
      if (clean) {
        console.log(`${progress} ✅ CLEAN  "${name}"`);
        summary.clean++;
      } else {
        console.warn(`${progress} 🚨 FLAGGED & DELETED  "${name}"`);
        summary.flagged++;
      }
    } catch (err) {
      console.error(`${progress} ERROR    "${name}" — ${err}`);
      summary.errors++;
    }

    if (i < products.length - 1) {
      console.log(`         Waiting ${VT_DELAY_MS / 1000}s for VT rate limit…\n`);
      await sleep(VT_DELAY_MS);
    }
  }

  console.log("\n── Scan complete ──────────────────────────");
  console.log(`  Clean:   ${summary.clean}`);
  console.log(`  Flagged: ${summary.flagged}`);
  console.log(`  Skipped: ${summary.skipped}`);
  console.log(`  Errors:  ${summary.errors}`);
  console.log("────────────────────────────────────────────\n");

  await prisma.$disconnect();
  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
