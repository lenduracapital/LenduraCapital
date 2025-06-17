import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";

const industries = [
  {
    title: "Trucking, Construction, & Logistics.",
    description: "Trucking, Construction And Logistics Is One Of The Underlying Fundamentals That Drives Business; Goods Are Transported Across The Country But Operational Costs, Unforeseen Expenses And Pending Payments On Open Invoices Can Make The Trip More Difficult Than It Needs To Be. Whether It Is To Expand Your Business By Hiring New Drivers And Buying New Trucks, Provide A Short-Term Bridge Between Open Invoices While Maintaining Your Fleet Or Buttress Against Seasonal Trends, Royal Funding Group Is At Your Side!",
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&h=400&fit=crop"
  },
  {
    title: "Restaurant, Hotel & Franchises.",
    description: "You Are Responsible For More Than Food, You Are Giving Customers An Eating Experience. If You've Already Launched And Have Been Running Your Restaurant For A While, You Still Face Financial Hurdles: Equipment Breaks, Customer Bases Change, And Competition Evolves. A Merchant Can Address These Needs, And More.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop"
  },
  {
    title: "Retail, Wholesale & Ecommerce.",
    description: "Be Sure To Ask Us How A Merchant Can Help You Reach Your Retail Goals. As A Business Owner In The Retail Industry, You Know That Your World Is Constantly Evolving. There Are Marketing, Advertising, Inventory, Potential Inventory, Retail Space, And Growth Opportunities Awaiting You Around Almost Every Corner. A Merchant Can Help You Meet These Issues Head-On, Making The Most Of Your Corner In The Retail World.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop"
  },
  {
    title: "Medical, Dental & Pharmaceutical.",
    description: "Finding Funding In The Healthcare (Dental, Medical, Wellness And Pharmaceutical) Sector Can Be A Headache And Extremely Time Consuming. That Is Why Medical Specialists And Administrative Professionals Turn To Royal Funding Group For Merchant As We Provide The Much-Needed Capital These Practices And Businesses Need.",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop"
  },
  {
    title: "Professional Services.",
    description: "Law firms, accounting practices, consulting companies, and other professional service providers often need working capital for expansion, technology upgrades, or managing cash flow during seasonal fluctuations.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop"
  },
  {
    title: "Auto Repair & Dealerships.",
    description: "Auto repair shops and car dealerships require funding for inventory, equipment purchases, facility improvements, and managing seasonal business cycles in the automotive industry.",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop"
  },
  {
    title: "Beauty & Wellness.",
    description: "Salons, spas, fitness centers, and wellness businesses need capital for equipment, renovations, inventory, and expansion to serve their growing customer base.",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop"
  },
  {
    title: "Manufacturing.",
    description: "Manufacturing companies require funding for equipment purchases, raw materials, facility expansion, and working capital to fulfill large orders and manage production cycles.",
    image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=600&h=400&fit=crop"
  },
  {
    title: "Technology & SaaS.",
    description: "Tech companies and software-as-a-service businesses need funding for product development, marketing, hiring talent, and scaling their operations in competitive markets.",
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&h=400&fit=crop"
  },
  {
    title: "Agriculture & Farming.",
    description: "Agricultural businesses require funding for equipment, livestock, crop production, land acquisition, and managing seasonal cash flow challenges inherent in farming operations.",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&h=400&fit=crop"
  },
  {
    title: "Entertainment & Events.",
    description: "Event planners, entertainment venues, and production companies need capital for equipment, venue deposits, marketing, and managing the variable income typical in the entertainment industry.",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=400&fit=crop"
  },
  {
    title: "And Many More!",
    description: "Almost All Industries Qualify For Our Programs.",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=400&fit=crop",
    isSpecial: true
  }
];

export default function WhoWeFund() {
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
      <section className="relative pt-24 pb-16 bg-gradient-to-br from-[--primary] to-blue-800">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=600&fit=crop')"
          }}
        >
          <div className="absolute inset-0 bg-blue-900 bg-opacity-80"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Qualified <span className="text-yellow-400">Industries</span>
          </h1>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12">
            {industries.map((industry, index) => (
              <div key={index} className={`grid lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                {/* Image */}
                <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div 
                    className="h-64 lg:h-80 bg-cover bg-center rounded-lg shadow-lg"
                    style={{ backgroundImage: `url(${industry.image})` }}
                  />
                </div>
                
                {/* Content */}
                <div className={`space-y-4 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <h3 className="text-2xl lg:text-3xl font-bold text-[--primary]">
                    {industry.title}
                  </h3>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {industry.description}
                  </p>
                  {industry.isSpecial && (
                    <div className="pt-4">
                      <Button 
                        onClick={handleApplyNow}
                        className="bg-[--primary] hover:bg-[--primary-dark] text-white px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-200"
                      >
                        Apply Now
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}