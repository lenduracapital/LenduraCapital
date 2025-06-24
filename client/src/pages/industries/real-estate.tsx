import { lazy, Suspense } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useLocation } from "wouter";

const CountUp = lazy(() => import("@/components/count-up"));

export default function RealEstate() {
  const [, setLocation] = useLocation();

  const handleApplyClick = () => {
    window.open("https://form.jotform.com/251417715331047", "_blank");
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
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80')"
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
              className="bg-[#85abe4] hover:bg-[#7098d9] text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Get Approved in 24 Hours
            </Button>
            <Button 
              onClick={handleSolutionsClick}
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white hover:text-[#85abe4] px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300"
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
                Real estate moves fast, and so should your financing. Whether you're flipping houses, developing commercial properties, or managing rental portfolios, FundTek Capital Group provides the flexible funding solutions real estate professionals need to capitalize on opportunities quickly.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                From fix-and-flip loans to commercial acquisitions, our streamlined approval process ensures you can move on profitable deals while competitors are still waiting for traditional bank approvals.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold" style={{ color: '#85abe4' }}>24 Hours</div>
                  <div className="text-sm text-gray-600">Fast Approval</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold" style={{ color: '#85abe4' }}>$20M</div>
                  <div className="text-sm text-gray-600">Max Funding</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-[#85abe4] text-white p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Fix & Flip Loans</h3>
                <p className="text-blue-100">Fast funding for property acquisition and renovation costs</p>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4" style={{ color: '#85abe4' }}>Commercial RE</h3>
                <p className="text-gray-700">Investment property and commercial real estate financing</p>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4" style={{ color: '#85abe4' }}>Bridge Loans</h3>
                <p className="text-gray-700">Short-term financing for time-sensitive opportunities</p>
              </div>
              <div className="bg-[#85abe4] text-white p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">BRRRR Strategy</h3>
                <p className="text-blue-100">Buy, Rehab, Rent, Refinance, Repeat financing</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rolling Statistics */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <CountUp end={50} suffix="+ Funded" className="text-4xl md:text-5xl font-bold text-[#85abe4] mb-2 block" />
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
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real estate professionals who accelerated their portfolios with FundTek Capital Group financing
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Michael Chen",
                company: "Pacific Properties LLC",
                story: "Secured bridge financing to close on a 12-unit apartment building. Renovated and refinanced within 8 months for 35% profit.",
                funding: "$850,000 Bridge Loan"
              },
              {
                name: "Sarah Rodriguez",
                company: "Flip Smart Investments",
                story: "Used fix-and-flip funding to purchase and renovate 3 distressed properties simultaneously. Increased property values by $200K total.",
                funding: "$320,000 Fix & Flip Loan"
              },
              {
                name: "David Thompson",
                company: "Commercial RE Partners",
                story: "Obtained working capital to purchase warehouse space for conversion to luxury lofts. Project sold out in pre-construction phase.",
                funding: "$1.2M Commercial Loan"
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
            Based on typical real estate business needs, these solutions work best for property investors and developers
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Commercial Real Estate</h3>
              <p className="text-blue-100 mb-6">Investment property acquisition and commercial development financing</p>
              <Button 
                onClick={handleSolutionsClick}
                className="bg-white text-[#85abe4] hover:bg-gray-100 px-6 py-3 font-semibold rounded-lg transition-all duration-300"
              >
                Learn More
              </Button>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Equipment Financing</h3>
              <p className="text-blue-100 mb-6">Construction equipment, tools, and vehicle financing for real estate operations</p>
              <Button 
                onClick={handleSolutionsClick}
                className="bg-white text-[#85abe4] hover:bg-gray-100 px-6 py-3 font-semibold rounded-lg transition-all duration-300"
              >
                Learn More
              </Button>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Term Loans</h3>
              <p className="text-blue-100 mb-6">Working capital for property management, renovations, and business expansion</p>
              <Button 
                onClick={handleSolutionsClick}
                className="bg-white text-[#85abe4] hover:bg-gray-100 px-6 py-3 font-semibold rounded-lg transition-all duration-300"
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