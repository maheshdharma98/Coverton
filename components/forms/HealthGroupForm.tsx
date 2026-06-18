"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { healthGroupSchema, type HealthGroupFormValues } from "@/lib/validations/health-group";
import { FormInput } from "@/components/ui/FormInput";
import { FormSuccess } from "@/components/ui/FormSuccess";
import { FormError } from "@/components/ui/FormError";
import { HoneypotField } from "@/components/ui/HoneypotField";

export default function HealthGroupForm() {
  const [refId, setRefId] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<HealthGroupFormValues>({
    resolver: zodResolver(healthGroupSchema),
    mode: "onBlur",
    defaultValues: {
      companyName: "",
      mobile: "",
      numberOfEmployees: "",
      email: "",
      pincode: "",
    },
  });

  const handleReset = () => {
    reset();
    setRefId("");
    setSubmitted(false);
    setSubmitError("");
  };

  const onSubmit = async (data: HealthGroupFormValues) => {
    setSubmitError("");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "health-group",
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
    return <FormSuccess refId={refId} insuranceType="Group Health Insurance" onReset={handleReset} />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <HoneypotField register={register} />

      <FormInput
        label="Company Name"
        required
        placeholder="e.g. Acme Pvt. Ltd."
        error={errors.companyName?.message}
        {...register("companyName")}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
        <FormInput
          label="No. of Employees"
          required
          type="text"
          inputMode="numeric"
          placeholder="e.g. 50"
          error={errors.numberOfEmployees?.message}
          {...register("numberOfEmployees")}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormInput
          label="Email Address"
          required
          type="email"
          placeholder="hr@company.com"
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
