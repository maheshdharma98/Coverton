import { z } from "zod";
import { commonFields } from "./_common";

export const STANDARD_CATEGORIES = {
  Life: ["Endowment Plans", "Money-Back Plans", "Term Insurance", "ULIP", "Whole Life"],
  Agriculture: ["Cattle", "Crop"],
  Fire: ["Commercial Property", "Godown", "Office Premises (Contents)", "Residence"],
  Credit: ["Loan Default", "Trade Credit"],
  Engineering: [
    "Boiler and Pressure Plant",
    "Contractor All Risk",
    "Contractor Plant and Machinery",
    "Erection All Risk",
  ],
  Liability: [
    "Cyber Liability",
    "Directors and Officers",
    "Employers Liability",
    "Product Liability",
    "Professional Indemnity",
    "Public Liability",
    "Workmen Compensation",
  ],
  Marine: ["Cargo", "Hull", "Marine Liability"],
  Miscellaneous: [
    "Commercial",
    "Burglary",
    "Event",
    "Fidelity Guarantee",
    "Money Insurance",
    "Other",
    "Pet",
    "Private Burglary",
    "Wedding",
  ],
  "Personal Accident": ["Group", "Individual"],
  Surety: ["Bid Bond", "Performance Bond"],
} as const;

export type StandardInsuranceType = keyof typeof STANDARD_CATEGORIES;

export function createStandardSchema(categories: string[]) {
  return z.object({
    ...commonFields,
    category: z
      .string()
      .min(1, "Please select a category")
      .refine(
        (val) => categories.includes(val),
        "Select a valid category"
      ),
  });
}

export const standardSchema = z.object({
  ...commonFields,
  category: z.string().min(1, "Please select a category"),
});

export type StandardFormValues = z.infer<typeof standardSchema>;
