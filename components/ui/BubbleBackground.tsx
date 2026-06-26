export default function BubbleBackground({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ position: "relative", background: "#F8FAFF", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -200, right: -180, width: 580, height: 580, borderRadius: "50%", background: "rgba(18,71,214,0.06)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "absolute", top: 280, left: -180, width: 440, height: 440, borderRadius: "50%", background: "rgba(245,184,0,0.07)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "absolute", top: 750, right: -100, width: 340, height: 340, borderRadius: "50%", background: "rgba(18,71,214,0.05)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "absolute", top: 1300, left: -80, width: 280, height: 280, borderRadius: "50%", background: "rgba(15,128,96,0.05)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "absolute", top: 1800, right: 60, width: 240, height: 240, borderRadius: "50%", background: "rgba(245,184,0,0.06)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "absolute", top: 2400, left: 40, width: 320, height: 320, borderRadius: "50%", background: "rgba(18,71,214,0.04)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "absolute", top: 2900, right: -60, width: 380, height: 380, borderRadius: "50%", background: "rgba(245,184,0,0.05)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}
