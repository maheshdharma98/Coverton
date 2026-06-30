import { NextResponse } from "next/server";
import { getListStats } from "@/lib/sharepoint";
import { getQueueStatus } from "@/lib/failureQueue";

export async function GET() {
  const timestamp = new Date().toISOString();

  let sharepointConnected = false;
  let total = 0;

  try {
    const stats = await getListStats();
    sharepointConnected = true;
    total = stats.total;
  } catch (err) {
    console.error("[health] SharePoint unreachable:", err);
  }

  const { pending: queuePending } = getQueueStatus();

  const body = {
    status: sharepointConnected ? "ok" : "degraded",
    timestamp,
    sharepointConnected,
    totalEnquiries: total,
    queuePending,
  };

  return NextResponse.json(body, {
    status: sharepointConnected ? 200 : 503,
  });
}
