import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, DollarSign, Clock, FileText, Building, Truck, CreditCard } from "lucide-react";
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
      "Fixed or variable rates"
    ],
    color: "bg-blue-500"
  },
  {
    title: "Lines of Credit",
    icon: <CreditCard className="w-8 h-8" />,
    description: "Revolving credit lines that provide flexible access to capital when you need it most for operational expenses.",
    features: [
      "$25K - $1M available",
      "Draw as needed",
      "Pay interest only on used funds"
    ],
    color: "bg-green-500"
  },
  {
    title: "Merchant Cash Advance",
    icon: <Clock className="w-8 h-8" />,
    description: "Quick access to working capital based on your future credit card sales with flexible repayment structure.",
    features: [
      "Fast approval process",
      "No fixed monthly payments",
      "Repayment tied to sales"
    ],
    color: "bg-purple-500"
  },
  {
    title: "Equipment Financing",
    icon: <Truck className="w-8 h-8" />,
    description: "Specialized financing for purchasing or leasing business equipment, machinery, and vehicles.",
    features: [
      "100% financing available",
      "Equipment as collateral",
      "Flexible terms"
    ],
    color: "bg-orange-500"
  },
  {
    title: "SBA Loans",
    icon: <Building className="w-8 h-8" />,
    description: "Government-backed loans offering favorable terms and lower down payments for qualified businesses.",
    features: [
      "Lower down payments",
      "Competitive rates",
      "Longer repayment terms"
    ],
    color: "bg-red-500"
  },
  {
    title: "P.O. Financing",
    icon: <FileText className="w-8 h-8" />,
    description: "Purchase Order financing helps businesses fulfill large orders by providing working capital to cover supplier costs upfront.",
    features: [
      "Fulfill large orders",
      "No personal guarantees",
      "Quick turnaround"
    ],
    color: "bg-indigo-500"
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
      <section className="relative pt-24 pb-16 bg-gradient-to-br from-[--primary] to-blue-800">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=600&fit=crop')"
          }}
        >
          <div className="absolute inset-0 bg-blue-900 bg-opacity-80"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Financing <span className="text-yellow-400">Solutions</span>
          </h1>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Comprehensive business funding options tailored to meet your specific needs and industry requirements
          </p>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Choose the Right Solution for Your Business
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each product is designed to address specific business challenges and opportunities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-[--primary]">
                <CardHeader className="pb-4">
                  <div className={`w-16 h-16 ${solution.color} rounded-lg flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {solution.icon}
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-[--primary] transition-colors">
                    {solution.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 leading-relaxed">
                    {solution.description}
                  </p>
                  
                  <ul className="space-y-2">
                    {solution.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-[--primary] rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    onClick={handleApplyNow}
                    className="w-full bg-[--primary] hover:bg-[--primary-dark] text-white mt-4 group-hover:bg-gray-800 transition-colors"
                  >
                    Find out more
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
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