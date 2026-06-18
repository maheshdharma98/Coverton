import { appendEnquiry, type EnquiryRow } from "./sheets";

interface QueueItem {
  row: EnquiryRow;
  retryCount: number;
  nextRetryAt: number;
}

const MAX_RETRIES = 3;
const RETRY_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes

const pending: QueueItem[] = [];
const permanentlyFailed: QueueItem[] = [];

export function addToQueue(row: EnquiryRow): void {
  pending.push({
    row,
    retryCount: 0,
    nextRetryAt: Date.now() + RETRY_INTERVAL_MS,
  });
  console.log(
    `[failureQueue] Queued ${row.insuranceType} (${row.email}). Depth: ${pending.length}`
  );
}

export async function processQueue(): Promise<void> {
  if (pending.length === 0) return;

  const now = Date.now();
  // Snapshot to avoid mutation issues mid-loop
  const due = pending.filter((item) => now >= item.nextRetryAt);

  for (const item of due) {
    try {
      await appendEnquiry(item.row); // throws on permanent failure

      const idx = pending.indexOf(item);
      if (idx !== -1) pending.splice(idx, 1);
      console.log(
        `[failureQueue] Retry succeeded for ${item.row.insuranceType} (${item.row.email})`
      );
    } catch {
      item.retryCount++;

      if (item.retryCount >= MAX_RETRIES) {
        const idx = pending.indexOf(item);
        if (idx !== -1) pending.splice(idx, 1);
        permanentlyFailed.push(item);
        console.error(
          "[failureQueue] Permanently failed after max retries:",
          JSON.stringify({ row: item.row, retries: item.retryCount })
        );
      } else {
        item.nextRetryAt = Date.now() + RETRY_INTERVAL_MS;
        console.warn(
          `[failureQueue] Retry ${item.retryCount}/${MAX_RETRIES} failed for ` +
            `${item.row.email}. Next attempt in 5 min.`
        );
      }
    }
  }
}

export function getQueueStatus(): { pending: number; failed: number } {
  return { pending: pending.length, failed: permanentlyFailed.length };
}

// ─── Singleton auto-retry ─────────────────────────────────────────────────────
// Operates within a warm serverless instance. State resets on cold starts —
// acceptable for low-volume insurance enquiries.

let started = false;

function startAutoRetry(): void {
  if (started) return;
  started = true;

  const timer = setInterval(() => {
    processQueue().catch((err) =>
      console.error("[failureQueue] Unhandled error in processQueue:", err)
    );
  }, RETRY_INTERVAL_MS);

  if (timer.unref) timer.unref();
}

startAutoRetry();
