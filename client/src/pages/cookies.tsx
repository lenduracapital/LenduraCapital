import Header from "@/components/header";
import Footer from "@/components/footer";
import SEOHead from "@/components/seo-head";

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-white">
      <SEOHead 
        title="Cookies Policy - Lendura Capital"
        description="Learn about how Lendura Capital uses cookies to improve your browsing experience and website functionality."
        canonical="/cookies"
      />
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 md:pt-32 lg:pt-40 pb-12" style={{ backgroundColor: '#2563eb' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-6">
              Cookies Policy
            </h1>
            <p className="text-xl text-white max-w-3xl mx-auto">
              Learn how we use cookies to enhance your experience on our website.
            </p>
          </div>
        </div>
      </section>

      {/* Cookies Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">Last updated: June 2025</p>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. What Are Cookies</h2>
            <p className="text-gray-700 mb-6">
              Cookies are small text files stored on your device when you visit a website. They help the site function properly, improve load speed, and track how users interact with the site.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Cookies</h2>
            <p className="text-gray-700 mb-6">
              We use cookies to:<br/><br/>
              Enable essential website functionality<br/>
              Analyze performance and improve user experience<br/>
              Remember user preferences and form entries<br/>
              Track usage data through analytics tools
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Types of Cookies We Use</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Essential Cookies</h3>
            <p className="text-gray-700 mb-4">
              These are required for the website to operate, including form handling, session management, and fraud prevention.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Performance and Analytics Cookies</h3>
            <p className="text-gray-700 mb-4">
              Used to understand how visitors interact with our site. We use tools like Google Analytics to collect anonymous metrics, including page views, time on site, and navigation patterns.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Functional Cookies</h3>
            <p className="text-gray-700 mb-6">
              These remember your preferences, such as saved form inputs or language settings, to enhance your browsing experience.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Third-Party Cookies</h2>
            <p className="text-gray-700 mb-6">
              Our site may load cookies from trusted third-party services, including:<br/><br/>
              Google Analytics (site analytics)<br/>
              Jotform (form functionality and submissions)<br/>
              Social media platforms (sharing and integration)
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Cookie Duration</h2>
            <p className="text-gray-700 mb-6">
              <strong>Session Cookies</strong> are deleted when you close your browser.<br/><br/>
              <strong>Persistent Cookies</strong> remain on your device for a set period or until manually deleted.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Managing Cookies</h2>
            <p className="text-gray-700 mb-6">
              You can control cookie usage through your browser settings. This includes:<br/><br/>
              Blocking all cookies<br/>
              Deleting existing cookies<br/>
              Allowing cookies from selected sites only<br/>
              Receiving alerts when a website uses cookies<br/><br/>
              Note: Disabling cookies may impact certain features or functionality.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Browser Settings</h2>
            <p className="text-gray-700 mb-6">
              Instructions for managing cookies by browser:<br/><br/>
              <strong>Chrome:</strong> Settings {'->'} Privacy and Security {'->'} Cookies<br/>
              <strong>Firefox:</strong> Preferences {'->'} Privacy & Security {'->'} Cookies and Site Data<br/>
              <strong>Safari:</strong> Preferences {'->'} Privacy {'->'} Manage Website Data<br/>
              <strong>Edge:</strong> Settings {'->'} Site permissions {'->'} Cookies and site data
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Data Protection</h2>
            <p className="text-gray-700 mb-6">
              All cookie-related data is handled in accordance with our Privacy Policy and relevant data protection regulations. We apply appropriate security measures to prevent unauthorized access or misuse.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Policy Updates</h2>
            <p className="text-gray-700 mb-6">
              This Cookie Policy may be updated periodically. Changes will be posted on this page to keep you informed.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact</h2>
            <p className="text-gray-700 mb-6">
              For questions about this policy or your cookie preferences, contact us at (305) 307-4658 or through our website's contact form.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}