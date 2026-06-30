"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { healthFloaterSchema, type HealthFloaterFormValues } from "@/lib/validations/health-floater";
import { FormInput } from "@/components/ui/FormInput";
import { FormSuccess } from "@/components/ui/FormSuccess";
import { FormError } from "@/components/ui/FormError";
import { HoneypotField } from "@/components/ui/HoneypotField";

export default function HealthFloaterForm() {
  const [refId, setRefId] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<HealthFloaterFormValues>({
    resolver: zodResolver(healthFloaterSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      mobile: "",
      email: "",
      pincode: "",
      numberOfAdults: "",
      numberOfChildren: "",
      remarks: "",
    },
  });

  const handleReset = () => {
    reset();
    setRefId("");
    setSubmitted(false);
    setSubmitError("");
  };

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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormInput
          label="Number of Adults"
          required
          type="number"
          inputMode="numeric"
          min={1}
          max={10}
          placeholder="e.g. 2"
          error={errors.numberOfAdults?.message}
          {...register("numberOfAdults")}
        />
        <FormInput
          label="Number of Children"
          type="number"
          inputMode="numeric"
          min={0}
          max={10}
          placeholder="e.g. 1 (optional)"
          error={errors.numberOfChildren?.message}
          {...register("numberOfChildren")}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium" style={{ color: "var(--ink)" }}>
          Remarks <span className="font-normal text-xs" style={{ color: "var(--ink3)" }}>(Optional)</span>
        </label>
        <textarea
          {...register("remarks")}
          placeholder="Any specific requirements or additional information..."
          maxLength={500}
          rows={3}
          style={{
            border: "1px solid #E2E8F0",
            borderRadius: 8,
            padding: "9px 12px",
            fontSize: 13,
            lineHeight: 1.5,
            resize: "vertical",
            width: "100%",
            outline: "none",
            color: "var(--ink)",
          }}
          onFocus={(e) => (e.target.style.borderColor = "var(--blue)")}
          onBlur={(e) => (e.target.style.borderColor = "#E2E8F0")}
        />
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
