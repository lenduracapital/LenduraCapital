import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { CheckCircle, Users, Award, TrendingUp } from "lucide-react";

export default function About() {
  const [, setLocation] = useLocation();

  const handleApplyNow = () => {
    window.open("https://form.jotform.com/251965461165159", "_blank");
  };

  const stats = [
    { number: "$1B+", label: "In Working Capital Funded" },
    { number: "50+", label: "Expert Specialists" },
    { number: "12", label: "Financing Options" },
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
      <section className="relative pt-40 md:pt-48 pb-16 bg-gradient-to-br from-[#193a59] to-[#285d8a]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#193a59]/30 to-transparent"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=600&fit=crop')"
          }}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About Lendura Capital
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
              Since our founding, Lendura Capital has established itself as a trusted leader in business financing solutions.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center bg-white p-8 rounded-lg shadow-lg">
                <div className="text-4xl md:text-5xl font-bold text-[#193a59] mb-4">
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
                  Lendura Capital was founded with a simple mission: to bridge the gap between traditional banking limitations and the real financing needs of growing businesses. We recognized that entrepreneurs and business owners needed more than just capital – they needed a partner who understood their challenges.
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
                alt="Lendura Capital office"
                className="w-full h-80 md:h-96 object-cover rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-[#193a59] text-white p-6 rounded-lg shadow-lg">
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
                <div className="inline-flex items-center justify-center w-20 h-20 bg-[#193a59]/10 rounded-full mb-6">
                  <value.icon className="h-10 w-10 text-[#193a59]" />
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

      {/* Why Choose Us Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">Why Choose Lendura Capital?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We've built our reputation on delivering results when traditional banking falls short. Here's what sets us apart from other funding companies.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-12 mb-16">
            <div className="text-center">
              <div className="bg-[#193a59]/10 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <div className="text-3xl font-bold text-[#193a59]">24hr</div>
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">Lightning Fast Process</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                While banks take weeks or months, we deliver funding decisions in 24 hours. Our streamlined process eliminates unnecessary delays and gets you the capital you need when you need it.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-[#193a59]/10 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <div className="text-3xl font-bold text-[#193a59]">50+</div>
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">Expert Team</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our team of 50+ financing specialists brings decades of combined experience. We understand every industry and know exactly which funding solutions work best for different business models.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-[#193a59]/10 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <div className="text-3xl font-bold text-[#193a59]">$1B+</div>
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">Proven Track Record</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                We've successfully funded over $1 billion in working capital for businesses across America. Our results speak for themselves – we deliver on our promises.
              </p>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-12">
            <h3 className="text-3xl font-bold text-black mb-8 text-center">The FundTek Advantage</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-lg font-semibold text-black mb-2">No Hidden Fees</h4>
                    <p className="text-gray-700">Complete transparency in all our pricing with no surprise charges or hidden costs.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-lg font-semibold text-black mb-2">Flexible Requirements</h4>
                    <p className="text-gray-700">We work with businesses that banks often reject, including those with credit challenges.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-lg font-semibold text-black mb-2">Multiple Options</h4>
                    <p className="text-gray-700">Access to 12 different financing solutions ensures we find the right fit for your business.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-lg font-semibold text-black mb-2">Personal Service</h4>
                    <p className="text-gray-700">Dedicated account managers who understand your business and provide ongoing support.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-lg font-semibold text-black mb-2">Same-Day Funding</h4>
                    <p className="text-gray-700">Once approved, funds can be in your account as quickly as the same business day.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-lg font-semibold text-black mb-2">Ongoing Partnership</h4>
                    <p className="text-gray-700">We build long-term relationships and help with future funding needs as you grow.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#193a59]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Experience the FundTek Difference?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Join thousands of businesses who have discovered that fast, flexible financing doesn't have to come with complicated processes. Get your funding decision in 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={handleApplyNow}
              className="bg-white text-[#193a59] hover:bg-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 transform hover:scale-105 active:scale-95 px-8 py-4 text-lg font-semibold shadow-lg"
            >
              Apply for Funding Today
            </Button>
            <Button 
              onClick={() => setLocation("/solutions")}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#193a59] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 transform hover:scale-105 active:scale-95 px-8 py-4 text-lg font-semibold"
            >
              View Our Solutions
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}