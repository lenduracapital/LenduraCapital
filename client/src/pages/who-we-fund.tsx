import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import BackToTop from "@/components/back-to-top";
import SEOHead from "@/components/seo-head";
import truckingImage from "@assets/trucking.jpg";
import medicalImage from "@assets/medical.jpg";
import constructionImage from "@assets/construction.jpg";
import restaurantImage from "@assets/restaurant.jpg";
import retailImage from "@assets/retail.jpg";
import manufacturingImage from "@assets/manufacturing.jpg";
import techImage from "@assets/tech.jpg";
import autoImage from "@assets/auto.jpg";
import beautyImage from "@assets/beauty.jpg";
import hospitalityImage from "@assets/hospitality.jpg";
import eagricultureImage from "@assets/eagriculture.jpg";
import realestateImage from "@assets/realestate.jpg";
import eventsImage from "@assets/events.jpg";
import educationImage from "@assets/education.jpg";
import homeservicesImage from "@assets/homeservices.jpg";
import cleaningImage from "@assets/cleaning.jpg";
import franchisesImage from "@assets/franchises.jpg";


const industryCategories = {
  "Service-Based Industries": [
    {
      title: "Medical & Healthcare",
      description: "Medical practices require funding for expensive equipment, facility expansion, technology upgrades, and managing patient payment cycles effectively.",
      image: medicalImage
    },
    {
      title: "Professional Services",
      description: "Law firms, accounting practices, and consulting companies require funding for technology, expansion, staff hiring, and cash flow management.",
      image: "/attached_assets/pexels-kindelmedia-7979438_1752763530596.jpg"
    },
    {
      title: "Beauty & Wellness",
      description: "Salons, spas, and fitness centers need capital for equipment, renovations, inventory, and expansion to serve growing customer demand effectively.",
      image: beautyImage
    },
    {
      title: "Home Services & Contracting",
      description: "Contractors require funding for equipment, tools, vehicle fleets, project materials, and bridging payment gaps between completed projects.",
      image: homeservicesImage
    },
    {
      title: "Cleaning & Janitorial Services", 
      description: "Cleaning companies need funding for equipment, vehicles, supplies, staff expansion, and securing contracts with commercial property clients.",
      image: cleaningImage
    },
    {
      title: "Education & Training",
      description: "Educational institutions require funding for technology upgrades, facility improvements, program expansion, and adapting to changing learning needs.",
      image: educationImage
    }
  ],
  "Product & Manufacturing": [
    {
      title: "Manufacturing",
      description: "Manufacturers need funding for raw materials, equipment upgrades, production scaling, facility expansion, and managing large order fulfillment.",
      image: manufacturingImage
    },
    {
      title: "Retail & E-commerce",
      description: "Retail businesses require inventory financing, seasonal capital, marketing investments, and funding for expansion into new markets or locations.",
      image: retailImage
    },
    {
      title: "Restaurant & Food Service",
      description: "Restaurants face equipment costs, inventory expenses, seasonal fluctuations, and need capital for renovations and expansion opportunities.",
      image: restaurantImage
    },
    {
      title: "Auto & Transportation",
      description: "Auto shops and dealerships require funding for inventory, equipment purchases, facility improvements, and expanding service capabilities.",
      image: autoImage
    },
    {
      title: "Agriculture & Farming",
      description: "Agricultural businesses need funding for equipment, livestock, crop production, land acquisition, and managing seasonal cash flow challenges.",
      image: eagricultureImage
    }
  ],
  "Transportation & Logistics": [
    {
      title: "Trucking & Transportation",
      description: "Trucking companies face operational costs, fuel expenses, vehicle maintenance, and pending invoice payments that create challenging cash flow gaps.",
      image: truckingImage
    }
  ],
  "Construction & Real Estate": [
    {
      title: "Construction",
      description: "Construction companies need capital for equipment purchases, material costs, project expenses, and bridging payment gaps between contracts.",
      image: constructionImage
    },
    {
      title: "Real Estate",
      description: "Real estate professionals require funding for property acquisition, renovations, marketing, and managing investment property cash flow cycles.",
      image: realestateImage
    }
  ],
  "Technology & Entertainment": [
    {
      title: "Technology & Software",
      description: "Tech companies need capital for product development, marketing campaigns, talent acquisition, and scaling operations in competitive markets.",
      image: techImage
    },
    {
      title: "Entertainment & Events",
      description: "Event planners and venues need capital for equipment, deposits, marketing, and managing the variable income streams of entertainment business.",
      image: eventsImage
    }
  ],
  "Hospitality & Franchising": [
    {
      title: "Hospitality & Tourism",
      description: "Hotels and tourism businesses require funding for renovations, marketing, seasonal expenses, and expansion projects to attract more visitors.",
      image: hospitalityImage
    },
    {
      title: "Franchises",
      description: "Franchise owners need funding for franchise fees, equipment purchases, inventory, marketing, and multi-location expansion project investments.",
      image: franchisesImage
    }
  ]
};

