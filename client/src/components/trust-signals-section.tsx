import { Shield, Award, Users, TrendingUp, Clock, MapPin } from "lucide-react";

// Simple team member circle component
const TeamMemberCircle = ({ member }: { member: any }) => {
  return (
    <div className="text-center">
      <div className="w-24 h-24 mx-auto mb-4">
        <div className="w-24 h-24 rounded-full bg-[#85abe4] flex items-center justify-center">
          <span className="text-white text-2xl font-bold">
            {member.initials}
          </span>
        </div>
      </div>
      
      <h4 className="text-xl font-semibold text-gray-900 mb-2">
        {member.name}
      </h4>
      <p className="text-gray-600 font-medium mb-2">
        {member.title}
      </p>
      <p className="text-sm text-gray-500 mb-3">
        {member.experience} • {member.credentials}
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {member.specialties.map((specialty: string, idx: number) => (
          <span
            key={idx}
            className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700"
          >
            {specialty}
          </span>
        ))}
      </div>
    </div>
  );
};

const certifications = [
  {
    icon: Shield,
    title: "Trusted Network",
    description: "Connected to vetted lenders nationwide with established banking relationships"
  },
  {
    icon: Users,
    title: "5,000+ Clients Served",
    description: "Successfully funded thousands of businesses across multiple industries"
  },
  {
    icon: TrendingUp,
    title: "$1B+ Funded",
    description: "Over one billion dollars in business capital deployed to growing companies"
  },
  {
    icon: Clock,
    title: "24-Hour Decisions",
    description: "Rapid approval process with funding decisions within one business day"
  },
  {
    icon: () => (
      <div className="w-6 h-6 relative">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    ),
    title: "No Prepayment Penalties",
    description: "Flexible terms with no hidden fees or early payment penalties"
  },
  {
    icon: MapPin,
    title: "Nationwide Coverage",
    description: "Serving businesses across all 50 states with local expertise and national reach"
  }
];

const teamMembers = [
  {
    name: "Marc Hoffman",
    title: "Founder & CEO",
    experience: "15+ years",
    specialties: ["Strategic Leadership", "Business Development", "Financial Solutions"],
    credentials: "Certified Executive Leader",
    initials: "MH"
  },
  {
    name: "Gabby Goodman", 
    title: "Co Founder & COO",
    experience: "12+ years",
    specialties: ["Operations Management", "Client Relations", "Process Optimization"],
    credentials: "Business Operations Specialist",
    initials: "GG"
  }
];

export default function TrustSignalsSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Why Trust FundTek */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Why Trust FundTek Capital Group?
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Our commitment to transparency, expertise, and results has made us a trusted partner 
            for thousands of businesses seeking reliable funding solutions.
          </p>
        </div>

        {/* Trust Indicators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {certifications.map((cert, index) => {
            const IconComponent = cert.icon;
            return (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div 
                    className="p-3 rounded-lg mr-4"
                    style={{ backgroundColor: '#85abe4' }}
                  >
                    <div className="w-6 h-6 text-white">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {cert.title}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {cert.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get answers to the most common questions from merchants like you
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {/* FAQ Item 1 */}
            <div className="bg-white rounded-xl p-6 shadow-lg border-l-4" style={{ borderLeftColor: '#85abe4' }}>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">
                How quickly can I get approved for funding?
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Most merchants receive approval decisions within 24 hours. Our streamlined application process and direct lender relationships allow us to move fast while other companies make you wait weeks.
              </p>
            </div>

            {/* FAQ Item 2 */}
            <div className="bg-white rounded-xl p-6 shadow-lg border-l-4" style={{ borderLeftColor: '#85abe4' }}>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">
                What documents do I need to apply?
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Just three simple items: your last 3 months of bank statements, a government-issued ID, and your business registration documents. No complex financial statements or lengthy paperwork required.
              </p>
            </div>

            {/* FAQ Item 3 */}
            <div className="bg-white rounded-xl p-6 shadow-lg border-l-4" style={{ borderLeftColor: '#85abe4' }}>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">
                Can I get funding if my credit isn't perfect?
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Absolutely! We focus on your business performance and cash flow, not just credit scores. Many of our merchants have been approved with credit scores as low as 550 because we look at the bigger picture.
              </p>
            </div>

            {/* FAQ Item 4 */}
            <div className="bg-white rounded-xl p-6 shadow-lg border-l-4" style={{ borderLeftColor: '#85abe4' }}>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">
                Do you work with businesses in my industry?
              </h4>
              <p className="text-gray-600 leading-relaxed">
                We serve over 18 different industries including restaurants, retail, healthcare, construction, transportation, and many more. Our specialists understand the unique challenges each industry faces and tailor solutions accordingly.
              </p>
            </div>

            {/* FAQ Item 5 */}
            <div className="bg-white rounded-xl p-6 shadow-lg border-l-4" style={{ borderLeftColor: '#85abe4' }}>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">
                What makes FundTek different from other funding companies?
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Unlike brokers who just shop your deal around, we have direct relationships with 50+ vetted lenders. This means faster approvals, better communication, and a dedicated specialist who knows your business personally throughout the entire process.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}