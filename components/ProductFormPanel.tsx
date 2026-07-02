"use client";

import { useState } from "react";
import MotorForm from "@/components/forms/MotorForm";
import TravelForm from "@/components/forms/TravelForm";
import HealthIndividualForm from "@/components/forms/HealthIndividualForm";
import HealthFloaterForm from "@/components/forms/HealthFloaterForm";
import HealthGroupForm from "@/components/forms/HealthGroupForm";
import StandardForm from "@/components/forms/StandardForm";
import { cn } from "@/lib/utils";

type HealthTab = "individual" | "floater" | "group";

interface Props {
  slug: string;
  color: string;
  subcategories?: string[];
  standardKey?: string;
}

const HEALTH_TABS: { id: HealthTab; label: string; shortLabel: string }[] = [
  { id: "individual", label: "Individual",       shortLabel: "Individual" },
  { id: "floater",    label: "Family",   shortLabel: "Family" },
  { id: "group",      label: "Group / Corporate", shortLabel: "Group" },
];

export default function ProductFormPanel({ slug, color, subcategories, standardKey }: Props) {
  const [healthTab, setHealthTab] = useState<HealthTab>("individual");

  return (
    <div
      className="rounded-[20px] border bg-white overflow-hidden"
      style={{ borderColor: "var(--line)" }}
    >
      {/* Coloured top accent line */}
      <div className="h-1.5" style={{ background: color }} />

      <div className="p-6 sm:p-8">
        {/* ── Health tabs ─────────────────────────────────────────────────── */}
        {slug === "health" && (
          <div
            className="grid grid-cols-3 gap-0.5 rounded-[10px] p-1 mb-6"
            role="tablist"
            aria-label="Health insurance type"
            style={{ background: "var(--surface)", border: "1px solid var(--line)" }}
          >
            {HEALTH_TABS.map(({ id, label, shortLabel }) => (
              <button
                key={id}
                role="tab"
                aria-selected={healthTab === id}
                onClick={() => setHealthTab(id)}
                className={cn(
                  "w-full min-h-[44px] px-1 sm:px-2 py-2 rounded-[8px] text-xs sm:text-sm font-semibold transition-all leading-tight",
                  healthTab === id ? "text-white shadow-sm" : "text-[var(--ink3)] hover:text-[var(--ink)]"
                )}
                style={healthTab === id ? { background: color } : {}}
              >
                <span className="sm:hidden">{shortLabel}</span>
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>
        )}

        {/* ── Form content ─────────────────────────────────────────────────── */}
        {slug === "motor" && <MotorForm />}

        {slug === "travel" && <TravelForm />}

        {slug === "health" && healthTab === "individual" && <HealthIndividualForm />}
        {slug === "health" && healthTab === "floater"    && <HealthFloaterForm />}
        {slug === "health" && healthTab === "group"      && <HealthGroupForm />}

        {slug !== "motor" && slug !== "travel" && slug !== "health" && subcategories && (
          <StandardForm
            insuranceType={standardKey ?? slug}
            subcategories={subcategories}
          />
        )}
      </div>
    </div>
  );
}