export default function QualifiedIndustries() {
  const [, setLocation] = useLocation();

  const handleBackToHome = () => {
    setLocation("/");
  };

  const handleApplyNow = () => {
    window.open("https://form.jotform.com/251965461165159", "_blank");
  };

  return (
    <div className="min-h-screen bg-[--bg-primary] text-[--text-primary]">
      <SEOHead
        title="Industries We Fund | 18 Business Sectors | Lendura Capital Brooklyn"
        description="Lendura Capital provides specialized business funding for 18+ industries including trucking, medical, construction, restaurants, retail & more. Bad credit OK. Same day approval. Call (305) 834-7168."
        keywords="business funding by industry, trucking business loans, medical practice financing, construction loans, restaurant funding, retail business loans, manufacturing financing, technology startup funding, Brooklyn business lender"
        canonical="/industries"
      />

      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-40 md:pt-48 pb-32 md:pb-40 bg-gradient-to-br from-[--primary] to-blue-800">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=800&fit=crop')"
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-wider">
            Qualified <span style={{ color: '#193a59' }}>Industries</span>
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 max-w-4xl mx-auto leading-relaxed">
            Lendura Capital specializes in providing tailored financing solutions across diverse industries. 
            Our expertise spans multiple sectors, ensuring we understand your unique business challenges.
          </p>
          <p className="text-lg md:text-xl text-gray-200 mb-12 max-w-3xl mx-auto">
            From healthcare and construction to technology and manufacturing, we have the industry knowledge 
            and funding solutions to accelerate your business growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              onClick={handleApplyNow}
              className="bg-white hover:bg-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 transform hover:scale-105 active:scale-95 px-8 py-4 rounded-lg font-semibold text-lg shadow-lg"
              style={{ color: '#193a59' }}
            >
              Apply for Funding
            </Button>
            <Button 
              onClick={() => window.open('https://calendly.com/lenduracapital/30min', '_blank')}
              className="bg-white hover:bg-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 transform hover:scale-105 active:scale-95 px-8 py-4 rounded-lg font-semibold text-lg shadow-lg"
              style={{ 
                color: '#193a59'
              }}
            >
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              We understand the unique financing needs of different industries and provide tailored solutions
            </p>
          </div>
          
          {Object.entries(industryCategories).map(([categoryName, industries], categoryIndex) => (
            <div key={categoryIndex} className="mb-16">
              {/* Category Header */}
              <div className="mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {categoryName}
                </h3>
                <div className="w-24 h-1 bg-gradient-to-r from-[#193a59] to-[#285d8a] rounded-full"></div>
              </div>
              
              {/* Category Industries Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                {industries.map((industry, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
                    <div 
                      className="h-48 bg-cover bg-center rounded-lg mb-6"
                      style={{ backgroundImage: `url(${industry.image})` }}
                    />
                    
                    <div className="flex flex-col flex-grow">
                      <h3 className={`text-xl font-bold text-gray-900 mb-4 ${industry.title === 'Trucking & Transportation' ? '-mt-2' : ''}`}>
                        {industry.title}
                      </h3>
                      <div className="w-12 h-1 mb-4" style={{ backgroundColor: '#193a59' }}></div>
                      <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                        {industry.description}
                      </p>
                      
                      <div className="mt-auto">
                        <Button 
                          onClick={() => {
                            // Create mapping for specific industry titles to match file names
                            const slugMap = {
                              "Trucking & Transportation": "trucking-transportation",
                              "Medical & Healthcare": "medical-healthcare", 
                              "Construction": "construction",
                              "Restaurant & Food Service": "restaurant-food-service",
                              "Retail & E-commerce": "retail-e-commerce",
                              "Manufacturing": "manufacturing",
                              "Professional Services": "professional-services",
                              "Technology & Software": "technology-software",
                              "Auto & Transportation": "auto-transportation",
                              "Beauty & Wellness": "beauty-wellness",
                              "Hospitality & Tourism": "hospitality-tourism",
                              "Agriculture & Farming": "agriculture-farming",
                              "Real Estate": "real-estate",
                              "Entertainment & Events": "entertainment-events",
                              "Education & Training": "education-training",
                              "Franchises": "franchises",
                              "Home Services & Contracting": "home-services-contracting",
                              "Cleaning & Janitorial Services": "cleaning-janitorial-services"
                            };
                            
                            const slug = slugMap[industry.title];
                            if (slug) {
                              setLocation(`/industries/${slug}`);
                            } else {
                              setLocation('/solutions');
                            }
                          }}
                          style={{ backgroundColor: '#193a59' }}
                          className="hover:bg-[#285d8a] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 transform hover:scale-105 active:scale-95 text-white px-6 py-2 rounded font-semibold w-full shadow-lg"
                        >
                          Learn More →
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          <div className="text-center mt-16">
            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Don't See Your Industry?</h3>
              <p className="text-gray-600 mb-6">Almost all industries qualify for our programs. Contact us to discuss your specific business needs.</p>
              <Button 
                onClick={handleApplyNow}
                style={{ backgroundColor: '#193a59' }}
                className="hover:bg-[#285d8a] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 transform hover:scale-105 active:scale-95 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow-lg"
              >
                Get Pre-Qualified Today
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <BackToTop />
    </div>
  );
}