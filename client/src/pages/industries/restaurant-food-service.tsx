import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft, Star, Utensils, ChefHat, Clock } from "lucide-react";
import { useLocation } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import restaurantImage from "@assets/restaurant.jpg";



export default function RestaurantFoodService() {
  const [, setLocation] = useLocation();

  const handleApplyNow = () => {
    window.open("https://form.jotform.com/251965461165159", "_blank");
  };

  const handleBackToIndustries = () => {
    setLocation("/qualified-industries");
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-20 sm:pt-24 md:pt-32 lg:pt-40 pb-16 sm:pb-20 md:pb-24 lg:pb-32 bg-gradient-to-br from-[#193a59] to-[#285d8a] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#193a59]/30 to-transparent"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url(${restaurantImage})`
          }}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            onClick={handleBackToIndustries}
            style={{ backgroundColor: '#193a59', color: 'white' }}
            className="mb-8 text-white border-white hover:bg-white hover:text-[#193a59] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Industries
          </Button>
          
          <div className="text-left max-w-4xl mt-8 md:mt-16">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-4 sm:mb-6">
              Restaurant & Food Service Financing
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-100 mb-6 sm:mb-8 leading-relaxed">
              Serve success with financing for equipment, renovations, and operational needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
              <Button 
                onClick={handleApplyNow}
                size="lg"
                style={{ backgroundColor: '#193a59', color: 'white' }}
                className="hover:bg-[#285d8a] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 transform hover:scale-105 active:scale-95 text-lg px-8 py-3 font-semibold shadow-lg"
              >
                Get Approved in 24 Hours
              </Button>
              <Button 
                onClick={() => setLocation("/solutions")}
                size="lg"
                style={{ color: 'white', borderColor: '#193a59', backgroundColor: '#193a59' }}
                className="hover:bg-[#285d8a] hover:border-[#285d8a] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 transform hover:scale-105 active:scale-95 text-lg px-8 py-3 font-semibold border shadow-lg"
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
                Feeding Success in Food Service
              </h2>
              <div className="text-lg md:text-xl text-gray-700 mb-8 md:mb-12 leading-relaxed space-y-4">
                <p>Restaurant and food service businesses face unique challenges: seasonal fluctuations, equipment costs, inventory management, and maintaining cash flow during slow periods.</p>
                <p>Lendura Capital understands the food service industry and provides flexible financing solutions that help restaurant owners purchase equipment, renovate spaces, and maintain steady operations.</p>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-black mb-6">Common Financing Needs</h3>
              <ul className="space-y-4 mb-8 md:mb-12">
                {[
                  "Kitchen equipment and appliances",
                  "Restaurant renovations and buildouts", 
                  "Inventory and food supplies",
                  "Point-of-sale systems and technology",
                  "Seasonal cash flow management",
                  "Expansion to new locations"
                ].map((need, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0" style={{ color: '#193a59' }} />
                    <span className="text-gray-700">{need}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative">
              <img 
                src={restaurantImage}
                alt="Restaurant and food service"
                className="w-full h-80 md:h-96 lg:h-[500px] object-cover rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-[#193a59] text-white p-6 rounded-lg shadow-lg">
                <div className="text-sm font-medium text-white">Fast Approval</div>
                <div className="text-2xl font-bold text-white">24-48hrs</div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Business Financing Steps */}
      <section className="py-16 md:py-24" style={{ backgroundColor: '#193a59' }}>
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
                <span className="text-2xl font-bold" style={{ color: '#193a59' }}>1</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Apply Online</h3>
              <p className="text-white/90">Quick and secure application process</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold" style={{ color: '#193a59' }}>2</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Approval in 1 hour</h3>
              <p className="text-white/90">Fast decision process</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold" style={{ color: '#193a59' }}>3</span>
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
              Real restaurant owners who enhanced their operations with Lendura Capital financing
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Antonio Ricci",
                company: "Nonna's Kitchen",
                story: "Two ovens died same week during our busiest season. Kitchen was backed up for hours. James from Lendura Capital understood restaurants - got me funded Friday afternoon so I could get new equipment installed over weekend.",
                funding: "$125,000 Equipment Financing"
              },
              {
                name: "Nancy Chen",
                company: "Lucky Dragon",
                story: "Health inspector required immediate ventilation upgrade or we'd close. Had regular customers coming for 15 years. Irving expedited everything, kept in touch daily until funding cleared. Saved our family business.",
                funding: "$85,000 Term Loan"
              },
              {
                name: "Sofia Gutierrez",
                company: "Café Luna",
                story: "Pandemic killed our dine-in, needed cash for delivery setup and marketing. Banks said restaurant industry too risky. Ava understood the pivot to takeout - she got us through the crisis.",
                funding: "$65,000 Line of Credit"
              }
            ].map((story, index) => (
              <div key={index} className="bg-white p-8 rounded-lg border-l-4 border-[#193a59] shadow-lg">
                <div className="flex items-start space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{story.story}"</p>
                <div className="border-t pt-4">
                  <div className="font-semibold text-black">{story.name}</div>
                  <div className="text-sm text-gray-600 mb-2">{story.company}</div>
                  <div className="text-sm font-medium" style={{ color: '#193a59' }}>{story.funding}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Solutions */}
      <section className="py-16 md:py-24 bg-[#193a59] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
            Recommended Financing Solutions
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
            Based on typical restaurant needs, these solutions work best for food service businesses
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <h3 className="text-xl font-bold mb-4 text-white">Equipment Financing</h3>
              <p className="text-blue-100 mb-6">Perfect for kitchen equipment, appliances, and technology systems</p>
              <Button 
                onClick={() => setLocation("/solutions/equipment-financing")}
                style={{ backgroundColor: '#193a59', color: 'white' }}
                className="hover:opacity-90 font-semibold"
              >
                Learn More
              </Button>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <h3 className="text-xl font-bold mb-4 text-white">Term Loans</h3>
              <p className="text-blue-100 mb-6">Ideal for renovations, buildouts, and location expansion</p>
              <Button 
                onClick={() => setLocation("/solutions/term-loans")}
                style={{ backgroundColor: '#193a59', color: 'white' }}
                className="hover:opacity-90 font-semibold"
              >
                Learn More
              </Button>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <h3 className="text-xl font-bold mb-4 text-white">Lines of Credit</h3>
              <p className="text-blue-100 mb-6">Flexible working capital for inventory and seasonal operations</p>
              <Button 
                onClick={() => setLocation("/solutions/lines-of-credit")}
                style={{ backgroundColor: '#193a59', color: 'white' }}
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
            Ready to Grow Your Restaurant?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Get the funding you need to purchase equipment, renovate your space, and expand your food service business
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleApplyNow}
              size="lg"
              style={{ backgroundColor: '#193a59' }}
              className="hover:bg-[#285d8a] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 transform hover:scale-105 active:scale-95 text-lg px-8 py-3 font-semibold text-white shadow-lg"
            >
              Apply Now - Get Approved in 24 Hours
            </Button>
            <Button 
              onClick={() => setLocation("/contact")}
              style={{ backgroundColor: '#193a59', color: 'white' }}
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