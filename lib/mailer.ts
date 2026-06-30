import nodemailer from "nodemailer";
import type { EnquiryRow } from "./sharepoint";
import { buildEnquiryEmailHtml } from "./email-templates/enquiry";
import { buildConfirmationEmailHtml } from "./email-templates/confirmation";

// ─── Transporter singleton ────────────────────────────────────────────────────

let _transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter {
  if (!_transporter) {
    _transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }
  return _transporter;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatInsuranceType(type: string): string {
  const map: Record<string, string> = {
    "motor":             "Motor Insurance",
    "health-individual": "Health (Individual)",
    "health-floater":    "Health (Floater)",
    "health-group":      "Health (Group)",
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

function customerEmailEnabled(): boolean {
  return process.env.CUSTOMER_EMAIL_ENABLED === "true";
}

function getLogoUrl(): string {
  const siteUrl = (
    process.env.SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "") ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "")
  ).replace(/\/$/, "");
  const url = siteUrl ? `${siteUrl}/coverton-logo.png` : "";
  console.log(`[mailer] logo URL: ${url || "(none — text fallback)"}`);
  return url;
}

// ─── sendEnquiryEmail ─────────────────────────────────────────────────────────

export async function sendEnquiryEmail(
  data: EnquiryRow,
  policyAttachment?: { filename: string; content: string; mimeType: string }
): Promise<void> {
  const transporter = getTransporter();
  const from = `"Coverton Insurance" <${process.env.SMTP_USERNAME}>`;
  const subject = `New ${formatInsuranceType(data.insuranceType)} Enquiry — ${data.name}`;

  // Team email: attach policy file if uploaded
  const teamAttachments: nodemailer.SendMailOptions["attachments"] = policyAttachment
    ? [{
        filename: policyAttachment.filename,
        content: Buffer.from(policyAttachment.content, "base64"),
        contentType: policyAttachment.mimeType,
      }]
    : [];

  const logoDataUri = getLogoUrl();

  const teamTask = transporter.sendMail({
    from,
    to: process.env.TEAM_EMAIL,
    subject,
    html: buildEnquiryEmailHtml(data, logoDataUri),
    attachments: teamAttachments,
  });

  const insuranceLabel = formatInsuranceType(data.insuranceType);
  const customerSubject = `Your ${insuranceLabel} enquiry received — Coverton`;
  const firstName = data.name.split(" ")[0] ?? data.name;
  const customerText = [
    `Hi ${firstName},`,
    ``,
    `Thank you for your ${insuranceLabel} enquiry. We have received your request and our advisor will call you within 60 minutes during business hours.`,
    ``,
    `Reference Number: ${data.refId}`,
    ``,
    `What happens next?`,
    `1. Our advisor reviews your requirements and calls you within 60 minutes.`,
    `2. You receive a personalised quote with the best available premium.`,
    `3. Policy documents are issued digitally — fast and paperless.`,
    ``,
    `Business Hours (IST):`,
    `Mon–Fri: 9:00 AM – 6:00 PM`,
    `Saturday: 10:00 AM – 4:00 PM`,
    ``,
    `Need help? Call +91 95660 85116 or email wecare@coverton.in`,
    ``,
    `— Coverton Insurance Broking Pvt Ltd`,
  ].join("\n");

  const customerTask = customerEmailEnabled()
    ? transporter.sendMail({
        from,
        to: data.email,
        replyTo: process.env.TEAM_EMAIL,
        subject: customerSubject,
        text: customerText,
        html: buildConfirmationEmailHtml(data.name, data.insuranceType, data.refId, logoDataUri),
        headers: {
          "X-Entity-Ref-ID": data.refId,
          "List-Unsubscribe": `<mailto:${process.env.TEAM_EMAIL}?subject=Unsubscribe>`,
        },
      })
    : Promise.resolve(null);

  const [teamResult, customerResult] = await Promise.allSettled([
    teamTask,
    customerTask,
  ]);

  if (teamResult.status === "fulfilled") {
    console.log(`[mailer] Team notification sent for ${data.refId}`);
  } else {
    console.error(`[mailer] Team notification FAILED for ${data.refId}:`, teamResult.reason);
  }

  if (!customerEmailEnabled()) {
    console.log(`[mailer] Customer email skipped (CUSTOMER_EMAIL_ENABLED=false)`);
  } else if (customerResult.status === "fulfilled") {
    console.log(`[mailer] Customer confirmation sent to ${data.email} for ${data.refId}`);
  } else {
    console.error(`[mailer] Customer confirmation FAILED for ${data.refId}:`, customerResult.reason);
  }
}
