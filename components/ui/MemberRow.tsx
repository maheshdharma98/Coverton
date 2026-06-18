"use client";

import { cn } from "@/lib/utils";

export interface MemberData {
  key: string;
  label: string;
  included: boolean;
  ageDob: string;
  ped: "yes" | "no" | "";
}

interface MemberRowProps {
  member: MemberData;
  isSelf?: boolean;
  onToggleInclude?: (key: string, included: boolean) => void;
  onAgeChange: (key: string, value: string) => void;
  onPedChange: (key: string, value: "yes" | "no") => void;
  errors?: {
    ageDob?: string;
    ped?: string;
  };
}

export function MemberRow({
  member,
  isSelf = false,
  onToggleInclude,
  onAgeChange,
  onPedChange,
  errors,
}: MemberRowProps) {
  const isActive = isSelf || member.included;
  const rowId = `member-${member.key}`;

  return (
    <div
      className={cn(
        "rounded-[12px] border p-4 transition-colors",
        isActive
          ? "border-[var(--blue-mid)] bg-[var(--blue-tint)]"
          : "border-[var(--line)] bg-white"
      )}
    >
      {/* Header: label + include toggle */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <span className="text-sm font-semibold" style={{ color: "var(--ink)" }}>
          {member.label}
          {isSelf && (
            <span
              className="ml-2 text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded font-bold"
              style={{ background: "var(--blue)", color: "#fff" }}
            >
              Required
            </span>
          )}
        </span>

        {!isSelf && onToggleInclude && (
          <button
            type="button"
            role="switch"
            aria-checked={member.included}
            aria-label={`Include ${member.label}`}
            onClick={() => onToggleInclude(member.key, !member.included)}
            className={cn(
              "relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0",
              member.included ? "bg-[var(--blue)]" : "bg-[var(--line)]"
            )}
          >
            <span
              className={cn(
                "inline-block h-4 w-4 rounded-full bg-white transition-transform shadow",
                member.included ? "translate-x-6" : "translate-x-1"
              )}
            />
          </button>
        )}
      </div>

      {/* Fields — only shown when active */}
      {isActive && (
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Date of Birth / Age input */}
          <div className="flex-1 flex flex-col gap-1.5">
            <label
              htmlFor={`${rowId}-dob`}
              className="text-sm font-medium"
              style={{ color: "var(--ink2)" }}
            >
              Date of Birth <span style={{ color: "#EF4444" }} aria-hidden="true">*</span>
            </label>
            <input
              id={`${rowId}-dob`}
              type="date"
              value={member.ageDob}
              onChange={e => onAgeChange(member.key, e.target.value)}
              className={cn(
                "h-10 w-full rounded-[8px] border px-3 text-sm outline-none transition-colors bg-white",
                errors?.ageDob
                  ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                  : "border-[var(--line)] focus:border-[var(--blue)] focus:ring-2 focus:ring-[var(--blue-mid)]"
              )}
              style={{ color: "var(--ink)" }}
              aria-invalid={!!errors?.ageDob}
              aria-describedby={errors?.ageDob ? `${rowId}-dob-error` : undefined}
            />
            {errors?.ageDob && (
              <p id={`${rowId}-dob-error`} className="text-sm" style={{ color: "#EF4444" }} role="alert">
                {errors.ageDob}
              </p>
            )}
          </div>

          {/* Pre-existing Disease toggle */}
          <div className="flex flex-col gap-1.5">
            <p
              className="text-sm font-medium"
              style={{ color: "var(--ink2)" }}
              id={`${rowId}-ped-label`}
            >
              Pre-existing Disease <span style={{ color: "#EF4444" }} aria-hidden="true">*</span>
            </p>
            <div
              className="inline-flex rounded-[8px] border p-0.5"
              role="group"
              aria-labelledby={`${rowId}-ped-label`}
              style={{
                borderColor: errors?.ped ? "#F87171" : "var(--line)",
                background: "#fff",
              }}
            >
              {(["yes", "no"] as const).map(option => {
                const active = member.ped === option;
                return (
                  <button
                    key={option}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => onPedChange(member.key, option)}
                    className={cn(
                      "px-4 py-1.5 rounded-[6px] text-sm font-medium capitalize transition-all",
                      active ? "shadow-sm" : "hover:bg-[var(--surface)]"
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
            {errors?.ped && (
              <p className="text-sm" style={{ color: "#EF4444" }} role="alert">
                {errors.ped}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
