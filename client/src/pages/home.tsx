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
import WhyChooseFundTekSection from "@/components/why-choose-fundtek-section";
import Footer from "@/components/footer";
import BackToTop from "@/components/back-to-top";
import SEOHead from "@/components/seo-head";
import SkipNavigation from "@/components/skip-navigation";
import Analytics from "@/components/analytics";
import ConversionTracking from "@/components/conversion-tracking";
import PerformanceMonitor from "@/components/performance-monitor";
import EnhancedSchema from "@/components/enhanced-schema";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black">
      <SEOHead 
        title="FundTek Capital Group - Services"
        description="Get fast business funding with approvals in 24 hours. FundTek helps U.S. business owners access capital with flexible terms—no delays, no red tape."
        keywords="business funding, 24 hour approval, fast business loans, term loans, merchant cash advance, equipment financing, working capital loans, business credit, commercial lending, no red tape funding"
        canonical="/"
      />
      <EnhancedSchema type="homepage" />
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
        <WhyChooseFundTekSection />
        <TestimonialsSection />
        <TrustSignalsSection />
        <MoveBusinessForwardSection />
        <BusinessSolutionsSection />
        <PremiumFinancingSection />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}