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
        title="Small Business Loans & Funding | Fast Approval in 24 Hours | Miami, FL"
        description="Get business loans approved in 24 hours. SBA loans, term loans, equipment financing, working capital & merchant cash advances. Bad credit OK. Miami-based lender serving nationwide. Call (305) 307-4658."
        keywords="small business loans, business funding, term loans, SBA loans, merchant cash advance, equipment financing, working capital loans, business credit, commercial lending, Miami business loans, bad credit business loans"
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