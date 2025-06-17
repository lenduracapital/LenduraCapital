import { Button } from "@/components/ui/button";
import { ArrowLeft, Star } from "lucide-react";
import { useLocation } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function EquipmentFinancingDetail() {
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
            <span className="text-gray-900 font-medium">Equipment Financing</span>
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
            Equipment Financing
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Acquire essential business equipment with the equipment itself serving as collateral for the loan.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                What is Equipment Financing?
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Equipment financing allows businesses to purchase or lease essential equipment without depleting cash reserves. The equipment itself serves as collateral, making it easier to qualify and often resulting in better terms than unsecured loans.
              </p>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h3>
              <ul className="space-y-3 mb-8">
                {[
                  "Up to 100% financing available",
                  "Equipment serves as collateral",
                  "2-7 year repayment terms",
                  "Competitive interest rates",
                  "Preserve working capital",
                  "Tax benefits available"
                ].map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <div className="w-2 h-2 rounded-full mr-4" style={{ backgroundColor: '#85abe4' }}></div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">Equipment Types We Finance:</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {[
                  "Manufacturing equipment",
                  "Construction machinery",
                  "Medical equipment",
                  "Restaurant equipment",
                  "Technology hardware",
                  "Transportation vehicles",
                  "Agricultural equipment",
                  "Office equipment"
                ].map((type, index) => (
                  <div key={index} className="flex items-center text-gray-600">
                    <span className="mr-2">•</span>
                    {type}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Finance Your Equipment Today</h3>
                <p className="text-gray-600 mb-6">
                  Get the equipment your business needs without the upfront costs. Our specialists will help you find the perfect financing solution.
                </p>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded border-l-4" style={{ borderLeftColor: '#85abe4' }}>
                    <p className="text-sm text-gray-600">Equipment financing specialist:</p>
                    <p className="text-2xl font-bold text-gray-900">(305) 307-4658</p>
                  </div>
                  <Button 
                    onClick={handleApplyNow}
                    style={{ backgroundColor: '#85abe4' }}
                    className="w-full text-white py-3 rounded font-semibold text-lg hover:opacity-90"
                  >
                    Apply for Equipment Financing
                  </Button>
                </div>
              </div>

              <div className="bg-gray-900 p-8 rounded-lg">
                <h4 className="text-xl font-bold text-white mb-4">Qualification Requirements</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• Minimum 2 years in business</li>
                  <li>• $200,000+ annual revenue</li>
                  <li>• Personal credit score 650+</li>
                  <li>• Equipment quote/invoice required</li>
                </ul>
                
                <div className="mt-6 p-4 bg-gray-800 rounded">
                  <h5 className="text-white font-semibold mb-2">Benefits vs. Traditional Loans</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Lower down payments</li>
                    <li>• Faster approval process</li>
                    <li>• Equipment as collateral reduces risk</li>
                    <li>• Potential tax advantages</li>
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
                    L
                  </div>
                  <div>
                    <p className="text-white font-semibold">Lisa Rodriguez</p>
                    <p className="text-gray-400 text-sm">Bakery Owner</p>
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
                  "FundTek's equipment financing helped us upgrade our ovens and expand our bakery capacity. The process was smooth and we were able to increase our daily production by 200%. Our customers love the new offerings!"
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
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop" 
                alt="Commercial kitchen equipment" 
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