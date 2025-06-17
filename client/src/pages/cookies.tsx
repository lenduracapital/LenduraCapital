import Header from "@/components/header";
import Footer from "@/components/footer";
import SEOHead from "@/components/seo-head";

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-white">
      <SEOHead 
        title="Cookies Policy - FundTek Capital Group"
        description="Learn about how FundTek Capital Group uses cookies to improve your browsing experience and website functionality."
        canonical="/cookies"
      />
      <Header transparent={false} />
      
      {/* Hero Section */}
      <section className="pt-24 md:pt-32 lg:pt-40 pb-12" style={{ backgroundColor: '#85abe4' }}>
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
            <p className="text-gray-600 mb-8">Last updated: December 2024</p>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. What Are Cookies</h2>
            <p className="text-gray-700 mb-6">
              Cookies are small text files that are placed on your computer or mobile device when you visit our website. They are widely used to make websites work more efficiently and provide information to website owners about how users interact with their sites.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Cookies</h2>
            <p className="text-gray-700 mb-4">FundTek Capital Group uses cookies for several purposes:</p>
            <ul className="text-gray-700 mb-6 list-disc pl-6">
              <li><strong>Essential Cookies:</strong> Required for basic website functionality and security</li>
              <li><strong>Performance Cookies:</strong> Help us understand how visitors use our website</li>
              <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
              <li><strong>Analytics Cookies:</strong> Provide insights into website performance and user behavior</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Types of Cookies We Use</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Essential Cookies</h3>
            <p className="text-gray-700 mb-4">
              These cookies are necessary for the website to function properly. They include session cookies for form submissions, security cookies to prevent fraud, and accessibility cookies to support users with disabilities.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Performance and Analytics Cookies</h3>
            <p className="text-gray-700 mb-4">
              We use Google Analytics and similar services to understand how visitors interact with our website. These cookies collect information about page views, time spent on pages, and user navigation patterns. This data is anonymized and helps us improve our website experience.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Functional Cookies</h3>
            <p className="text-gray-700 mb-6">
              These cookies remember your preferences, such as language settings, form data you've entered, and other customization options to enhance your user experience.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Third-Party Cookies</h2>
            <p className="text-gray-700 mb-4">Our website may include content from third-party services that set their own cookies:</p>
            <ul className="text-gray-700 mb-6 list-disc pl-6">
              <li><strong>Google Analytics:</strong> For website analytics and performance monitoring</li>
              <li><strong>Jotform:</strong> For embedded contact and application forms</li>
              <li><strong>Social Media:</strong> For social media sharing and integration features</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Cookie Duration</h2>
            <p className="text-gray-700 mb-4">We use both session and persistent cookies:</p>
            <ul className="text-gray-700 mb-6 list-disc pl-6">
              <li><strong>Session Cookies:</strong> Automatically deleted when you close your browser</li>
              <li><strong>Persistent Cookies:</strong> Remain on your device for a set period or until manually deleted</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Managing Your Cookie Preferences</h2>
            <p className="text-gray-700 mb-4">You can control cookies through your browser settings:</p>
            <ul className="text-gray-700 mb-6 list-disc pl-6">
              <li>Block all cookies by adjusting browser privacy settings</li>
              <li>Delete existing cookies from your browser</li>
              <li>Set your browser to notify you when cookies are being sent</li>
              <li>Choose to accept cookies only from trusted sites</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Impact of Disabling Cookies</h2>
            <p className="text-gray-700 mb-6">
              While you can disable cookies, please note that some features of our website may not function properly. Essential cookies are required for basic functionality, and disabling analytics cookies will limit our ability to improve your experience.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Browser Cookie Settings</h2>
            <p className="text-gray-700 mb-4">Instructions for managing cookies in popular browsers:</p>
            <ul className="text-gray-700 mb-6 list-disc pl-6">
              <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies and other site data</li>
              <li><strong>Firefox:</strong> Preferences → Privacy & Security → Cookies and Site Data</li>
              <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
              <li><strong>Edge:</strong> Settings → Cookies and site permissions</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Data Protection</h2>
            <p className="text-gray-700 mb-6">
              All cookie data is handled in accordance with our Privacy Policy and applicable data protection regulations. We implement appropriate security measures to protect cookie information from unauthorized access or misuse.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Updates to This Policy</h2>
            <p className="text-gray-700 mb-6">
              We may update this Cookies Policy periodically to reflect changes in our practices or applicable laws. We will notify you of significant changes by posting the updated policy on our website.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Information</h2>
            <p className="text-gray-700 mb-6">
              If you have questions about our use of cookies or this policy, please contact us at (305) 307-4658 or through our contact form. We're committed to transparency about our data practices.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}