import { google } from "googleapis";
import { HEADERS, buildSheetRow } from "./sheets-config";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface EnquiryRow {
  refId: string;
  timestamp: string;
  insuranceType: string;
  subcategory: string;
  name: string;
  mobile: string;
  email: string;
  pincode: string;
  extraFields: Record<string, string>;
}

// ─── Client singleton ─────────────────────────────────────────────────────────

let _auth: InstanceType<typeof google.auth.GoogleAuth> | null = null;

function getAuth() {
  if (!_auth) {
    _auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
  }
  return _auth;
}

function getSheetsClient() {
  return google.sheets({ version: "v4", auth: getAuth() });
}

function spreadsheetId() {
  const id = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  if (!id) throw new Error("GOOGLE_SHEETS_SPREADSHEET_ID is not set");
  return id;
}

// ─── Error helpers ────────────────────────────────────────────────────────────

function getHttpStatus(err: unknown): number | null {
  if (err && typeof err === "object") {
    const e = err as Record<string, unknown>;
    const status =
      e.status ??
      (e.response as Record<string, unknown> | undefined)?.status;
    return typeof status === "number" ? status : null;
  }
  return null;
}

const TRANSIENT_CODES = new Set([408, 429, 503]);

function isTransient(err: unknown): boolean {
  const code = getHttpStatus(err);
  return code !== null && TRANSIENT_CODES.has(code);
}

// ─── Header guard (lazy, once per warm instance) ──────────────────────────────

let headersVerified = false;

export async function initSheet(): Promise<void> {
  const sheets = getSheetsClient();
  const sid = spreadsheetId();

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: sid,
    range: "Sheet1!A1:O1",
  });

  const existingRow = res.data.values?.[0] ?? [];

  // Write headers if the first cell is empty or missing
  if (!existingRow[0]) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: sid,
      range: "Sheet1!A1:O1",
      valueInputOption: "RAW",
      requestBody: { values: [HEADERS as unknown as string[]] },
    });
    console.log("[sheets] Header row written to Sheet1");
  }

  headersVerified = true;
}

async function ensureHeaders(): Promise<void> {
  if (headersVerified) return;
  await initSheet();
}

// ─── appendEnquiry ────────────────────────────────────────────────────────────

export async function appendEnquiry(
  data: EnquiryRow
): Promise<{ success: boolean; rowNumber?: number }> {
  await ensureHeaders();

  const row = buildSheetRow(data.refId, data);
  const sid = spreadsheetId();
  let lastErr: unknown;

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const sheets = getSheetsClient();

      const res = await sheets.spreadsheets.values.append({
        spreadsheetId: sid,
        range: "Sheet1!A:O",
        valueInputOption: "USER_ENTERED",
        requestBody: { values: [row] },
      });

      // Parse row number from the updated range, e.g. "Sheet1!A7:O7"
      const updatedRange = res.data.updates?.updatedRange ?? "";
      const match = updatedRange.match(/(\d+)(?::\w+\d+)?$/);
      const rowNumber = match ? parseInt(match[1], 10) : undefined;

      return { success: true, rowNumber };
    } catch (err) {
      lastErr = err;

      if (attempt === 0 && isTransient(err)) {
        console.warn(`[sheets] Transient error on attempt 1, retrying in 1 s...`);
        await new Promise<void>((r) => setTimeout(r, 1000));
        continue;
      }

      // Permanent failure or exhausted retries — throw so the caller can queue
      break;
    }
  }

  console.error("[sheets] appendEnquiry failed after retries:", lastErr);
  throw lastErr;
}

// ─── getSheetStats ────────────────────────────────────────────────────────────

export async function getSheetStats(): Promise<{
  totalEnquiries: number;
  todayEnquiries: number;
}> {
  const sheets = getSheetsClient();
  const sid = spreadsheetId();

  // Fetch column A only (timestamps); far cheaper than reading all columns
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: sid,
    range: "Sheet1!A:A",
  });

  const rows = res.data.values ?? [];
  // Row 0 is the header
  const dataRows = rows.slice(1);

  const todayPrefix = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
  const todayEnquiries = dataRows.filter(
    (row) => typeof row[0] === "string" && row[0].startsWith(todayPrefix)
  ).length;

  return { totalEnquiries: dataRows.length, todayEnquiries };
}
