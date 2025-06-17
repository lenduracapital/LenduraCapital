import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, DollarSign, Clock, FileText, Building, Truck, CreditCard, ArrowLeft, CheckCircle, Star, Phone } from "lucide-react";
import { useLocation } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";

const solutions = [
  {
    title: "Term Loans",
    icon: <DollarSign className="w-8 h-8" />,
    description: "Traditional fixed-term business loans with competitive rates and flexible repayment terms for various business needs.",
    features: [
      "$10K - $5M funding",
      "12-60 month terms", 
      "Fixed or variable rates",
      "Quick approval process"
    ],
    route: "/solutions/term-loans",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop"
  },
  {
    title: "Lines of Credit",
    icon: <CreditCard className="w-8 h-8" />,
    description: "Revolving credit lines that provide flexible access to capital when you need it most for operational expenses.",
    features: [
      "$25K - $1M available",
      "Draw as needed",
      "Pay interest only on used funds",
      "Flexible repayment"
    ],
    route: "/solutions/lines-of-credit",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&h=400&fit=crop"
  },
  {
    title: "Merchant Cash Advance",
    icon: <Clock className="w-8 h-8" />,
    description: "Quick access to working capital based on your future credit card sales with flexible repayment structure.",
    features: [
      "Fast approval process",
      "No fixed monthly payments", 
      "Repayment tied to sales",
      "No collateral required"
    ],
    route: "/solutions/merchant-cash-advance",
    image: "https://images.unsplash.com/photo-1560472355-536de3962603?w=600&h=400&fit=crop"
  },
  {
    title: "Equipment Financing",
    icon: <Truck className="w-8 h-8" />,
    description: "Specialized financing for purchasing or leasing business equipment, machinery, and vehicles.",
    features: [
      "100% financing available",
      "Equipment as collateral",
      "2-7 year terms",
      "Tax advantages"
    ],
    route: "/solutions/equipment-financing", 
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop"
  },
  {
    title: "SBA Loans",
    icon: <Building className="w-8 h-8" />,
    description: "Government-backed loans offering favorable terms and lower down payments for qualified businesses.",
    features: [
      "Lower down payments",
      "Competitive rates",
      "Longer repayment terms",
      "Government backed"
    ],
    route: "/solutions/sba-loans",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop"
  },
  {
    title: "Invoice Factoring",
    icon: <FileText className="w-8 h-8" />,
    description: "Convert outstanding invoices into immediate cash flow by selling them at a discount to improve liquidity.",
    features: [
      "80-90% advance rate",
      "24-48 hour funding", 
      "No long-term commitment",
      "Improve cash flow"
    ],
    route: "/solutions/invoice-factoring",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop"
  },
  {
    title: "P.O. Financing",
    icon: <FileText className="w-8 h-8" />,
    description: "Purchase Order financing helps businesses fulfill large orders by providing working capital to cover supplier costs upfront.",
    features: [
      "Fulfill large orders",
      "No personal guarantees",
      "Quick turnaround",
      "Competitive rates"
    ],
    route: "/solutions/po-financing",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop"
  },
  {
    title: "Credit Services",
    icon: <Star className="w-8 h-8" />,
    description: "Professional business credit building and repair services to improve your company's financial standing.",
    features: [
      "Credit analysis",
      "Score improvement",
      "Credit monitoring",
      "Expert guidance"
    ],
    route: "/solutions/credit-services",
    image: "https://images.unsplash.com/photo-1554224154-26032fced8bd?w=600&h=400&fit=crop"
  }
];

export default function Solutions() {
  const [, setLocation] = useLocation();

  const handleApplyNow = () => {
    window.open("https://form.jotform.com/251417715331047", "_blank");
  };

  const handleBackToHome = () => {
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section with Professional Design */}
      <section className="relative pt-24 pb-20 bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#85abe4]/20 to-transparent"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=600&fit=crop')"
          }}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-300 mb-12">
            <button onClick={handleBackToHome} className="hover:text-white transition-colors">Home</button>
            <span>›</span>
            <span className="text-white font-medium">Solutions</span>
          </nav>

          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Financing Solutions for Every Business
            </h1>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Discover tailored funding options designed to help your business grow, expand, and succeed in today's competitive market.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                onClick={handleApplyNow}
                style={{ backgroundColor: '#85abe4' }}
                className="text-white px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90"
              >
                Get Pre-Qualified
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">24hr</div>
                <div className="text-gray-300 text-sm">Fast Approval</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">$20M+</div>
                <div className="text-gray-300 text-sm">Funded</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">50+</div>
                <div className="text-gray-300 text-sm">Specialists</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Perfect Financing Solution
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From traditional term loans to innovative funding options, we have the right solution for your business needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {solutions.map((solution, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                <div className="aspect-video bg-gray-200 relative overflow-hidden">
                  <img 
                    src={solution.image}
                    alt={solution.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                      <div style={{ color: '#85abe4' }}>
                        {solution.icon}
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-2">{solution.title}</h3>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600 mb-4 leading-relaxed">{solution.description}</p>
                  
                  <ul className="space-y-2 mb-6">
                    {solution.features.map((feature, idx) => (
                      <li key={idx} className="text-gray-700 text-sm flex items-center">
                        <CheckCircle className="w-4 h-4 mr-3" style={{ color: '#85abe4' }} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    onClick={() => setLocation(solution.route)}
                    style={{ backgroundColor: '#85abe4' }}
                    className="w-full text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose FundTek Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why Businesses Choose FundTek Capital Group
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We understand that every business is unique. That's why we offer personalized financing solutions tailored to your specific industry, situation, and goals.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold mb-2" style={{ color: '#85abe4' }}>98%</div>
                  <div className="text-gray-700 text-sm">Client Satisfaction Rate</div>
                </div>
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold mb-2" style={{ color: '#85abe4' }}>24hr</div>
                  <div className="text-gray-700 text-sm">Average Approval Time</div>
                </div>
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold mb-2" style={{ color: '#85abe4' }}>$20M+</div>
                  <div className="text-gray-700 text-sm">Capital Deployed</div>
                </div>
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold mb-2" style={{ color: '#85abe4' }}>16+</div>
                  <div className="text-gray-700 text-sm">Industries Served</div>
                </div>
              </div>
              
              <Button 
                onClick={handleApplyNow}
                style={{ backgroundColor: '#85abe4' }}
                className="text-white px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90"
              >
                Start Your Application
              </Button>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop"
                alt="Business team meeting"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Expert Guidance</h3>
                <p className="text-gray-200">Dedicated specialists for every industry</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Fuel Your Business Growth?
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Don't let cash flow challenges hold your business back. Get the funding you need with flexible terms and competitive rates.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <p className="text-gray-300 text-sm mb-2">Call us directly:</p>
              <p className="text-3xl font-bold text-white">(305) 307-4658</p>
              <p className="text-gray-300 text-sm">Speak with a specialist today</p>
            </div>
            <div className="text-center">
              <Button 
                onClick={handleApplyNow}
                style={{ backgroundColor: '#85abe4' }}
                className="text-white px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity"
              >
                Apply Now - No Impact to Credit
              </Button>
              <p className="text-gray-400 text-sm mt-2">Get pre-qualified in minutes</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}