/**
 * Connection test script for Google Sheets + email integrations.
 * Run with:  npx tsx lib/test-connections.ts
 *
 * Manually loads .env.local so this works outside the Next.js runtime.
 */

import * as fs from "fs";
import * as path from "path";

// ── Load .env.local ────────────────────────────────────────────────────────────

function loadEnvFile(filePath: string): void {
  if (!fs.existsSync(filePath)) {
    console.warn(`\n[warn] ${filePath} not found — relying on existing process.env\n`);
    return;
  }
  const contents = fs.readFileSync(filePath, "utf8");
  for (const line of contents.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx < 1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
    if (key && !(key in process.env)) {
      process.env[key] = val;
    }
  }
}

loadEnvFile(path.join(process.cwd(), ".env.local"));

// ── Imports (after env load) ───────────────────────────────────────────────────

import { appendEnquiry, type EnquiryRow } from "./sheets";
import { sendEnquiryEmail } from "./mailer";

// ── Test data ──────────────────────────────────────────────────────────────────

const TEST_REF = `CVT-TEST-${Date.now().toString(36).toUpperCase()}`;
const TEST_ROW: EnquiryRow = {
  refId: TEST_REF,
  timestamp: new Date().toISOString(),
  insuranceType: "motor",
  subcategory: "Car",
  name: "Test Connection User",
  mobile: "9999999999",
  email: process.env.TEAM_EMAIL ?? "test@example.com",
  pincode: "400001",
  extraFields: {
    "Vehicle Number": "MH12AB1234",
    "Policy Upload": "Not provided",
    "Test": "true — safe to delete",
  },
};

// ── Runner ─────────────────────────────────────────────────────────────────────

type Result = { label: string; pass: boolean; detail: string };

async function runTest(
  label: string,
  fn: () => Promise<unknown>
): Promise<Result> {
  try {
    const result = await fn();
    return { label, pass: true, detail: JSON.stringify(result) };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return { label, pass: false, detail: msg };
  }
}

async function main(): Promise<void> {
  console.log("\n╔══════════════════════════════════════════════╗");
  console.log("║      Coverton — connection test runner       ║");
  console.log("╚══════════════════════════════════════════════╝\n");

  console.log(`Test ref ID: ${TEST_REF}\n`);

  // Warn if any required env var is missing
  const required = [
    "GOOGLE_SHEETS_SPREADSHEET_ID",
    "GOOGLE_SERVICE_ACCOUNT_EMAIL",
    "GOOGLE_PRIVATE_KEY",
    "TEAM_EMAIL",
    "GMAIL_USER",
    "GMAIL_APP_PASSWORD",
  ];
  const missing = required.filter((k) => !process.env[k]);
  if (missing.length) {
    console.error("[FAIL]  Missing env vars:", missing.join(", "));
    console.error("   Fill .env.local and retry.\n");
    process.exit(1);
  }
  console.log("[OK]  All 6 env vars present\n");

  const results: Result[] = [];

  // ── Test 1: Google Sheets append ────────────────────────────────────────────
  console.log("─── Test 1: Google Sheets append ───────────────");
  results.push(
    await runTest("Google Sheets → appendEnquiry", () => appendEnquiry(TEST_ROW))
  );

  // ── Test 2: Email ────────────────────────────────────────────────────────────
  console.log("─── Test 2: Send enquiry email ─────────────────");
  results.push(
    await runTest("Nodemailer → sendEnquiryEmail", () => sendEnquiryEmail(TEST_ROW))
  );

  // ── Summary ──────────────────────────────────────────────────────────────────
  console.log("\n╔══════════════════════════════════════════════╗");
  console.log("║                   Results                   ║");
  console.log("╚══════════════════════════════════════════════╝\n");

  let allPassed = true;
  for (const r of results) {
    const icon = r.pass ? "[PASS]" : "[FAIL]";
    console.log(`${icon}  ${r.label}`);
    if (r.pass) {
      console.log(`       ${(r.detail ?? "ok").slice(0, 120)}`);
    } else {
      console.error(`       Error: ${r.detail}`);
      allPassed = false;
    }
    console.log();
  }

  if (allPassed) {
    console.log("All tests passed. Your integrations are live.\n");
    console.log(
      `Note: a test row was appended to the sheet with ref ID ${TEST_REF}.\n` +
      "      You can delete it manually from Google Sheets.\n"
    );
    process.exit(0);
  } else {
    console.error("One or more tests failed. See errors above.\n");
    process.exit(1);
  }
}

main();
