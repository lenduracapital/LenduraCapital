import Header from "@/components/header";
import Footer from "@/components/footer";
import SEOHead from "@/components/seo-head";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <SEOHead 
        title="Privacy Policy - FundTek Capital Group"
        description="Privacy policy for FundTek Capital Group. Learn how we protect and handle your personal and business information."
        canonical="/privacy"
      />
      <Header transparent={false} />
      
      {/* Hero Section */}
      <section className="pt-24 md:pt-32 lg:pt-40 pb-12" style={{ backgroundColor: '#85abe4' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-white max-w-3xl mx-auto">
              Your privacy is important to us. Learn how we collect, use, and protect your information.
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">Last updated: December 2024</p>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
            <p className="text-gray-700 mb-4">We collect information you provide directly to us, including:</p>
            <ul className="text-gray-700 mb-6 list-disc pl-6">
              <li>Business and personal contact information</li>
              <li>Financial information required for funding applications</li>
              <li>Business documentation and tax records</li>
              <li>Communication records and preferences</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-700 mb-4">We use the information we collect to:</p>
            <ul className="text-gray-700 mb-6 list-disc pl-6">
              <li>Process funding applications and connect you with suitable lenders</li>
              <li>Provide customer service and support</li>
              <li>Communicate about your applications and our services</li>
              <li>Comply with legal and regulatory requirements</li>
              <li>Improve our services and user experience</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Information Sharing</h2>
            <p className="text-gray-700 mb-6">
              We share your information only with your consent and for legitimate business purposes. This includes sharing with lending partners to process your funding applications, service providers who assist our operations, and as required by law. We do not sell your personal information to third parties.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
            <p className="text-gray-700 mb-6">
              We implement appropriate technical and organizational measures to protect your information against unauthorized access, alteration, disclosure, or destruction. This includes secure data transmission, encrypted storage, and restricted access to personal information.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Retention</h2>
            <p className="text-gray-700 mb-6">
              We retain your information for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements. Financial information may be retained longer due to regulatory requirements.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights and Choices</h2>
            <p className="text-gray-700 mb-4">You have the right to:</p>
            <ul className="text-gray-700 mb-6 list-disc pl-6">
              <li>Access and review your personal information</li>
              <li>Request corrections to inaccurate information</li>
              <li>Opt out of marketing communications</li>
              <li>Request deletion of your information (subject to legal requirements)</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cookies and Tracking</h2>
            <p className="text-gray-700 mb-6">
              Our website uses cookies and similar technologies to improve functionality, analyze usage, and provide personalized experiences. You can control cookie settings through your browser preferences.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Third-Party Services</h2>
            <p className="text-gray-700 mb-6">
              Our website may contain links to third-party services. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies before providing any information.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Children's Privacy</h2>
            <p className="text-gray-700 mb-6">
              Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from children under 18.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to This Policy</h2>
            <p className="text-gray-700 mb-6">
              We may update this privacy policy periodically. We will notify you of significant changes by posting the updated policy on our website or through direct communication.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Us</h2>
            <p className="text-gray-700 mb-6">
              If you have questions about this privacy policy or our data practices, please contact us at (305) 307-4658 or through our contact form. We are committed to addressing your privacy concerns promptly.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}