import type { EnquiryRow } from "@/lib/sheets";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function esc(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatInsuranceType(type: string): string {
  const map: Record<string, string> = {
    "motor":             "Motor Insurance",
    "health-individual": "Health Insurance — Individual",
    "health-floater":    "Health Insurance — Floater",
    "health-group":      "Health Insurance — Group",
    "travel":            "Travel Insurance",
    "Life":              "Life Insurance",
    "Agriculture":       "Agriculture Insurance",
    "Fire":              "Fire Insurance",
    "Credit":            "Credit Insurance",
    "Engineering":       "Engineering Insurance",
    "Liability":         "Liability Insurance",
    "Marine":            "Marine Insurance",
    "Miscellaneous":     "Miscellaneous Insurance",
    "Personal Accident": "Personal Accident Insurance",
    "Surety":            "Surety Insurance",
  };
  return map[type] ?? `${type} Insurance`;
}

function formatTimestamp(iso: string): string {
  try {
    return new Date(iso).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day:    "2-digit",
      month:  "long",
      year:   "numeric",
      hour:   "2-digit",
      minute: "2-digit",
      hour12: true,
    }) + " IST";
  } catch {
    return iso;
  }
}

function formatMembersJson(json: string): string {
  try {
    const members = JSON.parse(json) as Array<{
      label: string;
      ageDob: string;
      ped: string;
    }>;
    return members
      .map((m) => `${esc(m.label)}: ${esc(m.ageDob)} &nbsp;·&nbsp; PED: ${m.ped === "yes" ? "Yes" : "No"}`)
      .join("<br>");
  } catch {
    return esc(json);
  }
}

function resolveValue(label: string, raw: string): string {
  if (label === "Members JSON") return formatMembersJson(raw);
  if (label === "Policy Upload" && raw.startsWith("Attached (")) {
    const filename = esc(raw.slice("Attached (".length, -1));
    return `<span style="display:inline-flex;align-items:center;gap:6px;background:#DCFCE7;color:#166534;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:700">&#128206; Attached &nbsp;&mdash;&nbsp; ${filename}</span>`;
  }
  if (label === "Policy Upload" && raw === "Not uploaded") {
    return `<span style="color:#8892A4;font-size:13px">Not uploaded</span>`;
  }
  return esc(raw) || "—";
}

function buildRows(fields: Array<[label: string, value: string]>): string {
  return fields
    .filter(([, v]) => v !== "")
    .map(([label, value], i) => {
      const bg = i % 2 === 0 ? "#ffffff" : "#F4F7FF";
      const display = resolveValue(label, value);
      return `
      <tr style="background:${bg}">
        <td style="padding:11px 20px;font-size:13px;font-weight:600;color:#5A6080;width:38%;border-bottom:1px solid #EEF1F8;white-space:nowrap;vertical-align:top">${esc(label)}</td>
        <td style="padding:11px 20px;font-size:13px;color:#0A0F1E;border-bottom:1px solid #EEF1F8;line-height:1.6">${display}</td>
      </tr>`;
    })
    .join("");
}

// ─── Main builder ─────────────────────────────────────────────────────────────

export function buildEnquiryEmailHtml(data: EnquiryRow, logoDataUri = ""): string {
  const fields: Array<[string, string]> = [
    ["Insurance Type",  formatInsuranceType(data.insuranceType)],
    ...(data.subcategory ? [["Category", data.subcategory] as [string, string]] : []),
    ["Name",    data.name],
    ["Mobile",  data.mobile],
    ["Email",   data.email],
    ["Pincode", data.pincode],
    ...Object.entries(data.extraFields) as Array<[string, string]>,
    ["Submitted At", formatTimestamp(data.timestamp)],
  ];

  const rows = buildRows(fields);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>New Enquiry — Coverton Insurance</title>
</head>
<body style="margin:0;padding:32px 12px;background:#EEF3FF;font-family:Arial,Helvetica,sans-serif">

  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr><td align="center">

      <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;border-radius:16px;overflow:hidden;box-shadow:0 8px 40px rgba(18,71,214,0.13)">

        <!-- Header: logo -->
        <tr>
          <td style="background:#ffffff;padding:28px 40px 20px;text-align:center;border-top:6px solid #1247D6">
            ${logoDataUri
              ? `<img src="${logoDataUri}" alt="Coverton Insurance" style="height:56px;width:auto;display:block;margin:0 auto" />`
              : `<p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:22px;font-weight:900;color:#1247D6;letter-spacing:2px">COVERTON</p>
            <p style="margin:3px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:9px;font-weight:600;color:#8892A4;letter-spacing:3px;text-transform:uppercase">Insurance Broking Pvt Ltd</p>`
            }
          </td>
        </tr>

        <!-- Blue badge row -->
        <tr>
          <td style="background:#1247D6;padding:14px 40px 20px;text-align:center">
            <table cellpadding="0" cellspacing="0" border="0" align="center">
              <tr>
                <td style="background:rgba(255,255,255,0.15);border-radius:20px;padding:5px 18px">
                  <span style="font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,0.92)">NEW ENQUIRY RECEIVED</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Gold accent stripe -->
        <tr>
          <td style="background:#F5B800;height:5px;font-size:0;line-height:0">&nbsp;</td>
        </tr>

        <!-- Ref number bar -->
        <tr>
          <td style="background:#0A0F1E;padding:16px 40px;text-align:center">
            <p style="margin:0;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#8892A4;font-weight:600;display:inline">REF &nbsp;</p>
            <p style="margin:0;font-size:20px;font-weight:800;color:#F5B800;letter-spacing:2px;display:inline">${esc(data.refId)}</p>
            <p style="margin:0 0 0 12px;font-size:12px;color:#8892A4;display:inline">&nbsp;·&nbsp; ${esc(formatInsuranceType(data.insuranceType))}</p>
          </td>
        </tr>

        <!-- Section label -->
        <tr>
          <td style="background:#F8FAFF;padding:16px 40px 8px;border-bottom:1px solid #E8EBF5">
            <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#8892A4">Enquiry Details</p>
          </td>
        </tr>

        <!-- Field table -->
        <tr>
          <td style="background:#ffffff;padding:0">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              ${rows}
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#F4F7FF;border-top:2px solid #E8EBF5;padding:20px 40px;text-align:center">
            <p style="margin:0;font-size:12px;color:#8892A4;line-height:1.6">
              Automated notification from <strong style="color:#5A6080">Coverton Insurance</strong> website &nbsp;·&nbsp; Do not reply to this email
            </p>
          </td>
        </tr>

      </table>

    </td></tr>
  </table>

</body>
</html>`;
}
