import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft, Star, Briefcase, Users, FileText } from "lucide-react";
import { useLocation } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CountUp from "@/components/count-up";

export default function ProfessionalServices() {
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
            backgroundImage: "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=600&fit=crop')"
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
              Professional Services Financing
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Power your practice with financing for technology, expansion, and working capital needs.
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
                Professional Excellence
              </h2>
              <div className="text-lg md:text-xl text-gray-700 mb-8 md:mb-12 leading-relaxed space-y-4">
                <p>Professional service firms face unique challenges: client payment delays, technology upgrades, staff expansion, and maintaining competitive advantage in knowledge-based industries.</p>
                <p>FundTek Capital Group understands professional services and provides flexible financing solutions that help firms invest in technology, expand teams, and maintain steady cash flow.</p>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-black mb-6">Common Financing Needs</h3>
              <ul className="space-y-4 mb-8 md:mb-12">
                {[
                  "Technology and software upgrades",
                  "Office expansion and renovations", 
                  "Staff hiring and payroll funding",
                  "Marketing and business development",
                  "Working capital for operations",
                  "Professional development and training"
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
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop"
                alt="Professional services office environment"
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

      {/* Accelerate Growth Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Accelerate the growth of your business
            </h2>
            <p className="text-lg md:text-xl text-gray-600">
              Small Business Loans • Merchant Cash Advances • Lines of Credit
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <CountUp end={50} suffix="+" className="text-4xl md:text-5xl font-bold text-[#85abe4] mb-2 block" />
              <div className="text-lg font-semibold text-gray-900 mb-1">Specialists</div>
              <div className="text-sm text-gray-600">Over 50+ specialists to keep you going</div>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <CountUp end={12} className="text-4xl md:text-5xl font-bold text-[#85abe4] mb-2 block" />
              <div className="text-lg font-semibold text-gray-900 mb-1">Financing options</div>
              <div className="text-sm text-gray-600">12 financing solutions and small business products</div>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <CountUp end={20} prefix="$" suffix="M" className="text-4xl md:text-5xl font-bold text-[#85abe4] mb-2 block" />
              <div className="text-lg font-semibold text-gray-900 mb-1">Funding up to</div>
              <div className="text-sm text-gray-600">Unsecured funding up to $20,000,000</div>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <CountUp end={24} className="text-4xl md:text-5xl font-bold text-[#85abe4] mb-2 block" />
              <div className="text-lg font-semibold text-gray-900 mb-1">Hours</div>
              <div className="text-sm text-gray-600">Get funding in 24 hours</div>
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
              Real professional service firms that grew with FundTek Capital Group financing
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Attorney Sarah Johnson",
                company: "Johnson & Associates Law",
                story: "Used working capital to hire two associates and expand practice areas. Increased billable hours by 60% and took on higher-value cases.",
                funding: "$150,000 Line of Credit"
              },
              {
                name: "CPA Michael Chen",
                company: "Chen Accounting Group",
                story: "Secured equipment financing for new office technology and tax software. Improved efficiency and client satisfaction during tax season.",
                funding: "$45,000 Equipment Financing"
              },
              {
                name: "Consultant Lisa Rodriguez",
                company: "Strategic Solutions Inc.",
                story: "Got term loan to expand into new markets and hire specialized consultants. Revenue increased 85% within 18 months.",
                funding: "$95,000 Term Loan"
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
            Based on typical professional service needs, these solutions work best for knowledge-based businesses
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <h3 className="text-xl font-bold mb-4 text-white">Term Loans</h3>
              <p className="text-blue-100 mb-6">Ideal for office expansion, technology upgrades, and staff hiring</p>
              <Button 
                onClick={() => setLocation("/solutions/term-loans")}
                style={{ backgroundColor: '#85abe4', color: 'white' }}
                className="hover:opacity-90 font-semibold"
              >
                Learn More
              </Button>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <h3 className="text-xl font-bold mb-4 text-white">Lines of Credit</h3>
              <p className="text-blue-100 mb-6">Perfect for managing cash flow and covering operational expenses</p>
              <Button 
                onClick={() => setLocation("/solutions/lines-of-credit")}
                style={{ backgroundColor: '#85abe4', color: 'white' }}
                className="hover:opacity-90 font-semibold"
              >
                Learn More
              </Button>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <h3 className="text-xl font-bold mb-4 text-white">Equipment Financing</h3>
              <p className="text-blue-100 mb-6">Financing for office equipment, technology systems, and business tools</p>
              <Button 
                onClick={() => setLocation("/solutions/equipment-financing")}
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
            Ready to Grow Your Practice?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Get the funding you need to invest in technology, expand your team, and grow your professional services firm
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