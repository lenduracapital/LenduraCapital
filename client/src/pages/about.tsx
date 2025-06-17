import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function About() {
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
            About <span className="text-yellow-400">Us</span>
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Logo and Content */}
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <div className="flex items-center justify-center mb-8">
                <div className="w-32 h-32 bg-blue-600 rounded-lg flex items-center justify-center relative">
                  <div className="text-white text-center">
                    <div className="text-2xl font-bold mb-1">RFG</div>
                    <div className="absolute bottom-2 left-2 right-2">
                      <div className="bg-yellow-400 text-blue-600 text-xs font-bold py-1 rounded">
                        ROYAL FUNDING GROUP
                      </div>
                    </div>
                  </div>
                  {/* Crown and horses decorative elements */}
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="w-6 h-6 bg-yellow-400 rounded-sm transform rotate-45"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div className="space-y-6">
              <div className="text-gray-800">
                <p className="text-lg leading-relaxed mb-6">
                  Our Ultimate Goal At Royal Funding Group Is To Be Of Service. Through Our Financial Services We Hope To Provide Small Business Owners With The Tools They Need To Not Only Stay Afloat But To Continue To Expand And Prosper In Everyway. Small Businesses Account For 44% Of Our Countries Economics Activity And They Should Be Given The Attention, Value And Support They Deserve.
                </p>
                
                <p className="text-lg leading-relaxed mb-6">
                  We Believe In Creating Relationships With Our Clients, Listening To And Understanding Their Needs And Seeking A Solution Together Through Our Financial Services. Weather You Are Looking Make Payroll, Buy Equipment, Hire More Staff, Or Just Handle The Unexpected We Believe In Making Gaining Access To Capital Fast And Easy.
                </p>
                
                <p className="text-lg leading-relaxed">
                  We Value Your Business And Would Be Honored To Contribute To Its Continuous Success. There Are Plenty Of Reasons Why Businesses Fail. Lack Of Capital Shouldn't Be One Of Them!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Star Rating Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
            We Are A <span className="text-yellow-500">5 Star Rated</span> Company
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Google Reviews */}
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <div className="text-4xl font-bold text-blue-600 mb-4">Google</div>
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-8 h-8 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>

            {/* Facebook Reviews */}
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <div className="text-4xl font-bold text-blue-600 mb-4">facebook</div>
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-8 h-8 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>

            {/* Yelp Reviews */}
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <div className="flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-red-600">yelp</span>
                <div className="ml-2 bg-red-600 text-white px-2 py-1 rounded text-sm font-bold">
                  5-Star Business
                </div>
              </div>
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-8 h-8 text-red-600 fill-current" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}