import { Button } from "@/components/ui/button";
import { ArrowLeft, Star } from "lucide-react";
import { useLocation } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function DebtConsolidationDetail() {
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
            <span className="text-gray-900 font-medium">Debt Consolidation</span>
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
            Debt Consolidation
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Combine multiple debts into a single payment with potentially lower rates and simplified management.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                What is Debt Consolidation?
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Business debt consolidation combines multiple existing debts into a single new loan, often with better terms, lower interest rates, and simplified monthly payments. This financial strategy can improve cash flow, reduce stress, and help you regain control of your business finances.
              </p>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Key Benefits</h3>
              <ul className="space-y-3 mb-8">
                {[
                  "Simplify payments into one monthly bill",
                  "Potentially lower overall interest rates",
                  "Improve cash flow management",
                  "Reduce monthly payment amounts",
                  "Fixed payment schedule",
                  "Eliminate multiple due dates"
                ].map((benefit, index) => (
                  <li key={index} className="flex items-center">
                    <div className="w-2 h-2 rounded-full mr-4" style={{ backgroundColor: '#85abe4' }}></div>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">Debts We Can Consolidate:</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {[
                  "Credit card debt",
                  "Multiple business loans",
                  "Equipment financing",
                  "Merchant cash advances",
                  "Lines of credit",
                  "Invoice factoring",
                  "SBA loans",
                  "Working capital loans"
                ].map((debt, index) => (
                  <div key={index} className="flex items-center text-gray-600">
                    <span className="mr-2">•</span>
                    {debt}
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="text-xl font-bold text-gray-900 mb-3">Example Savings</h4>
                <p className="text-gray-700 mb-2">Before: 5 payments totaling $8,500/month</p>
                <p className="text-gray-700">After: 1 payment of $6,200/month</p>
                <p className="text-green-600 font-semibold">Monthly Savings: $2,300</p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Consolidate Your Business Debt</h3>
                <p className="text-gray-600 mb-6">
                  Simplify your finances and potentially save money with our debt consolidation solutions. Our specialists will analyze your current debts and find the best consolidation option.
                </p>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded border-l-4" style={{ borderLeftColor: '#85abe4' }}>
                    <p className="text-sm text-gray-600">Debt consolidation specialist:</p>
                    <p className="text-2xl font-bold text-gray-900">(305) 307-4658</p>
                  </div>
                  <Button 
                    onClick={handleApplyNow}
                    style={{ backgroundColor: '#85abe4' }}
                    className="w-full text-white py-3 rounded font-semibold text-lg hover:opacity-90"
                  >
                    Apply for Debt Consolidation
                  </Button>
                </div>
              </div>

              <div className="bg-gray-900 p-8 rounded-lg">
                <h4 className="text-xl font-bold text-white mb-4">Qualification Requirements</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• Multiple existing business debts</li>
                  <li>• Minimum 12 months in business</li>
                  <li>• $15,000+ monthly revenue</li>
                  <li>• Good payment history preferred</li>
                </ul>
                
                <div className="mt-6 p-4 bg-gray-800 rounded">
                  <h5 className="text-white font-semibold mb-2">Consolidation Process</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Debt analysis and review</li>
                    <li>• Custom consolidation proposal</li>
                    <li>• Fast approval decision</li>
                    <li>• We pay off existing debts</li>
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
                    A
                  </div>
                  <div>
                    <p className="text-white font-semibold">Amanda Wilson</p>
                    <p className="text-gray-400 text-sm">E-commerce Business Owner</p>
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
                  "FundTek's debt consolidation saved our business. We went from juggling 6 different payments to just one, and our monthly payment dropped by $1,800. Now we can focus on growing instead of managing debt."
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
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop" 
                alt="Business financial planning" 
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