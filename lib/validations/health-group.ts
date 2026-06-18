import { z } from "zod";
import { emailSchema, mobileSchema, pincodeSchema } from "./_common";

export const healthGroupSchema = z.object({
  companyName: z
    .string()
    .min(2, "Company name must be at least 2 characters"),
  mobile: mobileSchema,
  numberOfEmployees: z
    .string()
    .min(1, "Number of employees is required")
    .refine((val) => {
      const n = Number(val);
      return Number.isInteger(n) && n > 0;
    }, "Must be a positive whole number"),
  email: emailSchema,
  pincode: pincodeSchema,
});

export type HealthGroupFormValues = z.infer<typeof healthGroupSchema>;
