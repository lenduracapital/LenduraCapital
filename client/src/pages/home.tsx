import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import ProcessSection from "@/components/process-section";
import ContactFormSection from "@/components/contact-form-section";
import WorkingCapitalSection from "@/components/working-capital-section";
import TestimonialsSection from "@/components/testimonials-section";
import MoveBusinessForwardSection from "@/components/move-business-forward-section";
import BusinessSolutionsSection from "@/components/business-solutions-section";
import Footer from "@/components/footer";
import SEOHead from "@/components/seo-head";

export default function Home() {
  return (
    <div className="min-h-screen bg-[--bg-primary] text-[--text-primary]">
      <SEOHead 
        title="FundTek Capital Group - Business Funding Solutions"
        description="Get flexible business financing with FundTek Capital Group. Term loans, merchant cash advances, equipment financing & more. Call (305) 307-4658 for fast approval."
        keywords="business funding, term loans, merchant cash advance, equipment financing, SBA loans, business capital, commercial lending"
        canonical="/"
      />
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
