import { Clock, Shield, Users, DollarSign } from "lucide-react";

export default function WhyChooseFundTekSection() {
  const features = [
    {
      icon: Clock,
      title: "Same-Day Decisions",
      description: "Get approved in as little as 24 hours with our streamlined process. No waiting weeks for an answer."
    },
    {
      icon: Shield,
      title: "No Hidden Fees",
      description: "Transparent pricing with all costs disclosed upfront. What you see is what you pay - no surprises."
    },
    {
      icon: Users,
      title: "Personal Service",
      description: "Work directly with dedicated specialists who understand your business and industry needs."
    },
    {
      icon: DollarSign,
      title: "Flexible Requirements",
      description: "Alternative qualification criteria beyond traditional bank requirements. We look at your business potential."
    }
  ];

  return (
    <section className="py-16 bg-gray-50" aria-labelledby="why-choose-fundtek">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 
            id="why-choose-fundtek"
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Why Choose FundTek Capital Group?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We're not just another lending company. We're your dedicated funding partner, 
            committed to helping your business grow with flexible solutions and exceptional service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 text-center group hover:scale-105"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: '#85abe4' }}>
                  <IconComponent className="w-8 h-8 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => window.open('https://calendly.com/fundtek-capital-group', '_blank')}
            className="inline-flex items-center px-8 py-4 text-lg font-medium text-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1"
            style={{ backgroundColor: '#85abe4' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#7299d1'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#85abe4'}
          >
            Experience the FundTek Difference
          </button>
        </div>
      </div>
    </section>
  );
}