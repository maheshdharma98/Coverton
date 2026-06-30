/**
 * Connection test script for SharePoint + Excel + email integrations.
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

import { appendEnquiry, type EnquiryRow } from "./sharepoint";
import { appendToExcel } from "./excel";
import { sendEnquiryEmail } from "./mailer";
import { formatTimestamp } from "./formatTimestamp";

// ── Test data ──────────────────────────────────────────────────────────────────

const TEST_REF = `CVT-TEST-${Date.now().toString(36).toUpperCase()}`;
const TEST_ROW: EnquiryRow = {
  refId: TEST_REF,
  timestamp: formatTimestamp(),
  insuranceType: "motor",
  subcategory: "Car",
  name: "Test Connection User",
  mobile: "9999999999",
  email: process.env.TEAM_EMAIL ?? "test@example.com",
  pincode: "600001",
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

// ── Individual tests ───────────────────────────────────────────────────────────

async function testSharePoint(): Promise<Result> {
  return runTest("SharePoint → appendEnquiry", async () => {
    const result = await appendEnquiry(TEST_ROW);
    if (!result.success) throw new Error("appendEnquiry returned success: false");
    return result;
  });
}

async function testExcel(): Promise<Result> {
  return runTest("Excel → appendToExcel", async () => {
    const result = await appendToExcel(TEST_ROW);
    if (!result.success) throw new Error("appendToExcel returned success: false");
    return result;
  });
}

async function testEmail(): Promise<Result> {
  return runTest("Nodemailer → sendEnquiryEmail", () =>
    sendEnquiryEmail(TEST_ROW)
  );
}

// ── Main ───────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  console.log("\n╔══════════════════════════════════════════════╗");
  console.log("║      Coverton — connection test runner       ║");
  console.log("╚══════════════════════════════════════════════╝\n");

  console.log(`Test ref ID: ${TEST_REF}\n`);

  // Warn if any required env var is missing
  const required = [
    "MICROSOFT_TENANT_ID",
    "MICROSOFT_CLIENT_ID",
    "MICROSOFT_CLIENT_SECRET",
    "SHAREPOINT_SITE_ID",
    "SHAREPOINT_LIST_ID",
    "EXCEL_FILE_PATH",
    "TEAM_EMAIL",
    "SMTP_HOST",
    "SMTP_USERNAME",
    "SMTP_PASSWORD",
  ];
  const missing = required.filter((k) => !process.env[k]);
  if (missing.length) {
    console.error("[FAIL]  Missing env vars:", missing.join(", "));
    console.error("   Fill .env.local and retry.\n");
    process.exit(1);
  }
  console.log(`[OK]  All ${required.length} env vars present\n`);

  const results: Result[] = [];

  console.log("─── Test 1: SharePoint list append ─────────────");
  const spResult = await appendEnquiry(TEST_ROW);
  results.push({
    label: "SharePoint → appendEnquiry",
    pass: spResult.success,
    detail: spResult.success
      ? JSON.stringify(spResult)
      : "appendEnquiry returned success: false",
  });

  console.log("─── Test 2: Excel file append ──────────────────");
  results.push(await testExcel());

  console.log("─── Test 3: Send enquiry email ─────────────────");
  results.push(await testEmail());

  // ── Summary ────────────────────────────────────────────────────────────────
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
      `Note: a test item was added to SharePoint and Excel with ref ID ${TEST_REF}.\n` +
        "      You can delete it manually.\n"
    );
    process.exit(0);
  } else {
    console.error("One or more tests failed. See errors above.\n");
    process.exit(1);
  }
}

main();
