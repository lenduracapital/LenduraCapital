import { Button } from "@/components/ui/button";
import { ArrowLeft, Star } from "lucide-react";
import { useLocation } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function POFinancingDetail() {
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
            <span className="text-gray-900 font-medium">P.O. Financing</span>
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
            Purchase Order Financing
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Fulfill large orders with purchase order funding to bridge the gap between order and payment.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                What is Purchase Order Financing?
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Purchase Order (P.O.) financing provides the working capital you need to fulfill confirmed purchase orders from creditworthy customers. This solution is perfect for businesses that have large orders but lack the funds to purchase inventory, pay suppliers, or cover production costs upfront.
              </p>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">How It Works</h3>
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-4" style={{ backgroundColor: '#85abe4' }}>
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Submit P.O.</h4>
                    <p className="text-gray-600">Provide confirmed purchase order from creditworthy customer</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-4" style={{ backgroundColor: '#85abe4' }}>
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Get Funding</h4>
                    <p className="text-gray-600">Receive funds to pay suppliers and fulfill the order</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-4" style={{ backgroundColor: '#85abe4' }}>
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Fulfill Order</h4>
                    <p className="text-gray-600">Complete production and deliver to your customer</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-4" style={{ backgroundColor: '#85abe4' }}>
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Get Paid</h4>
                    <p className="text-gray-600">Customer pays, financing is repaid, you keep profit</p>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">Key Benefits</h3>
              <ul className="space-y-3 mb-8">
                {[
                  "Fund large orders without depleting cash",
                  "Quick approval process",
                  "Competitive rates",
                  "No collateral required",
                  "Maintain customer relationships",
                  "Scale your business capacity"
                ].map((benefit, index) => (
                  <li key={index} className="flex items-center">
                    <div className="w-2 h-2 rounded-full mr-4" style={{ backgroundColor: '#85abe4' }}></div>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ideal For:</h3>
              <ul className="space-y-2 mb-8">
                {[
                  "Manufacturers with large orders",
                  "Distributors and wholesalers",
                  "Importers and exporters",
                  "Government contractors",
                  "Seasonal businesses",
                  "Growing companies"
                ].map((use, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <span className="mr-2">•</span>
                    {use}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-8">
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Finance Your Next Big Order</h3>
                <p className="text-gray-600 mb-6">
                  Don't miss out on large opportunities due to cash flow constraints. Our P.O. financing specialists will help you fulfill any order.
                </p>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded border-l-4" style={{ borderLeftColor: '#85abe4' }}>
                    <p className="text-sm text-gray-600">P.O. financing specialist:</p>
                    <p className="text-2xl font-bold text-gray-900">(305) 307-4658</p>
                  </div>
                  <Button 
                    onClick={handleApplyNow}
                    style={{ backgroundColor: '#85abe4' }}
                    className="w-full text-white py-3 rounded font-semibold text-lg hover:opacity-90"
                  >
                    Apply for P.O. Financing
                  </Button>
                </div>
              </div>

              <div className="bg-gray-900 p-8 rounded-lg">
                <h4 className="text-xl font-bold text-white mb-4">Qualification Requirements</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• Confirmed purchase order</li>
                  <li>• Creditworthy end customer</li>
                  <li>• Gross margin of 20%+</li>
                  <li>• Reliable supplier relationships</li>
                </ul>
                
                <div className="mt-6 p-4 bg-gray-800 rounded">
                  <h5 className="text-white font-semibold mb-2">Typical Funding Range</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• $10,000 - $10,000,000</li>
                    <li>• Up to 90% of P.O. value</li>
                    <li>• 30-120 day terms</li>
                    <li>• Fast approval decisions</li>
                  </ul>
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
                    M
                  </div>
                  <div>
                    <p className="text-white font-semibold">Michael Thompson</p>
                    <p className="text-gray-400 text-sm">Manufacturing Company Owner</p>
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
                  "FundTek's P.O. financing allowed us to accept a $500,000 order we couldn't have fulfilled otherwise. The funding came through quickly and we were able to deliver on time. This opened doors to even bigger opportunities."
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
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop" 
                alt="Warehouse operations" 
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