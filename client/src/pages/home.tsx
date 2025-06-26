import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import ProcessSection from "@/components/process-section";
import ContactFormSection from "@/components/contact-form-section";
import WorkingCapitalSection from "@/components/working-capital-section";
import TestimonialsSection from "@/components/testimonials-section";
import MoveBusinessForwardSection from "@/components/move-business-forward-section";
import BusinessSolutionsSection from "@/components/business-solutions-section";
import TrustSignalsSection from "@/components/trust-signals-section";
import PremiumFinancingSection from "@/components/premium-financing-section";
import Footer from "@/components/footer";
import SEOHead from "@/components/seo-head";
import SkipNavigation from "@/components/skip-navigation";
import Analytics from "@/components/analytics";
import ConversionTracking from "@/components/conversion-tracking";
import EnhancedSchema from "@/components/enhanced-schema";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black">
      <SEOHead 
        title="Business Funding Solutions - Fast Approval in 24 Hours | FundTek"
        description="Get approved for business funding in 24 hours. Term loans, equipment financing, merchant cash advances & more. Over $1B funded. Call (305) 307-4658 today."
        keywords="business funding, term loans, merchant cash advance, equipment financing, SBA loans, business capital, commercial lending"
        canonical="/"
      />
      <EnhancedSchema type="homepage" />
      <Analytics />
      <SkipNavigation />
      <ConversionTracking 
        eventType="page_view" 
        eventData={{ page_title: "FundTek Capital Group - Business Funding Solutions" }} 
      />


      <Header transparent={true} />
      <main id="main-content">
        <HeroSection />
        <ProcessSection />
        <ContactFormSection />
        <WorkingCapitalSection />
        <TestimonialsSection />
        <TrustSignalsSection />
        <MoveBusinessForwardSection />
        <BusinessSolutionsSection />
        <PremiumFinancingSection />
      </main>
      <Footer />
    </div>
  );
}