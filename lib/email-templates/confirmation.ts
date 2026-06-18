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
  const displayType = esc(formatInsuranceType(insuranceType));
  const displayRef  = esc(refId);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Enquiry Confirmed — Coverton Insurance</title>
</head>
<body style="margin:0;padding:32px 12px;background:#EEF3FF;font-family:Arial,Helvetica,sans-serif">

  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr><td align="center">

      <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;border-radius:16px;overflow:hidden;box-shadow:0 8px 40px rgba(18,71,214,0.13)">

        <!-- Header: white bg with logo + success badge -->
        <tr>
          <td style="background:#ffffff;padding:36px 40px 28px;text-align:center;border-top:6px solid #1247D6">
            ${logoDataUri
              ? `<img src="${logoDataUri}" alt="Coverton Insurance" style="height:56px;width:auto;display:block;margin:0 auto 20px" />`
              : `<p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:22px;font-weight:900;color:#1247D6;letter-spacing:2px">COVERTON</p>
            <p style="margin:0 0 20px;font-family:Arial,Helvetica,sans-serif;font-size:9px;font-weight:600;color:#8892A4;letter-spacing:3px;text-transform:uppercase">Insurance Broking Pvt Ltd</p>`
            }
            <!-- Green checkmark circle -->
            <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin-bottom:18px">
              <tr>
                <td style="background:#ECFDF5;border-radius:50%;width:60px;height:60px;text-align:center;vertical-align:middle">
                  <span style="font-size:28px;line-height:60px;display:block">&#10003;</span>
                </td>
              </tr>
            </table>
            <h1 style="margin:0 0 8px;font-size:26px;font-weight:800;color:#0A0F1E;letter-spacing:-0.5px">Thank you, ${displayName}!</h1>
            <p style="margin:0;font-size:15px;color:#5A6080;line-height:1.5">Your <strong style="color:#1247D6">${displayType}</strong> enquiry has been received.</p>
          </td>
        </tr>

        <!-- Gold accent stripe -->
        <tr>
          <td style="background:#F5B800;height:5px;font-size:0;line-height:0">&nbsp;</td>
        </tr>

        <!-- Reference number -->
        <tr>
          <td style="background:#F8FAFF;padding:28px 40px">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="background:#ffffff;border:2px dashed #C7D7FF;border-radius:12px;padding:20px 24px;text-align:center">
                  <p style="margin:0 0 6px;font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:#8892A4;font-weight:700">Your Reference Number</p>
                  <p style="margin:0 0 8px;font-size:28px;font-weight:800;color:#1247D6;letter-spacing:3px">${displayRef}</p>
                  <p style="margin:0;font-size:12px;color:#8892A4">Keep this number handy when you contact us</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- What happens next -->
        <tr>
          <td style="background:#ffffff;padding:0 40px 28px">
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#FFFBEB;border-left:4px solid #F5B800;border-radius:0 10px 10px 0">
              <tr>
                <td style="padding:18px 22px">
                  <p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#B45309">What happens next?</p>
                  <p style="margin:0;font-size:14px;color:#3D4460;line-height:1.7">
                    Our advisor will call you within <strong>60 minutes</strong> during business hours to discuss your requirements and provide a tailored quote.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Steps -->
        <tr>
          <td style="background:#ffffff;padding:0 40px 28px">
            <p style="margin:0 0 16px;font-size:13px;font-weight:700;color:#0A0F1E;letter-spacing:0.3px">Your journey with us</p>
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="width:36px;vertical-align:top;padding-top:2px">
                  <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="background:#1247D6;border-radius:50%;width:26px;height:26px;text-align:center;vertical-align:middle">
                        <span style="font-size:12px;font-weight:700;color:#ffffff;line-height:26px;display:block">1</span>
                      </td>
                    </tr>
                  </table>
                </td>
                <td style="padding:2px 0 16px 12px">
                  <p style="margin:0 0 2px;font-size:13px;font-weight:700;color:#0A0F1E">Advisor call</p>
                  <p style="margin:0;font-size:12px;color:#8892A4;line-height:1.5">We review your requirements and call you within 60 minutes</p>
                </td>
              </tr>
              <tr>
                <td style="width:36px;vertical-align:top;padding-top:2px">
                  <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="background:#1247D6;border-radius:50%;width:26px;height:26px;text-align:center;vertical-align:middle">
                        <span style="font-size:12px;font-weight:700;color:#ffffff;line-height:26px;display:block">2</span>
                      </td>
                    </tr>
                  </table>
                </td>
                <td style="padding:2px 0 16px 12px">
                  <p style="margin:0 0 2px;font-size:13px;font-weight:700;color:#0A0F1E">Personalised quote</p>
                  <p style="margin:0;font-size:12px;color:#8892A4;line-height:1.5">You receive a tailored plan with the best available premium</p>
                </td>
              </tr>
              <tr>
                <td style="width:36px;vertical-align:top;padding-top:2px">
                  <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="background:#F5B800;border-radius:50%;width:26px;height:26px;text-align:center;vertical-align:middle">
                        <span style="font-size:12px;font-weight:700;color:#0A0F1E;line-height:26px;display:block">3</span>
                      </td>
                    </tr>
                  </table>
                </td>
                <td style="padding:2px 0 0 12px">
                  <p style="margin:0 0 2px;font-size:13px;font-weight:700;color:#0A0F1E">Policy issuance</p>
                  <p style="margin:0;font-size:12px;color:#8892A4;line-height:1.5">Policy documents delivered digitally — fast and paperless</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Business hours + contact -->
        <tr>
          <td style="background:#F8FAFF;padding:24px 40px;border-top:1px solid #E8EBF5">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="width:50%;vertical-align:top;padding-right:16px">
                  <p style="margin:0 0 10px;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#8892A4">Business Hours (IST)</p>
                  <p style="margin:0 0 5px;font-size:13px;color:#3D4460"><strong>Mon – Fri</strong> &nbsp; 9:00 AM – 6:00 PM</p>
                  <p style="margin:0 0 5px;font-size:13px;color:#3D4460"><strong>Saturday</strong> &nbsp; 10:00 AM – 4:00 PM</p>
                  <p style="margin:0;font-size:13px;color:#8892A4"><strong>Sunday</strong> &nbsp; Closed</p>
                </td>
                <td style="width:50%;vertical-align:top;padding-left:16px;border-left:1px solid #E8EBF5">
                  <p style="margin:0 0 10px;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#8892A4">Need Help Now?</p>
                  <p style="margin:0 0 8px;font-size:13px;color:#3D4460">&#128222;&nbsp; <a href="tel:+919566085116" style="color:#1247D6;text-decoration:none;font-weight:600">+91 95660 85116</a></p>
                  <p style="margin:0;font-size:13px;color:#3D4460">&#9993;&nbsp; <a href="mailto:wecare@coverton.in" style="color:#1247D6;text-decoration:none;font-weight:600">wecare@coverton.in</a></p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Dark footer -->
        <tr>
          <td style="background:#0A0F1E;padding:22px 40px;text-align:center">
            <p style="margin:0 0 6px;font-size:13px;font-weight:700;color:#ffffff">Coverton Insurance</p>
            <p style="margin:0;font-size:12px;color:#8892A4;line-height:1.6">
              You received this because an enquiry was submitted on our website.<br>
              Did not make this enquiry? <a href="mailto:support@coverton.in" style="color:#F5B800;text-decoration:none">Contact us</a> and we&rsquo;ll remove your details.
            </p>
          </td>
        </tr>

      </table>

    </td></tr>
  </table>

</body>
</html>`;
}
