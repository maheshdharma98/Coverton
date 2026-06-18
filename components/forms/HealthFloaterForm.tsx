"use client";

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { healthFloaterSchema, type HealthFloaterFormValues } from "@/lib/validations/health-floater";
import { FormInput } from "@/components/ui/FormInput";
import { MemberRow } from "@/components/ui/MemberRow";
import { FormSuccess } from "@/components/ui/FormSuccess";
import { FormError } from "@/components/ui/FormError";
import { HoneypotField } from "@/components/ui/HoneypotField";

// All possible members in display order
const buildInitialMembers = (): HealthFloaterFormValues["members"] => [
  { key: "self",        label: "Self",           included: true,  ageDob: "", ped: "" },
  { key: "spouse",      label: "Spouse",         included: false, ageDob: "", ped: "" },
  { key: "son1",        label: "Son 1",          included: false, ageDob: "", ped: "" },
  { key: "son2",        label: "Son 2",          included: false, ageDob: "", ped: "" },
  { key: "daughter1",   label: "Daughter 1",     included: false, ageDob: "", ped: "" },
  { key: "daughter2",   label: "Daughter 2",     included: false, ageDob: "", ped: "" },
  { key: "mother",      label: "Mother",         included: false, ageDob: "", ped: "" },
  { key: "father",      label: "Father",         included: false, ageDob: "", ped: "" },
  { key: "motherInLaw", label: "Mother-in-law",  included: false, ageDob: "", ped: "" },
  { key: "fatherInLaw", label: "Father-in-law",  included: false, ageDob: "", ped: "" },
];

// Which members are always shown (regardless of included state)
const ALWAYS_VISIBLE = new Set(["self", "spouse", "mother", "father", "motherInLaw", "fatherInLaw"]);

