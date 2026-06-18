import nodemailer from "nodemailer";
import type { EnquiryRow } from "./sheets";
import { buildEnquiryEmailHtml } from "./email-templates/enquiry";
import { buildConfirmationEmailHtml } from "./email-templates/confirmation";

// ─── Transporter singleton ────────────────────────────────────────────────────

let _transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter {
  if (!_transporter) {
    _transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
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
  return process.env.CUSTOMER_EMAIL_ENABLED !== "false";
}

function getLogoUrl(): string {
  const siteUrl = (process.env.SITE_URL ?? "").replace(/\/$/, "");
  return siteUrl ? `${siteUrl}/coverton-logo.png` : "";
}

// ─── sendEnquiryEmail ─────────────────────────────────────────────────────────

export async function sendEnquiryEmail(
  data: EnquiryRow,
  policyAttachment?: { filename: string; content: string; mimeType: string }
): Promise<void> {
  const transporter = getTransporter();
  const from = `"Coverton Insurance" <${process.env.GMAIL_USER}>`;
  const subject = `[${data.refId}] New ${formatInsuranceType(data.insuranceType)} Enquiry — ${data.name}`;

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

  const customerTask = customerEmailEnabled()
    ? transporter.sendMail({
        from,
        to: data.email,
        subject: `Your ${formatInsuranceType(data.insuranceType)} Enquiry — Ref ${data.refId}`,
        html: buildConfirmationEmailHtml(data.name, data.insuranceType, data.refId, logoDataUri),
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
