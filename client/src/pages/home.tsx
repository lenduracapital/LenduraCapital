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
import EnhancedSchema from "@/components/enhanced-schema";
import ConversionTracking from "@/components/conversion-tracking";
import PerformanceMonitor from "@/components/performance-monitor";

import { AdvancedSchemaMarkup } from "@/components/advanced-schema";

export default function Home() {
  return (
    <div className="min-h-screen bg-[--bg-primary] text-[--text-primary]">
      <SEOHead 
        title="FundTek Capital Group - Business Funding Solutions"
        description="Get flexible business financing with FundTek Capital Group. Term loans, merchant cash advances, equipment financing & more. Call (305) 307-4658 for fast approval."
        keywords="business funding, term loans, merchant cash advance, equipment financing, SBA loans, business capital, commercial lending"
        canonical="/"
      />
      <Analytics />
      <SkipNavigation />
      <EnhancedSchema 
        pageType="homepage" 
        faqData={[
          {
            question: "How quickly can I get approved for business funding?",
            answer: "Most applications receive approval decisions within 24 hours. Once approved, funding can be available as quickly as the same business day for qualified applicants."
          },
          {
            question: "What credit score do I need for business financing?",
            answer: "We work with businesses across all credit ranges. While higher credit scores may qualify for better terms, we have solutions available for businesses with credit scores as low as 500."
          },
          {
            question: "How much funding can my business qualify for?",
            answer: "Funding amounts range from $5,000 to $5,000,000 depending on your business revenue, time in business, and specific financing needs. Our specialists will help determine the optimal amount for your situation."
          },
          {
            question: "What documents do I need to apply?",
            answer: "Typically you'll need 3-6 months of bank statements, a driver's license, and a voided business check. Additional documents may be required based on the specific funding product."
          }
        ]}
      />
      <ConversionTracking 
        eventType="page_view" 
        eventData={{ page_title: "FundTek Capital Group - Business Funding Solutions" }} 
      />
      <PerformanceMonitor />

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
