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
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-[#85abe4] to-blue-600">
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
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#85abe4] mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-gray-600 mb-6">
                FundTek Capital Group was founded with a simple mission: to provide businesses with fast, flexible, and reliable funding solutions. We understand that traditional banking can be slow and restrictive, which is why we've built a network of trusted lenders to offer alternative financing options.
              </p>
              <p className="text-gray-600 mb-6">
                Over the years, we've helped thousands of businesses access the capital they need to grow, expand, and overcome financial challenges. Our team of experienced professionals works tirelessly to match each business with the right funding solution for their unique needs.
              </p>
              <p className="text-gray-600">
                Today, we continue to innovate and expand our services, always putting our clients' success at the center of everything we do.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop"
                alt="Team meeting"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do and shape how we serve our clients every day.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#85abe4]/10 rounded-full mb-4">
                  <value.icon className="h-8 w-8 text-[#85abe4]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">
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