import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import ServicesSection from "@/components/services-section";
import AboutSection from "@/components/about-section";
import CTASection from "@/components/cta-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[--bg-primary] text-[--text-primary]">
      <Header />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <CTASection />
      <ContactSection />
      <Footer />
    </div>
  );
}
