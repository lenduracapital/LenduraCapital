import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, Building, TrendingUp, Home, Handshake, Rocket, Check } from "lucide-react";

const services = [
  {
    icon: CreditCard,
    title: "Working Capital Loans",
    description: "Quick access to funds for day-to-day operations, inventory, and short-term business needs with flexible repayment terms.",
    features: ["Up to $500K funding", "24-48 hour approval", "6-18 month terms"]
  },
  {
    icon: Building,
    title: "Equipment Financing", 
    description: "Secure funding for essential equipment purchases with competitive rates and the equipment serving as collateral.",
    features: ["Up to $2M funding", "Equipment as collateral", "2-7 year terms"]
  },
  {
    icon: TrendingUp,
    title: "Revenue-Based Financing",
    description: "Flexible funding based on your monthly revenue with repayments that scale with your business performance.",
    features: ["Up to $1M funding", "Revenue-based repayment", "12-36 month terms"]
  },
  {
    icon: Home,
    title: "Commercial Real Estate",
    description: "Acquire, refinance, or expand your commercial property with our specialized real estate financing solutions.",
    features: ["Up to $10M funding", "Competitive rates", "5-30 year terms"]
  },
  {
    icon: Handshake,
    title: "SBA Loans",
    description: "Government-backed loans with favorable terms for qualifying small businesses looking to expand or start operations.",
    features: ["Up to $5M funding", "Government backing", "Low interest rates"]
  },
  {
    icon: Rocket,
    title: "Startup Funding",
    description: "Specialized funding solutions for early-stage companies with innovative business models and growth potential.",
    features: ["Up to $250K funding", "Flexible criteria", "Mentorship included"]
  }
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-[--bg-secondary]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[--text-primary] mb-4">
            Our Funding Solutions
          </h2>
          <p className="text-lg text-[--text-secondary] max-w-3xl mx-auto">
            We offer comprehensive funding options tailored to businesses at every stage of growth
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="bg-[--bg-primary] border border-[--bg-tertiary]/30 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-[--primary] rounded-lg flex items-center justify-center mb-6">
                    <Icon className="text-white text-xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-[--text-primary] mb-4">{service.title}</h3>
                  <p className="text-[--text-secondary] mb-6">{service.description}</p>
                  <ul className="space-y-2 text-sm text-[--text-secondary]">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="h-4 w-4 text-[--accent] mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
