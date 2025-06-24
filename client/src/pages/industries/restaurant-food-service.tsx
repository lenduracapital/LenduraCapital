import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft, Star, ChefHat, Utensils, Coffee } from "lucide-react";
import { useLocation } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function RestaurantFoodService() {
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
            backgroundImage: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=600&fit=crop')"
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
              Restaurant & Food Service Financing
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Serve up success with flexible financing for equipment, renovations, and working capital.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleApplyNow}
                size="lg"
                style={{ backgroundColor: '#85abe4', color: 'white' }}
                className="hover:opacity-90 text-lg px-8 py-3 font-semibold"
              >
                Get Approved in 24 Hours
              </Button>
              <Button 
                onClick={() => setLocation("/solutions")}
                style={{ backgroundColor: '#85abe4', color: 'white' }}
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
                Feeding Success in Food Service
              </h2>
              <div className="text-lg md:text-xl text-gray-700 mb-8 md:mb-12 leading-relaxed space-y-4">
                <p>Restaurant and food service businesses face unique challenges: seasonal fluctuations, equipment costs, inventory management, and maintaining cash flow during slow periods.</p>
                <p>FundTek Capital Group understands the food service industry and provides flexible financing solutions that help restaurant owners purchase equipment, renovate spaces, and maintain steady operations.</p>
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
                    <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0" style={{ color: '#85abe4' }} />
                    <span className="text-gray-700">{need}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop"
                alt="Restaurant and food service business"
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

      {/* Success Stories */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real restaurant owners who grew their businesses with FundTek Capital Group financing
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Maria Gonzalez",
                company: "Gonzalez Bistro",
                story: "Used equipment financing to purchase new commercial kitchen equipment after equipment failure. Reopened within days instead of weeks.",
                funding: "$65,000 Equipment Financing"
              },
              {
                name: "Chef David Kim",
                company: "Seoul Kitchen",
                story: "Secured working capital to expand catering operations and hire additional staff. Catering revenue increased 150% in one year.",
                funding: "$85,000 Line of Credit"
              },
              {
                name: "Anthony Romano",
                company: "Romano's Italian",
                story: "Got renovation financing to modernize dining room and expand seating capacity. Customer satisfaction and revenue both increased significantly.",
                funding: "$120,000 Term Loan"
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
            Based on typical restaurant needs, these solutions work best for food service businesses
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <h3 className="text-xl font-bold mb-4 text-white">Equipment Financing</h3>
              <p className="text-blue-100 mb-6">Perfect for kitchen equipment, appliances, and point-of-sale systems</p>
              <Button 
                onClick={() => setLocation("/solutions/equipment-financing")}
                style={{ backgroundColor: '#85abe4', color: 'white' }}
                className="hover:opacity-90 font-semibold"
              >
                Learn More
              </Button>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <h3 className="text-xl font-bold mb-4 text-white">Term Loans</h3>
              <p className="text-blue-100 mb-6">Ideal for renovations, expansions, and major improvements</p>
              <Button 
                onClick={() => setLocation("/solutions/term-loans")}
                style={{ backgroundColor: '#85abe4', color: 'white' }}
                className="hover:opacity-90 font-semibold"
              >
                Learn More
              </Button>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <h3 className="text-xl font-bold mb-4 text-white">Cash Advance</h3>
              <p className="text-blue-100 mb-6">Quick access to capital based on your credit card processing volume</p>
              <Button 
                onClick={() => setLocation("/solutions/merchant-cash-advance")}
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
            Ready to Grow Your Restaurant?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Get the funding you need to purchase equipment, renovate your space, and expand your operations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleApplyNow}
              size="lg"
              style={{ backgroundColor: '#85abe4' }}
              className="hover:opacity-90 text-lg px-8 py-3 font-semibold text-white"
            >
              Apply Now - Get Approved in 24 Hours
            </Button>
            <Button 
              onClick={() => setLocation("/contact")}
              style={{ backgroundColor: '#85abe4', color: 'white' }}
              size="lg"
              className="text-white border-white hover:bg-white hover:text-gray-900 text-lg px-8 py-3 font-semibold"
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