import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BentoHero from "@/components/sections/BentoHero";
import ClientsSection from "@/components/sections/ClientsSection";
import WhatsAppChat from "@/components/sections/WhatsAppChat";
import GuidesSection from "@/components/sections/GuidesSection";
import InsurersSection from "@/components/sections/InsurersSection";
import CtaBand from "@/components/sections/CtaBand";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* ── Unified background zone: hero → insurers ── */}
        <div style={{ position: "relative", background: "#F8FAFF", overflow: "hidden" }}>

          {/* Bubble decorations */}
          <div style={{ position: "absolute", top: -220, right: -180, width: 640, height: 640, borderRadius: "50%", background: "rgba(18,71,214,0.06)", pointerEvents: "none", zIndex: 0 }} />
          <div style={{ position: "absolute", top: 260, left: -200, width: 480, height: 480, borderRadius: "50%", background: "rgba(245,184,0,0.07)", pointerEvents: "none", zIndex: 0 }} />
          <div style={{ position: "absolute", top: 800, right: -120, width: 380, height: 380, borderRadius: "50%", background: "rgba(18,71,214,0.05)", pointerEvents: "none", zIndex: 0 }} />
          <div style={{ position: "absolute", top: 1400, left: -100, width: 300, height: 300, borderRadius: "50%", background: "rgba(15,128,96,0.05)", pointerEvents: "none", zIndex: 0 }} />
          <div style={{ position: "absolute", top: 1800, right: 80, width: 260, height: 260, borderRadius: "50%", background: "rgba(245,184,0,0.06)", pointerEvents: "none", zIndex: 0 }} />
          <div style={{ position: "absolute", top: 2400, left: 60, width: 340, height: 340, borderRadius: "50%", background: "rgba(18,71,214,0.04)", pointerEvents: "none", zIndex: 0 }} />
          <div style={{ position: "absolute", top: 3000, right: -80, width: 420, height: 420, borderRadius: "50%", background: "rgba(245,184,0,0.05)", pointerEvents: "none", zIndex: 0 }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            <BentoHero />
            <GuidesSection />
            <ClientsSection />
            <WhatsAppChat />
            <InsurersSection />
          </div>
        </div>

        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
