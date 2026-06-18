"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { travelSchema, TRAVEL_CATEGORIES, type TravelFormValues } from "@/lib/validations/travel";
import { FormInput } from "@/components/ui/FormInput";
import { FormSelect } from "@/components/ui/FormSelect";
import { FormSuccess } from "@/components/ui/FormSuccess";
import { FormError } from "@/components/ui/FormError";
import { HoneypotField } from "@/components/ui/HoneypotField";
import { cn } from "@/lib/utils";

const CATEGORY_OPTIONS = TRAVEL_CATEGORIES.map((c) => ({ value: c, label: c }));

const TRAVEL_TYPE_OPTIONS = [
  {
    value: "including-usa-canada" as const,
    label: "Including USA & Canada",
    description: "Worldwide coverage including USA & Canada",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
    ),
  },
  {
    value: "excluding-usa-canada" as const,
    label: "Excluding USA & Canada",
    description: "Worldwide coverage excluding USA & Canada",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
        <line x1="4" y1="4" x2="20" y2="20" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function TravelForm() {
  const [refId, setRefId] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TravelFormValues>({
    resolver: zodResolver(travelSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      mobile: "",
      email: "",
      pincode: "",
      category: undefined,
      travelType: undefined,
    },
  });

  const selectedTravelType = watch("travelType");

  const handleReset = () => {
    reset();
    setRefId("");
    setSubmitted(false);
    setSubmitError("");
  };

  const onSubmit = async (data: TravelFormValues) => {
    setSubmitError("");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "travel",
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
    return <FormSuccess refId={refId} insuranceType="Travel Insurance" onReset={handleReset} />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <HoneypotField register={register} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormInput
          label="Full Name"
          required
          placeholder="e.g. Anita Kapoor"
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

      <FormSelect
        label="Travel Category"
        required
        placeholder="Select category"
        options={CATEGORY_OPTIONS}
        error={errors.category?.message}
        {...register("category")}
      />

      {/* ── Travel Type card selection ────────────────────────────────────── */}
      <div className="flex flex-col gap-1.5">
        <p className="text-sm font-medium" style={{ color: "var(--ink)" }}>
          Travel Type
          <span className="ml-0.5" style={{ color: "#EF4444" }} aria-hidden="true">*</span>
        </p>

        <Controller
          name="travelType"
          control={control}
          render={({ field }) => (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              role="radiogroup"
              aria-label="Travel type"
            >
              {TRAVEL_TYPE_OPTIONS.map(({ value, label, description, icon }) => {
                const isSelected = selectedTravelType === value;
                return (
                  <button
                    key={value}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => field.onChange(value)}
                    className={cn(
                      "flex items-start gap-3 rounded-[12px] border-2 p-4 text-left transition-all",
                      isSelected
                        ? "border-[var(--blue)] bg-[var(--blue-tint)]"
                        : "border-[var(--line)] bg-white hover:border-[var(--blue-mid)] hover:bg-[var(--blue-tint)]"
                    )}
                  >
                    {/* Icon */}
                    <div
                      className="mt-0.5 flex-shrink-0"
                      style={{ color: isSelected ? "var(--blue)" : "var(--ink3)" }}
                    >
                      {icon}
                    </div>

                    <div className="flex flex-col gap-0.5 min-w-0">
                      <span
                        className="text-sm font-semibold"
                        style={{ color: isSelected ? "var(--blue)" : "var(--ink)" }}
                      >
                        {label}
                      </span>
                      <span className="text-xs leading-snug" style={{ color: "var(--ink3)" }}>
                        {description}
                      </span>
                    </div>

                    {/* Check indicator */}
                    {isSelected && (
                      <div
                        className="ml-auto flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ background: "var(--blue)" }}
                      >
                        <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} aria-hidden="true">
                          <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        />

        {errors.travelType && (
          <p className="text-sm" style={{ color: "#EF4444" }} role="alert">
            {errors.travelType.message}
          </p>
        )}
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
