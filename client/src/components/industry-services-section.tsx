import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Truck, Building2, Wrench, ShoppingCart, Car, Stethoscope, ArrowRight } from "lucide-react";

const industries = [
  {
    icon: Truck,
    title: "Trucking & Transportation",
    description: "Funding solutions for fleet expansion, equipment purchases, and working capital needs.",
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&h=250&fit=crop"
  },
  {
    icon: Stethoscope,
    title: "Medical & Healthcare",
    description: "Specialized financing for medical equipment, practice expansion, and healthcare facilities.",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop"
  },
  {
    icon: Building2,
    title: "Construction",
    description: "Construction loans, equipment financing, and working capital for contractors and builders.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=250&fit=crop"
  },
  {
    icon: ShoppingCart,
    title: "Retail",
    description: "Inventory financing, store expansion funding, and seasonal working capital solutions.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=250&fit=crop"
  },
  {
    icon: Car,
    title: "Auto Dealerships",
    description: "Floor plan financing, inventory loans, and expansion capital for auto dealers.",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=250&fit=crop"
  },
  {
    icon: Wrench,
    title: "HVAC & Trades",
    description: "Equipment financing and working capital for HVAC contractors and trade professionals.",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=250&fit=crop"
  }
];

const services = [
  {
    title: "Term Loans",
    description: "Traditional fixed-term business loans with competitive rates and flexible repayment terms for various business needs.",
    features: ["$10K - $5M funding", "12-60 month terms", "Fixed or variable rates"]
  },
  {
    title: "Lines of Credit",
    description: "Revolving credit lines that provide flexible access to capital when you need it most for operational expenses.",
    features: ["$25K - $1M available", "Draw as needed", "Pay interest only on used funds"]
  },
  {
    title: "SBA Loans",
    description: "Government-backed loans offering favorable terms and lower down payments for qualifying small businesses.",
    features: ["Up to $5M funding", "Lower down payments", "Longer repayment terms"]
  },
  {
    title: "Debt Consolidation",
    description: "Combine multiple debts into a single payment with potentially lower rates and simplified management.",
    features: ["Simplify payments", "Potentially lower rates", "Improve cash flow"]
  },
  {
    title: "Equipment Financing",
    description: "Acquire essential business equipment with the equipment itself serving as collateral for the loan.",
    features: ["Up to 100% financing", "Equipment as collateral", "2-7 year terms"]
  },
  {
    title: "Invoice Factoring",
    description: "Convert outstanding invoices into immediate cash flow by selling them at a discount to improve liquidity.",
    features: ["80-90% advance rate", "24-48 hour funding", "No long-term commitment"]
  },
  {
    title: "Revenue-Based Financing",
    description: "Flexible funding based on your monthly revenue with repayments that scale with business performance.",
    features: ["Revenue-based repayment", "No fixed monthly payments", "12-24 month terms"]
  },
  {
    title: "Credit Repair",
    description: "Professional credit repair services to help improve your business credit score and access better financing.",
    features: ["Credit analysis", "Dispute resolution", "Score improvement strategies"]
  }
];

export default function IndustryServicesSection() {
  return (
    <section className="py-20 bg-[--bg-secondary]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Industries Section */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[--text-primary] mb-4">
              Industry Expertise
            </h2>
            <p className="text-lg text-[--text-secondary] max-w-3xl mx-auto">
              We understand the unique financing needs of different industries and provide tailored solutions
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => {
              const Icon = industry.icon;
              return (
                <Card key={index} className="bg-[--bg-primary] border border-[--bg-tertiary]/30 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                  <div 
                    className="h-48 bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${industry.image})` }}
                  >
                    <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                    <div className="absolute bottom-4 left-4">
                      <div className="w-10 h-10 bg-[--primary] rounded-lg flex items-center justify-center">
                        <Icon className="text-white" />
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-[--text-primary] mb-3">{industry.title}</h3>
                    <p className="text-[--text-secondary] text-sm">{industry.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Services Section */}
        <div>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[--text-primary] mb-4">
              Our Funding Solutions
            </h2>
            <p className="text-lg text-[--text-secondary] max-w-3xl mx-auto">
              Comprehensive financing options designed to meet your business needs at every stage of growth
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="bg-[--bg-primary] border border-[--bg-tertiary]/30 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-[--text-primary] mb-3">{service.title}</h3>
                  <p className="text-[--text-secondary] text-sm mb-4">{service.description}</p>
                  <ul className="space-y-1 text-xs text-[--text-secondary] mb-4">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <div className="w-1 h-1 bg-[--primary] rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    size="sm"
                    className="w-full bg-[--primary] hover:bg-[--primary-dark] text-white text-xs"
                    onClick={() => {
                      if (service.title === "Term Loans") {
                        window.location.href = "/term-loans";
                      } else if (service.title === "Revenue-Based Financing") {
                        window.location.href = "/merchant-cash-advance";
                      } else {
                        alert(`${service.title} page coming soon!`);
                      }
                    }}
                  >
                    Find out more
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}