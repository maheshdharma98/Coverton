import { getGraphClient, getAccessToken } from "./microsoft-auth";

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
  policyDocumentUrl?: string; // drive URL set before appendEnquiry, motor only
}

// ─── appendEnquiry ────────────────────────────────────────────────────────────

export async function appendEnquiry(
  data: EnquiryRow
): Promise<{ success: boolean; itemId?: string }> {
  try {
    const client = getGraphClient();
    const siteId = process.env.SHAREPOINT_SITE_ID!;
    const listId = process.env.SHAREPOINT_LIST_ID!;

    const extraText = Object.entries(data.extraFields)
      .map(([k, v]) => `${k}: ${v}`)
      .join(" | ");

    const baseFields: Record<string, unknown> = {
      Title:         data.refId,
      InsuranceType: data.insuranceType,
      Subcategory:   data.subcategory || "",
      CustomerName:  data.name,
      Mobile:        data.mobile,
      Email:         data.email,
      Pincode:       data.pincode,
      ExtraDetails:  extraText,
      SubmittedAt:   data.timestamp,
      Status:        "New",
    };

    const fieldsWithDoc = data.policyDocumentUrl
      ? { ...baseFields, PolicyDocument: data.policyDocumentUrl }
      : baseFields;

    let result: { id: string };
    try {
      result = await client
        .api(`/sites/${siteId}/lists/${listId}/items`)
        .post({ fields: fieldsWithDoc });
    } catch (err) {
      if (data.policyDocumentUrl) {
        console.warn("[sharepoint] PolicyDocument POST failed, retrying without it:", (err as Error).message);
        result = await client
          .api(`/sites/${siteId}/lists/${listId}/items`)
          .post({ fields: baseFields });
      } else {
        throw err;
      }
    }

    console.log(`[sharepoint] Enquiry ${data.refId} added — item ID ${result.id}`);
    return { success: true, itemId: result.id };
  } catch (error) {
    console.error("[sharepoint] appendEnquiry error:", error);
    return { success: false };
  }
}

// ─── uploadPolicyFile ─────────────────────────────────────────────────────────
// Uploads the file to the site drive BEFORE the list item is created, using
// refId as the folder name. The returned webUrl is included in the list item's
// initial POST so no separate PATCH is needed (PATCH on URL/Hyperlink columns
// is rejected by Graph API with 400 invalidRequest).

export async function uploadPolicyFile(
  refId: string,
  fileName: string,
  fileBase64: string,
  mimeType = "application/octet-stream"
): Promise<{ success: boolean; webUrl?: string }> {
  try {
    const siteId       = process.env.SHAREPOINT_SITE_ID!;
    const safeFileName = fileName.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    const uploadPath   = `PolicyUploads/${refId}/${safeFileName}`;

    const token      = await getAccessToken();
    const fileBuffer = Buffer.from(fileBase64, "base64");
    const uploadUrl  =
      `https://graph.microsoft.com/v1.0/sites/${siteId}/drive/root:` +
      `/${encodeURIComponent(uploadPath)}:/content`;

    const response = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": mimeType,
      },
      body: fileBuffer,
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("[sharepoint] Drive upload failed:", response.status, errText);
      return { success: false };
    }

    const { webUrl } = await response.json() as { webUrl: string };
    console.log(`[sharepoint] Policy file uploaded: ${uploadPath}`);
    return { success: true, webUrl };
  } catch (error) {
    console.error("[sharepoint] uploadPolicyFile error:", error);
    return { success: false };
  }
}

// ─── getListStats ─────────────────────────────────────────────────────────────

export async function getListStats(): Promise<{ total: number }> {
  try {
    const client = getGraphClient();
    const siteId = process.env.SHAREPOINT_SITE_ID!;
    const listId = process.env.SHAREPOINT_LIST_ID!;

    const result = await client
      .api(`/sites/${siteId}/lists/${listId}/items`)
      .count(true)
      .get();

    return { total: (result["@odata.count"] as number) || 0 };
  } catch {
    return { total: 0 };
  }
}
