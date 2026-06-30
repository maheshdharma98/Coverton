import { z } from "zod";
import { commonFields } from "./_common";

export const healthIndividualSchema = z
  .object({
    ...commonFields,
    dob: z
      .string()
      .min(1, "Date of birth is required")
      .refine((val) => {
        const date = new Date(val);
        return !isNaN(date.getTime());
      }, "Enter a valid date")
      .refine((val) => {
        const dob = new Date(val);
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
          age -= 1;
        }
        return age >= 18;
      }, "Must be at least 18 years old"),
    preExistingDisease: z.enum(["yes", "no"], {
      error: "Please indicate if you have a pre-existing disease",
    }),
    diseaseType: z.string().max(200).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.preExistingDisease === "yes" && (!data.diseaseType || !data.diseaseType.trim())) {
      ctx.addIssue({
        code: "custom",
        message: "Please describe your pre-existing condition",
        path: ["diseaseType"],
      });
    }
  });

export type HealthIndividualFormValues = z.infer<typeof healthIndividualSchema>;
