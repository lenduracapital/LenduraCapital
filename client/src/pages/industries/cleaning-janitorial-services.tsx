
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft, Star, Sparkles, Shield, Clock, Monitor } from "lucide-react";
import { useLocation } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";


export default function CleaningJanitorialServices() {
  const [, setLocation] = useLocation();

  const handleApplyNow = () => {
    window.open("https://form.jotform.com/251417715331047", "_blank");
  };

  const handleBackToIndustries = () => {
    setLocation("/qualified-industries");
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 md:pt-40 pb-20 md:pb-32 bg-gradient-to-br from-[#85abe4] to-blue-600 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#85abe4]/30 to-transparent"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop')"
          }}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            onClick={handleBackToIndustries}
            style={{ backgroundColor: '#85abe4', color: 'white' }}
            className="mb-8 text-white border-white hover:bg-white hover:text-[#85abe4] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Industries
          </Button>
          
          <div className="text-left max-w-4xl mt-8 md:mt-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Cleaning & Janitorial Services Financing
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Keep your business spotless with equipment financing, expansion capital, and working capital solutions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button 
                onClick={handleApplyNow}
                style={{ backgroundColor: '#85abe4', color: 'white' }}
                className="hover:bg-[#7299d1] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 transform hover:scale-105 active:scale-95 px-8 py-4 text-lg font-semibold rounded-lg shadow-lg"
              >
                Get Approved in 24 Hours
              </Button>
              <Button 
                onClick={() => setLocation("/solutions")}
                style={{ backgroundColor: '#85abe4', color: 'white' }}
                className="hover:bg-[#7299d1] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 transform hover:scale-105 active:scale-95 px-8 py-4 text-lg font-semibold rounded-lg shadow-lg"
              >
                Explore Your Financing Options
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-8">
                Professional Cleaning Industry Funding
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                The cleaning and janitorial services industry requires reliable equipment, supplies, and working capital to maintain operations and grow. From commercial cleaning contracts to residential services, our financing solutions help you maintain cash flow and invest in growth opportunities.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Whether you need equipment financing for industrial cleaning machines, working capital for supplies and payroll, or expansion funding for new contracts, FundTek Capital Group provides fast, flexible financing tailored to cleaning service businesses.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold" style={{ color: '#85abe4' }}>24 Hours</div>
                  <div className="text-sm text-gray-600">Fast Approval</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold" style={{ color: '#85abe4' }}>$20M</div>
                  <div className="text-sm text-gray-600">Max Funding</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-[#85abe4] text-white p-6 rounded-lg">
                <Sparkles className="w-8 h-8 mb-4" />
                <h3 className="text-xl font-bold mb-4">Equipment Financing</h3>
                <p className="text-blue-100">Industrial cleaners, floor machines, and commercial vehicles</p>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg">
                <Shield className="w-8 h-8 mb-4" style={{ color: '#85abe4' }} />
                <h3 className="text-xl font-bold mb-4" style={{ color: '#85abe4' }}>Working Capital</h3>
                <p className="text-gray-700">Supplies, payroll, and operational expenses</p>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg">
                <Clock className="w-8 h-8 mb-4" style={{ color: '#85abe4' }} />
                <h3 className="text-xl font-bold mb-4" style={{ color: '#85abe4' }}>Contract Funding</h3>
                <p className="text-gray-700">Capital to fulfill large commercial cleaning contracts</p>
              </div>
              <div className="bg-[#85abe4] text-white p-6 rounded-lg">
                <Monitor className="w-8 h-8 mb-4" />
                <h3 className="text-xl font-bold mb-4">Expansion Capital</h3>
                <p className="text-blue-100">Grow into new markets and service areas</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Success Stories */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cleaning service businesses that expanded their operations with FundTek Capital Group financing
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Maria Santos",
                company: "Professional Clean Services",
                story: "Used equipment financing to purchase 5 industrial floor scrubbers. Landed major hospital contract and increased monthly revenue by 40%.",
                funding: "$85,000 Equipment Loan"
              },
              {
                name: "James Wilson",
                company: "Elite Janitorial Solutions",
                story: "Got working capital to hire additional staff for new office building contracts. Expanded from 10 to 25 buildings in 6 months.",
                funding: "$150,000 Working Capital"
              },
              {
                name: "Angela Rodriguez",
                company: "Green Clean Co.",
                story: "Secured funding to purchase eco-friendly cleaning supplies in bulk. Reduced costs by 30% and attracted premium clients.",
                funding: "$45,000 Term Loan"
              }
            ].map((story, index) => (
              <div key={index} className="bg-white p-8 rounded-lg border-l-4 border-[#85abe4] shadow-lg">
                <div className="flex items-start space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{story.story}"</p>
                <div className="border-t pt-4">
                  <div className="font-semibold text-black">{story.name}</div>
                  <div className="text-sm text-gray-600 mb-2">{story.company}</div>
                  <div className="text-sm font-medium" style={{ color: '#85abe4' }}>{story.funding}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Solutions */}
      <section className="py-16 md:py-24 bg-[#85abe4] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
            Recommended Financing Solutions
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
            Based on typical cleaning service business needs, these solutions work best for janitorial companies
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Equipment Financing</h3>
              <p className="text-blue-100 mb-6">Industrial cleaning equipment, vehicles, and commercial-grade supplies</p>
              <Button 
                onClick={() => setLocation("/solutions")}
                style={{ backgroundColor: '#85abe4', color: 'white' }}
                className="hover:opacity-90 px-6 py-3 font-semibold rounded-lg transition-all duration-300"
              >
                Learn More
              </Button>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Working Capital</h3>
              <p className="text-blue-100 mb-6">Cash flow for supplies, payroll, and day-to-day operational expenses</p>
              <Button 
                onClick={() => setLocation("/solutions")}
                style={{ backgroundColor: '#85abe4', color: 'white' }}
                className="hover:bg-[#7299d1] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 transform hover:scale-105 active:scale-95 px-6 py-3 font-semibold rounded-lg shadow-lg"
              >
                Learn More
              </Button>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Term Loans</h3>
              <p className="text-blue-100 mb-6">Business expansion, new location setup, and major contract fulfillment</p>
              <Button 
                onClick={() => setLocation("/solutions")}
                style={{ backgroundColor: '#85abe4', color: 'white' }}
                className="hover:bg-[#7299d1] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 transform hover:scale-105 active:scale-95 px-6 py-3 font-semibold rounded-lg shadow-lg"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}