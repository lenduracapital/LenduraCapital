import { Button } from "@/components/ui/button";
import { ArrowLeft, Star } from "lucide-react";
import { useLocation } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function CreditServicesDetail() {
  const [, setLocation] = useLocation();

  const handleBackToSolutions = () => {
    setLocation("/solutions");
  };

  const handleApplyNow = () => {
    window.open("https://form.jotform.com/251417715331047", "_blank");
  };

  const handleMoreTestimonials = () => {
    setLocation("/testimonials");
  };

  return (
    <div className="min-h-screen bg-[--bg-primary] text-[--text-primary]">
      <Header />
      
      {/* Breadcrumb Navigation */}
      <section className="pt-24 pb-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
            <a href="/" className="hover:text-[--primary]">Home</a>
            <span>›</span>
            <button onClick={handleBackToSolutions} className="hover:text-[--primary]">Solutions</button>
            <span>›</span>
            <span className="text-gray-900 font-medium">Credit Services</span>
          </nav>
          <Button 
            onClick={handleBackToSolutions}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Solutions</span>
          </Button>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-[--primary] to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Credit Services
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Improve your business credit profile with our comprehensive credit building and repair services.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                What are Credit Services?
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Our business credit services help you establish, build, and maintain strong business credit profiles. Good business credit opens doors to better financing options, higher credit limits, and more favorable terms for your business growth.
              </p>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Credit Services Include</h3>
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-4" style={{ backgroundColor: '#85abe4' }}>
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Credit Profile Analysis</h4>
                    <p className="text-gray-600">Complete review of your current business credit status</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-4" style={{ backgroundColor: '#85abe4' }}>
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Credit Building Strategy</h4>
                    <p className="text-gray-600">Custom plan to establish and improve credit scores</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-4" style={{ backgroundColor: '#85abe4' }}>
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Credit Monitoring</h4>
                    <p className="text-gray-600">Ongoing monitoring and reporting services</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-4" style={{ backgroundColor: '#85abe4' }}>
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Credit Repair</h4>
                    <p className="text-gray-600">Dispute inaccuracies and negative items</p>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">Key Benefits</h3>
              <ul className="space-y-3 mb-8">
                {[
                  "Access to better financing options",
                  "Higher credit limits and lower rates",
                  "Separate business and personal credit",
                  "Improved vendor relationships",
                  "Enhanced business credibility",
                  "Protection from identity theft"
                ].map((benefit, index) => (
                  <li key={index} className="flex items-center">
                    <div className="w-2 h-2 rounded-full mr-4" style={{ backgroundColor: '#85abe4' }}></div>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="text-xl font-bold text-gray-900 mb-3">Credit Score Impact</h4>
                <p className="text-gray-700 mb-2">Average credit score improvement: 50-100 points</p>
                <p className="text-gray-700 mb-2">Timeline: 3-6 months for significant results</p>
                <p className="text-green-600 font-semibold">Better credit = Better financing terms</p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Improve Your Business Credit</h3>
                <p className="text-gray-600 mb-6">
                  Take control of your business credit profile. Our credit specialists will help you build strong business credit for better financing opportunities.
                </p>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded border-l-4" style={{ borderLeftColor: '#85abe4' }}>
                    <p className="text-sm text-gray-600">Credit specialist:</p>
                    <p className="text-2xl font-bold text-gray-900">(305) 307-4658</p>
                  </div>
                  <Button 
                    onClick={handleApplyNow}
                    style={{ backgroundColor: '#85abe4' }}
                    className="w-full text-white py-3 rounded font-semibold text-lg hover:opacity-90"
                  >
                    Get Credit Services
                  </Button>
                </div>
              </div>

              <div className="bg-gray-900 p-8 rounded-lg">
                <h4 className="text-xl font-bold text-white mb-4">Service Packages</h4>
                <div className="space-y-4">
                  <div className="bg-gray-800 p-4 rounded">
                    <h5 className="text-white font-semibold mb-2">Credit Monitoring</h5>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Monthly credit reports</li>
                      <li>• Alert notifications</li>
                      <li>• Score tracking</li>
                    </ul>
                  </div>
                  <div className="bg-gray-800 p-4 rounded">
                    <h5 className="text-white font-semibold mb-2">Credit Building</h5>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Trade line establishment</li>
                      <li>• Payment history optimization</li>
                      <li>• Credit utilization management</li>
                    </ul>
                  </div>
                  <div className="bg-gray-800 p-4 rounded">
                    <h5 className="text-white font-semibold mb-2">Credit Repair</h5>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Dispute management</li>
                      <li>• Negative item removal</li>
                      <li>• Legal compliance</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-white">
              <h2 className="text-2xl font-bold mb-4">
                What our clients are saying about our solutions
              </h2>
              <p className="text-gray-300 mb-8">
                Our Financial Solutions and Business Services support our clients as they stay competitive and grow to keep our nation's economy alive.
              </p>
              
              <div className="bg-gray-800 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    R
                  </div>
                  <div>
                    <p className="text-white font-semibold">Robert Martinez</p>
                    <p className="text-gray-400 text-sm">Construction Company Owner</p>
                    <div className="flex text-yellow-400">
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 italic">
                  "FundTek's credit services helped us improve our business credit score by 80 points in just 4 months. Now we qualify for better financing terms and higher credit limits. Excellent service and results."
                </p>
              </div>

              <div className="mt-6">
                <Button 
                  onClick={handleMoreTestimonials}
                  variant="outline"
                  className="text-white border-white hover:bg-white hover:text-gray-900"
                >
                  More Testimonials →
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop" 
                alt="Business credit analysis" 
                className="w-full h-80 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}