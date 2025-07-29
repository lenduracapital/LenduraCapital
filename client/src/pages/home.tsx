import Header from "@/components/header";
import HeroSection from "@/components/hero-section-stable";


// TestimonialsSection removed - component cleaned up
import MoveBusinessForwardSection from "@/components/move-business-forward-section";
import BusinessSolutionsSection from "@/components/business-solutions-section";
import TrustSignalsSection from "@/components/trust-signals-section";
import PremiumFinancingSection from "@/components/premium-financing-section";

import Footer from "@/components/footer";
import BackToTop from "@/components/back-to-top";
import SEOHead from "@/components/seo-head";

// Analytics removed - using GA4 directly in HTML

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black">
      <SEOHead 
        title="Business Funding Solutions Brooklyn NY | 24 Hour Approval | FundTek Capital Group"
        description="Get $10K-$750K business funding approved in 24 hours. Term loans, merchant cash advances, equipment financing & 9 more solutions. Bad credit OK. Apply online or call (305) 307-4658."
        keywords="business funding Brooklyn NY, merchant cash advance near me, 24 hour business loan approval, bad credit business loans, equipment financing, SBA loans Brooklyn, working capital loans, invoice factoring, small business funding NYC, same day business funding"
        canonical="/"
      />
      <Header transparent={true} />
      <main id="main-content">
        <HeroSection />
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