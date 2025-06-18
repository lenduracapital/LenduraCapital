import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, Star, Code, Search, TrendingUp, Globe, Smartphone, Monitor } from "lucide-react";
import { useLocation } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function SEOWebDevelopment() {
  const [, setLocation] = useLocation();

  const handleApplyNow = () => {
    window.open("https://form.jotform.com/251417715331047", "_blank");
  };

  const handleBackToSolutions = () => {
    setLocation("/solutions");
  };

  const handleMoreTestimonials = () => {
    setLocation("/more-testimonials");
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
            backgroundImage: "url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop')"
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
                onClick={() => setLocation('/contact')}
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

      {/* SEO vs Web Development Services */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Comprehensive Digital Solutions
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our integrated approach combines powerful SEO strategies with professional web development to create digital experiences that drive results.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* SEO Services */}
            <Card className="border-2 border-[#85abe4]/20 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-[#85abe4] to-blue-600 text-white">
                <CardTitle className="text-2xl font-bold">SEO Optimization Services</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-[#85abe4] mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Technical SEO Audit</h4>
                      <p className="text-gray-600">Comprehensive website analysis and optimization</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-[#85abe4] mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Keyword Research & Strategy</h4>
                      <p className="text-gray-600">Data-driven keyword targeting for maximum impact</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-[#85abe4] mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Content Optimization</h4>
                      <p className="text-gray-600">SEO-optimized content that ranks and converts</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-[#85abe4] mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Link Building</h4>
                      <p className="text-gray-600">High-quality backlinks from authoritative sources</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-[#85abe4] mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Local SEO</h4>
                      <p className="text-gray-600">Dominate local search results and Google My Business</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Web Development Services */}
            <Card className="border-2 border-[#85abe4]/20 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-[#85abe4] to-blue-600 text-white">
                <CardTitle className="text-2xl font-bold">Web Development Services</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-[#85abe4] mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Custom Website Design</h4>
                      <p className="text-gray-600">Unique, brand-focused designs that stand out</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-[#85abe4] mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Responsive Development</h4>
                      <p className="text-gray-600">Mobile-first websites that work on all devices</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-[#85abe4] mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800">E-commerce Solutions</h4>
                      <p className="text-gray-600">Powerful online stores that drive sales</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-[#85abe4] mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800">CMS Integration</h4>
                      <p className="text-gray-600">Easy-to-manage content management systems</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-[#85abe4] mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Performance Optimization</h4>
                      <p className="text-gray-600">Fast-loading websites that improve user experience</p>
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
              Our Digital Transformation Process
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A strategic approach to digital success that combines technical expertise with business intelligence.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#85abe4] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Discovery & Analysis</h3>
              <p className="text-gray-600">Comprehensive audit of current digital presence and competitor analysis</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#85abe4] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Strategy Development</h3>
              <p className="text-gray-600">Custom digital strategy aligned with your business goals and target audience</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#85abe4] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Implementation</h3>
              <p className="text-gray-600">Professional execution of web development and SEO optimization</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#85abe4] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">4</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Optimization & Growth</h3>
              <p className="text-gray-600">Continuous monitoring and optimization for sustained results</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology & Platform Expertise */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Technology & Platform Expertise
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We work with the latest technologies and platforms to deliver cutting-edge digital solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 border-[#85abe4]/20 shadow-lg">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-[#85abe4] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Monitor className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">Web Platforms</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>• WordPress & Custom CMS</li>
                  <li>• React & Modern JavaScript</li>
                  <li>• Shopify & WooCommerce</li>
                  <li>• Landing Page Optimization</li>
                  <li>• Progressive Web Apps</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-[#85abe4]/20 shadow-lg">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-[#85abe4] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">SEO Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>• Google Analytics & Search Console</li>
                  <li>• SEMrush & Ahrefs</li>
                  <li>• Technical SEO Auditing</li>
                  <li>• Schema Markup Implementation</li>
                  <li>• Core Web Vitals Optimization</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-[#85abe4]/20 shadow-lg">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-[#85abe4] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">Digital Marketing</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>• Conversion Rate Optimization</li>
                  <li>• Social Media Integration</li>
                  <li>• Email Marketing Systems</li>
                  <li>• Lead Generation Funnels</li>
                  <li>• Performance Tracking</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Information Grid */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
                Why Choose FundTek Digital Services?
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#85abe4] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Full-Service Digital Agency</h3>
                    <p className="text-gray-600">Complete digital solutions under one roof - from strategy to implementation and ongoing optimization.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#85abe4] rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Results-Driven Approach</h3>
                    <p className="text-gray-600">We focus on measurable results that directly impact your bottom line and business growth.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#85abe4] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Industry Expertise</h3>
                    <p className="text-gray-600">Years of experience helping businesses across industries achieve digital success.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <Card className="border-2 border-[#85abe4]/20 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-[#85abe4] to-blue-600 text-white">
                  <CardTitle className="text-2xl font-bold">Expected Results</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#85abe4]" />
                      <span className="text-gray-700">300% increase in organic traffic within 6 months</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#85abe4]" />
                      <span className="text-gray-700">Top 3 Google rankings for target keywords</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#85abe4]" />
                      <span className="text-gray-700">50% improvement in website conversion rates</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#85abe4]" />
                      <span className="text-gray-700">Mobile-optimized, fast-loading website</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#85abe4]" />
                      <span className="text-gray-700">Comprehensive analytics and reporting</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Client Success Story */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
            Client Success Story
          </h2>
          
          <Card className="border-2 border-[#85abe4]/20 shadow-lg">
            <CardContent className="p-8">
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-lg md:text-xl text-gray-700 italic mb-6">
                "FundTek completely transformed our online presence. Within 6 months, we achieved first-page Google rankings for all our target keywords, and our website traffic increased by 400%. The new website design converted 60% better than our old site."
              </blockquote>
              <div className="text-center">
                <div className="font-bold text-gray-800">Sarah Chen</div>
                <div className="text-[#85abe4]">Chen Digital Marketing Agency</div>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-8">
            <Button 
              onClick={handleMoreTestimonials}
              variant="outline"
              className="border-[#85abe4] text-[#85abe4] hover:bg-[#85abe4] hover:text-white"
            >
              Read More Success Stories
            </Button>
          </div>
        </div>
      </section>

      {/* Service Packages */}
      <section className="py-16 md:py-20 bg-[#85abe4] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Service Packages
          </h2>
          <p className="text-xl text-blue-100 mb-12">
            Choose the digital solution that best fits your business needs and growth goals
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-2xl font-bold mb-2">SEO Only</div>
              <div className="text-blue-100 text-sm">Search optimization and content strategy</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-2xl font-bold mb-2">Web Development</div>
              <div className="text-blue-100 text-sm">Custom website design and development</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-2xl font-bold mb-2">Complete Package</div>
              <div className="text-blue-100 text-sm">Full SEO + web development solution</div>
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
              onClick={() => setLocation('/contact')}
              size="lg"
              className="bg-[#85abe4] hover:bg-[#6b8cc4] text-white px-8 py-4 text-lg"
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