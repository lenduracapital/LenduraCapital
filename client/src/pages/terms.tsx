import Header from "@/components/header";
import Footer from "@/components/footer";
import SEOHead from "@/components/seo-head";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <SEOHead 
        title="Terms & Conditions - FundTek Capital Group"
        description="Terms and conditions for FundTek Capital Group business funding services. Review our policies and procedures."
        canonical="/terms"
      />
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 md:pt-32 lg:pt-40 pb-12" style={{ backgroundColor: '#85abe4' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-6">
              Terms & Conditions
            </h1>
            <p className="text-xl text-white max-w-3xl mx-auto">
              Please review our terms and conditions for using FundTek Capital Group services.
            </p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">Last updated: May 2025</p>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
            <p className="text-gray-700 mb-6">
              By accessing and using FundTek Capital Group services, you accept and agree to be bound by the terms and provision of this agreement. FundTek Capital Group is a business funding broker that connects qualified businesses with lending partners.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Services Provided</h2>
            <p className="text-gray-700 mb-6">
              FundTek Capital Group acts as a broker to help businesses find suitable funding solutions. We do not directly lend money but connect clients with our network of lending partners. Our services include consultation, application assistance, and ongoing support throughout the funding process.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Broker Relationship</h2>
            <p className="text-gray-700 mb-6">
              FundTek Capital Group operates as an independent broker. We are not affiliated with any single lender and work to present multiple funding options when available. All final lending decisions are made by the respective lending partners, not by FundTek Capital Group.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Application Process</h2>
            <p className="text-gray-700 mb-6">
              Submitting an application through our services does not guarantee approval or funding. Applications are subject to review by lending partners who make independent decisions based on their own criteria. We strive to present applications to suitable lenders but cannot guarantee specific outcomes.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Information Accuracy</h2>
            <p className="text-gray-700 mb-6">
              Clients are responsible for providing accurate and complete information in all applications and communications. False or misleading information may result in application denial and termination of services. FundTek Capital Group reserves the right to verify information provided.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Fees and Compensation</h2>
            <p className="text-gray-700 mb-6">
              FundTek Capital Group may receive compensation from lending partners for successful referrals. This compensation does not affect the terms offered to clients. Any direct fees charged to clients will be clearly disclosed before services are provided.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Confidentiality</h2>
            <p className="text-gray-700 mb-6">
              We maintain strict confidentiality of all client information. Information is only shared with potential lending partners with client consent and for the purpose of securing funding. We do not sell or share client information for marketing purposes without explicit permission.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Limitation of Liability</h2>
            <p className="text-gray-700 mb-6">
              FundTek Capital Group provides brokerage services and cannot be held liable for lending decisions made by our partners. We make no guarantees regarding funding approval, terms, or timeline. Our liability is limited to the direct services we provide as a broker.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Modifications</h2>
            <p className="text-gray-700 mb-6">
              These terms may be updated periodically. Continued use of our services after changes constitutes acceptance of modified terms. We will notify clients of significant changes when possible.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Information</h2>
            <p className="text-gray-700 mb-6">
              For questions about these terms or our services, please contact us at (305) 307-4658 or through our contact form.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}