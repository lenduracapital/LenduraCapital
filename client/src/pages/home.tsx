import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import ProcessSection from "@/components/process-section";
import WorkingCapitalSection from "@/components/working-capital-section";
import ContactFormSection from "@/components/contact-form-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[--bg-primary] text-[--text-primary]">
      <Header />
      <HeroSection />
      <ProcessSection />
      <WorkingCapitalSection />
      <ContactFormSection />
      <Footer />
    </div>
  );
}
