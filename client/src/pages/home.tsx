import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import ProcessSection from "@/components/process-section";
import ContactFormSection from "@/components/contact-form-section";
import WorkingCapitalSection from "@/components/working-capital-section";
import TestimonialsSection from "@/components/testimonials-section";
import MoveBusinessForwardSection from "@/components/move-business-forward-section";
import BusinessSolutionsSection from "@/components/business-solutions-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[--bg-primary] text-[--text-primary]">
      <Header />
      <HeroSection />
      <ProcessSection />
      <ContactFormSection />
      <WorkingCapitalSection />
      <TestimonialsSection />
      <MoveBusinessForwardSection />
      <BusinessSolutionsSection />
      <Footer />
    </div>
  );
}
