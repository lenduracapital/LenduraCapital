import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, DollarSign, Clock, FileText, Building, Truck, CreditCard, CheckCircle, Star, ChevronDown, ChevronUp } from "lucide-react";
import { useLocation } from "wouter";
import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SEOHead from "@/components/seo-head";

import termLoansImage from "@assets/termloans.jpg";
import linesOfCreditImage from "@assets/lines of credit.jpg";
import merchantCashAdvanceImage from "@assets/merchantcashadvance.jpg";
import sbaLoansImage from "@assets/sbaloans.jpg";
import debtConsolidationImageNew from "@assets/debtconsolidation.jpg";
import equipmentLoansImage from "@assets/equipmentloans.jpg";
import invoiceFactoringImage from "@assets/invoicefactoring.jpg";
import purchaseOrderFinancingImage from "@assets/purchaseorderfinancing.jpg";
import creLendingImage from "@assets/crelending.jpg";
import creditCardProcessingImage from "@assets/creditcardprocessing.jpg";
import creditRepairImage from "@assets/creditrepair.jpg";
import marketingImage from "@assets/marketing.jpg";

const solutionCategories = {
  "Traditional Lending": [
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
      image: termLoansImage
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
      image: linesOfCreditImage
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
      image: sbaLoansImage
    },
    {
      title: "Equipment Loans",
      icon: <Truck className="w-8 h-8" />,
      description: "Specialized financing for purchasing or leasing business equipment, machinery, and vehicles.",
      features: [
        "100% financing available",
        "Equipment as collateral",
        "2-7 year terms",
        "Tax advantages"
      ],
      route: "/solutions/equipment-financing", 
      image: equipmentLoansImage
    }
  ],
  "Alternative Funding": [
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
      image: merchantCashAdvanceImage
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
      image: invoiceFactoringImage
    },
    {
      title: "Purchase Order Financing",
      icon: <FileText className="w-8 h-8" />,
      description: "Purchase Order financing helps businesses fulfill large orders by providing working capital to cover supplier costs upfront.",
      features: [
        "Fulfill large orders",
        "No personal guarantees",
        "Quick turnaround",
        "Competitive rates"
      ],
      route: "/solutions/po-financing",
      image: purchaseOrderFinancingImage
    },
    {
      title: "Debt Consolidation",
      icon: <Building className="w-8 h-8" />,
      description: "Consolidate multiple business debts into one manageable payment with better terms and lower interest rates.",
      features: [
        "Multiple debt consolidation",
        "Lower monthly payments",
        "Improved cash flow",
        "Simplified management"
      ],
      route: "/solutions/debt-consolidation",
      image: debtConsolidationImageNew
    }
  ],
  "Specialized Solutions": [
    {
      title: "CRE Lending",
      icon: <Building className="w-8 h-8" />,
      description: "Commercial real estate financing for property acquisition, refinancing, and development projects nationwide.",
      features: [
        "Property acquisition",
        "Refinancing options",
        "Development loans",
        "Competitive rates"
      ],
      route: "/solutions/commercial-real-estate-lending",
      image: creLendingImage
    },
    {
      title: "Credit Card Processing",
      icon: <CreditCard className="w-8 h-8" />,
      description: "Accept payments anywhere with competitive rates, fast deposits, and transparent pricing for all business types.",
      features: [
        "Multi-channel processing",
        "Fast funding",
        "Secure transactions",
        "24/7 support"
      ],
      route: "/solutions/credit-card-processing",
      image: creditCardProcessingImage
    },
    {
      title: "Credit Repair",
      icon: <Star className="w-8 h-8" />,
      description: "Professional business credit building and repair services to improve your company's financial standing.",
      features: [
        "Credit analysis",
        "Score improvement",
        "Credit monitoring",
        "Expert guidance"
      ],
      route: "/solutions/credit-services",
      image: creditRepairImage
    },
    {
      title: "Marketing",
      icon: <Building className="w-8 h-8" />,
      description: "Professional SEO services and web development to enhance your online presence and drive business growth.",
      features: [
        "SEO optimization",
        "Website development",
        "Digital marketing",
        "Online presence management"
      ],
      route: "/solutions/seo-web-development",
      image: marketingImage
    }
  ]
};

