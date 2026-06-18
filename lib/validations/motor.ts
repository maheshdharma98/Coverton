import { z } from "zod";
import { commonFields } from "./_common";

export const MOTOR_CATEGORIES = [
  "Auto",
  "Bike",
  "Car",
  "CPA",
  "Commercial Vehicle",
  "Private Car",
] as const;

export const motorSchema = z.object({
  ...commonFields,
  category: z.enum(MOTOR_CATEGORIES, {
    error: "Select a vehicle category",
  }),
  vehicleNumber: z
    .string()
    .min(1, "Vehicle number is required")
    .regex(/^[A-Za-z0-9\s]+$/, "Only alphanumeric characters allowed"),
  previousPolicy: z.any().optional(),
});

export type MotorFormValues = z.infer<typeof motorSchema>;
