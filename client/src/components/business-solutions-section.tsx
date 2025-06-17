import { Button } from "@/components/ui/button";

export default function BusinessSolutionsSection() {
  const solutions = [
    {
      title: "Term Loans",
      description: "Traditional fixed-term business loans with competitive rates and flexible repayment terms for various business needs.",
      features: ["$10K - $5M funding", "12-60 month terms", "Fixed or variable rates"],
      route: "/solutions/term-loans",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop"
    },
    {
      title: "Lines of Credit", 
      description: "Revolving credit lines that provide flexible access to capital when you need it most for operational expenses.",
      features: ["$25K - $1M available", "Draw as needed", "Pay interest only on used funds"],
      route: "/solutions/lines-of-credit",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=300&fit=crop"
    },
    {
      title: "SBA Loans",
      description: "Government-backed loans offering favorable terms and lower down payments for qualifying small businesses.",
      features: ["Up to $5M funding", "Lower down payments", "Longer repayment terms"],
      route: "/solutions/sba-loans",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop"
    },
    {
      title: "Equipment Financing",
      description: "Acquire essential business equipment with the equipment itself serving as collateral for the loan.",
      features: ["Up to 100% financing", "Equipment as collateral", "2-7 year terms"],
      route: "/solutions/equipment-financing",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop"
    },
    {
      title: "Invoice Factoring",
      description: "Convert outstanding invoices into immediate cash flow by selling them at a discount to improve liquidity.",
      features: ["80-90% advance rate", "24-48 hour funding", "No long-term commitment"],
      route: "/solutions/invoice-factoring",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop"
    },
    {
      title: "P.O. Financing",
      description: "Fulfill large orders with purchase order funding to bridge the gap between order and payment.",
      features: ["Fund large orders", "Quick approval", "Competitive rates"],
      route: "/solutions/po-financing",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop"
    }
  ];

  return (
    <section className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-white mb-6">
            Premium Business Financing Solutions
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            FundTek understands how the right financing at the right time can make a huge difference in your business success. We've made it fast and easy to access financing solutions completely designed around your small business needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {solutions.map((solution, index) => (
            <div key={index} className="bg-gray-800 p-8 rounded-lg hover:bg-gray-700 transition-colors border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">{solution.title}</h3>
              <div className="w-12 h-1 mb-6" style={{ backgroundColor: '#85abe4' }}></div>
              <p className="text-gray-300 mb-6 leading-relaxed">{solution.description}</p>
              
              <ul className="space-y-2 mb-6">
                {solution.features.map((feature, idx) => (
                  <li key={idx} className="text-gray-400 text-sm flex items-center">
                    <span className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#85abe4' }}></span>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Button 
                onClick={() => window.location.href = solution.route}
                style={{ backgroundColor: '#85abe4' }}
                className="text-white px-4 py-2 rounded font-semibold hover:opacity-90 transition-opacity w-full"
              >
                Find out more →
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-gray-400 mb-8">
            FundTek offers merchant cash advances, small business loans, SBA loans, equipment financing, factoring, purchase order financing, lines of credit, and commercial mortgages nationwide.
          </p>
          <Button 
            onClick={() => window.location.href = '/solutions'}
            style={{ backgroundColor: '#85abe4' }}
            className="hover:opacity-90 text-white px-8 py-3 rounded font-semibold text-lg"
          >
            View All Solutions →
          </Button>
        </div>
      </div>
    </section>
  );
}