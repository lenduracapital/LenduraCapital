import Header from "@/components/header";
import Footer from "@/components/footer";
import SEOHead from "@/components/seo-head";
import { ChevronRight, Clock, Tag, User, Calendar, ArrowLeft, CheckCircle, AlertTriangle, DollarSign, FileText, Building2 } from "lucide-react";
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

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Complete Guide to SBA Loans in 2025 | Application Process & Requirements"
        description="Everything you need to know about SBA loans in 2025. Complete guide covering SBA 7(a), SBA 504, microloans, requirements, application process, and approval strategies."
        keywords="SBA loans 2025, SBA 7(a) loans, SBA 504 loans, SBA microloans, SBA loan requirements, SBA loan application process, small business administration loans"
        canonical="/guides/complete-sba-loan-guide-2025"
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            
            {/* Table of Contents */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Table of Contents</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#what-are-sba-loans" className="text-[#193a59] hover:underline">What Are SBA Loans?</a></li>
                <li><a href="#types-of-sba-loans" className="text-[#193a59] hover:underline">Types of SBA Loans</a></li>
                <li><a href="#eligibility-requirements" className="text-[#193a59] hover:underline">Eligibility Requirements</a></li>
                <li><a href="#application-process" className="text-[#193a59] hover:underline">Application Process</a></li>
                <li><a href="#required-documents" className="text-[#193a59] hover:underline">Required Documents</a></li>
                <li><a href="#approval-strategies" className="text-[#193a59] hover:underline">Approval Strategies</a></li>
                <li><a href="#alternatives" className="text-[#193a59] hover:underline">SBA Loan Alternatives</a></li>
              </ul>
            </div>

            {/* Content Sections */}
            <div id="what-are-sba-loans" className="mb-12">
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Types of SBA Loans</h2>
              
              <div className="space-y-8">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">SBA 7(a) Loans</h3>
                  <p className="text-gray-700 mb-4">
                    The most popular SBA loan program, offering up to $5 million for various business purposes including working capital, equipment purchases, real estate, and debt refinancing.
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Eligibility Requirements</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                To qualify for an SBA loan, your business must meet specific criteria set by the Small Business Administration. Here are the key requirements:
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