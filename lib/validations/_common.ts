import { z } from "zod";

export const nameSchema = z
  .string()
  .min(2, "Minimum 2 characters required")
  .regex(/^[a-zA-Z\s]+$/, "Only letters and spaces allowed");

export const mobileSchema = z
  .string()
  .regex(/^\d{10}$/, "Enter a valid 10-digit mobile number");

export const emailSchema = z
  .string()
  .email("Enter a valid email address");

export const pincodeSchema = z
  .string()
  .regex(/^\d{6}$/, "Enter a valid 6-digit pincode");

export const remarksSchema = z.string().max(500).optional();

export const commonFields = {
  name: nameSchema,
  mobile: mobileSchema,
  email: emailSchema,
  pincode: pincodeSchema,
  remarks: remarksSchema,
};
