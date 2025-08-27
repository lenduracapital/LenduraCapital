import Header from "@/components/header";
import Footer from "@/components/footer";
import { Star, CheckCircle, ArrowRight, Users, Shield, Zap, CreditCard } from "lucide-react";
import { useLocation } from "wouter";
import cardProcessingImage from "@assets/pexels-ivan-samkov-7621136 (1)_1752763383710.jpg";

export default function CreditCardProcessing() {
  const [, setLocation] = useLocation();

  const handleContactUs = () => {
    window.open("https://calendly.com/lenduracapital/30min", "_blank");
  };

  const handleBackToSolutions = () => {
    setLocation("/solutions");
    window.scrollTo(0, 0);
  };

  const testimonials = [
    {
      name: "Marc Rivera",
      business: "Rivera's Electronics",
      text: "Switching to FundTek's processing saved us 30% on fees. The mobile reader works perfectly at trade shows and the deposits are lightning fast."
    },
    {
      name: "Ava Chen",
      business: "Garden Fresh Market",
      text: "Our old processor had hidden fees everywhere. FundTek's transparent pricing and same-day funding helped our cash flow tremendously."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-40 md:pt-48 pb-20 md:pb-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${cardProcessingImage})`,
            backgroundPosition: "center 30%"
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-wider">
            Credit Card Processing
          </h1>
          <p className="text-xl md:text-2xl text-white max-w-4xl mx-auto leading-relaxed">
            Accept payments anywhere with competitive rates, fast deposits, and transparent pricing
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Modern Payment Processing for Growing Businesses
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Stop losing sales due to payment limitations. FundTek's credit card processing solutions help businesses accept payments seamlessly across all channels - in-store, online, and mobile - with industry-leading security and competitive rates that grow with your business.
          </p>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Complete Payment Processing Solutions
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <CreditCard className="h-12 w-12 text-[#2563eb] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Multi-Channel Processing</h3>
              <p className="text-gray-600 text-sm">Accept cards in-store, online, mobile, and over the phone with unified reporting</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <Zap className="h-12 w-12 text-[#2563eb] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Fast Funding</h3>
              <p className="text-gray-600 text-sm">Next-day or same-day deposits to keep your cash flow moving</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <Shield className="h-12 w-12 text-[#2563eb] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Secure Transactions</h3>
              <p className="text-gray-600 text-sm">PCI compliant with advanced fraud protection and encryption</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <Users className="h-12 w-12 text-[#2563eb] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-3">24/7 Support</h3>
              <p className="text-gray-600 text-sm">Dedicated customer service team available around the clock</p>
            </div>
          </div>
        </div>
      </section>

      {/* Processing Types Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Payment Processing Options
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Retail Processing</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#2563eb] mr-3 mt-0.5 flex-shrink-0" />
                  <span>Countertop terminals and mobile readers</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#2563eb] mr-3 mt-0.5 flex-shrink-0" />
                  <span>EMV chip and contactless payments</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#2563eb] mr-3 mt-0.5 flex-shrink-0" />
                  <span>Gift card and loyalty programs</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#2563eb] mr-3 mt-0.5 flex-shrink-0" />
                  <span>Inventory management integration</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-4">E-commerce Processing</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#2563eb] mr-3 mt-0.5 flex-shrink-0" />
                  <span>Secure online payment gateway</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#2563eb] mr-3 mt-0.5 flex-shrink-0" />
                  <span>Shopping cart integration</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#2563eb] mr-3 mt-0.5 flex-shrink-0" />
                  <span>Recurring billing capabilities</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#2563eb] mr-3 mt-0.5 flex-shrink-0" />
                  <span>Mobile-optimized checkout</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Mobile Processing</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#2563eb] mr-3 mt-0.5 flex-shrink-0" />
                  <span>Smartphone and tablet readers</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#2563eb] mr-3 mt-0.5 flex-shrink-0" />
                  <span>Accept payments anywhere</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#2563eb] mr-3 mt-0.5 flex-shrink-0" />
                  <span>Real-time transaction monitoring</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#2563eb] mr-3 mt-0.5 flex-shrink-0" />
                  <span>Digital receipt delivery</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How We Compare to Traditional Processors */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            How We Compare to Traditional Processors
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-red-50 p-8 rounded-lg border border-red-200">
              <h3 className="text-xl font-bold text-red-800 mb-6 text-center">Traditional Processors</h3>
              <ul className="space-y-4 text-red-700">
                <li className="flex items-center">
                  <span className="text-red-500 mr-3">✗</span>
                  Complex rate structures with hidden fees
                </li>
                <li className="flex items-center">
                  <span className="text-red-500 mr-3">✗</span>
                  3-5 day deposit times
                </li>
                <li className="flex items-center">
                  <span className="text-red-500 mr-3">✗</span>
                  Equipment lease requirements
                </li>
                <li className="flex items-center">
                  <span className="text-red-500 mr-3">✗</span>
                  Long-term contracts with penalties
                </li>
                <li className="flex items-center">
                  <span className="text-red-500 mr-3">✗</span>
                  Limited customer support
                </li>
              </ul>
            </div>
            <div className="bg-green-50 p-8 rounded-lg border border-green-200">
              <h3 className="text-xl font-bold text-green-800 mb-6 text-center">Lendura Capital</h3>
              <ul className="space-y-4 text-green-700">
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  Transparent flat-rate pricing
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  Same-day or next-day deposits
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  Free equipment programs available
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  Month-to-month, no cancellation fees
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  24/7 dedicated merchant support
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Getting Started is Simple
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#2563eb] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Apply</h3>
              <p className="text-gray-600 text-sm">Submit your business information and processing needs</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#2563eb] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Review</h3>
              <p className="text-gray-600 text-sm">We analyze your requirements and recommend solutions</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#2563eb] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Setup</h3>
              <p className="text-gray-600 text-sm">Equipment installation and staff training provided</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#2563eb] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">4</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Process</h3>
              <p className="text-gray-600 text-sm">Start accepting payments with ongoing support</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#2563eb]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Streamline Your Payment Processing?
          </h2>
          <p className="text-xl text-white mb-8">
            Join thousands of businesses processing payments with confidence
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleContactUs}
              className="bg-white text-[#2563eb] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 transform hover:scale-105 active:scale-95 min-h-[44px] shadow-lg"
            >
              Contact Us
            </button>
            <button 
              onClick={handleBackToSolutions}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#2563eb] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 transform hover:scale-105 active:scale-95 min-h-[44px]"
            >
              Back to Solutions
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}