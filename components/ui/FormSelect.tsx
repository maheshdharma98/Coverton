"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  required?: boolean;
}

const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, options, placeholder, error, required, className, id, ...props }, ref) => {
    const selectId = id ?? label.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={selectId}
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

        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              "h-11 w-full appearance-none rounded-[10px] border px-3.5 pr-9 text-sm outline-none transition-colors",
              error
                ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                : "border-[var(--line)] bg-white focus:border-[var(--blue)] focus:ring-2 focus:ring-[var(--blue-mid)]",
              className
            )}
            style={{ color: "var(--ink)" }}
            aria-invalid={!!error}
            aria-describedby={error ? `${selectId}-error` : undefined}
            {...props}
          >
            {placeholder && (
              <option value="" disabled hidden>
                {placeholder}
              </option>
            )}
            {options.map(({ value, label: optLabel }) => (
              <option key={value} value={value}>
                {optLabel}
              </option>
            ))}
          </select>

          {/* Chevron icon */}
          <div
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
            style={{ color: "var(--ink3)" }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>

        {error && (
          <p
            id={`${selectId}-error`}
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

FormSelect.displayName = "FormSelect";

export { FormSelect };
export type { SelectOption };
