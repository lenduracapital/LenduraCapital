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
import PerformanceOptimization from "@/components/performance-optimization";
import EnhancedSEO from "@/components/enhanced-seo";
import AdvancedAnalytics from "@/components/advanced-analytics";
import CriticalCSS from "@/components/critical-css";
import ServiceWorkerRegistration from "@/components/service-worker-registration";
import VideoPerformanceOptimizer from "@/components/video-performance-optimizer";
import AdvancedVideoOptimizer from "@/components/advanced-video-optimizer";
import VideoMetricsTracker from "@/components/video-metrics-tracker";
import { useAnalytics } from "@/hooks/use-analytics-tracking";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black">
      <SEOHead 
        title="Business Funding Solutions Brooklyn NY | 24 Hour Approval | FundTek Capital Group"
        description="Get $10K-$750K business funding approved in 24 hours. Term loans, merchant cash advances, equipment financing & 9 more solutions. Bad credit OK. Apply online or call (305) 307-4658."
        keywords="business funding Brooklyn NY, merchant cash advance near me, 24 hour business loan approval, bad credit business loans, equipment financing, SBA loans Brooklyn, working capital loans, invoice factoring, small business funding NYC, same day business funding"
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
      <PerformanceOptimization />
      <EnhancedSEO pageTitle="FundTek Capital Group - Fast Business Funding Solutions" />
      <AdvancedAnalytics />
      <CriticalCSS />
      <ServiceWorkerRegistration />
      <VideoPerformanceOptimizer />
      <AdvancedVideoOptimizer />
      <VideoMetricsTracker />

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