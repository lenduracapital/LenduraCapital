import { Shield, Award, Users, TrendingUp, Clock } from "lucide-react";
import { useEffect, useRef, useState } from 'react';

// Flip animation component for team member circles
const FlipCircle = ({ member, index }: { member: any, index: number }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add delay based on index for staggered animation
            setTimeout(() => {
              setIsFlipped(true);
            }, index * 300);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (circleRef.current) {
      observer.observe(circleRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  return (
    <div ref={circleRef} className="text-center">
      <div className="perspective-1000 w-24 h-24 mx-auto mb-4">
        <div 
          className={`relative w-full h-full transition-transform duration-700 preserve-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          style={{
            transformStyle: 'preserve-3d',
            perspective: '1000px'
          }}
        >
          {/* Front of circle */}
          <div 
            className="absolute inset-0 w-24 h-24 rounded-full bg-[#85abe4] flex items-center justify-center backface-hidden"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(0deg)'
            }}
          >
            <span className="text-white text-2xl font-bold">
              {member.name.split(' ').map((n: string) => n[0]).join('')}
            </span>
          </div>
          
          {/* Back of circle */}
          <div 
            className="absolute inset-0 w-24 h-24 rounded-full bg-gradient-to-br from-[#85abe4] to-[#6a9bd1] flex items-center justify-center backface-hidden"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >
            <Users className="w-8 h-8 text-white" />
          </div>
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
  }
];

const teamMembers = [
  {
    name: "Marc Khouli",
    title: "Founder & CEO",
    experience: "15+ years",
    specialties: ["Strategic Leadership", "Business Development", "Financial Solutions"],
    credentials: "Certified Executive Leader",
    avatar: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=200&h=200&fit=crop&crop=face&auto=format&q=80"
  },
  {
    name: "Gabby Glickman", 
    title: "Co Founder & COO",
    experience: "12+ years",
    specialties: ["Operations Management", "Client Relations", "Process Optimization"],
    credentials: "Business Operations Specialist",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=faces&zoom=1.2&auto=format&q=80"
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

        {/* Our Expert Team */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Meet Our Expert Funding Specialists
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our experienced team combines decades of commercial lending expertise 
              with personalized service to find the perfect funding solution for your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <FlipCircle key={index} member={member} index={index} />
            ))}
          </div>

          {/* Contact CTA */}
          <div className="text-center mt-12 pt-8 border-t border-gray-200">
            <p className="text-lg text-gray-600 mb-6">
              Ready to speak with a funding specialist about your business needs?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <a
                href="tel:(305) 307-4658"
                className="px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg text-white cursor-pointer"
                style={{ backgroundColor: '#85abe4', pointerEvents: 'auto' }}
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "tel:(305) 307-4658";
                }}
              >
                Call (305) 307-4658
              </a>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open("https://form.jotform.com/251417715331047", "_blank");
                }}
                className="px-8 py-3 bg-white text-black rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg border border-gray-300 cursor-pointer"
                style={{ pointerEvents: 'auto' }}
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}