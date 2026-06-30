import { z } from "zod";
import { commonFields } from "./_common";

export const healthFloaterSchema = z.object({
  ...commonFields,
  numberOfAdults: z
    .string()
    .min(1, "Number of adults is required")
    .refine((val) => {
      const n = Number(val);
      return Number.isInteger(n) && n >= 1 && n <= 10;
    }, "Enter a valid number of adults (1–10)"),
  numberOfChildren: z.string().optional(),
});

export type HealthFloaterFormValues = z.infer<typeof healthFloaterSchema>;
