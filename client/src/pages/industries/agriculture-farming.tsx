import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft, Star, Wheat, Tractor, Sprout } from "lucide-react";
import { useLocation } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";



export default function AgricultureFarming() {
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
            backgroundImage: "url('https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1200&h=600&fit=crop')"
          }}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            onClick={handleBackToIndustries}
            style={{ backgroundColor: '#85abe4', color: 'white' }}
            className="mb-8 text-white border-white hover:bg-white hover:text-[#85abe4] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Industries
          </Button>
          
          <div className="text-left max-w-4xl mt-8 md:mt-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Agriculture & Farming Financing
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Cultivate growth with financing for equipment, land, livestock, and seasonal operations.
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
                style={{ color: 'white', borderColor: '#85abe4', backgroundColor: '#85abe4' }}
                className="hover:bg-[#7299d1] hover:border-[#7299d1] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 transform hover:scale-105 active:scale-95 text-lg px-8 py-3 font-semibold border shadow-lg"
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
                Growing Agricultural Success
              </h2>
              <div className="text-lg md:text-xl text-gray-700 mb-8 md:mb-12 leading-relaxed space-y-4">
                <p>Agricultural businesses face unique challenges: seasonal cash flow, weather risks, equipment costs, commodity price fluctuations, and managing large-scale operations efficiently.</p>
                <p>FundTek Capital Group understands farming operations and provides flexible financing solutions that help agricultural businesses purchase equipment, manage seasonal expenses, and expand operations.</p>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-black mb-6">Common Financing Needs</h3>
              <ul className="space-y-4 mb-8 md:mb-12">
                {[
                  "Tractors and farm equipment",
                  "Livestock and breeding programs", 
                  "Seed and fertilizer purchases",
                  "Land acquisition and improvements",
                  "Seasonal operating expenses",
                  "Storage and processing facilities"
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
                src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&h=600&fit=crop"
                alt="Agriculture and farming operations"
                className="w-full h-80 md:h-96 lg:h-[500px] object-cover rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-[#85abe4] text-white p-6 rounded-lg shadow-lg">
                <div className="text-sm font-medium text-white">Fast Approval</div>
                <div className="text-2xl font-bold text-white">24-48hrs</div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Business Financing Steps */}
      <section className="py-16 md:py-24" style={{ backgroundColor: '#85abe4' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Business Financing To Fit Your Business Needs.
            </h2>
            <p className="text-xl text-white/90">
              Just 3 Easy Steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold" style={{ color: '#85abe4' }}>1</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Apply Online</h3>
              <p className="text-white/90">Quick and secure application process</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold" style={{ color: '#85abe4' }}>2</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Approval in 1 hour</h3>
              <p className="text-white/90">Fast decision process</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold" style={{ color: '#85abe4' }}>3</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Get Funded</h3>
              <p className="text-white/90">Receive your funds quickly</p>
            </div>
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
              Real agricultural businesses that grew with FundTek Capital Group financing
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "John Peterson",
                company: "Peterson Family Farms",
                story: "Used equipment financing to purchase new tractors and irrigation system. Increased crop yield by 40% and reduced water usage significantly.",
                funding: "$280,000 Equipment Financing"
              },
              {
                name: "Sarah Williams",
                company: "Sunrise Dairy Operations",
                story: "Secured working capital for cattle purchase and facility expansion. Doubled milk production and secured premium supplier contracts.",
                funding: "$350,000 Term Loan"
              },
              {
                name: "Miguel Garcia",
                company: "Garcia Organic Produce",
                story: "Got line of credit for seasonal expenses and organic certification. Expanded to three farmers markets and increased profits 65%.",
                funding: "$125,000 Line of Credit"
              }
            ].map((story, index) => (
              <div key={index} className="bg-white p-8 rounded-lg border-l-4 border-[#85abe4] shadow-lg">
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
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
            Recommended Financing Solutions
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
            Based on typical agricultural needs, these solutions work best for farming operations
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <h3 className="text-xl font-bold mb-4 text-white">Equipment Financing</h3>
              <p className="text-blue-100 mb-6">Perfect for tractors, harvesting equipment, and agricultural machinery</p>
              <Button 
                onClick={() => setLocation("/solutions/equipment-financing")}
                style={{ backgroundColor: '#85abe4', color: 'white' }}
                className="hover:opacity-90 font-semibold"
              >
                Learn More
              </Button>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <h3 className="text-xl font-bold mb-4 text-white">Lines of Credit</h3>
              <p className="text-blue-100 mb-6">Flexible working capital for seasonal expenses and operations</p>
              <Button 
                onClick={() => setLocation("/solutions/lines-of-credit")}
                style={{ backgroundColor: '#85abe4', color: 'white' }}
                className="hover:opacity-90 font-semibold"
              >
                Learn More
              </Button>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <h3 className="text-xl font-bold mb-4 text-white">Term Loans</h3>
              <p className="text-blue-100 mb-6">Long-term financing for land purchase and facility development</p>
              <Button 
                onClick={() => setLocation("/solutions/term-loans")}
                style={{ backgroundColor: '#85abe4', color: 'white' }}
                className="hover:opacity-90 font-semibold"
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to Grow Your Agricultural Business?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Get the funding you need to purchase equipment, expand operations, and invest in your farm's future
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
              style={{ backgroundColor: '#85abe4', color: 'white' }}
              size="lg"
              className="text-white border-white hover:bg-white hover:text-gray-900 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 transform hover:scale-105 active:scale-95 text-lg px-8 py-3 font-semibold shadow-lg"
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