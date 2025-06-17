import { Button } from "@/components/ui/button";
import { ArrowLeft, Star } from "lucide-react";
import { useLocation } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function InvoiceFactoringDetail() {
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
            <span className="text-gray-900 font-medium">Invoice Factoring</span>
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
            Invoice Factoring
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Convert outstanding invoices into immediate cash flow by selling them at a discount to improve liquidity.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                What is Invoice Factoring?
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Invoice factoring is a financial solution that allows businesses to sell their outstanding invoices to a factoring company for immediate cash. Instead of waiting 30-90 days for customers to pay, you receive funds within 24-48 hours, improving your cash flow and allowing you to focus on growing your business.
              </p>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">How It Works</h3>
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-4" style={{ backgroundColor: '#85abe4' }}>
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Submit Invoices</h4>
                    <p className="text-gray-600">Send us your outstanding customer invoices</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-4" style={{ backgroundColor: '#85abe4' }}>
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Get Immediate Cash</h4>
                    <p className="text-gray-600">Receive 80-90% of invoice value within 24-48 hours</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-4" style={{ backgroundColor: '#85abe4' }}>
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Customer Pays</h4>
                    <p className="text-gray-600">Your customer pays the factoring company directly</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-4" style={{ backgroundColor: '#85abe4' }}>
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Receive Balance</h4>
                    <p className="text-gray-600">Get remaining balance minus factoring fee</p>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">Key Benefits</h3>
              <ul className="space-y-3 mb-8">
                {[
                  "80-90% advance rate on invoices",
                  "24-48 hour funding",
                  "No long-term commitment",
                  "Improved cash flow",
                  "No collateral required",
                  "Credit protection services"
                ].map((benefit, index) => (
                  <li key={index} className="flex items-center">
                    <div className="w-2 h-2 rounded-full mr-4" style={{ backgroundColor: '#85abe4' }}></div>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-8">
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Start Factoring Today</h3>
                <p className="text-gray-600 mb-6">
                  Turn your outstanding invoices into immediate working capital. Our factoring specialists will help you improve your cash flow.
                </p>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded border-l-4" style={{ borderLeftColor: '#85abe4' }}>
                    <p className="text-sm text-gray-600">Factoring specialist:</p>
                    <p className="text-2xl font-bold text-gray-900">(305) 307-4658</p>
                  </div>
                  <Button 
                    onClick={handleApplyNow}
                    style={{ backgroundColor: '#85abe4' }}
                    className="w-full text-white py-3 rounded font-semibold text-lg hover:opacity-90"
                  >
                    Apply for Invoice Factoring
                  </Button>
                </div>
              </div>

              <div className="bg-gray-900 p-8 rounded-lg">
                <h4 className="text-xl font-bold text-white mb-4">Qualification Requirements</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• B2B invoices (not consumer)</li>
                  <li>• Net 30-90 day payment terms</li>
                  <li>• Creditworthy customers</li>
                  <li>• $10,000+ monthly invoice volume</li>
                </ul>
                
                <div className="mt-6 p-4 bg-gray-800 rounded">
                  <h5 className="text-white font-semibold mb-2">Industries We Serve</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Transportation & Logistics</li>
                    <li>• Manufacturing</li>
                    <li>• Staffing & Consulting</li>
                    <li>• Healthcare Services</li>
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
                    S
                  </div>
                  <div>
                    <p className="text-white font-semibold">Sarah Johnson</p>
                    <p className="text-gray-400 text-sm">Medical Practice Owner</p>
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
                  "FundTek understood our unique needs as a medical practice. The invoice factoring solution helped us maintain steady cash flow while waiting for insurance payments. Highly professional service."
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
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop" 
                alt="Medical practice" 
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