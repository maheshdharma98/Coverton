import { z } from "zod";
import { commonFields } from "./_common";

export const FLOATER_MEMBER_KEYS = [
  "self",
  "spouse",
  "son1",
  "son2",
  "daughter1",
  "daughter2",
  "mother",
  "father",
  "motherInLaw",
  "fatherInLaw",
] as const;

export type FloaterMemberKey = (typeof FLOATER_MEMBER_KEYS)[number];

const memberSchema = z.object({
  key: z.enum(FLOATER_MEMBER_KEYS),
  label: z.string(),
  included: z.boolean(),
  ageDob: z.string(),
  ped: z.enum(["yes", "no", ""]),
});

export const healthFloaterSchema = z
  .object({
    ...commonFields,
    members: z
      .array(memberSchema)
      .min(1, "At least Self must be included")
      .superRefine((members, ctx) => {
        const self = members.find((m) => m.key === "self");

        if (!self?.ageDob || self.ageDob.trim() === "") {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Age / DOB for Self is required",
            path: [members.findIndex((m) => m.key === "self"), "ageDob"],
          });
        }

        members.forEach((member, index) => {
          if (member.key !== "self" && member.included && (!member.ageDob || member.ageDob.trim() === "")) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `Age / DOB is required for ${member.label}`,
              path: [index, "ageDob"],
            });
          }
        });
      }),
  });

export type HealthFloaterFormValues = z.infer<typeof healthFloaterSchema>;
export type MemberValues = z.infer<typeof memberSchema>;
