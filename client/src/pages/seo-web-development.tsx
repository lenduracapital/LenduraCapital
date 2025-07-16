import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, Star, Code, Search, TrendingUp, Globe, Smartphone, Monitor } from "lucide-react";
import { useLocation } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import digitalImage from "@assets/pexels-pixabay-39284_1752512428556.jpg";

export default function SEOWebDevelopment() {
  const [, setLocation] = useLocation();

  const handleApplyNow = () => {
    window.open("https://form.jotform.com/251965198766173", "_blank");
  };

  const handleContactUs = () => {
    window.open("https://calendly.com/admin-fundtekcapitalgroup/30min", "_blank");
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
      <section className="relative pt-40 md:pt-48 pb-20 md:pb-32 bg-gradient-to-br from-[#85abe4] to-blue-600 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#85abe4]/30 to-transparent"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url(${digitalImage})`
          }}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left max-w-4xl">
            <div className="mb-6">
              <Button 
                onClick={handleBackToSolutions}
                className="bg-white text-[#85abe4] hover:bg-blue-50 hover:text-[#85abe4] mb-4 border-0"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Solutions
              </Button>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-wider">
              Search Engine Optimization and Web Development
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed max-w-3xl">
              Professional digital solutions that drive online visibility, enhance user experience, and accelerate business growth through strategic SEO and cutting-edge web development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleContactUs}
                size="lg"
                className="bg-white text-[#85abe4] hover:bg-blue-50 hover:text-[#85abe4] font-bold px-8 py-4 text-lg border-0"
              >
                Contact Us
              </Button>
              <Button 
                onClick={handleMoreTestimonials}
                size="lg" 
                className="bg-white text-[#85abe4] hover:bg-blue-50 hover:text-[#85abe4] px-8 py-4 text-lg border-0"
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
              Transform Your Digital Presence Into a Growth Engine
            </h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-12">
              In today's digital marketplace, your online presence determines your business success. FundTek's comprehensive SEO and web development services create powerful digital platforms that attract customers, generate leads, and drive sustainable growth.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#85abe4] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">SEO Optimization</h3>
                <p className="text-gray-600">Dominate search rankings and drive organic traffic</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#85abe4] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Code className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Web Development</h3>
                <p className="text-gray-600">Custom websites that convert visitors into customers</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#85abe4] rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Performance Analytics</h3>
                <p className="text-gray-600">Data-driven insights for continuous optimization</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Services */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Our Digital Marketing Services
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Complete digital solutions to grow your online presence and drive business results.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-[#85abe4] rounded-lg flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">SEO Optimization</h3>
              <p className="text-gray-600">Get found on Google with proven SEO strategies that drive organic traffic and leads.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-[#85abe4] rounded-lg flex items-center justify-center mb-4">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Web Development</h3>
              <p className="text-gray-600">Professional websites that convert visitors into customers and grow with your business.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-[#85abe4] rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Digital Marketing</h3>
              <p className="text-gray-600">Complete online marketing strategies including social media, content, and analytics.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How We Compare Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            How We Compare to Traditional Agencies
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Traditional Agencies */}
            <div className="bg-red-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold text-red-600 mb-6">Traditional Digital Agencies</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✕</span>
                  <span className="text-gray-700">High retainer fees ($5K-$20K/month)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✕</span>
                  <span className="text-gray-700">6-12 month contracts required</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✕</span>
                  <span className="text-gray-700">One-size-fits-all packages</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✕</span>
                  <span className="text-gray-700">Slow project timelines</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✕</span>
                  <span className="text-gray-700">Limited small business focus</span>
                </li>
              </ul>
            </div>

            {/* FundTek */}
            <div className="bg-green-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold text-green-600 mb-6">FundTek Capital Group</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700">Affordable packages for small businesses</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700">Month-to-month flexibility</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700">Custom solutions for your industry</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700">Rapid 2-4 week deployment</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700">Small business specialists</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Ready to Dominate Your Digital Market?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Let's build a digital presence that drives real business results
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleContactUs}
              size="lg"
              className="bg-[#85abe4] hover:bg-[#7299d1] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 transform hover:scale-105 active:scale-95 text-white px-8 py-4 text-lg shadow-lg"
            >
              Contact Us
            </Button>
            <Button 
              onClick={handleBackToSolutions}
              variant="outline"
              size="lg"
              className="border-[#85abe4] text-[#85abe4] hover:bg-[#85abe4] hover:text-white px-8 py-4 text-lg"
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