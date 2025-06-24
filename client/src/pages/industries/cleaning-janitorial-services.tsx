import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft, Star, Truck, Building, Sparkles } from "lucide-react";
import { useLocation } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function CleaningJanitorialServices() {
  const [, setLocation] = useLocation();

  const handleApplyNow = () => {
    window.open("https://form.jotform.com/251417715331047", "_blank");
  };

  const handleBackToIndustries = () => {
    setLocation("/who-we-fund");
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
            backgroundImage: "url('https://images.unsplash.com/photo-1563453392212-326f5e854473?w=1200&h=600&fit=crop')"
          }}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            onClick={handleBackToIndustries}
            variant="outline"
            className="mb-8 text-white border-white hover:bg-white hover:text-[#85abe4] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Industries
          </Button>
          
          <div className="text-left max-w-4xl mt-8 md:mt-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Cleaning & Janitorial Services Financing
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Specialized funding solutions for commercial cleaning, janitorial, and facility maintenance businesses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleApplyNow}
                size="lg"
                style={{ backgroundColor: 'white', color: '#85abe4' }}
                className="hover:bg-gray-100 text-lg px-8 py-3 font-semibold"
              >
                Get Approved in 24 Hours
              </Button>
              <Button 
                onClick={() => setLocation("/solutions")}
                variant="outline"
                size="lg"
                style={{ color: 'white', borderColor: 'white' }}
                className="hover:bg-white hover:text-[#85abe4] text-lg px-8 py-3 font-semibold"
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
                Supporting Professional Cleaning Businesses
              </h2>
              <div className="text-lg md:text-xl text-gray-700 mb-8 md:mb-12 leading-relaxed space-y-4">
                <p>Cleaning and janitorial service businesses require reliable equipment, transportation, and consistent cash flow to maintain high service standards and grow their client base.</p>
                <p>FundTek Capital Group provides tailored financing solutions that help cleaning companies purchase equipment, expand their fleet, hire staff, and secure larger commercial contracts.</p>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-black mb-6">Common Financing Needs</h3>
              <ul className="space-y-4 mb-8 md:mb-12">
                {[
                  "Commercial cleaning equipment and supplies",
                  "Service vehicles and cargo vans", 
                  "Floor care machinery and carpet cleaners",
                  "Contract fulfillment and payroll funding",
                  "Business expansion and new locations",
                  "Equipment replacement and upgrades"
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
                src="https://images.unsplash.com/photo-1563453392212-326f5e854473?w=800&h=600&fit=crop"
                alt="Professional cleaning and janitorial services"
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
              Cleaning Services We Fund
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From office cleaning to specialized sanitization, we provide financing across all cleaning service sectors
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Building className="w-8 h-8" />,
                title: "Commercial Office Cleaning",
                description: "Daily office cleaning, restroom maintenance, and corporate facility management services"
              },
              {
                icon: <Sparkles className="w-8 h-8" />,
                title: "Specialized Sanitization", 
                description: "Healthcare facility cleaning, medical office sanitization, and infection control services"
              },
              {
                icon: <Building className="w-8 h-8" />,
                title: "Industrial Cleaning",
                description: "Manufacturing facility cleaning, warehouse maintenance, and industrial equipment cleaning"
              },
              {
                icon: <Truck className="w-8 h-8" />,
                title: "Carpet & Floor Care",
                description: "Professional carpet cleaning, floor refinishing, and specialized surface maintenance"
              },
              {
                icon: <Building className="w-8 h-8" />,
                title: "Post-Construction Cleanup",
                description: "Construction site cleaning, debris removal, and final project cleanup services"
              },
              {
                icon: <Sparkles className="w-8 h-8" />,
                title: "Residential Cleaning",
                description: "House cleaning services, move-in/move-out cleaning, and residential maintenance"
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
              Real cleaning business owners who scaled their operations with FundTek Capital Group financing
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Maria Santos",
                company: "Premier Office Solutions",
                story: "Secured equipment financing to purchase commercial floor machines and expand into medical facility cleaning. Tripled monthly contracts.",
                funding: "$45,000 Equipment Financing"
              },
              {
                name: "David Kim",
                company: "Elite Janitorial Services",
                story: "Used working capital to hire additional staff and secure a major corporate contract. Went from 5 to 25 employees in 8 months.",
                funding: "$120,000 Line of Credit"
              },
              {
                name: "Jennifer Lopez",
                company: "Clean Pro Industries",
                story: "Got vehicle financing for 3 cargo vans and specialized equipment. Expanded service area and increased revenue by 60%.",
                funding: "$75,000 Term Loan"
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
            Based on typical cleaning business needs, these solutions work best for service providers
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <h3 className="text-xl font-bold mb-4">Equipment Financing</h3>
              <p className="text-blue-100 mb-6">Perfect for commercial cleaning equipment, floor machines, and vehicles</p>
              <Button 
                onClick={() => setLocation("/solutions/equipment-financing")}
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-[#85abe4]"
              >
                Learn More
              </Button>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <h3 className="text-xl font-bold mb-4">Lines of Credit</h3>
              <p className="text-blue-100 mb-6">Flexible working capital for supplies, payroll, and contract fulfillment</p>
              <Button 
                onClick={() => setLocation("/solutions/lines-of-credit")}
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-[#85abe4]"
              >
                Learn More
              </Button>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <h3 className="text-xl font-bold mb-4">Invoice Factoring</h3>
              <p className="text-blue-100 mb-6">Convert outstanding invoices to immediate cash for steady cash flow</p>
              <Button 
                onClick={() => setLocation("/solutions/invoice-factoring")}
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-[#85abe4]"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Scale Your Cleaning Business?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Get the funding you need to purchase equipment, expand your fleet, and secure larger contracts
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleApplyNow}
              size="lg"
              style={{ backgroundColor: '#85abe4' }}
              className="hover:opacity-90 text-lg px-8 py-3"
            >
              Apply Now - Get Approved in 24 Hours
            </Button>
            <Button 
              onClick={() => setLocation("/contact")}
              variant="outline"
              size="lg"
              className="text-white border-white hover:bg-white hover:text-gray-900 text-lg px-8 py-3"
            >
              Contact Our Specialists
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}