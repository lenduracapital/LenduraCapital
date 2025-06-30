

import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft, Star, Wrench, Home, Zap } from "lucide-react";
import { useLocation } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function HomeServicesContracting() {
  const [, setLocation] = useLocation();

  const handleApplyNow = () => {
    window.open("https://form.jotform.com/251417715331047", "_blank");
  };

  const handleBackToIndustries = () => {
    setLocation("/qualified-industries");
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 md:pt-40 pb-20 md:pb-32 bg-gradient-to-br from-[#85abe4] to-blue-600 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#85abe4]/30 to-transparent"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&h=600&fit=crop')"
          }}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            onClick={handleBackToIndustries}
            style={{ backgroundColor: '#85abe4', color: 'white' }}
            className="mb-8 text-white border-white hover:bg-white hover:text-[#85abe4] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Industries
          </Button>
          
          <div className="text-left max-w-4xl mt-8 md:mt-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Home Services & Contracting Financing
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Specialized funding solutions for HVAC, plumbing, electrical, roofing, and general contracting businesses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleApplyNow}
                size="lg"
                style={{ backgroundColor: '#85abe4', color: 'white' }}
                className="hover:bg-[#7299d1] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 transform hover:scale-105 active:scale-95 text-lg px-8 py-3 font-semibold shadow-lg"
              >
                Get Approved in 24 Hours
              </Button>
              <Button 
                onClick={() => setLocation("/solutions")}
                size="lg"
                style={{ backgroundColor: '#85abe4', color: 'white' }}
                className="hover:bg-[#7299d1] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 transform hover:scale-105 active:scale-95 text-lg px-8 py-3 font-semibold rounded-lg shadow-lg"
              >
                View All Solutions
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Overview */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6 md:mb-8">
                Powering Home Service Businesses
              </h2>
              <div className="text-lg md:text-xl text-gray-700 mb-8 md:mb-12 leading-relaxed space-y-4">
                <p>Home services and contracting businesses face unique challenges: seasonal fluctuations, equipment costs, project funding, and managing cash flow between jobs.</p>
                <p>FundTek Capital Group understands these challenges and provides tailored financing solutions that help contractors and service providers grow their businesses, purchase equipment, and maintain steady cash flow.</p>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-black mb-6">Common Financing Needs</h3>
              <ul className="space-y-4 mb-8 md:mb-12">
                {[
                  "HVAC equipment and installation tools",
                  "Service vehicles and work trucks", 
                  "Project materials and supplies",
                  "Seasonal cash flow management",
                  "Business expansion and growth",
                  "Emergency equipment replacement"
                ].map((need, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0" style={{ color: '#85abe4' }} />
                    <span className="text-gray-700">{need}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop"
                alt="Home services and contracting work"
                className="w-full h-80 md:h-96 lg:h-[500px] object-cover rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-[#85abe4] text-white p-6 rounded-lg shadow-lg">
                <div className="text-sm font-medium">Fast Approval</div>
                <div className="text-2xl font-bold">24-48hrs</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Types */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
              Service Types We Fund
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From specialized trades to general contracting, we provide financing across all home service sectors
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Wrench className="w-8 h-8" />,
                title: "HVAC Services",
                description: "Heating, ventilation, air conditioning installation, repair, and maintenance services"
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Electrical Contracting", 
                description: "Residential and commercial electrical installation, repair, and upgrade services"
              },
              {
                icon: <Home className="w-8 h-8" />,
                title: "Plumbing Services",
                description: "Plumbing installation, repair, drain cleaning, and water system services"
              },
              {
                icon: <Home className="w-8 h-8" />,
                title: "Roofing Contractors",
                description: "Roof installation, repair, replacement, and maintenance for residential and commercial properties"
              },
              {
                icon: <Wrench className="w-8 h-8" />,
                title: "General Contracting",
                description: "Home remodeling, renovation, construction, and general contracting services"
              },
              {
                icon: <Home className="w-8 h-8" />,
                title: "Landscaping & Lawn Care",
                description: "Landscaping design, lawn maintenance, tree services, and outdoor improvement projects"
              }
            ].map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-[#85abe4]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div style={{ color: '#85abe4' }}>{service.icon}</div>
                </div>
                <h3 className="text-lg font-bold text-black mb-3">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Success Stories */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real contractors who grew their businesses with FundTek Capital Group financing
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Mike Rodriguez",
                company: "Rodriguez HVAC Solutions",
                story: "Used equipment financing to purchase 3 new HVAC units and a service van. Increased monthly revenue by 40% and added 2 employees.",
                funding: "$85,000 Equipment Financing"
              },
              {
                name: "Sarah Chen",
                company: "Elite Electrical Services",
                story: "Secured working capital to take on larger commercial projects. Went from residential only to major commercial contracts.",
                funding: "$150,000 Line of Credit"
              },
              {
                name: "Tony Garcia",
                company: "Garcia Roofing Co.",
                story: "Got emergency funding when his truck broke down during busy season. Purchased new work truck and additional equipment.",
                funding: "$65,000 Term Loan"
              }
            ].map((story, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-lg border-l-4 border-[#85abe4]">
                <div className="flex items-start space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{story.story}"</p>
                <div className="border-t pt-4">
                  <div className="font-semibold text-black">{story.name}</div>
                  <div className="text-sm text-gray-600 mb-2">{story.company}</div>
                  <div className="text-sm font-medium" style={{ color: '#85abe4' }}>{story.funding}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Solutions */}
      <section className="py-16 md:py-24 bg-[#85abe4] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Recommended Financing Solutions
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
            Based on typical home service business needs, these solutions work best for contractors
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <h3 className="text-xl font-bold mb-4">Equipment Financing</h3>
              <p className="text-blue-100 mb-6">Perfect for HVAC units, tools, and specialized equipment purchases</p>
              <Button 
                onClick={() => setLocation("/solutions/equipment-financing")}
                style={{ backgroundColor: '#85abe4', color: 'white' }}
                className="text-white border-white hover:bg-white hover:text-[#85abe4]"
              >
                Learn More
              </Button>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <h3 className="text-xl font-bold mb-4">Lines of Credit</h3>
              <p className="text-blue-100 mb-6">Flexible access to working capital for materials and seasonal cash flow</p>
              <Button 
                onClick={() => setLocation("/solutions/lines-of-credit")}
                style={{ backgroundColor: '#85abe4', color: 'white' }}
                className="text-white border-white hover:bg-white hover:text-[#85abe4]"
              >
                Learn More
              </Button>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <h3 className="text-xl font-bold mb-4">Cash Advance</h3>
              <p className="text-blue-100 mb-6">Quick access to capital based on your credit card processing volume</p>
              <Button 
                onClick={() => setLocation("/solutions/merchant-cash-advance")}
                style={{ backgroundColor: '#85abe4', color: 'white' }}
                className="text-white border-white hover:bg-white hover:text-[#85abe4]"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Accelerate Growth Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Accelerate Your Business Growth
            </h2>
            <p className="text-lg md:text-xl text-gray-600">
              Take advantage of our specialized financing solutions for home service professionals
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Grow Your Home Service Business?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Get the funding you need to purchase equipment, manage cash flow, and take on bigger projects
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleApplyNow}
              size="lg"
              style={{ backgroundColor: '#85abe4' }}
              className="hover:bg-[#7299d1] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 transform hover:scale-105 active:scale-95 text-lg px-8 py-3 font-semibold text-white shadow-lg"
            >
              Apply Now - Get Approved in 24 Hours
            </Button>
            <Button 
              onClick={() => setLocation("/contact")}
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 transform hover:scale-105 active:scale-95 text-lg px-8 py-3 shadow-lg"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}