export default function Solutions() {
  const [, setLocation] = useLocation();
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const handleApplyNow = () => {
    window.open("https://form.jotform.com/251965461165159", "_blank");
  };

  const handleBackToHome = () => {
    setLocation("/");
  };

  const toggleCard = (cardId: string) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="12 Small Business Loan Options & Funding Solutions | Compare Rates"
        description="Compare 12 business funding options: SBA loans, term loans, equipment financing, merchant cash advances, lines of credit & more. Fast approval, competitive rates. Bad credit OK. Brooklyn lender serving all 50 states & Canada."
        keywords="small business loans, business funding options, SBA loans, term loans, equipment financing, merchant cash advance, lines of credit, working capital loans, business loan comparison, commercial lending, Brooklyn business loans, New York business funding"
        canonical="/solutions"
      />

      <Header />
      
      {/* Hero Section with Professional Design */}
      <section className="relative pt-20 md:pt-24 pb-12 md:pb-20 bg-gradient-to-br from-[#193a59] to-[#285d8a] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#193a59]/30 to-transparent"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=600&fit=crop')"
          }}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left max-w-4xl mt-8 md:mt-16">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Solutions
            </h1>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-12 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Perfect Financing Solution
            </h2>
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              From traditional term loans to innovative funding options, we have the right solution for your business needs.
            </p>
          </div>

          {Object.entries(solutionCategories).map(([categoryName, solutions], categoryIndex) => (
            <div key={categoryIndex} className="mb-16">
              {/* Category Header */}
              <div className="mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {categoryName}
                </h3>
                <div className="w-24 h-1 bg-gradient-to-r from-[#193a59] to-[#285d8a] rounded-full"></div>
              </div>
              
              {/* Category Solutions Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {solutions.map((solution, index) => {
                  const cardId = `${categoryIndex}-${index}`;
                  const isExpanded = expandedCard === cardId;
                  return (
                    <div key={cardId} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                      <div className="aspect-video bg-gray-200 relative overflow-hidden">
                        <img 
                          src={solution.image}
                          alt={solution.title}
                          className="w-full h-full object-cover transition-transform duration-300"
                        />

                        <div className="absolute top-4 left-4">
                          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                            <div style={{ color: '#193a59' }}>
                              {solution.icon}
                            </div>
                          </div>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-lg md:text-xl font-bold text-white mb-2 leading-tight break-words line-clamp-2">{solution.title}</h3>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        {/* Tap to expand button */}
                        <button
                          onClick={() => toggleCard(cardId)}
                          className="w-full flex items-center justify-between p-3 mb-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200 touch-target focus-ring"
                          aria-expanded={isExpanded}
                          aria-label={`${isExpanded ? 'Hide' : 'Show'} details for ${solution.title}`}
                        >
                          <span className="text-gray-700 font-medium">
                            {isExpanded ? 'Hide Details' : 'Tap for Details'}
                          </span>
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-gray-600" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-600" />
                          )}
                        </button>
                        
                        {/* Expandable content with smooth animation */}
                        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
                          isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}>
                          <div className="pb-4">
                            <p className="text-gray-600 mb-4 leading-relaxed">{solution.description}</p>
                            
                            <ul className="space-y-2 mb-6">
                              {solution.features.map((feature, idx) => (
                                <li key={idx} className="text-gray-700 text-sm flex items-center">
                                  <CheckCircle className="w-4 h-4 mr-3" style={{ color: '#193a59' }} />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        <Button 
                          onClick={() => setLocation(solution.route)}
                          style={{ backgroundColor: '#193a59' }}
                          className="w-full text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity touch-target focus-ring"
                        >
                          Learn More
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose FundTek Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why Businesses Choose Lendura Capital
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We understand that every business is unique. That's why we offer personalized financing solutions tailored to your specific industry, situation, and goals.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold mb-2" style={{ color: '#193a59' }}>98%</div>
                  <div className="text-gray-700 text-sm">Client Satisfaction Rate</div>
                </div>
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold mb-2" style={{ color: '#193a59' }}>24hr</div>
                  <div className="text-gray-700 text-sm">Average Approval Time</div>
                </div>
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold mb-2" style={{ color: '#193a59' }}>$20M+</div>
                  <div className="text-gray-700 text-sm">Capital Deployed</div>
                </div>
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold mb-2" style={{ color: '#193a59' }}>16+</div>
                  <div className="text-gray-700 text-sm">Industries Served</div>
                </div>
              </div>
              
              <Button 
                onClick={handleApplyNow}
                style={{ backgroundColor: '#193a59' }}
                className="text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#285d8a] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
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
              <a href="https://calendly.com/lenduracapital/30min" target="_blank" rel="noopener noreferrer" className="text-3xl font-bold text-white hover:text-gray-200 transition-colors">(305) 834-7168</a>
              <p className="text-gray-300 text-sm">Schedule your consultation today</p>
            </div>
            <div className="text-center">
              <Button 
                onClick={handleApplyNow}
                style={{ backgroundColor: '#193a59' }}
                className="text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#285d8a] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
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