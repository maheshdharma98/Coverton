export default function Loading() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "var(--surface)" }}
      aria-label="Loading…"
      role="status"
    >
      {/* Skeleton navbar */}
      <div className="sticky top-0 z-50 py-3 px-4" style={{ background: "rgba(250,251,255,0.85)" }}>
        <div
          className="max-w-5xl mx-auto rounded-full px-6 flex items-center justify-between animate-pulse"
          style={{ height: 56, background: "#fff", border: "1px solid var(--line)" }}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full" style={{ background: "var(--line)" }} />
            <div className="w-24 h-4 rounded-full" style={{ background: "var(--line)" }} />
          </div>
          <div className="hidden sm:flex items-center gap-4">
            {[80, 56, 72, 64].map((w, i) => (
              <div key={i} className="h-3 rounded-full" style={{ width: w, background: "var(--line)" }} />
            ))}
          </div>
          <div className="w-24 h-8 rounded-full" style={{ background: "var(--line)" }} />
        </div>
      </div>

      {/* Skeleton hero */}
      <div
        className="animate-pulse"
        style={{ background: "var(--ink)", padding: "80px 24px" }}
      >
        <div className="max-w-7xl mx-auto flex flex-col gap-5">
          <div className="w-40 h-5 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }} />
          <div className="w-3/4 h-10 rounded-xl" style={{ background: "rgba(255,255,255,0.1)" }} />
          <div className="w-1/2 h-10 rounded-xl" style={{ background: "rgba(255,255,255,0.08)" }} />
          <div className="w-2/3 h-5 rounded-full mt-2" style={{ background: "rgba(255,255,255,0.07)" }} />
          <div className="flex gap-3 mt-2">
            <div className="w-32 h-10 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }} />
            <div className="w-32 h-10 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }} />
          </div>
        </div>
      </div>

      {/* Skeleton content grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 w-full animate-pulse">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-[14px] overflow-hidden"
              style={{ border: "1px solid var(--line)" }}
            >
              <div className="h-12" style={{ background: "var(--line)" }} />
              <div className="p-4 flex flex-col gap-3">
                <div className="h-3 rounded-full w-3/4" style={{ background: "var(--line)" }} />
                <div className="h-3 rounded-full w-full" style={{ background: "var(--line)" }} />
                <div className="h-3 rounded-full w-5/6" style={{ background: "var(--line)" }} />
                <div className="h-8 rounded-full mt-2" style={{ background: "var(--line)" }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <span className="sr-only">Loading Coverton Insurance…</span>
    </div>
  );
}
