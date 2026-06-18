"use client";

import { useCallback, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const ACCEPTED_TYPES = ["application/pdf", "image/jpeg", "image/png", "image/webp"] as const;
const ACCEPTED_EXT = ".pdf,.jpg,.jpeg,.png,.webp";
const MAX_SIZE_MB = 5;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

interface FileUploadProps {
  label?: string;
  required?: boolean;
  error?: string;
  onFileChange: (file: File | null) => void;
  currentFile?: File | null;
  id?: string;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function FileUpload({
  label = "Upload Previous Policy",
  required,
  error: externalError,
  onFileChange,
  currentFile,
  id = "file-upload",
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [localError, setLocalError] = useState<string>("");

  const error = externalError ?? localError;

  const validateAndSet = useCallback(
    (file: File | null) => {
      setLocalError("");
      if (!file) {
        onFileChange(null);
        return;
      }
      if (!ACCEPTED_TYPES.includes(file.type as typeof ACCEPTED_TYPES[number])) {
        setLocalError("Only PDF, JPG, PNG, or WebP files are accepted.");
        onFileChange(null);
        return;
      }
      if (file.size > MAX_SIZE_BYTES) {
        setLocalError(`File must be under ${MAX_SIZE_MB} MB. This file is ${formatBytes(file.size)}.`);
        onFileChange(null);
        return;
      }
      onFileChange(file);
    },
    [onFileChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0] ?? null;
      validateAndSet(file);
    },
    [validateAndSet]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] ?? null;
      validateAndSet(file);
      // Reset so re-selecting the same file fires onChange again
      e.target.value = "";
    },
    [validateAndSet]
  );

  const handleRemove = () => {
    setLocalError("");
    onFileChange(null);
  };

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <p className="text-sm font-medium" style={{ color: "var(--ink)" }} id={`${id}-label`}>
          {label}
          {required && (
            <span className="ml-0.5" style={{ color: "#EF4444" }} aria-hidden="true">
              *
            </span>
          )}
        </p>
      )}

      {currentFile ? (
        /* ── File preview ─────────────────────────────────────────────────── */
        <div
          className="flex items-center justify-between gap-3 rounded-[10px] border px-4 py-3"
          style={{ borderColor: "var(--blue-mid)", background: "var(--blue-tint)" }}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "var(--blue-mid)" }}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth={2} aria-hidden="true">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium truncate" style={{ color: "var(--ink)" }}>
                {currentFile.name}
              </p>
              <p className="text-xs" style={{ color: "var(--ink3)" }}>
                {formatBytes(currentFile.size)}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRemove}
            className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors"
            style={{ color: "var(--ink3)" }}
            aria-label="Remove file"
            onMouseEnter={e => (e.currentTarget.style.color = "#EF4444")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--ink3)")}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      ) : (
        /* ── Drop zone ───────────────────────────────────────────────────── */
        <div
          role="button"
          tabIndex={0}
          aria-labelledby={`${id}-label`}
          aria-describedby={error ? `${id}-error` : `${id}-hint`}
          className={cn(
            "flex flex-col items-center justify-center gap-3 rounded-[10px] border-2 border-dashed py-4 px-3 sm:py-8 sm:px-4 min-h-[80px] cursor-pointer transition-colors",
            dragging
              ? "border-[var(--blue)] bg-[var(--blue-tint)]"
              : error
              ? "border-red-300 bg-red-50"
              : "border-[var(--line)] bg-[var(--surface)] hover:border-[var(--blue)] hover:bg-[var(--blue-tint)]"
          )}
          onClick={() => inputRef.current?.click()}
          onKeyDown={e => (e.key === "Enter" || e.key === " ") && inputRef.current?.click()}
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
        >
          {/* Upload icon */}
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: dragging ? "var(--blue-mid)" : "var(--line)" }}
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke={dragging ? "var(--blue)" : "var(--ink2)"}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>

          <div className="text-center">
            <p className="text-xs sm:text-sm font-medium" style={{ color: "var(--ink)" }}>
              {dragging ? "Drop file here" : "Click or drag to upload"}
            </p>
            <p id={`${id}-hint`} className="text-xs mt-1" style={{ color: "var(--ink3)" }}>
              PDF, JPG, PNG, WebP · Max {MAX_SIZE_MB} MB
            </p>
          </div>
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={inputRef}
        id={id}
        type="file"
        accept={ACCEPTED_EXT}
        className="sr-only"
        onChange={handleChange}
        aria-hidden="true"
        tabIndex={-1}
      />

      {error && (
        <p
          id={`${id}-error`}
          className="text-sm"
          style={{ color: "#EF4444" }}
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
