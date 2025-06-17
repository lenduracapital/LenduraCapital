import { Button } from "@/components/ui/button";
import { ArrowLeft, Star } from "lucide-react";
import { useLocation } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function SBALoansDetail() {
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
            <span className="text-gray-900 font-medium">SBA Loans</span>
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
            SBA Loans
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Government-backed loans offering favorable terms and lower down payments for qualifying small businesses.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                What are SBA Loans?
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Small Business Administration (SBA) loans are government-backed financing solutions designed to help small businesses access capital with favorable terms. The SBA guarantees a portion of the loan, reducing risk for lenders and enabling them to offer better rates and terms to borrowers.
              </p>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h3>
              <ul className="space-y-3 mb-8">
                {[
                  "Up to $5M funding available",
                  "Lower down payments required",
                  "Longer repayment terms (up to 25 years)",
                  "Competitive interest rates",
                  "Government guarantee backing",
                  "Flexible use of funds"
                ].map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <div className="w-2 h-2 rounded-full mr-4" style={{ backgroundColor: '#85abe4' }}></div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">SBA Loan Types:</h3>
              <div className="space-y-4 mb-8">
                <div className="border-l-4 pl-4" style={{ borderLeftColor: '#85abe4' }}>
                  <h4 className="font-semibold text-gray-900">SBA 7(a) Loans</h4>
                  <p className="text-gray-600">Most common SBA loan for working capital, equipment, and real estate</p>
                </div>
                <div className="border-l-4 pl-4" style={{ borderLeftColor: '#85abe4' }}>
                  <h4 className="font-semibold text-gray-900">SBA 504 Loans</h4>
                  <p className="text-gray-600">Fixed-rate financing for real estate and equipment purchases</p>
                </div>
                <div className="border-l-4 pl-4" style={{ borderLeftColor: '#85abe4' }}>
                  <h4 className="font-semibold text-gray-900">SBA Microloans</h4>
                  <p className="text-gray-600">Smaller loans up to $50,000 for startups and growing businesses</p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Apply for SBA Financing</h3>
                <p className="text-gray-600 mb-6">
                  Our SBA specialists will guide you through the application process and help you secure the best terms available.
                </p>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded border-l-4" style={{ borderLeftColor: '#85abe4' }}>
                    <p className="text-sm text-gray-600">Speak with an SBA specialist:</p>
                    <p className="text-2xl font-bold text-gray-900">(305) 307-4658</p>
                  </div>
                  <Button 
                    onClick={handleApplyNow}
                    style={{ backgroundColor: '#85abe4' }}
                    className="w-full text-white py-3 rounded font-semibold text-lg hover:opacity-90"
                  >
                    Start SBA Application
                  </Button>
                </div>
              </div>

              <div className="bg-gray-900 p-8 rounded-lg">
                <h4 className="text-xl font-bold text-white mb-4">SBA Qualification Requirements</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• Minimum 2 years in business</li>
                  <li>• Strong personal and business credit</li>
                  <li>• Detailed business plan required</li>
                  <li>• Owner investment of 10-15%</li>
                  <li>• Meet SBA size standards</li>
                </ul>
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
                    <p className="text-white font-semibold">Robert Thompson</p>
                    <p className="text-gray-400 text-sm">Retail Business Owner</p>
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
                  "FundTek helped us navigate the SBA loan process seamlessly. The favorable terms allowed us to expand our retail locations with minimal down payment. Their expertise made all the difference."
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
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop" 
                alt="Retail business" 
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