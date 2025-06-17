import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function MerchantCashAdvanceDetail() {
  const handleApplyNow = () => {
    window.open("https://form.jotform.com/251417715331047", "_blank");
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=600&fit=crop')"
          }}
        >
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Button 
              onClick={() => window.location.href = "/solutions"}
              variant="ghost"
              className="text-white hover:text-gray-300 mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Solutions
            </Button>
          </div>
          
          <div className="text-left mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Merchant Cash Advance
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl">
              Fast, flexible funding based on your future credit card sales
            </p>
          </div>
          
          {/* Contact CTA Box */}
          <div className="bg-green-500 text-white p-8 rounded-lg max-w-md ml-auto mr-8">
            <div className="flex items-center mb-4">
              <div className="bg-white text-green-500 p-2 rounded-full mr-4">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold">Contact FundTek to learn more</h3>
            </div>
            <p className="text-sm mb-4">
              Call us at (646) 329-4622 to speak to a loan specialist today
            </p>
            <Button 
              onClick={handleApplyNow}
              className="w-full bg-white text-green-500 hover:bg-gray-100 font-semibold"
            >
              Apply Now
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Quick Access to Working Capital
              </h2>
              <div className="w-16 h-1 bg-green-500 mb-8"></div>
              
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  A Merchant Cash Advance (MCA) provides businesses with immediate access to capital 
                  in exchange for a percentage of future credit card sales. This alternative financing 
                  solution is ideal for businesses that need quick funding without the lengthy approval 
                  process of traditional bank loans.
                </p>
                
                <p>
                  Unlike traditional loans, MCAs are repaid through daily credit card sales, making 
                  payments automatically adjust to your business's cash flow. During slower periods, 
                  you pay less; during busy periods, you pay more.
                </p>
                
                <p>
                  With funding amounts ranging from $2,000 to $2,000,000 and approval decisions 
                  often made within hours, merchant cash advances offer the speed and flexibility 
                  that growing businesses need.
                </p>
              </div>

              <div className="mt-12">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">How It Works</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-[--primary] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">1</div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Quick Application</h4>
                      <p className="text-gray-600">Complete our simple online application in minutes</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-[--primary] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">2</div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Fast Approval</h4>
                      <p className="text-gray-600">Get approved in as little as 24 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-[--primary] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">3</div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Receive Funds</h4>
                      <p className="text-gray-600">Funds deposited directly into your business account</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Key Benefits</h3>
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-4"></div>
                    <span className="text-gray-700">No collateral required</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-4"></div>
                    <span className="text-gray-700">Flexible repayment structure</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-4"></div>
                    <span className="text-gray-700">Fast approval and funding</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-4"></div>
                    <span className="text-gray-700">No fixed monthly payments</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-4"></div>
                    <span className="text-gray-700">Poor credit considered</span>
                  </li>
                </ul>
              </div>

              <div className="bg-[--primary] text-white p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-6">Funding Details</h3>
                <div className="space-y-4">
                  <div>
                    <span className="font-semibold">Amount:</span>
                    <span className="ml-2">$2,000 - $2,000,000</span>
                  </div>
                  <div>
                    <span className="font-semibold">Time to Fund:</span>
                    <span className="ml-2">1-3 business days</span>
                  </div>
                  <div>
                    <span className="font-semibold">Term:</span>
                    <span className="ml-2">3-18 months</span>
                  </div>
                  <div>
                    <span className="font-semibold">Repayment:</span>
                    <span className="ml-2">Daily percentage of credit card sales</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Button 
                  onClick={handleApplyNow}
                  size="lg"
                  className="bg-green-500 hover:bg-green-600 text-white px-12 py-4 text-xl font-semibold"
                >
                  Apply for MCA Today
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}