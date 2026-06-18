import { NextResponse } from "next/server";
import { getSheetStats } from "@/lib/sheets";
import { getQueueStatus } from "@/lib/failureQueue";

export async function GET() {
  const timestamp = new Date().toISOString();

  let sheetsConnected = false;
  let sheetStats: { totalEnquiries: number; todayEnquiries: number } | null =
    null;

  try {
    sheetStats = await getSheetStats();
    sheetsConnected = true;
  } catch (err) {
    console.error("[health] Sheets unreachable:", err);
  }

  const { pending: queuePending } = getQueueStatus();

  const body = {
    status: sheetsConnected ? "ok" : "degraded",
    timestamp,
    sheetsConnected,
    queuePending,
    ...(sheetStats ?? {}),
  };

  return NextResponse.json(body, {
    status: sheetsConnected ? 200 : 503,
  });
}
