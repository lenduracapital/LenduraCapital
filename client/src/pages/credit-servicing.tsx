import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, Star, Users, Target, Award, TrendingUp, Shield } from "lucide-react";
import { useLocation } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function CreditServicing() {
  const [, setLocation] = useLocation();

  const handleApplyNow = () => {
    window.open("https://form.jotform.com/251965461165159", "_blank");
  };

  const handleBackToSolutions = () => {
    setLocation("/solutions");
    window.scrollTo(0, 0);
  };

  const handleMoreTestimonials = () => {
    setLocation("/more-testimonials");
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Enhanced Hero Section */}
      <section className="relative pt-40 md:pt-48 pb-20 md:pb-32 bg-gradient-to-br from-[#193a59] to-[#285d8a] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#193a59]/30 to-transparent"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=600&fit=crop')"
          }}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left max-w-4xl">
            <div className="mb-6">
              <Button 
                onClick={handleBackToSolutions}
                variant="outline" 
                className="text-white border-white hover:bg-white hover:text-[#193a59] mb-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Solutions
              </Button>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-wider">
              Credit Servicing (Personal & Business)
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed max-w-3xl">
              Comprehensive credit management solutions designed to optimize both personal and business credit profiles for maximum financial leverage and opportunity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleApplyNow}
                size="lg"
                className="bg-white text-[#193a59] hover:bg-gray-50 font-bold px-8 py-4 text-lg"
              >
                Get Approved in 24 Hours
              </Button>
              <Button 
                onClick={handleMoreTestimonials}
                variant="outline"
                size="lg" 
                className="text-white border-white hover:bg-white hover:text-[#193a59] px-8 py-4 text-lg"
              >
                Read Success Stories
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
              Transform Your Credit Profile Into a Powerful Financial Asset
            </h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-12">
              Your credit profile is more than just a number—it's the foundation of your financial future. FundTek's comprehensive credit servicing solutions help both individuals and businesses optimize their credit profiles, unlock better financing terms, and accelerate growth opportunities.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#193a59] rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Score Improvement</h3>
                <p className="text-gray-600">Strategic credit optimization to maximize your scores</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#193a59] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Credit Monitoring</h3>
                <p className="text-gray-600">Continuous monitoring and protection services</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#193a59] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Expert Guidance</h3>
                <p className="text-gray-600">Professional guidance from certified credit specialists</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personal vs Business Credit Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Dual-Track Credit Optimization Strategy
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our comprehensive approach addresses both personal and business credit needs, creating a synergistic effect that maximizes your overall financial leverage.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Personal Credit Services */}
            <Card className="border-2 border-[#193a59]/20 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-[#193a59] to-[#285d8a] text-white">
                <CardTitle className="text-2xl font-bold">Personal Credit Services</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-[#193a59] mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Credit Report Analysis</h4>
                      <p className="text-gray-600">Comprehensive review of all three credit bureaus</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-[#193a59] mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Dispute Resolution</h4>
                      <p className="text-gray-600">Professional handling of inaccurate or outdated items</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-[#193a59] mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Score Optimization</h4>
                      <p className="text-gray-600">Strategic planning to maximize FICO and VantageScore</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-[#193a59] mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Credit Building Strategy</h4>
                      <p className="text-gray-600">Personalized plans for long-term credit health</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Business Credit Services */}
            <Card className="border-2 border-[#193a59]/20 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-[#193a59] to-[#285d8a] text-white">
                <CardTitle className="text-2xl font-bold">Business Credit Services</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-[#193a59] mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Business Credit Establishment</h4>
                      <p className="text-gray-600">Complete setup with Dun & Bradstreet, Experian, Equifax</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-[#193a59] mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Vendor Credit Lines</h4>
                      <p className="text-gray-600">Strategic vendor relationships to build credit history</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-[#193a59] mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Corporate Credit Monitoring</h4>
                      <p className="text-gray-600">Ongoing monitoring and protection services</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-[#193a59] mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Financing Optimization</h4>
                      <p className="text-gray-600">Maximize funding opportunities and approval rates</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Our Proven Credit Optimization Process
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A systematic approach to credit improvement that delivers measurable results within 30-90 days.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#193a59] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Credit Analysis</h3>
              <p className="text-gray-600">Comprehensive evaluation of current credit status and identification of improvement opportunities</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#193a59] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Strategic Planning</h3>
              <p className="text-gray-600">Custom strategy development based on your specific goals and timeline requirements</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#193a59] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Implementation</h3>
              <p className="text-gray-600">Professional execution of credit repair and optimization strategies</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#193a59] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">4</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Monitoring & Maintenance</h3>
              <p className="text-gray-600">Ongoing monitoring and maintenance to ensure continued credit health</p>
            </div>
          </div>
        </div>
      </section>

      {/* Information Grid */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
                Why Choose FundTek Credit Servicing?
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#193a59] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Certified Credit Specialists</h3>
                    <p className="text-gray-600">Our team includes certified credit counselors and financial advisors with years of experience in credit optimization.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#193a59] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Customized Strategies</h3>
                    <p className="text-gray-600">Every credit profile is unique. We develop personalized strategies based on your specific situation and goals.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#193a59] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Ongoing Support</h3>
                    <p className="text-gray-600">We provide continuous support and guidance throughout your credit improvement journey.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <Card className="border-2 border-[#193a59]/20 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-[#193a59] to-[#285d8a] text-white">
                  <CardTitle className="text-2xl font-bold">Service Benefits</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#193a59]" />
                      <span className="text-gray-700">Improved credit scores within 60-90 days</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#193a59]" />
                      <span className="text-gray-700">Better financing terms and interest rates</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#193a59]" />
                      <span className="text-gray-700">Increased borrowing capacity</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#193a59]" />
                      <span className="text-gray-700">Enhanced business funding opportunities</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#193a59]" />
                      <span className="text-gray-700">Professional credit monitoring</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Client Success Story */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
            Client Success Story
          </h2>
          
          <Card className="border-2 border-[#193a59]/20 shadow-lg">
            <CardContent className="p-8">
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-lg md:text-xl text-gray-700 italic mb-6">
                "FundTek's credit servicing team transformed both my personal and business credit profiles. Within 90 days, my personal score increased by 120 points, and we established strong business credit that opened doors to $500K in equipment financing."
              </blockquote>
              <div className="text-center">
                <div className="font-bold text-gray-800">Michael Rodriguez</div>
                <div className="text-[#193a59]">Rodriguez Construction LLC</div>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-8">
            <Button 
              onClick={handleMoreTestimonials}
              variant="outline"
              className="border-[#193a59] text-[#193a59] hover:bg-[#193a59] hover:text-white"
            >
              Read More Success Stories
            </Button>
          </div>
        </div>
      </section>

      {/* Qualification Requirements */}
      <section className="py-16 md:py-20 bg-[#193a59] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Service Requirements
          </h2>
          <p className="text-xl text-blue-100 mb-12">
            Our credit servicing is available to individuals and businesses looking to optimize their credit profiles
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold mb-2">Personal</div>
              <div className="text-blue-100">Credit repair and optimization for individuals</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold mb-2">Business</div>
              <div className="text-blue-100">Established businesses seeking credit enhancement</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold mb-2">Combined</div>
              <div className="text-blue-100">Comprehensive dual-track optimization</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Ready to Transform Your Credit Profile?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Take the first step toward better credit and enhanced financing opportunities
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleApplyNow}
              size="lg"
              className="bg-[#193a59] hover:bg-[#285d8a] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 transform hover:scale-105 active:scale-95 text-white px-8 py-4 text-lg shadow-lg"
            >
              Get Approved in 24 Hours
            </Button>
            <Button 
              onClick={handleBackToSolutions}
              variant="outline"
              size="lg"
              className="border-[#193a59] text-[#193a59] hover:bg-[#193a59] hover:text-white hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 transform hover:scale-105 active:scale-95 px-8 py-4 text-lg"
            >
              Back to Solutions
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}