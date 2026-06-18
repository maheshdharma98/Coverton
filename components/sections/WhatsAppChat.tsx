"use client";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

const FEATURES = [
  {
    icon: "ti-clock",
    title: "Reply within 2 hours",
    sub: "During business hours Mon–Sat 9AM–6PM",
  },
  {
    icon: "ti-shield-check",
    title: "Unbiased advice",
    sub: "We compare across 30+ insurers to find your best option",
  },
  {
    icon: "ti-lock",
    title: "No data shared without consent",
    sub: "Your details stay private — always",
  },
];

function TypingDots() {
  return (
    <>
      <style>{`
        @keyframes wa-typing {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
      `}</style>
      <div
        style={{
          background: "white",
          borderRadius: "0 12px 12px 12px",
          padding: "10px 16px",
          width: "fit-content",
          alignSelf: "flex-start",
          display: "flex",
          gap: 4,
          alignItems: "center",
        }}
      >
        {[0, 0.2, 0.4].map((delay, i) => (
          <span
            key={i}
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#8892A4",
              display: "block",
              animation: `wa-typing 1.2s infinite`,
              animationDelay: `${delay}s`,
            }}
          />
        ))}
      </div>
    </>
  );
}

function ChatBubble({
  text,
  time,
  side,
  ticks,
}: {
  text: string;
  time: string;
  side: "left" | "right";
  ticks?: boolean;
}) {
  const isRight = side === "right";
  return (
    <div
      style={{
        background: isRight ? "#DCF8C6" : "white",
        borderRadius: isRight ? "12px 0 12px 12px" : "0 12px 12px 12px",
        padding: "10px 14px",
        maxWidth: isRight ? "80%" : "75%",
        alignSelf: isRight ? "flex-end" : "flex-start",
        fontSize: 13,
        color: "#0f1f3d",
        lineHeight: 1.5,
      }}
    >
      <p style={{ margin: 0 }}>{text}</p>
      <p
        style={{
          fontSize: 10,
          color: ticks ? "#34B7F1" : "#8892A4",
          textAlign: "right",
          margin: "4px 0 0",
        }}
      >
        {time}{ticks ? " ✓✓" : ""}
      </p>
    </div>
  );
}

export default function WhatsAppChat() {
  return (
    <section
      style={{ background: "white" }}
      className="px-5 sm:px-10 lg:px-20 py-16 lg:py-20"
    >
      <div
        className="grid grid-cols-1 lg:grid-cols-2 items-center"
        style={{ gap: 80, maxWidth: 1200, margin: "0 auto" }}
      >
        {/* ── LEFT — copy ───────────────────────────────────────────── */}
        <div>
          <p
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "#1247D6",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            HOW WE WORK
          </p>

          <h2
            style={{
              fontSize: 36,
              fontWeight: 800,
              color: "#0f1f3d",
              lineHeight: 1.2,
              letterSpacing: "-0.8px",
              marginBottom: 14,
            }}
          >
            This is what talking to us looks like
          </h2>

          <p
            style={{
              fontSize: 15,
              color: "#8892A4",
              lineHeight: 1.7,
              marginBottom: 32,
            }}
          >
            No scripts. No pressure. Just honest answers. We tell you exactly what each
            policy covers, what it doesn&apos;t, and which one suits you best.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: 32 }}>
            {FEATURES.map((f) => (
              <div
                key={f.title}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: "#EEF3FF",
                    display: "grid",
                    placeItems: "center",
                    flexShrink: 0,
                  }}
                >
                  <i
                    className={`ti ${f.icon}`}
                    style={{ fontSize: 18, color: "#1247D6" }}
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "#0f1f3d", margin: "0 0 2px" }}>
                    {f.title}
                  </p>
                  <p style={{ fontSize: 13, color: "#8892A4", margin: 0 }}>{f.sub}</p>
                </div>
              </div>
            ))}
          </div>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#25D366",
              color: "white",
              borderRadius: 50,
              padding: "13px 28px",
              fontSize: 14,
              fontWeight: 700,
              textDecoration: "none",
              minHeight: 44,
              transition: "background 0.2s ease",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.background = "#20BA5A")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.background = "#25D366")
            }
            aria-label="Start a WhatsApp conversation with Coverton"
          >
            <i className="ti ti-brand-whatsapp" style={{ fontSize: 18 }} aria-hidden="true" />
            Start a conversation
          </a>
        </div>

        {/* ── RIGHT — WhatsApp mockup ────────────────────────────────── */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              background: "#ECE5DD",
              borderRadius: 16,
              overflow: "hidden",
              border: "1px solid #e0e0e0",
              maxWidth: 420,
              width: "100%",
            }}
          >
            {/* Chat header */}
            <div
              style={{
                background: "#075E54",
                padding: "12px 16px",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "#25D366",
                  display: "grid",
                  placeItems: "center",
                  fontSize: 16,
                  fontWeight: 700,
                  color: "white",
                  flexShrink: 0,
                }}
              >
                C
              </div>
              <div>
                <p style={{ fontSize: 15, fontWeight: 600, color: "white", margin: 0 }}>
                  Coverton
                </p>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", margin: 0 }}>
                  Usually replies within 2 hours
                </p>
              </div>
            </div>

            {/* Chat body */}
            <div
              style={{
                padding: "16px 12px",
                display: "flex",
                flexDirection: "column",
                gap: 10,
                background: "#ECE5DD",
                minHeight: 280,
              }}
            >
              <ChatBubble
                side="left"
                text="My dad is 62 and diabetic. Can he still get health insurance cover?"
                time="10:14 AM"
              />
              <ChatBubble
                side="right"
                text="Yes — 3 insurers will cover him. But the waiting periods vary quite a bit, and one of them excludes pre-existing conditions for the first 4 years. Here's an honest comparison..."
                time="10:22 AM"
                ticks
              />
              <ChatBubble
                side="left"
                text="Nobody had told me this before 🙏 Can we look at the best option?"
                time="10:25 AM"
              />
              <ChatBubble
                side="right"
                text="Of course. Send me his date of birth and city, and I'll put together the 3 best fits with the catches marked in plain language."
                time="10:27 AM"
                ticks
              />
            </div>

            {/* Input bar */}
            <div
              style={{
                background: "#F0F0F0",
                padding: "8px 12px",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div
                style={{
                  background: "white",
                  borderRadius: 24,
                  padding: "8px 16px",
                  flex: 1,
                  fontSize: 13,
                  color: "#8892A4",
                }}
              >
                Type a message
              </div>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "#25D366",
                  display: "grid",
                  placeItems: "center",
                  flexShrink: 0,
                }}
              >
                <i className="ti ti-send" style={{ fontSize: 18, color: "white" }} aria-hidden="true" />
              </div>
            </div>
          </div>

          {/* Caption */}
          <p
            style={{
              fontSize: 12,
              color: "#8892A4",
              fontStyle: "italic",
              textAlign: "center",
              marginTop: 12,
            }}
          >
            Real conversation. Shared with permission.
          </p>
        </div>
      </div>
    </section>
  );
}
