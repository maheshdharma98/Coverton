import type { EnquiryRow } from "./sheets";

// ─── Column headers — must match sheet row 1 exactly ─────────────────────────

export const HEADERS = [
  "Timestamp",
  "Ref ID",
  "Insurance Type",
  "Subcategory",
  "Name",
  "Mobile",
  "Email",
  "Pincode",
  "Extra Field 1",
  "Extra Field 2",
  "Extra Field 3",
  "Extra Field 4",
  "Extra Field 5",
  "Status",
  "Notes",
] as const;

export type Header = (typeof HEADERS)[number];

// ─── Per-type extra-field extraction ─────────────────────────────────────────
// Returns exactly 5 values (padded with "") matching columns I–M.

function getExtraFields(data: EnquiryRow): [string, string, string, string, string] {
  const ef = data.extraFields;
  const pad = (arr: string[]): [string, string, string, string, string] => {
    const out = [...arr];
    while (out.length < 5) out.push("");
    return out.slice(0, 5) as [string, string, string, string, string];
  };

  switch (data.insuranceType) {
    case "motor":
      return pad([
        ef["Vehicle Number"] ?? "",
        data.subcategory,                                      // motor category
        ef["Policy Upload"] === "Provided" ? "Yes" : "No",    // policy file
      ]);

    case "health-individual":
      return pad([ef["Date of Birth"] ?? "", ef["Pre-existing Disease"] ?? ""]);

    case "health-floater":
      return pad([ef["Members JSON"] ?? "", ef["Member Count"] ?? ""]);

    case "health-group":
      return pad([ef["Company Name"] ?? data.name, ef["Number of Employees"] ?? ""]);

    case "travel":
      return pad([data.subcategory, ef["Travel Type"] ?? ""]);

    default:
      // All standard types: Life, Agriculture, Fire, Credit, Engineering,
      // Liability, Marine, Miscellaneous, Personal Accident, Surety
      return pad([data.subcategory]);
  }
}

// ─── Row builder ──────────────────────────────────────────────────────────────

export function buildSheetRow(refId: string, data: EnquiryRow): string[] {
  const [e1, e2, e3, e4, e5] = getExtraFields(data);

  return [
    data.timestamp,       // A  Timestamp
    refId,                // B  Ref ID
    data.insuranceType,   // C  Insurance Type
    data.subcategory,     // D  Subcategory
    data.name,            // E  Name
    data.mobile,          // F  Mobile
    data.email,           // G  Email
    data.pincode,         // H  Pincode
    e1,                   // I  Extra Field 1
    e2,                   // J  Extra Field 2
    e3,                   // K  Extra Field 3
    e4,                   // L  Extra Field 4
    e5,                   // M  Extra Field 5
    "New",                // N  Status
    "",                   // O  Notes
  ];
}
