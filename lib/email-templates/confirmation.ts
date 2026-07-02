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
    "health-individual": "Health Insurance (Individual)",
    "health-floater":    "Health Insurance (Family Floater)",
    "health-group":      "Health Insurance (Group)",
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

// ─── Main builder ─────────────────────────────────────────────────────────────

export function buildConfirmationEmailHtml(
  name: string,
  insuranceType: string,
  refId: string,
  logoDataUri = ""
): string {
  const displayName = esc(name.split(" ")[0] ?? name);
  const displayType = esc(insuranceType);
  const displayRef  = esc(refId);
  const waNumber    = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "919566085116").replace(/^\+/, "");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Enquiry Confirmation — Coverton</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: Arial, Helvetica, sans-serif;
    background: #f0f2f7;
    padding: 24px 16px;
  }
  .wrap {
    max-width: 560px;
    margin: 0 auto;
    background: #ffffff;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #e5e7eb;
  }
  .header {
    background: #ffffff;
    padding: 20px 32px;
    border-bottom: 3px solid #1247D6;
  }
  .hero {
    background: #0f1f3d;
    padding: 28px 32px 32px;
    text-align: center;
  }
  .hero-title {
    color: #ffffff;
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 6px;
  }
  .hero-title span { color: #F5B800; }
  .hero-sub {
    color: rgba(255,255,255,0.6);
    font-size: 13px;
  }
  .hero-sub strong {
    color: rgba(255,255,255,0.85);
  }
  .ref-outer {
    background: #0f1f3d;
    padding: 0 32px 16px;
  }
  .ref-block {
    background: #1a2f5a;
    padding: 16px 20px;
    border-radius: 10px;
    text-align: center;
    border: 1px dashed rgba(255,255,255,0.2);
  }
  .ref-label {
    color: rgba(255,255,255,0.5);
    font-size: 10px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin-bottom: 6px;
  }
  .ref-number {
    color: #F5B800;
    font-size: 22px;
    font-weight: 700;
    letter-spacing: 2px;
    font-family: monospace;
  }
  .ref-hint {
    color: rgba(255,255,255,0.35);
    font-size: 11px;
    margin-top: 4px;
  }
  .body {
    padding: 20px 32px 24px;
  }
  .help-row {
    display: table;
    width: 100%;
    border-collapse: separate;
    border-spacing: 12px 0;
    margin-bottom: 20px;
    margin-left: -12px;
  }
  .help-card {
    display: table-cell;
    width: 50%;
    background: #f8faff;
    border: 1px solid #e5e9f5;
    border-radius: 10px;
    padding: 14px 16px;
    vertical-align: top;
  }
  .help-card-title {
    font-size: 11px;
    font-weight: 600;
    color: #8892A4;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    margin-bottom: 10px;
  }
  .help-item {
    margin-bottom: 8px;
  }
  .help-item:last-child {
    margin-bottom: 0;
  }
  .help-item-label {
    font-size: 12px;
    color: #0f1f3d;
    font-weight: 600;
  }
  .help-item-sub {
    font-size: 11px;
    color: #8892A4;
    margin-top: 1px;
  }
  .divider {
    height: 1px;
    background: #f0f2f7;
    margin: 0 0 20px;
  }
  .next-title {
    font-size: 13px;
    font-weight: 700;
    color: #0f1f3d;
    margin-bottom: 14px;
  }
  .step {
    display: table;
    width: 100%;
    margin-bottom: 12px;
  }
  .step-num-cell {
    display: table-cell;
    width: 36px;
    vertical-align: top;
  }
  .step-num {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    display: inline-block;
    text-align: center;
    line-height: 26px;
    font-size: 11px;
    font-weight: 700;
    color: #ffffff;
  }
  .step-content {
    display: table-cell;
    vertical-align: top;
    padding-top: 2px;
  }
  .step-text {
    font-size: 13px;
    color: #0f1f3d;
    font-weight: 600;
  }
  .step-sub {
    font-size: 12px;
    color: #8892A4;
    margin-top: 2px;
    line-height: 1.5;
  }
  .cta-btn {
    display: block;
    background: #25D366;
    color: #ffffff;
    text-align: center;
    padding: 13px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 700;
    text-decoration: none;
    margin-top: 20px;
  }
  .footer {
    background: #f8faff;
    border-top: 1px solid #e5e9f5;
    padding: 16px 32px;
    text-align: center;
  }
  .footer-name {
    font-size: 12px;
    font-weight: 700;
    color: #0f1f3d;
    margin-bottom: 4px;
  }
  .footer-addr {
    font-size: 11px;
    color: #8892A4;
    line-height: 1.6;
  }
  .footer-links {
    margin-top: 10px;
    font-size: 11px;
    color: #8892A4;
  }
  .footer-links a {
    color: #1247D6;
    text-decoration: none;
  }
  @media only screen and (max-width: 480px) {
    .body { padding: 16px 20px; }
    .header { padding: 20px; }
    .hero { padding: 0 20px 24px; }
    .ref-outer { padding: 0 20px 16px; }
    .help-row {
      display: block;
      margin-left: 0;
    }
    .help-card {
      display: block;
      width: 100%;
      margin-bottom: 10px;
    }
    .footer { padding: 16px 20px; }
  }
</style>
</head>
<body>
<div class="wrap">

  <!-- HEADER -->
  <div class="header">
    <table cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td style="vertical-align:middle;padding-right:10px">
          <div style="width:36px;height:36px;background:#1247D6;border-radius:8px;display:inline-block;text-align:center;line-height:36px;font-size:18px;color:#F5B800;font-weight:700">C</div>
        </td>
        <td style="vertical-align:middle">
          <div style="color:#0f1f3d;font-size:17px;font-weight:700;letter-spacing:0.5px;font-family:Arial,sans-serif;line-height:1.2">COVERTON</div>
          <div style="color:#8892A4;font-size:9px;letter-spacing:1px;text-transform:uppercase;font-family:Arial,sans-serif">Insurance Broking Pvt Ltd</div>
        </td>
      </tr>
    </table>
  </div>

  <!-- HERO -->
  <div class="hero">
    <div class="hero-title">
      Thank you, <span>${displayName}!</span>
    </div>
    <div class="hero-sub">
      Your <strong>${displayType}</strong> enquiry has been received.
    </div>
  </div>

  <!-- REF NUMBER -->
  <div class="ref-outer">
    <div class="ref-block">
      <div class="ref-label">Your Reference Number</div>
      <div class="ref-number">${displayRef}</div>
      <div class="ref-hint">Keep this handy when you contact us</div>
    </div>
  </div>

  <!-- BODY -->
  <div class="body">

    <!-- HELP + HOURS ROW -->
    <table class="help-row" role="presentation">
      <tr>
        <td class="help-card">
          <div class="help-card-title">Need help now?</div>
          <div class="help-item">
            <div class="help-item-label">+91 95660 85116</div>
            <div class="help-item-sub">Call us directly</div>
          </div>
          <div class="help-item">
            <div class="help-item-label">WhatsApp us</div>
            <div class="help-item-sub">wecare@coverton.in</div>
          </div>
        </td>
        <td class="help-card">
          <div class="help-card-title">Business hours (IST)</div>
          <div class="help-item">
            <div class="help-item-label">Mon &ndash; Fri</div>
            <div class="help-item-sub">9:00 AM &ndash; 6:00 PM</div>
          </div>
          <div class="help-item">
            <div class="help-item-label">Saturday</div>
            <div class="help-item-sub">10:00 AM &ndash; 4:00 PM</div>
          </div>
          <div class="help-item">
            <div class="help-item-label">Sunday</div>
            <div class="help-item-sub">Closed</div>
          </div>
        </td>
      </tr>
    </table>

    <div class="divider"></div>

    <!-- WHAT HAPPENS NEXT -->
    <div class="next-title">What happens next</div>

    <div class="step">
      <div class="step-num-cell">
        <span class="step-num" style="background:#1247D6">1</span>
      </div>
      <div class="step-content">
        <div class="step-text">Advisor call</div>
        <div class="step-sub">
          We review your requirements and call
          within 60 minutes during business hours
        </div>
      </div>
    </div>

    <div class="step">
      <div class="step-num-cell">
        <span class="step-num" style="background:#0F6E56">2</span>
      </div>
      <div class="step-content">
        <div class="step-text">Personalised quote</div>
        <div class="step-sub">
          You receive a tailored plan with
          the best available premium
        </div>
      </div>
    </div>

    <div class="step">
      <div class="step-num-cell">
        <span class="step-num" style="background:#F5B800;color:#0A0F1E">3</span>
      </div>
      <div class="step-content">
        <div class="step-text">Policy issuance</div>
        <div class="step-sub">
          Policy documents delivered digitally &mdash;
          fast and paperless
        </div>
      </div>
    </div>

    <!-- WHATSAPP CTA -->
    <a class="cta-btn" href="https://wa.me/${waNumber}">
      Chat with us on WhatsApp
    </a>

  </div>

  <!-- FOOTER -->
  <div class="footer">
    <div class="footer-name">
      Coverton Insurance Broking Pvt Ltd
    </div>
    <div class="footer-addr">
      No 190-192, Hameed Complex, Anna Salai,<br>
      Express Estate, Royapettah, Chennai 600006
    </div>
    <div class="footer-links">
      Reply to this email or contact
      <a href="mailto:wecare@coverton.in">wecare@coverton.in</a><br>
      <span style="font-size:10px;color:#aaa">
        Did not make this enquiry?
        <a href="mailto:wecare@coverton.in">Contact us</a>
        and we&rsquo;ll remove your details.
      </span>
    </div>
  </div>

</div>
</body>
</html>`;
}
