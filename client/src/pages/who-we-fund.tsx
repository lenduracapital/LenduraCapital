import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import BackToTop from "@/components/back-to-top";

const industries = [
  {
    title: "Trucking & Transportation",
    description: "Trucking, Construction And Logistics Is One Of The Underlying Fundamentals That Drives Business; Goods Are Transported Across The Country But Operational Costs, Unforeseen Expenses And Pending Payments On Open Invoices Can Make The Trip More Difficult Than It Needs To Be.",
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&h=400&fit=crop"
  },
  {
    title: "Medical & Healthcare",
    description: "Specialized financing for medical equipment, practice expansion, and healthcare facilities. Medical Specialists And Administrative Professionals Turn To FundTek Capital Group For The Much-Needed Capital These Practices Need.",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop"
  },
  {
    title: "Construction",
    description: "Construction loans, equipment financing, and working capital for contractors and builders. Funding solutions for project expenses, equipment purchases, and business growth.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop"
  },
  {
    title: "Restaurant & Food Service",
    description: "You Are Responsible For More Than Food, You Are Giving Customers An Eating Experience. Equipment financing, inventory funding, and expansion capital for restaurants and food businesses.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop"
  },
  {
    title: "Retail & E-commerce",
    description: "Inventory financing, expansion capital, and seasonal working capital for retail businesses. Marketing, advertising, inventory, and growth opportunities funding solutions.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop"
  },
  {
    title: "Manufacturing",
    description: "Equipment financing, raw materials funding, and working capital for manufacturers. Support for production cycles, facility expansion, and large order fulfillment.",
    image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=600&h=400&fit=crop"
  },
  {
    title: "Professional Services",
    description: "Law firms, accounting practices, consulting companies, and other professional service providers. Funding for expansion, technology upgrades, and cash flow management.",
    image: "/attached_assets/pnc_insights_sb_5-ways-professional-services-organizations-changed-2023_1751303419004.avif"
  },
  {
    title: "Technology & Software",
    description: "Tech companies and software businesses need funding for product development, marketing, talent acquisition, and scaling operations in competitive markets.",
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&h=400&fit=crop"
  },
  {
    title: "Auto & Transportation",
    description: "Auto repair shops, dealerships, and transportation companies. Funding for inventory, equipment purchases, facility improvements, and fleet expansion.",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop"
  },
  {
    title: "Beauty & Wellness",
    description: "Salons, spas, fitness centers, and wellness businesses. Capital for equipment, renovations, inventory, and expansion to serve growing customer bases.",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop"
  },
  {
    title: "Hospitality & Tourism",
    description: "Hotels, bed & breakfasts, tourism companies, and hospitality businesses. Funding for renovations, marketing, seasonal expenses, and expansion projects.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop"
  },
  {
    title: "Agriculture & Farming",
    description: "Agricultural businesses require funding for equipment, livestock, crop production, land acquisition, and managing seasonal cash flow challenges in farming operations.",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&h=400&fit=crop"
  },
  {
    title: "Real Estate",
    description: "Real estate professionals, property management companies, and real estate investors. Funding for property acquisition, renovations, and business operations.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop"
  },
  {
    title: "Entertainment & Events",
    description: "Event planners, entertainment venues, and production companies. Capital for equipment, venue deposits, marketing, and managing variable income streams.",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=400&fit=crop"
  },
  {
    title: "Education & Training",
    description: "Educational institutions, training centers, and e-learning companies. Funding for technology upgrades, facility improvements, and program expansion.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop"
  },
  {
    title: "Franchises",
    description: "Franchise owners across all industries. Specialized funding solutions for franchise fees, equipment, inventory, and multi-location expansion projects.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop"
  },
  {
    title: "Home Services & Contracting",
    description: "Equipment financing, working capital, and project funding for HVAC, plumbing, electrical, roofing, and general contracting businesses.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop"
  },
  {
    title: "Cleaning & Janitorial Services", 
    description: "Equipment financing, vehicle loans, and working capital for commercial cleaning, janitorial, and maintenance service companies.",
    image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=600&h=400&fit=crop"
  }
];

export default function QualifiedIndustries() {
  const [, setLocation] = useLocation();

  const handleBackToHome = () => {
    setLocation("/");
  };

  const handleApplyNow = () => {
    window.open("https://form.jotform.com/251417715331047", "_blank");
  };

  return (
    <div className="min-h-screen bg-[--bg-primary] text-[--text-primary]">
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
            Qualified <span style={{ color: '#85abe4' }}>Industries</span>
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 max-w-4xl mx-auto leading-relaxed">
            FundTek Capital Group specializes in providing tailored financing solutions across diverse industries. 
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
              style={{ color: '#85abe4' }}
            >
              Apply for Funding
            </Button>
            <Button 
              onClick={() => window.open('https://calendly.com/admin-fundtekcapitalgroup/30min', '_blank')}
              className="bg-white hover:bg-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 transform hover:scale-105 active:scale-95 px-8 py-4 rounded-lg font-semibold text-lg shadow-lg"
              style={{ 
                color: '#85abe4'
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
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {industries.map((industry, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-xl transition-shadow duration-300">
                <div 
                  className="h-48 bg-cover bg-center rounded-lg mb-6"
                  style={{ backgroundImage: `url(${industry.image})` }}
                />
                
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    {industry.title}
                  </h3>
                  <div className="w-12 h-1" style={{ backgroundColor: '#85abe4' }}></div>
                  <p className="text-gray-600 leading-relaxed">
                    {industry.description}
                  </p>
                  
                  <div className="pt-4">
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
                      style={{ backgroundColor: '#85abe4' }}
                      className="hover:bg-[#7299d1] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 transform hover:scale-105 active:scale-95 text-white px-6 py-2 rounded font-semibold w-full shadow-lg"
                    >
                      Learn More →
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Don't See Your Industry?</h3>
              <p className="text-gray-600 mb-6">Almost all industries qualify for our programs. Contact us to discuss your specific business needs.</p>
              <Button 
                onClick={handleApplyNow}
                style={{ backgroundColor: '#85abe4' }}
                className="hover:bg-[#7299d1] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 transform hover:scale-105 active:scale-95 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow-lg"
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