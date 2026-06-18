"use client";

import { cn } from "@/lib/utils";

interface FormToggleProps {
  label: string;
  value: "yes" | "no" | "";
  onChange: (value: "yes" | "no") => void;
  error?: string;
  required?: boolean;
  id?: string;
}

export function FormToggle({ label, value, onChange, error, required, id }: FormToggleProps) {
  const baseId = id ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1.5">
      <p
        className="text-sm font-medium"
        style={{ color: "var(--ink)" }}
        id={`${baseId}-label`}
      >
        {label}
        {required && (
          <span className="ml-0.5" style={{ color: "#EF4444" }} aria-hidden="true">
            *
          </span>
        )}
      </p>

      <div
        className="inline-flex rounded-[10px] border p-0.5"
        role="group"
        aria-labelledby={`${baseId}-label`}
        style={{
          borderColor: error ? "#F87171" : "var(--line)",
          background: "var(--surface)",
        }}
      >
        {(["yes", "no"] as const).map((option) => {
          const active = value === option;
          return (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(option)}
              className={cn(
                "flex-1 px-5 py-2 rounded-[8px] text-sm font-medium transition-all capitalize",
                active
                  ? "shadow-sm"
                  : "hover:bg-white/60"
              )}
              style={
                active
                  ? { background: "var(--blue-tint)", color: "var(--blue)" }
                  : { color: "var(--ink2)" }
              }
            >
              {option === "yes" ? "Yes" : "No"}
            </button>
          );
        })}
      </div>

      {error && (
        <p
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
