import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BentoHero from "@/components/sections/BentoHero";
import UserStory from "@/components/sections/UserStory";
import ProductsGrid from "@/components/sections/ProductsGrid";
import ClientsSection from "@/components/sections/ClientsSection";
import WhatsAppChat from "@/components/sections/WhatsAppChat";
import InsurersSection from "@/components/sections/InsurersSection";
import CtaBand from "@/components/sections/CtaBand";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <BentoHero />
        <UserStory />
        <ProductsGrid />
        <ClientsSection />
        <WhatsAppChat />
        <InsurersSection />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
