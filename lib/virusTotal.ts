import { utapi } from "./utapi";

const VT_API = "https://www.virustotal.com/api/v3";
const POLL_INTERVAL_MS = 15_000; // 15 seconds between polls
const MAX_POLLS = 8;             // wait up to ~2 minutes total

interface VTStats {
  malicious: number;
  suspicious: number;
  undetected: number;
  harmless: number;
}

/**
 * Submits the signed UploadThing URL to VirusTotal so VT can fetch and scan
 * the file directly (no local download/re-upload needed).
 * Polls for the analysis result, then deletes the file from UploadThing
 * if any engine flags it as malicious or suspicious.
 *
 * Returns true if the file is clean (or if the scan could not complete),
 * returns false if the file was flagged and deleted.
 *
 * Fails open: if the API key is missing or VT returns an error, the file
 * is allowed through and a warning is logged.
 */
export async function scanAndEnforce(
  fileUrl: string,
  fileKey: string
): Promise<boolean> {
  const apiKey = process.env.VIRUSTOTAL_API_KEY;
  if (!apiKey) {
    console.warn("[VirusTotal] VIRUSTOTAL_API_KEY not set — skipping scan.");
    return true;
  }

  // Submit the URL to VirusTotal — VT fetches and scans it directly
  const body = new URLSearchParams({ url: fileUrl });
  let analysisId: string;
  try {
    const submitRes = await fetch(`${VT_API}/urls`, {
      method: "POST",
      headers: {
        "x-apikey": apiKey,
        "content-type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
      signal: AbortSignal.timeout(30_000),
    });
    if (!submitRes.ok) {
      console.warn("[VirusTotal] URL submission failed:", await submitRes.text());
      return true; // fail open
    }
    const { data } = await submitRes.json();
    analysisId = data.id as string;
  } catch (err) {
    console.warn("[VirusTotal] Error submitting URL:", err);
    return true; // fail open
  }

  // Poll for results
  for (let i = 0; i < MAX_POLLS; i++) {
    await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));

    try {
      const analysisRes = await fetch(`${VT_API}/analyses/${analysisId}`, {
        headers: { "x-apikey": apiKey },
        signal: AbortSignal.timeout(15_000),
      });
      if (!analysisRes.ok) continue;

      const analysis = await analysisRes.json();
      const status: string = analysis.data.attributes.status;

      if (status !== "completed") continue;

      const stats: VTStats = analysis.data.attributes.stats;
      const flagged = stats.malicious > 0 || stats.suspicious > 0;

      if (flagged) {
        console.error(
          `[VirusTotal] File flagged — malicious: ${stats.malicious}, suspicious: ${stats.suspicious}. Deleting key: ${fileKey}`
        );
        await utapi.deleteFiles([fileKey]);
        return false;
      }

      console.log(`[VirusTotal] File clean — key: ${fileKey}`);
      return true;
    } catch (err) {
      console.warn("[VirusTotal] Error polling analysis:", err);
    }
  }

  // Scan timed out — fail open, log a warning
  console.warn(
    `[VirusTotal] Scan timed out for key: ${fileKey} — file allowed through.`
  );
  return true;
}
