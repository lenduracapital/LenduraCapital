import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useLocation } from "wouter";
import realestateImage from "@assets/realestate.jpg";


export default function RealEstate() {
  const [, setLocation] = useLocation();

  const handleApplyClick = () => {
    window.open("https://form.jotform.com/251965461165159", "_blank");
  };

  const handleSolutionsClick = () => {
    setLocation("/solutions");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header transparent={false} />

      {/* Hero Section */}
      <section 
        className="relative pt-40 md:pt-48 pb-32 md:pb-40 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${realestateImage})`
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-wider">
            Real Estate Financing Solutions
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 mb-12 max-w-4xl mx-auto leading-relaxed">
            Specialized funding for real estate investors, developers, and property management companies seeking fast capital for acquisitions, renovations, and expansions.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              onClick={handleApplyClick}
              className="bg-[#2563eb] hover:bg-[#7098d9] text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Get Approved in 24 Hours
            </Button>
            <Button 
              onClick={handleSolutionsClick}
              style={{ backgroundColor: '#2563eb', color: 'white' }}
              className="hover:bg-[#7299d1] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 transform hover:scale-105 active:scale-95 px-8 py-4 text-lg font-semibold rounded-lg shadow-lg"
            >
              Explore Your Financing Options
            </Button>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-8">
                Real Estate Capital When You Need It Most
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Real estate moves fast, and so should your financing. Whether you're flipping houses, developing commercial properties, or managing rental portfolios, Lendura Capital provides the flexible funding solutions real estate professionals need to capitalize on opportunities quickly.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                From fix-and-flip loans to commercial acquisitions, our streamlined approval process ensures you can move on profitable deals while competitors are still waiting for traditional bank approvals.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold" style={{ color: '#2563eb' }}>24 Hours</div>
                  <div className="text-sm text-gray-600">Fast Approval</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold" style={{ color: '#2563eb' }}>$20M</div>
                  <div className="text-sm text-gray-600">Max Funding</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-[#2563eb] text-white p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Fix & Flip Loans</h3>
                <p className="text-blue-100">Fast funding for property acquisition and renovation costs</p>
              </div>
              <div className="bg-[#2563eb] text-white p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 text-white">Commercial RE</h3>
                <p className="text-blue-100">Investment property and commercial real estate financing</p>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4" style={{ color: '#2563eb' }}>Bridge Loans</h3>
                <p className="text-gray-700">Short-term financing for time-sensitive opportunities</p>
              </div>
              <div className="bg-[#2563eb] text-white p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">BRRRR Strategy</h3>
                <p className="text-blue-100">Buy, Rehab, Rent, Refinance, Repeat financing</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Business Financing Steps */}
      <section className="py-16 md:py-24" style={{ backgroundColor: '#2563eb' }}>
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
                <span className="text-2xl font-bold" style={{ color: '#2563eb' }}>1</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Apply Online</h3>
              <p className="text-white/90">Quick and secure application process</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold" style={{ color: '#2563eb' }}>2</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Approval in 1 hour</h3>
              <p className="text-white/90">Fast decision process</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold" style={{ color: '#2563eb' }}>3</span>
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
              Real estate professionals who accelerated their portfolios with Lendura Capital financing
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Marc Chen",
                company: "Pacific Properties LLC",
                story: "Secured bridge financing to close on a 12-unit apartment building. Renovated and refinanced within 8 months for 35% profit.",
                funding: "$850,000 Bridge Loan"
              },
              {
                name: "Gabby Rodriguez",
                company: "Flip Smart Investments",
                story: "Used fix-and-flip funding to purchase and renovate 3 distressed properties simultaneously. Increased property values by $200K total.",
                funding: "$320,000 Fix & Flip Loan"
              },
              {
                name: "Eric Thompson",
                company: "Commercial RE Partners",
                story: "Obtained working capital to purchase warehouse space for conversion to luxury lofts. Project sold out in pre-construction phase.",
                funding: "$1.2M Commercial Loan"
              }
            ].map((story, index) => (
              <div key={index} className="bg-white p-8 rounded-lg border-l-4 border-[#2563eb] shadow-lg">
                <div className="flex items-start space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{story.story}"</p>
                <div className="border-t pt-4">
                  <div className="font-semibold text-black">{story.name}</div>
                  <div className="text-sm text-gray-600 mb-2">{story.company}</div>
                  <div className="text-sm font-medium" style={{ color: '#2563eb' }}>{story.funding}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Solutions */}
      <section className="py-16 md:py-24 bg-[#2563eb] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
            Recommended Financing Solutions
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
            Based on typical real estate business needs, these solutions work best for property investors and developers
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Commercial Real Estate</h3>
              <p className="text-blue-100 mb-6">Investment property acquisition and commercial development financing</p>
              <Button 
                onClick={handleSolutionsClick}
                style={{ backgroundColor: '#2563eb', color: 'white' }}
                className="hover:opacity-90 px-6 py-3 font-semibold rounded-lg transition-all duration-300"
              >
                Learn More
              </Button>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Equipment Financing</h3>
              <p className="text-blue-100 mb-6">Construction equipment, tools, and vehicle financing for real estate operations</p>
              <Button 
                onClick={handleSolutionsClick}
                style={{ backgroundColor: '#2563eb', color: 'white' }}
                className="hover:opacity-90 px-6 py-3 font-semibold rounded-lg transition-all duration-300"
              >
                Learn More
              </Button>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Term Loans</h3>
              <p className="text-blue-100 mb-6">Working capital for property management, renovations, and business expansion</p>
              <Button 
                onClick={handleSolutionsClick}
                style={{ backgroundColor: '#2563eb', color: 'white' }}
                className="hover:opacity-90 px-6 py-3 font-semibold rounded-lg transition-all duration-300"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}