export default function HealthFloaterForm() {
  const [refId, setRefId] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");
  // Track how many sons/daughters have been added (0, 1, or 2)
  const [sonCount, setSonCount] = useState(0);
  const [daughterCount, setDaughterCount] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<HealthFloaterFormValues>({
    resolver: zodResolver(healthFloaterSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      mobile: "",
      email: "",
      pincode: "",
      members: buildInitialMembers(),
    },
  });

  const members = watch("members");

  // ── Member update helpers ────────────────────────────────────────────────────

  const updateMember = useCallback(
    (key: string, patch: Partial<HealthFloaterFormValues["members"][number]>) => {
      const updated = members.map((m) =>
        m.key === key ? { ...m, ...patch } : m
      );
      setValue("members", updated, { shouldValidate: true });
    },
    [members, setValue]
  );

  const handleToggleInclude = useCallback(
    (key: string, included: boolean) => {
      updateMember(key, { included, ageDob: included ? "" : "", ped: "" });
    },
    [updateMember]
  );

  const handleAgeChange = useCallback(
    (key: string, ageDob: string) => updateMember(key, { ageDob }),
    [updateMember]
  );

  const handlePedChange = useCallback(
    (key: string, ped: "yes" | "no") => updateMember(key, { ped }),
    [updateMember]
  );

  // ── Dynamic son/daughter add ──────────────────────────────────────────────

  const addSon = () => {
    if (sonCount >= 2) return;
    const nextKey = sonCount === 0 ? "son1" : "son2";
    updateMember(nextKey, { included: true });
    setSonCount((c) => c + 1);
  };

  const addDaughter = () => {
    if (daughterCount >= 2) return;
    const nextKey = daughterCount === 0 ? "daughter1" : "daughter2";
    updateMember(nextKey, { included: true });
    setDaughterCount((c) => c + 1);
  };

  // ── Decide which members to show ──────────────────────────────────────────

  const visibleMembers = members.filter(
    (m) =>
      ALWAYS_VISIBLE.has(m.key) ||
      (m.key === "son1" && sonCount >= 1) ||
      (m.key === "son2" && sonCount >= 2) ||
      (m.key === "daughter1" && daughterCount >= 1) ||
      (m.key === "daughter2" && daughterCount >= 2)
  );

  // ── Member-level error extraction ─────────────────────────────────────────
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const memberErrors = (errors.members as any) ?? [];
  const getMemberErrors = (key: string) => {
    const idx = members.findIndex((m) => m.key === key);
    const errs = memberErrors[idx];
    return {
      ageDob: errs?.ageDob?.message as string | undefined,
      ped:    errs?.ped?.message    as string | undefined,
    };
  };

  // ── Reset ─────────────────────────────────────────────────────────────────

  const handleReset = () => {
    reset({ name: "", mobile: "", email: "", pincode: "", members: buildInitialMembers() });
    setSonCount(0);
    setDaughterCount(0);
    setRefId("");
    setSubmitted(false);
    setSubmitError("");
  };

  // ── Submit ────────────────────────────────────────────────────────────────

  const onSubmit = async (data: HealthFloaterFormValues) => {
    setSubmitError("");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "health-floater",
          payload: data,
          website: "",
        }),
      });

      const result = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(result.message ?? "Submission failed. Please try again.");

      setRefId(result.refId ?? "");
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Submission failed. Please try again.");
    }
  };

  if (submitted) {
    return <FormSuccess refId={refId} insuranceType="Health Floater Insurance" onReset={handleReset} />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <HoneypotField register={register} />

      {/* ── Common fields ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormInput
          label="Full Name"
          required
          placeholder="e.g. Vijay Nair"
          error={errors.name?.message}
          {...register("name")}
        />
        <FormInput
          label="Mobile Number"
          required
          type="tel"
          inputMode="numeric"
          maxLength={10}
          placeholder="10-digit mobile"
          error={errors.mobile?.message}
          {...register("mobile")}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormInput
          label="Email Address"
          required
          type="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register("email")}
        />
        <FormInput
          label="Pincode"
          required
          type="text"
          inputMode="numeric"
          maxLength={6}
          placeholder="6-digit pincode"
          error={errors.pincode?.message}
          {...register("pincode")}
        />
      </div>

      {/* ── Members section ──────────────────────────────────────────────── */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold" style={{ color: "var(--ink)" }}>
            Family Members
            <span className="ml-0.5 font-normal text-xs" style={{ color: "var(--ink3)" }}>
              {" "}— toggle to include
            </span>
          </p>
          {/* Global member error (e.g. "At least Self must be included") */}
          {errors.members?.message && (
            <p className="text-sm" style={{ color: "#EF4444" }} role="alert">
              {errors.members.message as string}
            </p>
          )}
        </div>

        {/* 2-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {visibleMembers.map((member) => (
            <MemberRow
              key={member.key}
              member={member}
              isSelf={member.key === "self"}
              onToggleInclude={handleToggleInclude}
              onAgeChange={handleAgeChange}
              onPedChange={handlePedChange}
              errors={getMemberErrors(member.key)}
            />
          ))}
        </div>

        {/* ── Add Son / Add Daughter buttons ──────────────────────────── */}
        <div className="flex flex-wrap gap-3 mt-1">
          {sonCount < 2 && (
            <button
              type="button"
              onClick={addSon}
              className="flex items-center gap-2 px-4 min-h-[44px] rounded-[10px] border-2 border-dashed text-sm font-medium transition-colors"
              style={{
                borderColor: "var(--blue-mid)",
                color: "var(--blue)",
                background: "transparent",
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "var(--blue-tint)")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "transparent")}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="16" strokeLinecap="round" />
                <line x1="8" y1="12" x2="16" y2="12" strokeLinecap="round" />
              </svg>
              Add Son
            </button>
          )}
          {daughterCount < 2 && (
            <button
              type="button"
              onClick={addDaughter}
              className="flex items-center gap-2 px-4 min-h-[44px] rounded-[10px] border-2 border-dashed text-sm font-medium transition-colors"
              style={{
                borderColor: "var(--blue-mid)",
                color: "var(--blue)",
                background: "transparent",
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "var(--blue-tint)")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "transparent")}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="16" strokeLinecap="round" />
                <line x1="8" y1="12" x2="16" y2="12" strokeLinecap="round" />
              </svg>
              Add Daughter
            </button>
          )}
        </div>
      </div>

      {submitError && (
        <FormError message={submitError} onRetry={handleSubmit(onSubmit)} />
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="h-12 w-full rounded-full text-sm font-semibold text-white transition-opacity disabled:opacity-60 flex items-center justify-center gap-2"
        style={{ background: "var(--blue)" }}
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Submitting…
          </>
        ) : (
          "Get a Quote"
        )}
      </button>
    </form>
  );
}
