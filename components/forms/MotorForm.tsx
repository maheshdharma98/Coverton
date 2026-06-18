"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motorSchema, MOTOR_CATEGORIES, type MotorFormValues } from "@/lib/validations/motor";
import { FormInput } from "@/components/ui/FormInput";
import { FormSelect } from "@/components/ui/FormSelect";
import { FileUpload } from "@/components/ui/FileUpload";
import { FormSuccess } from "@/components/ui/FormSuccess";
import { FormError } from "@/components/ui/FormError";
import { HoneypotField } from "@/components/ui/HoneypotField";

interface UploadedFile {
  file: File;
  fileData: string; // base64, no data-URL prefix
  fileName: string;
  mimeType: string;
}

const CATEGORY_OPTIONS = MOTOR_CATEGORIES.map((c) => ({ value: c, label: c }));

export default function MotorForm() {
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [fileError, setFileError] = useState<string>("");
  const [refId, setRefId] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<MotorFormValues>({
    resolver: zodResolver(motorSchema),
    mode: "onBlur",
    defaultValues: { name: "", mobile: "", email: "", pincode: "", vehicleNumber: "" },
  });

  register("previousPolicy");

  const handleFileChange = (file: File | null) => {
    setFileError("");
    if (!file) {
      setUploadedFile(null);
      setValue("previousPolicy", undefined);
      return;
    }
    setValue("previousPolicy", file);
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const base64 = dataUrl.split(",")[1] ?? "";
      setUploadedFile({ file, fileData: base64, fileName: file.name, mimeType: file.type });
    };
    reader.onerror = () => {
      setFileError("Could not read the file. Please try again.");
      setValue("previousPolicy", undefined);
    };
    reader.readAsDataURL(file);
  };

  const handleReset = () => {
    reset();
    setUploadedFile(null);
    setFileError("");
    setRefId("");
    setSubmitted(false);
    setSubmitError("");
  };

  const onSubmit = async (data: MotorFormValues) => {
    setSubmitError("");
    setFileError("");

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "motor",
          payload: {
            ...data,
            policyFile: uploadedFile
              ? { fileData: uploadedFile.fileData, fileName: uploadedFile.fileName, mimeType: uploadedFile.mimeType }
              : null,
          },
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
    return <FormSuccess refId={refId} insuranceType="Motor Insurance" onReset={handleReset} />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <HoneypotField register={register} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormInput
          label="Full Name"
          required
          placeholder="e.g. Rahul Sharma"
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
        <FormSelect
          label="Vehicle Category"
          required
          placeholder="Select category"
          options={CATEGORY_OPTIONS}
          error={errors.category?.message}
          {...register("category")}
        />
        <FormInput
          label="Vehicle Number"
          required
          placeholder="e.g. MH12AB1234"
          error={errors.vehicleNumber?.message}
          {...register("vehicleNumber")}
          onChange={(e) => {
            e.target.value = e.target.value.toUpperCase();
            register("vehicleNumber").onChange(e);
          }}
        />
      </div>

      <FileUpload
        label="Previous Insurance Policy (Optional)"
        onFileChange={handleFileChange}
        currentFile={uploadedFile?.file ?? null}
        error={fileError}
        id="motor-policy-upload"
      />

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
