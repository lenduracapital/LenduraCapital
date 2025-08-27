import Header from "@/components/header";
import Footer from "@/components/footer";
import SEOHead from "@/components/seo-head";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <SEOHead 
        title="Terms & Conditions - Lendura Capital"
        description="Terms and conditions for Lendura Capital business funding services. Review our policies and procedures."
        canonical="/terms"
      />
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 md:pt-32 lg:pt-40 pb-12" style={{ backgroundColor: '#193a59' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-6">
              Terms & Conditions
            </h1>
            <p className="text-xl text-white max-w-3xl mx-auto">
              Please review our terms and conditions for using Lendura Capital services.
            </p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">Last updated: June 2025</p>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 mb-6">
              By accessing or using Lendura Capital's services, you agree to be bound by these Terms of Service. Lendura Capital operates as a business funding broker, connecting qualified businesses with independent lending partners.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Services Provided</h2>
            <p className="text-gray-700 mb-6">
              We provide business funding consultation, application support, and lender matchmaking. Lendura Capital does not directly lend capital; instead, we facilitate access to funding options through our network of lending partners.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Broker Relationship</h2>
            <p className="text-gray-700 mb-6">
              Lendura Capital is an independent broker, not affiliated with any specific lender. We work to present multiple funding options when possible. Final lending decisions—including terms, amounts, and approvals—are made solely by the lenders.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Application Process</h2>
            <p className="text-gray-700 mb-6">
              Submitting an application through our platform does not guarantee approval or funding. Each lending partner applies its own underwriting criteria. We strive to match your profile with appropriate lenders but cannot guarantee specific offers or outcomes.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Client Responsibilities</h2>
            <p className="text-gray-700 mb-6">
              You are responsible for ensuring that all information provided to Lendura Capital is truthful, complete, and accurate. Providing false, misleading, or incomplete information may result in denial of funding and/or termination of service. We reserve the right to verify any information submitted.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Compensation</h2>
            <p className="text-gray-700 mb-6">
              Lendura Capital may receive compensation from lending partners upon successful referral or funding. This compensation does not impact the terms or cost of your funding. Any fees payable directly by you will be disclosed in advance and require your consent.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Confidentiality & Data Use</h2>
            <p className="text-gray-700 mb-6">
              We treat all client information as confidential. Your data will only be shared with potential funding partners for the purpose of evaluating and securing financing. We do not sell or disclose your information for marketing purposes without explicit permission.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Limitation of Liability</h2>
            <p className="text-gray-700 mb-6">
              Lendura Capital provides brokerage and referral services only. We are not responsible for lending decisions, funding timelines, or final terms. Our liability is strictly limited to services directly rendered by us, and we make no guarantees regarding outcomes.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Updates to Terms</h2>
            <p className="text-gray-700 mb-6">
              These Terms of Service may be updated periodically. Continued use of our services constitutes acceptance of the latest version. We will notify users of material changes when feasible.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact</h2>
            <p className="text-gray-700 mb-6">
              For any questions or concerns about these terms or our services, please contact us at (305) 834-7168 or via our website contact form.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}