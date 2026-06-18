"use client";

interface FormErrorProps {
  message?: string;
  onRetry?: () => void;
}

export function FormError({
  message = "Something went wrong. Please try again or call us directly.",
  onRetry,
}: FormErrorProps) {
  return (
    <div
      className="flex flex-col items-start gap-4 rounded-[14px] border p-5"
      style={{ background: "#FFF5F5", borderColor: "#FECACA" }}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex items-start gap-3">
        {/* Warning icon */}
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
          style={{ background: "#FEE2E2" }}
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#DC2626"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold" style={{ color: "#991B1B" }}>
            Submission Failed
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "#7F1D1D" }}>
            {message}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pl-0 sm:pl-12 w-full">
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="w-full sm:w-auto px-4 min-h-[48px] rounded-full text-sm font-semibold text-white transition-colors"
            style={{ background: "#DC2626" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#B91C1C")}
            onMouseLeave={e => (e.currentTarget.style.background = "#DC2626")}
          >
            Try again
          </button>
        )}
        <a
          href="tel:+911234567890"
          className="text-sm font-medium transition-colors min-h-[48px] flex items-center"
          style={{ color: "#DC2626" }}
          onMouseEnter={e => (e.currentTarget.style.color = "#B91C1C")}
          onMouseLeave={e => (e.currentTarget.style.color = "#DC2626")}
        >
          Call us instead
        </a>
      </div>
    </div>
  );
}
