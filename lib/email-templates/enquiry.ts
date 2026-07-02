import type { EnquiryRow } from "@/lib/sharepoint";

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

function formatReceivedTime(iso: string): string {
  try {
    const date = new Date(iso);
    const day   = date.toLocaleString("en-IN", { timeZone: "Asia/Kolkata", day: "2-digit" });
    const month = date.toLocaleString("en-US", { timeZone: "Asia/Kolkata", month: "short" });
    const time  = date.toLocaleString("en-US", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: true });
    return `${day} ${month}, ${time}`;
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
      .map((m) => `${esc(m.label)}: ${esc(m.ageDob)} &nbsp;&middot;&nbsp; PED: ${m.ped === "yes" ? "Yes" : "No"}`)
      .join("<br>");
  } catch {
    return esc(json);
  }
}

function resolveValue(label: string, raw: string): string {
  if (label === "Members JSON") return formatMembersJson(raw);
  return esc(raw) || "—";
}

// ─── Main builder ─────────────────────────────────────────────────────────────

export function buildEnquiryEmailHtml(data: EnquiryRow, logoDataUri = ""): string {
  const logoAreaHtml = logoDataUri
    ? `<img src="${logoDataUri}" alt="Coverton Insurance Broking Pvt Ltd" width="160" height="50" style="display:block;width:160px;height:50px;object-fit:contain;object-position:left center;border:0" />`
    : `<table cellpadding="0" cellspacing="0" role="presentation"><tr><td style="vertical-align:middle;padding-right:10px"><div style="width:36px;height:36px;background:#1247D6;border-radius:8px;display:inline-block;text-align:center;line-height:36px;font-size:18px;color:#F5B800;font-weight:700">C</div></td><td style="vertical-align:middle"><div style="color:#ffffff;font-size:17px;font-weight:700;letter-spacing:0.5px;font-family:Arial,sans-serif;line-height:1.2">COVERTON</div><div style="color:rgba(255,255,255,0.45);font-size:9px;letter-spacing:1px;text-transform:uppercase;font-family:Arial,sans-serif">Insurance Broking Pvt Ltd</div></td></tr></table>`;

  const displayRef          = esc(data.refId);
  const displayType         = esc(data.insuranceType);
  const displaySubcategory  = esc(data.subcategory ?? "N/A");
  const displayName         = esc(data.name);
  const displayMobile       = esc(data.mobile);
  const displayEmail        = esc(data.email);
  const displayPincode      = esc(data.pincode);
  const displaySubmittedAt  = esc(formatTimestamp(data.timestamp));
  const displayReceivedTime = esc(formatReceivedTime(data.timestamp));

  // ── Policy file ─────────────────────────────────────────────────────────────
  const policyUploadRaw = data.extraFields["Policy Upload"] ?? "";
  const policyFileName  = policyUploadRaw.startsWith("Attached (")
    ? policyUploadRaw.slice("Attached (".length, -1)
    : null;

  const sharePointBase = "https://covertoninsurance.sharepoint.com/sites/CovertonIB/Shared%20Documents/PolicyUploads";
  const policyDocUrl   = policyFileName
    ? `${sharePointBase}/${data.refId}/${encodeURIComponent(policyFileName)}`
    : null;

  // ── Extra fields rows (Policy Upload handled as separate row) ───────────────
  const extraEntries = Object.entries(data.extraFields).filter(([k]) => k !== "Policy Upload");
  const extraFieldsRows = extraEntries
    .map(([label, value], i) => {
      const bg      = i % 2 === 0 ? "#f8faff" : "#ffffff";
      const display = resolveValue(label, value);
      return `
          <tr style="background:${bg}">
            <td style="padding:10px 14px;border-bottom:1px solid #e5e9f5;font-size:12px;font-weight:600;color:#3D4460;width:140px">${esc(label)}</td>
            <td style="padding:10px 14px;border-bottom:1px solid #e5e9f5;font-size:12px;color:#0f1f3d">${display}</td>
          </tr>`;
    })
    .join("");

  // ── Policy document row ─────────────────────────────────────────────────────
  const policyBg          = extraEntries.length % 2 === 0 ? "#f8faff" : "#ffffff";
  const policyDocumentRow = policyFileName && policyDocUrl
    ? `
          <tr style="background:${policyBg}">
            <td style="padding:10px 14px;border-bottom:1px solid #e5e9f5;font-size:12px;font-weight:600;color:#3D4460;width:140px">Policy Document</td>
            <td style="padding:10px 14px;border-bottom:1px solid #e5e9f5;font-size:12px">
              <span style="display:inline-flex;align-items:center;gap:5px;background:#EAF3DE;color:#3B6D11;font-size:11px;font-weight:600;padding:4px 10px;border-radius:20px;border:1px solid #c0dd97">&#128206; ${esc(policyFileName)}</span>
              <a href="${policyDocUrl}" style="display:inline-flex;align-items:center;gap:4px;color:#1247D6;font-size:11px;font-weight:600;text-decoration:none;border:1px solid #d4e0ff;background:#EEF3FF;padding:4px 10px;border-radius:20px;margin-left:6px">&#8599; View in SharePoint</a>
            </td>
          </tr>`
    : "";


  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>New Enquiry — Coverton</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Arial, Helvetica, sans-serif; background: #f0f2f7; padding: 24px 16px; }
  .wrap { max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e5e7eb; }
  @media only screen and (max-width: 480px) {
    .body-cell { padding: 16px 20px !important; }
    .header-cell { padding: 16px 20px !important; }
    .alert-cell { padding: 10px 20px !important; }
    .footer-cell { padding: 14px 20px !important; }
  }
</style>
</head>
<body>
<div class="wrap">

  <!-- HEADER -->
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#0f1f3d">
    <tr>
      <td class="header-cell" style="padding:20px 32px">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
          <tr>
            <td style="vertical-align:middle">
              ${logoAreaHtml}
            </td>
            <td align="right" style="vertical-align:middle">
              <span style="background:rgba(245,184,0,0.15);border:1px solid rgba(245,184,0,0.3);color:#F5B800;font-size:10px;font-weight:700;padding:4px 10px;border-radius:20px;letter-spacing:0.5px;white-space:nowrap">NEW ENQUIRY</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

  <!-- ALERT BAR -->
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#1247D6">
    <tr>
      <td class="alert-cell" style="padding:10px 32px">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
          <tr>
            <td style="color:#ffffff;font-size:12px;font-weight:600">&#9889; New enquiry received &mdash; action required</td>
            <td align="right" style="color:#F5B800;font-size:13px;font-weight:700;font-family:monospace;letter-spacing:1px;white-space:nowrap">${displayRef}</td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

  <!-- BODY -->
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
    <tr>
      <td class="body-cell" style="padding:20px 32px 24px">

        <!-- META ROW -->
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f8faff;border:1px solid #e5e9f5;border-radius:8px;margin-bottom:20px">
          <tr>
            <td style="padding:10px 16px;border-right:1px solid #e5e9f5;font-size:11px;width:33%">
              <span style="color:#8892A4;display:block;margin-bottom:2px">Type</span>
              <span style="color:#0f1f3d;font-weight:600;font-size:12px">${displayType}</span>
            </td>
            <td style="padding:10px 16px;border-right:1px solid #e5e9f5;font-size:11px;width:33%">
              <span style="color:#8892A4;display:block;margin-bottom:2px">Category</span>
              <span style="color:#0f1f3d;font-weight:600;font-size:12px">${displaySubcategory}</span>
            </td>
            <td style="padding:10px 16px;font-size:11px;width:33%">
              <span style="color:#8892A4;display:block;margin-bottom:2px">Received</span>
              <span style="color:#0f1f3d;font-weight:600;font-size:12px">${displayReceivedTime}</span>
            </td>
          </tr>
        </table>

        <!-- SECTION LABEL -->
        <div style="font-size:10px;font-weight:700;color:#8892A4;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:10px">Enquiry details</div>

        <!-- DETAILS TABLE -->
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;margin-bottom:20px">

          <tr style="background:#f8faff">
            <td style="padding:10px 14px;border-top:1px solid #e5e9f5;border-bottom:1px solid #e5e9f5;font-size:12px;font-weight:600;color:#3D4460;width:140px">Full Name</td>
            <td style="padding:10px 14px;border-top:1px solid #e5e9f5;border-bottom:1px solid #e5e9f5;font-size:12px;color:#0f1f3d">${displayName}</td>
          </tr>

          <tr style="background:#ffffff">
            <td style="padding:10px 14px;border-bottom:1px solid #e5e9f5;font-size:12px;font-weight:600;color:#3D4460">Mobile</td>
            <td style="padding:10px 14px;border-bottom:1px solid #e5e9f5;font-size:12px">
              <a href="tel:${displayMobile}" style="color:#1247D6;text-decoration:none">${displayMobile}</a>
            </td>
          </tr>

          <tr style="background:#f8faff">
            <td style="padding:10px 14px;border-bottom:1px solid #e5e9f5;font-size:12px;font-weight:600;color:#3D4460">Email</td>
            <td style="padding:10px 14px;border-bottom:1px solid #e5e9f5;font-size:12px">
              <a href="mailto:${displayEmail}" style="color:#1247D6;text-decoration:none">${displayEmail}</a>
            </td>
          </tr>

          <tr style="background:#ffffff">
            <td style="padding:10px 14px;border-bottom:1px solid #e5e9f5;font-size:12px;font-weight:600;color:#3D4460">Pincode</td>
            <td style="padding:10px 14px;border-bottom:1px solid #e5e9f5;font-size:12px;color:#0f1f3d">${displayPincode}</td>
          </tr>

          <tr style="background:#f8faff">
            <td style="padding:10px 14px;border-bottom:1px solid #e5e9f5;font-size:12px;font-weight:600;color:#3D4460">Insurance Type</td>
            <td style="padding:10px 14px;border-bottom:1px solid #e5e9f5;font-size:12px;color:#0f1f3d">${displayType}</td>
          </tr>

          <tr style="background:#ffffff">
            <td style="padding:10px 14px;border-bottom:1px solid #e5e9f5;font-size:12px;font-weight:600;color:#3D4460">Category</td>
            <td style="padding:10px 14px;border-bottom:1px solid #e5e9f5;font-size:12px;color:#0f1f3d">${displaySubcategory}</td>
          </tr>

          ${extraFieldsRows}

          ${policyDocumentRow}

          <tr style="background:#f8faff">
            <td style="padding:10px 14px;border-bottom:1px solid #e5e9f5;font-size:12px;font-weight:600;color:#3D4460">Submitted At</td>
            <td style="padding:10px 14px;border-bottom:1px solid #e5e9f5;font-size:12px;color:#0f1f3d">${displaySubmittedAt}</td>
          </tr>

          <tr style="background:#ffffff">
            <td style="padding:10px 14px;border-bottom:1px solid #e5e9f5;font-size:12px;font-weight:600;color:#3D4460">Reference ID</td>
            <td style="padding:10px 14px;border-bottom:1px solid #e5e9f5;font-size:12px;font-family:monospace;font-weight:700;color:#1247D6">${displayRef}</td>
          </tr>

        </table>

        <!-- QUICK ACTIONS -->
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f8faff;border:1px solid #e5e9f5;border-radius:8px">
          <tr>
            <td style="padding:14px 16px">
              <div style="font-size:11px;font-weight:700;color:#0f1f3d;margin-bottom:10px">Quick actions</div>
              <a href="tel:${displayMobile}" style="display:inline-block;padding:7px 16px;border-radius:6px;font-size:11.5px;font-weight:600;text-decoration:none;background:#1247D6;color:#ffffff;margin-right:6px">&#128222; Call customer</a>
              <a href="https://wa.me/91${displayMobile}" style="display:inline-block;padding:7px 16px;border-radius:6px;font-size:11.5px;font-weight:600;text-decoration:none;background:#25D366;color:#ffffff;margin-right:6px">&#128172; WhatsApp</a>
              <a href="mailto:${displayEmail}" style="display:inline-block;padding:7px 16px;border-radius:6px;font-size:11.5px;font-weight:600;text-decoration:none;background:#ffffff;color:#0f1f3d;border:1px solid #e5e9f5">&#9993; Reply by email</a>
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>

  <!-- FOOTER -->
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f8faff;border-top:1px solid #e5e9f5">
    <tr>
      <td class="footer-cell" style="padding:14px 32px;text-align:center">
        <div style="font-size:11px;font-weight:700;color:#0f1f3d">Coverton Insurance Broking Pvt Ltd</div>
        <div style="font-size:10px;color:#8892A4;margin-top:3px">Automated notification &middot; <a href="mailto:wecare@coverton.in" style="color:#1247D6;text-decoration:none">wecare@coverton.in</a></div>
      </td>
    </tr>
  </table>

</div>
</body>
</html>`;
}
