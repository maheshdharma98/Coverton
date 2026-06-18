"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, required, className, id, ...props }, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={inputId}
          className="text-sm font-medium"
          style={{ color: "var(--ink)" }}
        >
          {label}
          {required && (
            <span className="ml-0.5" style={{ color: "#EF4444" }} aria-hidden="true">
              *
            </span>
          )}
        </label>

        <input
          ref={ref}
          id={inputId}
          className={cn(
            "h-11 w-full rounded-[10px] border px-3.5 text-sm outline-none transition-colors",
            "placeholder:text-[var(--ink3)]",
            error
              ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200"
              : "border-[var(--line)] bg-white focus:border-[var(--blue)] focus:ring-2 focus:ring-[var(--blue-mid)]",
            className
          )}
          style={{ color: "var(--ink)" }}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />

        {error && (
          <p
            id={`${inputId}-error`}
            className="text-xs"
            style={{ color: "#EF4444" }}
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export { FormInput };
