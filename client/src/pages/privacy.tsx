import Header from "@/components/header";
import Footer from "@/components/footer";
import SEOHead from "@/components/seo-head";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <SEOHead 
        title="Privacy Policy - Lendura Capital"
        description="Privacy policy for Lendura Capital. Learn how we protect and handle your personal and business information."
        canonical="/privacy"
      />
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 md:pt-32 lg:pt-40 pb-12" style={{ backgroundColor: '#2563eb' }}>
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
            <p className="text-gray-600 mb-8">Last updated: June 2025</p>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
            <p className="text-gray-700 mb-6">
              We collect info you give us directly, including:<br/><br/>
              Contact details (business and personal)<br/>
              Financial data for funding applications<br/>
              Business docs like tax returns, bank statements<br/>
              Communication records and your contact preferences
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use It</h2>
            <p className="text-gray-700 mb-6">
              We use your info to:<br/><br/>
              Match you with funding partners<br/>
              Help with applications and support<br/>
              Communicate updates and services<br/>
              Meet legal/regulatory requirements<br/>
              Improve our service and experience
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Who We Share It With</h2>
            <p className="text-gray-700 mb-6">
              We only share your info:<br/><br/>
              With lenders you're applying to<br/>
              With trusted service providers (CRM, hosting, etc.)<br/>
              When required by law<br/><br/>
              We do not sell your info to third parties — ever.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Keeping Your Info Safe</h2>
            <p className="text-gray-700 mb-6">
              We use secure tech and internal controls to protect your data:<br/><br/>
              Encrypted data transfer<br/>
              Secure storage<br/>
              Limited access to sensitive info
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. How Long We Keep It</h2>
            <p className="text-gray-700 mb-6">
              We hold onto your info as long as needed to:<br/><br/>
              Provide services<br/>
              Stay compliant with the law<br/>
              Resolve disputes if they come up
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights</h2>
            <p className="text-gray-700 mb-6">
              You can:<br/><br/>
              See the info we have on you<br/>
              Ask for corrections<br/>
              Opt out of marketing<br/>
              Request deletion (unless we're legally required to keep it)
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cookies & Tracking</h2>
            <p className="text-gray-700 mb-6">
              Our site uses cookies to:<br/><br/>
              Help it run smoother<br/>
              See how people use it<br/>
              Offer better user experience<br/><br/>
              You can control cookies through your browser settings.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Third-Party Links</h2>
            <p className="text-gray-700 mb-6">
              If we link to other sites, we're not responsible for how they handle your data. Always check their policies too.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Minors</h2>
            <p className="text-gray-700 mb-6">
              Our services are for people 18 and older. We don't knowingly collect data from anyone under 18.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to This Policy</h2>
            <p className="text-gray-700 mb-6">
              If we update anything, we'll post it here. Big changes? We'll try to give you a heads-up.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Us</h2>
            <p className="text-gray-700 mb-6">
              Questions? Hit us up at (305) 307-4658 or through our contact form. We're here to help.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}