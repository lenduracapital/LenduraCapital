import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, DollarSign, Clock, FileText, Building, Truck, CreditCard, ArrowLeft, CheckCircle, Star } from "lucide-react";
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
    title: "Debt Consolidation",
    icon: <Building className="w-8 h-8" />,
    description: "Consolidate multiple business debts into a single payment with potentially lower rates and simplified management.",
    features: [
      "Simplify payments",
      "Potentially lower rates",
      "Improve cash flow",
      "Reduce stress"
    ],
    route: "/solutions/debt-consolidation",
    image: "https://images.unsplash.com/photo-1554224154-26032fced8bd?w=600&h=400&fit=crop"
  }
];

export default function Solutions() {
  const handleApplyNow = () => {
    window.open("https://form.jotform.com/251417715331047", "_blank");
  };

  return (
    <div className="min-h-screen bg-[--bg-primary] text-[--text-primary]">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=600&fit=crop')"
          }}
        >
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Solutions
            </h1>
          </div>
          
          {/* Contact CTA Box */}
          <div style={{ backgroundColor: '#85abe4' }} className="text-white p-8 rounded-lg max-w-md ml-auto mr-8">
            <div className="flex items-center mb-4">
              <div className="bg-white p-2 rounded-full mr-4" style={{ color: '#85abe4' }}>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold">Contact FundTek to learn more</h3>
            </div>
            <p className="text-sm mb-4">
              Call us at (305) 307-4658 to speak to a loan specialist today
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Whatever your financial needs are<br />
              - we got you covered
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl leading-relaxed mb-8">
              We provide working business capital based on your business' projected future sales. Businesses in 
              high-risk industries, with financial problems or bad credit, can be approved without any collateral.
            </p>
            <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">
              If you are still not sure what solution is right for your company, that's what we do. We analyze your 
              financial and organizational situation and determine what financing options are right for you.
            </p>
            
            <Button 
              onClick={handleApplyNow}
              style={{ backgroundColor: '#85abe4' }}
              className="hover:opacity-90 text-white px-8 py-3 rounded-lg font-semibold text-lg mt-8 inline-flex items-center"
            >
              View your options →
            </Button>
          </div>

          {/* Service Cards */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {[
              { title: "Term Loans", description: "Traditional business financing with predictable payments", route: "/solutions/term-loans" },
              { title: "Lines of Credit", description: "Flexible credit access for ongoing business needs", route: "/solutions/lines-of-credit" },
              { title: "SBA Loans", description: "Government-backed loans with favorable terms", route: "/solutions/sba-loans" },
              { title: "Debt Consolidation", description: "Combine multiple debts into one manageable payment", route: "/solutions/debt-consolidation" },
              { title: "Equipment Financing", description: "Funding for machinery, vehicles, and business equipment", route: "/solutions/equipment-financing" },
              { title: "Invoice Factoring", description: "Convert outstanding invoices into immediate cash", route: "/solutions/invoice-factoring" },
              { title: "P.O. Financing", description: "Fulfill large orders with purchase order funding", route: "/solutions/po-financing" },
              { title: "Credit Services", description: "Business credit building and repair solutions", route: "/solutions/credit-services" },
              { title: "Merchant Cash Advance", description: "Quick funding based on future credit card sales", route: "/solutions/merchant-cash-advance" }
            ].map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg border hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold text-gray-800 mb-3">{service.title}</h3>
                <div className="w-12 h-1 mb-4" style={{ backgroundColor: '#85abe4' }}></div>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                <Button 
                  onClick={() => window.location.href = service.route}
                  style={{ backgroundColor: '#85abe4' }}
                  className="hover:opacity-90 text-white px-6 py-2 rounded font-semibold"
                >
                  Find out more →
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Our financing specialists are standing by to help you find the perfect solution for your business needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleApplyNow}
              size="lg"
              className="bg-[--primary] hover:bg-[--primary-dark] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105"
            >
              Apply Now
            </Button>
            <Button 
              onClick={() => window.location.href = "tel:646-329-4622"}
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200"
            >
              Call (646) 329-4622
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}