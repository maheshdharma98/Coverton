import { z } from "zod";
import { commonFields } from "./_common";

export const TRAVEL_CATEGORIES = ["Business/Leisure", "Corporate"] as const;
export const TRAVEL_TYPES = [
  "including-usa-canada",
  "excluding-usa-canada",
] as const;

export const travelSchema = z.object({
  ...commonFields,
  category: z.enum(TRAVEL_CATEGORIES, {
    error: "Select a travel category",
  }),
  travelType: z.enum(TRAVEL_TYPES, {
    error: "Select a travel type",
  }),
});

export type TravelFormValues = z.infer<typeof travelSchema>;
export type TravelCategory = (typeof TRAVEL_CATEGORIES)[number];
export type TravelType = (typeof TRAVEL_TYPES)[number];
