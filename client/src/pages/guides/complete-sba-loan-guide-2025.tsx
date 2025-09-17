import Header from "@/components/header";
import Footer from "@/components/footer";
import SEOHead from "@/components/seo-head";
import StickySidebar from "@/components/sticky-sidebar";
import { ChevronRight, Clock, Tag, User, Calendar, ArrowLeft, CheckCircle, AlertTriangle, DollarSign, FileText, Building2, HelpCircle, TrendingUp, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation, Link } from "wouter";

export default function CompleteSBAGuide() {
  const [, setLocation] = useLocation();

  const handleApplyNow = () => {
    setLocation('/apply-now');
  };

  const handleBackToGuides = () => {
    setLocation('/guides');
  };

  // Related guides for sidebar
  const relatedGuides = [
    {
      id: "restaurant-financing-guide",
      title: "Restaurant Financing: Complete Funding Guide",
      excerpt: "Discover financing options specifically designed for restaurants and food service businesses.",
      readTime: "12 min read",
      category: "Industry Guides",
      slug: "restaurant-financing-complete-guide",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=250&fit=crop"
    },
    {
      id: "business-credit-building",
      title: "Building Business Credit: A Step-by-Step Blueprint",
      excerpt: "Learn how to establish and build business credit from scratch for better financing terms.",
      readTime: "10 min read",
      category: "Credit & Finance",
      slug: "building-business-credit-blueprint",
      image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=400&h=250&fit=crop"
    },
    {
      id: "equipment-financing-guide",
      title: "Equipment Financing vs. Leasing Guide",
      excerpt: "Compare equipment financing and leasing options to make the best decision for your business.",
      readTime: "8 min read",
      category: "Equipment Financing",
      slug: "equipment-financing-vs-leasing-guide",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Complete Guide to SBA Loans in 2025 | Application Process & Requirements"
        description="Everything you need to know about SBA loans in 2025. Complete guide covering SBA 7(a), SBA 504, microloans, requirements, application process, and approval strategies."
        keywords="SBA loans 2025, SBA 7(a) loans, SBA 504 loans, SBA microloans, SBA loan requirements, SBA loan application process, small business administration loans"
        canonical="/guides/complete-sba-loan-guide-2025"
        type="article"
        image="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=630&fit=crop"
        breadcrumbData={[
          { name: "Home", url: "/" },
          { name: "Guides", url: "/guides" },
          { name: "Complete SBA Loan Guide", url: "/guides/complete-sba-loan-guide-2025" }
        ]}
        faqData={[
          {
            question: "What is the maximum amount I can borrow with an SBA loan?",
            answer: "SBA 7(a) loans can provide up to $5.5 million for most businesses, while SBA 504 loans can provide up to $5.5 million for real estate and equipment purchases. Microloans are limited to $50,000."
          },
          {
            question: "How long does it take to get approved for an SBA loan?",
            answer: "SBA loan approval typically takes 30-90 days, depending on the loan type and lender. SBA Express loans can be approved in as little as 36 hours, while traditional SBA 7(a) loans may take 60-90 days."
          },
          {
            question: "What credit score do I need for an SBA loan?",
            answer: "Most SBA lenders require a personal credit score of at least 640-680 for SBA 7(a) loans. However, some lenders may approve borrowers with scores as low as 620 if other factors are strong."
          },
          {
            question: "Can I use an SBA loan to purchase an existing business?",
            answer: "Yes, SBA 7(a) loans can be used to purchase an existing business, including the real estate, equipment, and working capital. This is one of the most popular uses for SBA financing."
          },
          {
            question: "What are the SBA loan fees?",
            answer: "SBA guarantee fees range from 0.5% to 3.75% depending on the loan amount and term. For loans over $1 million, there's typically a 3.75% guarantee fee. Lenders may also charge origination fees."
          }
        ]}
      />
      <Header />
      
      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 py-3 border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm" aria-label="Breadcrumb">
            <Link href="/" className="text-gray-500 hover:text-[#193a59] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href="/guides" className="text-gray-500 hover:text-[#193a59] transition-colors">
              Guides
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-[#193a59] font-medium">Complete SBA Loan Guide</span>
          </nav>
        </div>
      </div>

      {/* Article Header */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Button
            onClick={handleBackToGuides}
            variant="outline"
            className="mb-8 text-[#193a59] border-[#193a59] hover:bg-[#193a59] hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Guides
          </Button>

          {/* Article Meta */}
          <div className="mb-6">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-[#193a59] text-white rounded-full mb-4">
              SBA Loans
            </span>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>January 15, 2025</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>15 min read</span>
              </div>
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>Lendura Capital Team</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="aspect-video mb-8 rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=450&fit=crop"
              alt="SBA Loan Application Process"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            The Complete Guide to SBA Loans in 2025
          </h1>

          {/* Article Excerpt */}
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Everything you need to know about SBA financing programs, from application requirements to approval strategies. This comprehensive guide covers SBA 7(a), 504, and microloans with insider tips from our lending experts.
          </p>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-0 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Main Content */}
            <div className="flex-1 max-w-4xl">
              <div className="prose prose-lg max-w-none">
                
                {/* Overview Section */}
                <div id="overview" className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 mb-12 border border-blue-100">
                  <div className="flex items-center mb-4">
                    <Award className="w-6 h-6 text-[#193a59] mr-3" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-0">Overview: SBA Loans in 2025</h2>
                  </div>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    <Link href="/solutions/sba-loans" className="text-[#193a59] hover:underline font-medium">SBA loans</Link> remain one of the most attractive financing options for small businesses, offering competitive rates, longer repayment terms, and lower down payments than traditional bank loans.
                  </p>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    In 2025, <Link href="/blog/sba-loan-changes-2025" className="text-[#193a59] hover:underline font-medium">significant program changes</Link> including increased lending limits and streamlined processes make SBA financing more accessible than ever for businesses across industries including <Link href="/industries/construction" className="text-[#193a59] hover:underline">construction</Link>, <Link href="/industries/restaurant-food-service" className="text-[#193a59] hover:underline">restaurants</Link>, and <Link href="/industries/medical-healthcare" className="text-[#193a59] hover:underline">healthcare</Link>.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4 mt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#193a59] mb-1">$5.5M</div>
                      <div className="text-sm text-gray-600">Max SBA 7(a) Loan</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#193a59] mb-1">85%</div>
                      <div className="text-sm text-gray-600">SBA Guarantee</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#193a59] mb-1">25 Years</div>
                      <div className="text-sm text-gray-600">Max Repayment Term</div>
                    </div>
                  </div>
                </div>
            
                {/* Table of Contents */}
                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Table of Contents</h3>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#overview" className="text-[#193a59] hover:underline">Overview</a></li>
                    <li><a href="#step-by-step-process" className="text-[#193a59] hover:underline">Step-by-Step Application Process</a></li>
                    <li><a href="#types-of-sba-loans" className="text-[#193a59] hover:underline">Types of SBA Loans</a></li>
                    <li><a href="#eligibility-requirements" className="text-[#193a59] hover:underline">Eligibility Requirements</a></li>
                    <li><a href="#best-practices" className="text-[#193a59] hover:underline">Best Practices</a></li>
                    <li><a href="#faqs" className="text-[#193a59] hover:underline">Frequently Asked Questions</a></li>
                  </ul>
                </div>

                {/* Step-by-Step Process Section */}
                <div id="step-by-step-process" className="mb-12">
                  <div className="flex items-center mb-6">
                    <TrendingUp className="w-6 h-6 text-[#193a59] mr-3" />
                    <h2 className="text-3xl font-bold text-gray-900">Step-by-Step Application Process</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                      <div className="flex items-start gap-4">
                        <div className="bg-[#193a59] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">1</div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">Determine Your SBA Loan Type</h3>
                          <p className="text-gray-600 mb-3">Choose between <Link href="/solutions/sba-loans" className="text-[#193a59] hover:underline">SBA 7(a)</Link> for general business purposes, SBA 504 for real estate and equipment, or microloans for smaller amounts. Consider your industry needs - for example, <Link href="/industries/manufacturing" className="text-[#193a59] hover:underline">manufacturing businesses</Link> often prefer SBA 504 for equipment purchases.</p>
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <p className="text-sm text-blue-800"><strong>Tip:</strong> Most businesses start with SBA 7(a) loans due to their flexibility. With the <Link href="/blog/sba-loan-changes-2025" className="text-[#193a59] hover:underline">2025 program updates</Link>, lending limits have increased to $5.5M. If you need quick funding, consider <Link href="/solutions/term-loans" className="text-[#193a59] hover:underline">alternative term loans</Link> while preparing your SBA application.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                      <div className="flex items-start gap-4">
                        <div className="bg-[#193a59] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">2</div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">Check SBA Loan Eligibility Requirements</h3>
                          <p className="text-gray-600 mb-3">Verify your business meets SBA size standards, operates for profit, and meets specific program requirements. Industry-specific considerations apply - <Link href="/industries/technology-software" className="text-[#193a59] hover:underline">technology companies</Link> and <Link href="/industries/professional-services" className="text-[#193a59] hover:underline">professional services</Link> often have different requirements.</p>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Business must operate primarily in the U.S.</li>
                            <li>• Owner must have invested their own time and money</li>
                            <li>• Business must not be delinquent on existing federal debt</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                      <div className="flex items-start gap-4">
                        <div className="bg-[#193a59] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">3</div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">Prepare Required Documents</h3>
                          <p className="text-gray-600 mb-3">Gather all necessary financial documents and business information before applying.</p>
                          <div className="grid md:grid-cols-2 gap-4 mt-3">
                            <div>
                              <p className="font-medium text-gray-900 mb-2">Financial Documents:</p>
                              <ul className="text-sm text-gray-600 space-y-1">
                                <li>• 3 years of tax returns</li>
                                <li>• Financial statements</li>
                                <li>• Cash flow projections</li>
                              </ul>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 mb-2">Business Documents:</p>
                              <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Business plan</li>
                                <li>• Articles of incorporation</li>
                                <li>• Operating agreements</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                      <div className="flex items-start gap-4">
                        <div className="bg-[#193a59] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">4</div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">Submit Your SBA Application</h3>
                          <p className="text-gray-600 mb-3">Apply through an SBA-approved lender or use the SBA's online portal for faster processing. While waiting for SBA approval, consider backup options like <Link href="/solutions/lines-of-credit" className="text-[#193a59] hover:underline">business lines of credit</Link> for immediate working capital needs.</p>
                          <div className="bg-green-50 p-3 rounded-lg">
                            <p className="text-sm text-green-800"><strong>Fast Track:</strong> Use SBA Express for loans under $500K with 36-hour approval. For immediate funding, explore <Link href="/solutions/merchant-cash-advance" className="text-[#193a59] hover:underline">merchant cash advances</Link> as bridge financing.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Best Practices Section */}
                <div id="best-practices" className="mb-12">
                  <div className="flex items-center mb-6">
                    <Award className="w-6 h-6 text-[#193a59] mr-3" />
                    <h2 className="text-3xl font-bold text-gray-900">Best Practices for SBA Loan Success</h2>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-100">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">✅ Do This</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Maintain strong personal and business credit scores - consider <Link href="/solutions/credit-services" className="text-[#193a59] hover:underline">credit repair services</Link> if needed</li>
                        <li>• Prepare detailed financial projections specific to your industry (<Link href="/industries/retail-e-commerce" className="text-[#193a59] hover:underline">retail</Link>, <Link href="/industries/trucking-transportation" className="text-[#193a59] hover:underline">transportation</Link>, etc.)</li>
                        <li>• Work with experienced SBA lenders</li>
                        <li>• Have a clear business plan and use of funds</li>
                        <li>• Maintain good business banking relationships</li>
                        <li>• Consider <Link href="/solutions/equipment-financing" className="text-[#193a59] hover:underline">equipment financing</Link> for specific equipment needs</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-lg p-6 border border-red-100">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">❌ Avoid This</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Don't apply with poor credit without improvement plan - use <Link href="/solutions/credit-services" className="text-[#193a59] hover:underline">credit building services</Link> first</li>
                        <li>• Don't inflate business projections unrealistically</li>
                        <li>• Don't rush the application without proper preparation</li>
                        <li>• Don't ignore SBA eligibility requirements for your industry</li>
                        <li>• Don't apply to multiple lenders simultaneously</li>
                        <li>• Don't overlook faster alternatives like <Link href="/solutions/term-loans" className="text-[#193a59] hover:underline">traditional business loans</Link> if you need immediate funding</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* FAQs Section */}
                <div id="faqs" className="mb-12">
                  <div className="flex items-center mb-6">
                    <HelpCircle className="w-6 h-6 text-[#193a59] mr-3" />
                    <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">How long does SBA loan approval take?</h3>
                      <p className="text-gray-600">Standard SBA loans typically take 30-90 days for approval. SBA Express loans can be approved in 36 hours, while SBA 504 loans may take 45-60 days due to their complexity.</p>
                    </div>
                    
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">What credit score do I need for an SBA loan?</h3>
                      <p className="text-gray-600">Most SBA lenders prefer a personal credit score of 650 or higher. However, some lenders may consider applicants with scores as low as 600 if other factors are strong.</p>
                    </div>
                    
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I use SBA loans for working capital?</h3>
                      <p className="text-gray-600">Yes, SBA 7(a) loans can be used for working capital, inventory, equipment, real estate, and other business purposes. However, some restrictions apply to certain uses.</p>
                    </div>
                    
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">What's the difference between SBA 7(a) and SBA 504 loans?</h3>
                      <p className="text-gray-600">SBA 7(a) loans are more flexible and can be used for various business purposes. SBA 504 loans are specifically for real estate and equipment purchases, offering lower down payments but more restrictions.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-80 lg:flex-shrink-0">
              <StickySidebar
                relatedPosts={relatedGuides}
                currentPostTitle="Complete Guide to SBA Loans in 2025"
                currentPostUrl="/guides/complete-sba-loan-guide-2025"
                showShareButtons={true}
                showRelatedPosts={true}
                showCTA={true}
                ctaTitle="Ready to Apply for SBA Financing?"
                ctaDescription="Get expert guidance on your SBA loan application. Our team has helped secure over $50M in SBA funding."
                ctaButtonText="Start SBA Application"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
              <h2 className="text-3xl font-bold text-gray-900 mb-6">What Are SBA Loans?</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Small Business Administration (SBA) loans are government-backed financing options designed to help small businesses access capital when traditional bank loans aren't available. The SBA doesn't lend money directly; instead, it guarantees a portion of the loan, reducing risk for lenders and making them more willing to lend to small businesses.
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                SBA loans typically offer lower down payments, competitive interest rates, and longer repayment terms compared to conventional business loans. This makes them an attractive option for businesses looking to start, expand, or refinance existing debt.
              </p>

              <div className="bg-blue-50 border-l-4 border-[#193a59] p-6 mb-6">
                <div className="flex items-start">
                  <DollarSign className="w-6 h-6 text-[#193a59] mr-3 mt-1" />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Key Benefits of SBA Loans</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                        <span>Lower down payments (as low as 10%)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                        <span>Competitive interest rates</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                        <span>Longer repayment terms (up to 25 years)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                        <span>No prepayment penalties</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div id="types-of-sba-loans" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Types of SBA Loans for Different Business Needs</h2>
              
              <div className="space-y-8">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">SBA 7(a) Loans - Most Popular Option</h3>
                  <p className="text-gray-700 mb-4">
                    The most popular <Link href="/solutions/sba-loans" className="text-[#193a59] hover:underline">SBA loan program</Link>, offering up to $5.5 million for various business purposes including working capital, equipment purchases, real estate, and debt refinancing. Perfect for businesses in <Link href="/industries/professional-services" className="text-[#193a59] hover:underline">professional services</Link>, <Link href="/industries/retail-e-commerce" className="text-[#193a59] hover:underline">retail</Link>, and <Link href="/industries/technology-software" className="text-[#193a59] hover:underline">technology</Link> sectors.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Loan Amount:</h4>
                      <p className="text-gray-700">Up to $5 million</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Repayment Terms:</h4>
                      <p className="text-gray-700">Up to 25 years for real estate, 10 years for equipment</p>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">SBA 504 Loans</h3>
                  <p className="text-gray-700 mb-4">
                    Designed for purchasing real estate or large equipment. These loans involve three parties: the borrower, a bank, and a Certified Development Company (CDC).
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Loan Amount:</h4>
                      <p className="text-gray-700">Up to $5.5 million</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Down Payment:</h4>
                      <p className="text-gray-700">As low as 10%</p>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">SBA Microloans</h3>
                  <p className="text-gray-700 mb-4">
                    Smaller loans up to $50,000 for startups and businesses needing modest amounts of capital.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Loan Amount:</h4>
                      <p className="text-gray-700">Up to $50,000</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Repayment Terms:</h4>
                      <p className="text-gray-700">Up to 6 years</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div id="eligibility-requirements" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">SBA Loan Eligibility Requirements by Industry</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                To qualify for an SBA loan, your business must meet specific criteria set by the Small Business Administration. While general requirements apply to all businesses, specific industries like <Link href="/industries/construction" className="text-[#193a59] hover:underline">construction</Link>, <Link href="/industries/medical-healthcare" className="text-[#193a59] hover:underline">healthcare</Link>, and <Link href="/industries/restaurant-food-service" className="text-[#193a59] hover:underline">restaurants</Link> may have additional considerations.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <Building2 className="w-6 h-6 text-[#193a59] mr-3 mt-1" />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Business Size Standards</h4>
                    <p className="text-gray-700">Your business must meet SBA's definition of a small business, which varies by industry. Generally, this means fewer than 500 employees for most industries.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#193a59] mr-3 mt-1" />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">For-Profit Business</h4>
                    <p className="text-gray-700">Your business must operate for profit and be engaged in, or propose to do business in, the United States or its possessions.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <DollarSign className="w-6 h-6 text-[#193a59] mr-3 mt-1" />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Owner Investment</h4>
                    <p className="text-gray-700">You must have invested your own time and money in the business. Typically, you'll need to invest 10-30% of the project cost.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FileText className="w-6 h-6 text-[#193a59] mr-3 mt-1" />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Good Character</h4>
                    <p className="text-gray-700">Business owners must demonstrate good character, management experience, and commitment to the business.</p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mt-6">
                <div className="flex items-start">
                  <AlertTriangle className="w-6 h-6 text-yellow-600 mr-3 mt-1" />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Credit Requirements</h4>
                    <p className="text-gray-700">
                      While there's no minimum credit score requirement, most lenders prefer a personal credit score of 680 or higher. Business credit history is also considered if available.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div id="application-process" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">SBA Loan Application Process</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                The SBA loan application process can take 30-90 days from start to finish. Here's a step-by-step breakdown:
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#193a59] text-white rounded-full flex items-center justify-center font-bold mr-4 mt-1">
                    1
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Prepare Your Documents</h4>
                    <p className="text-gray-700">Gather all required financial documents, business plans, and personal information before starting your application.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#193a59] text-white rounded-full flex items-center justify-center font-bold mr-4 mt-1">
                    2
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Find an SBA Preferred Lender</h4>
                    <p className="text-gray-700">Work with an SBA Preferred Lender for faster processing and approval decisions.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#193a59] text-white rounded-full flex items-center justify-center font-bold mr-4 mt-1">
                    3
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Submit Your Application</h4>
                    <p className="text-gray-700">Complete the SBA Form 1919 and provide all supporting documentation to your lender.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#193a59] text-white rounded-full flex items-center justify-center font-bold mr-4 mt-1">
                    4
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Lender Review</h4>
                    <p className="text-gray-700">The lender reviews your application and may request additional information or clarification.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#193a59] text-white rounded-full flex items-center justify-center font-bold mr-4 mt-1">
                    5
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">SBA Approval</h4>
                    <p className="text-gray-700">If approved by the lender, your application goes to the SBA for final approval and guarantee issuance.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#193a59] text-white rounded-full flex items-center justify-center font-bold mr-4 mt-1">
                    6
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Closing and Funding</h4>
                    <p className="text-gray-700">Once approved, you'll close on the loan and receive your funds, typically within 5-10 business days.</p>
                  </div>
                </div>
              </div>
            </div>

            <div id="required-documents" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Required Documents</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Having all required documents prepared beforehand will significantly speed up your application process. Here's what you'll need:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Personal Documents</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <span>Personal tax returns (3 years)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <span>Personal financial statement</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <span>Resume and business experience</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <span>Copy of driver's license</span>
                    </li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Business Documents</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <span>Business tax returns (3 years)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <span>Financial statements (P&L, Balance Sheet)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <span>Business plan</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <span>Articles of incorporation</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div id="approval-strategies" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Strategies to Improve Approval Chances</h2>
              
              <div className="space-y-6">
                <div className="bg-green-50 border-l-4 border-green-400 p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Strengthen Your Application</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Maintain strong personal and business credit scores</li>
                    <li>• Prepare a comprehensive business plan with realistic projections</li>
                    <li>• Demonstrate industry experience and management expertise</li>
                    <li>• Show sufficient cash flow to support debt payments</li>
                    <li>• Provide adequate collateral when possible</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border-l-4 border-[#193a59] p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Work with Experienced Professionals</h4>
                  <p className="text-gray-700">
                    Consider working with SBA loan specialists, accountants, and business advisors who understand the application process and can help you present the strongest possible application.
                  </p>
                </div>
              </div>
            </div>

            <div id="alternatives" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">SBA Loan Alternatives</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                If SBA loans aren't the right fit for your business, consider these alternative financing options:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Term Loans</h4>
                  <p className="text-gray-700">Traditional bank loans with fixed terms and regular payments. Faster approval but may require higher down payments.</p>
                  <Link href="/solutions/term-loans" className="text-[#193a59] hover:underline inline-block mt-2">
                    Learn about term loans →
                  </Link>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Equipment Financing</h4>
                  <p className="text-gray-700">Specialized loans for purchasing business equipment where the equipment serves as collateral.</p>
                  <Link href="/solutions/equipment-financing" className="text-[#193a59] hover:underline inline-block mt-2">
                    Learn about equipment financing →
                  </Link>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Lines of Credit</h4>
                  <p className="text-gray-700">Flexible financing that allows you to draw funds as needed and pay interest only on what you use.</p>
                  <Link href="/solutions/lines-of-credit" className="text-[#193a59] hover:underline inline-block mt-2">
                    Learn about lines of credit →
                  </Link>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Merchant Cash Advance</h4>
                  <p className="text-gray-700">Quick access to working capital based on future credit card sales, ideal for businesses with consistent card transactions.</p>
                  <Link href="/solutions/merchant-cash-advance" className="text-[#193a59] hover:underline inline-block mt-2">
                    Learn about cash advances →
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#193a59] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Apply for an SBA Loan?
          </h2>
          <p className="text-xl text-gray-100 mb-8">
            Our SBA loan specialists can help you navigate the application process and improve your chances of approval.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={handleApplyNow}
              className="bg-white text-[#193a59] hover:bg-gray-100 font-bold px-8 py-3 text-lg"
            >
              Start Your SBA Application
            </Button>
            <div className="text-center">
              <p className="text-sm text-gray-200">Or speak with an expert:</p>
              <a href="tel:3058347168" className="text-white font-bold text-lg hover:underline">
                (305) 834-7168
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}