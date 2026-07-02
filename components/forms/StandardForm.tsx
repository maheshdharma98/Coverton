"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createStandardSchema, type StandardFormValues } from "@/lib/validations/standard";
import { FormInput } from "@/components/ui/FormInput";
import { FormSelect } from "@/components/ui/FormSelect";
import { FormSuccess } from "@/components/ui/FormSuccess";
import { FormError } from "@/components/ui/FormError";
import { HoneypotField } from "@/components/ui/HoneypotField";

// Lowercase-hyphen slug → API formType mapping
const SLUG_TO_FORM_TYPE: Record<string, string> = {
  life: "life",
  agriculture: "agriculture",
  fire: "fire",
  credit: "credit",
  engineering: "engineering",
  liability: "liability",
  marine: "marine",
  miscellaneous: "miscellaneous",
  "personal-accident": "personal-accident",
  surety: "surety",
};

interface StandardFormProps {
  insuranceType: string;
  subcategories: string[];
  accentColor?: string;
}

export default function StandardForm({
  insuranceType,
  subcategories,
  accentColor,
}: StandardFormProps) {
  const [refId, setRefId] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");

  const schema = createStandardSchema(subcategories);
  const formType =
    SLUG_TO_FORM_TYPE[insuranceType.toLowerCase().replace(/\s+/g, "-")] ??
    insuranceType.toLowerCase().replace(/\s+/g, "-");

  const categoryOptions = subcategories.map((s) => ({ value: s, label: s }));
  const submitColor = accentColor ?? "var(--blue)";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<StandardFormValues>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: { name: "", mobile: "", email: "", pincode: "", category: "" },
  });

  const handleReset = () => {
    reset();
    setRefId("");
    setSubmitted(false);
    setSubmitError("");
  };

  const onSubmit = async (data: StandardFormValues) => {
    setSubmitError("");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType,
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
    return (
      <FormSuccess
        refId={refId}
        insuranceType={`${insuranceType} Insurance`}
        onReset={handleReset}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <HoneypotField register={register} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormInput
          label="Full Name"
          required
          placeholder="e.g. Suresh Kumar"
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
        label="Category"
        required
        placeholder="Select a category"
        options={categoryOptions}
        error={errors.category?.message}
        {...register("category")}
      />

      {submitError && (
        <FormError message={submitError} onRetry={handleSubmit(onSubmit)} />
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="h-12 w-full rounded-full text-sm font-semibold text-white transition-opacity disabled:opacity-60 flex items-center justify-center gap-2"
        style={{ background: submitColor }}
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
