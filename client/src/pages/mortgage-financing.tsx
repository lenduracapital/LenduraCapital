import { Building, CheckCircle, ArrowLeft, Users, TrendingUp, Shield, Clock, Home } from "lucide-react";
import { useLocation } from "wouter";

export default function MortgageFinancing() {
  const [, setLocation] = useLocation();

  const handleBackToSolutions = () => {
    setLocation("/solutions");
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleApplyNow = () => {
    window.open("https://form.jotform.com/251417715331047", "_blank");
  };

  const handleMoreTestimonials = () => {
    setLocation("/more-testimonials");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section 
        className="relative pt-40 md:pt-48 pb-20 md:pb-32 bg-cover bg-center"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=600&fit=crop')"
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-8" style={{ backgroundColor: '#85abe4' }}>
              <Home className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-wider">
              Mortgage Financing
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
              Comprehensive residential and commercial mortgage solutions with competitive rates and flexible terms for all your property financing needs.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Professional Mortgage Solutions
            </h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-12">
              FundTek Capital Group provides comprehensive mortgage financing for residential and commercial properties. 
              Our experienced team works with a network of lenders to secure the best rates and terms for your specific situation, 
              whether you're purchasing your first home or expanding your real estate portfolio.
            </p>
          </div>
        </div>
      </section>

      {/* Mortgage Types Focus */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Mortgage Programs Available
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From conventional mortgages to specialized programs, we offer financing solutions for every property type and borrower profile.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <Home className="w-12 h-12 mx-auto mb-4" style={{ color: '#85abe4' }} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Conventional Loans</h3>
              <p className="text-gray-600">Traditional fixed and adjustable rate mortgages with competitive terms and flexible options.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <Building className="w-12 h-12 mx-auto mb-4" style={{ color: '#85abe4' }} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">FHA/VA Loans</h3>
              <p className="text-gray-600">Government-backed loan programs with lower down payments and flexible qualification requirements.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <TrendingUp className="w-12 h-12 mx-auto mb-4" style={{ color: '#85abe4' }} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Jumbo Mortgages</h3>
              <p className="text-gray-600">High-balance loans for luxury homes and properties that exceed conventional loan limits.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <Users className="w-12 h-12 mx-auto mb-4" style={{ color: '#85abe4' }} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Investment Property</h3>
              <p className="text-gray-600">Specialized financing for rental properties and real estate investment opportunities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Lending Process Comparison */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Traditional Lenders vs FundTek Mortgage
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-red-50 p-8 rounded-xl border border-red-200">
              <h3 className="text-2xl font-bold text-red-700 mb-6 text-center">Traditional Lenders</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="text-red-500 text-2xl mr-4">✗</span>
                  <span className="text-gray-700">45-60 day closing timeline</span>
                </div>
                <div className="flex items-center">
                  <span className="text-red-500 text-2xl mr-4">✗</span>
                  <span className="text-gray-700">Limited loan program options</span>
                </div>
                <div className="flex items-center">
                  <span className="text-red-500 text-2xl mr-4">✗</span>
                  <span className="text-gray-700">Rigid underwriting guidelines</span>
                </div>
                <div className="flex items-center">
                  <span className="text-red-500 text-2xl mr-4">✗</span>
                  <span className="text-gray-700">Limited communication during process</span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-8 rounded-xl border border-green-200">
              <h3 className="text-2xl font-bold text-green-700 mb-6 text-center">FundTek Mortgage</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="text-green-500 text-2xl mr-4">✓</span>
                  <span className="text-gray-700">21-30 day closing capability</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 text-2xl mr-4">✓</span>
                  <span className="text-gray-700">Multiple lender network access</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 text-2xl mr-4">✓</span>
                  <span className="text-gray-700">Flexible underwriting solutions</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 text-2xl mr-4">✓</span>
                  <span className="text-gray-700">Dedicated loan specialist support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Success Story */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Mortgage Success Story
            </h2>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg max-w-4xl mx-auto">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mr-6" style={{ backgroundColor: '#85abe4' }}>
                <span className="text-white font-bold text-xl">JL</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Jennifer Lopez</h3>
                <p className="text-gray-600">First-Time Homebuyer</p>
              </div>
            </div>
            <blockquote className="text-lg text-gray-700 italic leading-relaxed">
              "As a first-time buyer with student loans, I was worried about qualifying. FundTek found me an FHA loan program 
              that worked with my situation and closed in just 25 days. Their team guided me through every step and made 
              homeownership possible when other lenders said no."
            </blockquote>
          </div>
        </div>
      </section>

      {/* Comprehensive Information Grid */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: '#85abe4' }}>
                <Home className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Loan Products</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Conventional Mortgages</li>
                <li>• FHA/VA/USDA Loans</li>
                <li>• Jumbo Mortgages</li>
                <li>• Refinancing Options</li>
                <li>• Investment Property Loans</li>
              </ul>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: '#85abe4' }}>
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Loan Features</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Fixed and adjustable rates</li>
                <li>• Down payments as low as 3%</li>
                <li>• 15, 20, 30-year terms</li>
                <li>• No prepayment penalties</li>
                <li>• Competitive interest rates</li>
              </ul>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: '#85abe4' }}>
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Process Benefits</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Fast pre-qualification</li>
                <li>• Digital application process</li>
                <li>• Quick closing timelines</li>
                <li>• Regular status updates</li>
                <li>• Smooth coordination</li>
              </ul>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: '#85abe4' }}>
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Borrower Types</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• First-time homebuyers</li>
                <li>• Move-up buyers</li>
                <li>• Real estate investors</li>
                <li>• Self-employed borrowers</li>
                <li>• Refinancing homeowners</li>
              </ul>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: '#85abe4' }}>
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Rate Options</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Fixed-rate mortgages</li>
                <li>• Adjustable-rate mortgages</li>
                <li>• Interest-only options</li>
                <li>• Rate lock protection</li>
                <li>• Competitive pricing</li>
              </ul>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: '#85abe4' }}>
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Expert Support</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Licensed loan officers</li>
                <li>• Market rate analysis</li>
                <li>• Program comparison</li>
                <li>• Document preparation</li>
                <li>• Closing coordination</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Qualification Requirements */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="p-8 md:p-12 rounded-xl text-center" style={{ backgroundColor: '#85abe4' }}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                Qualification Guidelines
              </h2>
              <div className="grid md:grid-cols-2 gap-8 text-white">
                <div>
                  <h3 className="text-xl font-bold mb-4">Basic Requirements</h3>
                  <ul className="space-y-2 text-left">
                    <li>• 580+ credit score (varies by program)</li>
                    <li>• Stable employment history</li>
                    <li>• Verifiable income documentation</li>
                    <li>• Acceptable debt-to-income ratio</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4">Documentation Needed</h3>
                  <ul className="space-y-2 text-left">
                    <li>• Recent pay stubs and tax returns</li>
                    <li>• Bank statements and asset verification</li>
                    <li>• Employment verification letter</li>
                    <li>• Property appraisal and inspection</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              What Our Clients Say
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: '#85abe4' }}>
                  <span className="text-white font-bold">DM</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">David Miller</h4>
                  <p className="text-gray-600">Investment Property Owner</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "FundTek secured financing for my third rental property when my bank couldn't help. Their investor loan programs and fast closing made all the difference in a competitive market."
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: '#85abe4' }}>
                  <span className="text-white font-bold">SW</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Sarah Wilson</h4>
                  <p className="text-gray-600">Homeowner</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "The refinancing process was incredibly smooth. FundTek found us a rate that was 1.5% lower than our previous mortgage, saving us over $400 per month."
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <button
              onClick={handleMoreTestimonials}
              className="px-8 py-4 bg-white border-2 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg"
              style={{ 
                borderColor: '#85abe4',
                color: '#85abe4'
              }}
            >
              Read More Success Stories
            </button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-20" style={{ backgroundColor: '#85abe4' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Ready to Secure Your Mortgage?
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
            Get pre-qualified today and discover how FundTek can help you secure the best mortgage terms for your home purchase or refinance.
          </p>
          <div className="space-y-4 sm:space-y-0 sm:space-x-6 sm:flex sm:justify-center">
            <button
              onClick={handleApplyNow}
              className="w-full sm:w-auto px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Contact Us
            </button>
            <button
              onClick={handleBackToSolutions}
              className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-200 flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Solutions
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}