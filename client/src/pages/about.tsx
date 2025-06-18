import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { CheckCircle, Users, Award, TrendingUp } from "lucide-react";

export default function About() {
  const [, setLocation] = useLocation();

  const handleApplyNow = () => {
    window.open("https://form.jotform.com/251417715331047", "_blank");
  };

  const stats = [
    { number: "$1B+", label: "In Working Capital Funded" },
    { number: "50+", label: "Expert Specialists" },
    { number: "5+", label: "Financing Options" },
    { number: "24 hrs", label: "Average Approval Time" }
  ];

  const values = [
    {
      icon: CheckCircle,
      title: "Integrity",
      description: "We operate with complete transparency and honesty in all our business dealings."
    },
    {
      icon: Users,
      title: "Partnership",
      description: "We work as your trusted partner, not just a funding provider."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for excellence in everything we do, from customer service to funding solutions."
    },
    {
      icon: TrendingUp,
      title: "Growth",
      description: "We're committed to helping your business achieve sustainable growth and success."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-40 md:pt-48 pb-16 bg-gradient-to-br from-[#85abe4] to-blue-600">
        <div className="absolute inset-0 bg-gradient-to-r from-[#85abe4]/30 to-transparent"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=600&fit=crop')"
          }}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About FundTek Capital Group
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Your trusted partner in business financing solutions, dedicated to helping businesses grow and thrive.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">Our Track Record</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Since our founding, FundTek Capital Group has established itself as a trusted leader in business financing solutions.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center bg-white p-8 rounded-lg shadow-lg">
                <div className="text-4xl md:text-5xl font-bold text-[#85abe4] mb-4">
                  {stat.number}
                </div>
                <div className="text-gray-700 text-base md:text-lg font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-black mb-8">Our Story</h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  FundTek Capital Group was founded with a simple mission: to bridge the gap between traditional banking limitations and the real financing needs of growing businesses. We recognized that entrepreneurs and business owners needed more than just capital – they needed a partner who understood their challenges.
                </p>
                <p>
                  Our journey began when our founders experienced firsthand the frustrations of lengthy bank approval processes, excessive documentation requirements, and rigid lending criteria that often left qualified businesses without the funding they deserved.
                </p>
                <p>
                  Today, we've built a comprehensive network of funding sources and developed streamlined processes that deliver results. We don't just provide financing – we provide solutions that are tailored to each business's unique situation, timeline, and growth objectives.
                </p>
                <p>
                  Every business has a story, and we're here to help write the next successful chapter of yours.
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=500&fit=crop"
                alt="FundTek Capital Group office"
                className="w-full h-80 md:h-96 object-cover rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-[#85abe4] text-white p-6 rounded-lg shadow-lg">
                <div className="text-2xl font-bold">2019</div>
                <div className="text-sm">Founded</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These fundamental principles guide everything we do and shape how we serve our clients every day. They're not just words on a wall – they're the foundation of our company culture.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-lg">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-[#85abe4]/10 rounded-full mb-6">
                  <value.icon className="h-10 w-10 text-[#85abe4]" />
                </div>
                <h3 className="text-2xl font-bold text-black mb-4">
                  {value.title}
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#85abe4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses that have trusted FundTek Capital Group for their financing needs.
          </p>
          <Button 
            onClick={handleApplyNow}
            className="bg-white text-[#85abe4] hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200"
          >
            Apply Now
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}