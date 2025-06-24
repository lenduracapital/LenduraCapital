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
import PerformanceMonitor from "@/components/performance-monitor";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black">
      <SEOHead 
        title="FundTek Capital Group - Business Funding Solutions"
        description="Get flexible business financing with FundTek Capital Group. Term loans, merchant cash advances, equipment financing & more. Call (305) 307-4658 for fast approval."
        keywords="business funding, term loans, merchant cash advance, equipment financing, SBA loans, business capital, commercial lending"
        canonical="/"
      />
      <Analytics />
      <SkipNavigation />
      <ConversionTracking 
        eventType="page_view" 
        eventData={{ page_title: "FundTek Capital Group - Business Funding Solutions" }} 
      />
      <PerformanceMonitor />

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