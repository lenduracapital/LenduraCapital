import { Building, CheckCircle, ArrowLeft, Users, TrendingUp, Shield, Clock } from "lucide-react";
import { useLocation } from "wouter";

export default function CommercialRealEstateLending() {
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
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=600&fit=crop')"
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-8" style={{ backgroundColor: '#85abe4' }}>
              <Building className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-wider">
              Commercial Real Estate Lending
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
              Comprehensive financing solutions for commercial property acquisition, refinancing, and development projects nationwide.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Professional Commercial Real Estate Financing
            </h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-12">
              FundTek Capital Group specializes in commercial real estate lending for investors, developers, and business owners. 
              Our comprehensive loan programs provide the capital you need for property acquisition, refinancing, construction, 
              and development projects across all property types.
            </p>
          </div>
        </div>
      </section>

      {/* Property Types Focus */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Property Types We Finance
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From office buildings to industrial facilities, we provide financing solutions for all commercial property types.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <Building className="w-12 h-12 mx-auto mb-4" style={{ color: '#85abe4' }} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Office Buildings</h3>
              <p className="text-gray-600">Single and multi-tenant office properties, medical buildings, and professional complexes.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <Building className="w-12 h-12 mx-auto mb-4" style={{ color: '#85abe4' }} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Retail Properties</h3>
              <p className="text-gray-600">Shopping centers, strip malls, standalone retail buildings, and restaurant properties.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <Building className="w-12 h-12 mx-auto mb-4" style={{ color: '#85abe4' }} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Industrial</h3>
              <p className="text-gray-600">Warehouses, manufacturing facilities, distribution centers, and flex spaces.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <Building className="w-12 h-12 mx-auto mb-4" style={{ color: '#85abe4' }} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Multi-Family</h3>
              <p className="text-gray-600">Apartment complexes, condominiums, and other residential income properties.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Lending Process Comparison */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Traditional Banks vs FundTek CRE Lending
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-red-50 p-8 rounded-xl border border-red-200">
              <h3 className="text-2xl font-bold text-red-700 mb-6 text-center">Traditional Banks</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="text-red-500 text-2xl mr-4">✗</span>
                  <span className="text-gray-700">6-12 month approval process</span>
                </div>
                <div className="flex items-center">
                  <span className="text-red-500 text-2xl mr-4">✗</span>
                  <span className="text-gray-700">Extensive documentation requirements</span>
                </div>
                <div className="flex items-center">
                  <span className="text-red-500 text-2xl mr-4">✗</span>
                  <span className="text-gray-700">Perfect credit score required</span>
                </div>
                <div className="flex items-center">
                  <span className="text-red-500 text-2xl mr-4">✗</span>
                  <span className="text-gray-700">25-30% down payment required</span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-8 rounded-xl border border-green-200">
              <h3 className="text-2xl font-bold text-green-700 mb-6 text-center">FundTek CRE Lending</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="text-green-500 text-2xl mr-4">✓</span>
                  <span className="text-gray-700">30-45 day closing timeline</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 text-2xl mr-4">✓</span>
                  <span className="text-gray-700">Streamlined documentation process</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 text-2xl mr-4">✓</span>
                  <span className="text-gray-700">Flexible credit requirements</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 text-2xl mr-4">✓</span>
                  <span className="text-gray-700">As low as 10% down payment</span>
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
              Real Estate Success Story
            </h2>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg max-w-4xl mx-auto">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mr-6" style={{ backgroundColor: '#85abe4' }}>
                <span className="text-white font-bold text-xl">RD</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Robert Davis</h3>
                <p className="text-gray-600">Commercial Real Estate Developer</p>
              </div>
            </div>
            <blockquote className="text-lg text-gray-700 italic leading-relaxed">
              "When traditional banks wanted 6 months and 30% down for our office building acquisition, 
              FundTek closed our $2.8M loan in just 35 days with only 15% down. Their expertise in 
              commercial real estate financing made the difference in securing this prime property."
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
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Loan Programs</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Acquisition Loans</li>
                <li>• Refinancing Options</li>
                <li>• Construction Loans</li>
                <li>• Bridge Financing</li>
                <li>• Development Loans</li>
              </ul>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: '#85abe4' }}>
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Loan Terms</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• $500K - $50M+ loan amounts</li>
                <li>• 5-30 year amortization</li>
                <li>• Fixed and variable rates</li>
                <li>• 65-90% LTV options</li>
                <li>• Interest-only periods</li>
              </ul>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: '#85abe4' }}>
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Process Benefits</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Fast pre-approval process</li>
                <li>• Dedicated loan specialists</li>
                <li>• Nationwide lending</li>
                <li>• Flexible underwriting</li>
                <li>• Competitive pricing</li>
              </ul>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: '#85abe4' }}>
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Borrower Types</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Real estate investors</li>
                <li>• Property developers</li>
                <li>• Business owners</li>
                <li>• Investment groups</li>
                <li>• REITs and funds</li>
              </ul>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: '#85abe4' }}>
                <Building className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Property Analysis</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Cash flow evaluation</li>
                <li>• Market analysis</li>
                <li>• Property appraisals</li>
                <li>• Risk assessment</li>
                <li>• Investment potential</li>
              </ul>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: '#85abe4' }}>
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Expert Support</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Experienced CRE team</li>
                <li>• Market expertise</li>
                <li>• Deal structuring</li>
                <li>• Closing coordination</li>
                <li>• Ongoing relationship</li>
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
                Qualification Requirements
              </h2>
              <div className="grid md:grid-cols-2 gap-8 text-white">
                <div>
                  <h3 className="text-xl font-bold mb-4">Property Requirements</h3>
                  <ul className="space-y-2 text-left">
                    <li>• Stabilized income-producing property</li>
                    <li>• Minimum property value $500K</li>
                    <li>• Strong market location</li>
                    <li>• Acceptable property condition</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4">Borrower Requirements</h3>
                  <ul className="space-y-2 text-left">
                    <li>• 650+ credit score preferred</li>
                    <li>• Real estate experience</li>
                    <li>• Adequate liquidity</li>
                    <li>• Strong debt service coverage</li>
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
                  <span className="text-white font-bold">MC</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Maria Chen</h4>
                  <p className="text-gray-600">Property Investor</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "FundTek's commercial real estate team understood our investment strategy and structured a loan that maximized our returns. Their market knowledge was invaluable."
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: '#85abe4' }}>
                  <span className="text-white font-bold">TS</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Tom Stevens</h4>
                  <p className="text-gray-600">Development Company</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "The construction loan process was seamless. FundTek's team stayed involved throughout the project and helped us navigate challenges that arose during development."
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

      {/* FAQ Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-3">What types of commercial properties do you finance?</h3>
              <p className="text-gray-700">We finance all commercial property types including office buildings, retail centers, industrial facilities, multi-family properties, mixed-use developments, and special purpose properties like hotels and self-storage facilities.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-3">What are typical loan-to-value ratios for commercial real estate?</h3>
              <p className="text-gray-700">LTV ratios typically range from 65-80% depending on property type, location, and borrower strength. Stabilized income-producing properties generally qualify for higher LTV ratios than development projects.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-3">How long does the commercial loan process take?</h3>
              <p className="text-gray-700">Our streamlined process typically takes 30-45 days from application to closing. Complex transactions or development projects may require additional time for due diligence and approvals.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-3">What credit score is required for commercial real estate loans?</h3>
              <p className="text-gray-700">While we prefer credit scores of 650+, we evaluate each deal holistically. Strong property cash flow, significant experience, and adequate liquidity can sometimes offset lower credit scores.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Do you offer construction and development financing?</h3>
              <p className="text-gray-700">Yes, we provide construction loans, development financing, and bridge loans for ground-up construction, major renovations, and value-add projects with experienced developers.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-3">What documentation is required for commercial real estate loans?</h3>
              <p className="text-gray-700">Required documents include property financials, rent rolls, lease agreements, borrower financial statements, tax returns, property appraisal, environmental reports, and detailed business plan for the property.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-20" style={{ backgroundColor: '#85abe4' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Ready to Finance Your Commercial Real Estate Project?
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
            Get started with a free consultation and discover how FundTek can help you secure the commercial real estate financing you need.
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