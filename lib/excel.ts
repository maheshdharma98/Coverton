import { getGraphClient } from "./microsoft-auth";
import type { EnquiryRow } from "./sharepoint";

export async function appendToExcel(
  data: EnquiryRow
): Promise<{ success: boolean }> {
  try {
    const client = getGraphClient();
    const siteId = process.env.SHAREPOINT_SITE_ID!;
    const filePath = process.env.EXCEL_FILE_PATH!;

    const extraText = Object.entries(data.extraFields)
      .map(([k, v]) => `${k}: ${v}`)
      .join(" | ");

    const rowValues = [
      data.timestamp,
      data.refId,
      data.insuranceType,
      data.subcategory || "",
      data.name,
      data.mobile,
      data.email,
      data.pincode,
      extraText,
    ];

    const usedRange = await client
      .api(
        `/sites/${siteId}/drive/root:/${filePath}:/workbook/worksheets/Sheet1/usedRange`
      )
      .get();

    const nextRow = (usedRange.rowCount as number) + 1;
    const targetRange = `A${nextRow}:I${nextRow}`;

    await client
      .api(
        `/sites/${siteId}/drive/root:/${filePath}:/workbook/worksheets/Sheet1/range(address='${targetRange}')`
      )
      .patch({ values: [rowValues] });

    console.log(`[excel] Row added for ${data.refId} at row ${nextRow}`);
    return { success: true };
  } catch (error) {
    console.error("[excel] appendToExcel error:", error);
    return { success: false };
  }
}
