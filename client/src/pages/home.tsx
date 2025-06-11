import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import ProcessSection from "@/components/process-section";
import ContactFormSection from "@/components/contact-form-section";
import IndustryServicesSection from "@/components/industry-services-section";
import AboutSection from "@/components/about-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[--bg-primary] text-[--text-primary]">
      <Header />
      <HeroSection />
      <ProcessSection />
      <ContactFormSection />
      <IndustryServicesSection />
      <AboutSection />
      <Footer />
    </div>
  );
}
