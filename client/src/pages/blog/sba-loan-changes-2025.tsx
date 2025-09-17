import Header from "@/components/header";
import Footer from "@/components/footer";
import SEOHead from "@/components/seo-head";
import { ChevronRight, Clock, User, Calendar, ArrowLeft, CheckCircle, DollarSign, FileText, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation, Link } from "wouter";

export default function SBALoanChanges2025() {
  const [, setLocation] = useLocation();

  const handleApplyNow = () => {
    setLocation('/apply-now');
  };

  const handleBackToBlog = () => {
    setLocation('/blog');
  };

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Major SBA Loan Program Changes Coming in 2025 | Lendura Capital"
        description="The Small Business Administration announces significant updates to loan programs for 2025, including increased lending limits and streamlined application processes."
        keywords="SBA loan changes 2025, SBA program updates, small business administration news, SBA lending limits, SBA application process, small business loans"
        canonical="/blog/sba-loan-changes-2025"
        type="article"
        image="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&h=630&fit=crop"
        articleData={{
          headline: "Major SBA Loan Program Changes Coming in 2025",
          author: "SBA Lending Team",
          datePublished: "2025-01-18T00:00:00-05:00",
          dateModified: "2025-01-18T12:00:00-05:00",
          category: "SBA Updates",
          readTime: "6 min read",
          image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&h=630&fit=crop",
          excerpt: "The Small Business Administration announces significant updates to loan programs for 2025, including increased lending limits and streamlined application processes."
        }}
        breadcrumbData={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: "SBA Loan Changes 2025", url: "/blog/sba-loan-changes-2025" }
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
            <Link href="/blog" className="text-gray-500 hover:text-[#193a59] transition-colors">
              Blog
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-[#193a59] font-medium">SBA Loan Changes 2025</span>
          </nav>
        </div>
      </div>

      {/* Article Header */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            onClick={handleBackToBlog}
            variant="outline"
            className="mb-8 text-[#193a59] border-[#193a59] hover:bg-[#193a59] hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>

          <div className="mb-6">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-[#193a59] text-white rounded-full mb-4">
              SBA Updates
            </span>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>January 18, 2025</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>6 min read</span>
              </div>
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>SBA Lending Team</span>
              </div>
            </div>
          </div>

          <div className="aspect-video mb-8 rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=450&fit=crop"
              alt="SBA Building and Government Updates"
              className="w-full h-full object-cover"
            />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Major SBA Loan Program Changes Coming in 2025
          </h1>

          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            The Small Business Administration has announced significant updates to its loan programs for 2025, including increased lending limits, streamlined application processes, and new eligibility criteria that will benefit millions of small businesses across the United States.
          </p>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-0 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            
            {/* Key Changes Summary */}
            <div className="bg-blue-50 border-l-4 border-[#193a59] p-6 mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="w-6 h-6 text-[#193a59] mr-2" />
                Key Changes at a Glance
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>SBA 7(a) loan limits increased from $5M to $5.5M</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Streamlined application process for loans under $500K</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Enhanced eligibility for startups and minority-owned businesses</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Digital-first application platform launch</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Reduced fees for borrowers in underserved communities</span>
                </li>
              </ul>
            </div>

            {/* Main Content */}
            <div className="space-y-8">
              
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Increased Lending Limits</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  One of the most significant changes for 2025 is the increase in SBA 7(a) loan limits from $5 million to $5.5 million. This $500,000 increase represents the first adjustment to these limits since 2020 and reflects the SBA's commitment to supporting larger small business growth initiatives.
                </p>
                
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">What This Means for Borrowers</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Greater access to capital for expansion projects</li>
                    <li>• Ability to finance larger real estate acquisitions</li>
                    <li>• Enhanced working capital availability for growing businesses</li>
                    <li>• More flexibility in business acquisition financing</li>
                  </ul>
                </div>
                
                <p className="text-gray-700 mb-6 leading-relaxed">
                  The increase also applies to SBA 504 loans, which will now have a maximum SBA debenture of $5.5 million (previously $5 million), allowing for total project costs of up to $11 million when combined with bank financing and borrower equity.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Streamlined Application Process</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  The SBA is introducing a significantly streamlined application process for loans under $500,000, addressing one of the most common complaints from small business owners about the complexity and time required for SBA loan applications.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <FileText className="w-5 h-5 text-[#193a59] mr-2" />
                      Reduced Documentation
                    </h4>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• Simplified personal financial statements</li>
                      <li>• Streamlined business tax return requirements</li>
                      <li>• Reduced collateral documentation</li>
                      <li>• Digital document submission</li>
                    </ul>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <Clock className="w-5 h-5 text-[#193a59] mr-2" />
                      Faster Processing
                    </h4>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• 14-day target for loan decisions</li>
                      <li>• Automated preliminary approval system</li>
                      <li>• Real-time application status updates</li>
                      <li>• Direct lender expedited review</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Enhanced Digital Platform</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  The SBA is launching a completely redesigned digital platform that will serve as the primary interface for loan applications, document submission, and communication with lenders. This platform represents a significant investment in modernizing the SBA's technology infrastructure.
                </p>
                
                <div className="bg-green-50 border-l-4 border-green-400 p-6 mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Platform Features</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Mobile-responsive design for applications on any device</li>
                    <li>• AI-powered application assistance and guidance</li>
                    <li>• Integrated document management system</li>
                    <li>• Real-time collaboration tools for borrowers and lenders</li>
                    <li>• Automated eligibility pre-screening</li>
                    <li>• Enhanced security and data protection</li>
                  </ul>
                </div>
                
                <p className="text-gray-700 mb-6 leading-relaxed">
                  The platform will be rolled out in phases starting in Q2 2025, with full implementation expected by Q4 2025. Existing applications will continue to be processed through current systems during the transition period.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Expanded Eligibility Criteria</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  The SBA has also announced several changes to eligibility criteria designed to increase access for underserved communities and emerging business sectors.
                </p>
                
                <div className="space-y-6">
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Startup-Friendly Changes</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Reduced experience requirements for certain industries</li>
                      <li>• Alternative credit scoring for businesses with limited credit history</li>
                      <li>• Expanded acceptance of projected financial statements</li>
                      <li>• New mentor programs for first-time business owners</li>
                    </ul>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Minority and Women-Owned Business Support</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Reduced fees for certified minority-owned businesses</li>
                      <li>• Enhanced technical assistance programs</li>
                      <li>• Priority processing for disadvantaged business enterprises</li>
                      <li>• Expanded access to SBA resource partners</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Fee Structure Updates</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  The SBA is implementing a more equitable fee structure that provides relief for borrowers in underserved communities while maintaining the program's financial sustainability.
                </p>
                
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6">
                  <div className="flex items-start">
                    <DollarSign className="w-6 h-6 text-yellow-600 mr-3 mt-1" />
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">New Fee Structure</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• No fees for loans under $150,000 (up from $125,000)</li>
                        <li>• Reduced fees for loans in Opportunity Zones</li>
                        <li>• Graduated fee schedule based on loan amount and term</li>
                        <li>• Fee waivers for veteran-owned businesses</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Implementation Timeline</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  These changes will be implemented gradually throughout 2025 to ensure a smooth transition for borrowers and lenders.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Q1 2025 (March)</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Increased lending limits take effect</li>
                      <li>• New fee structure implementation</li>
                      <li>• Enhanced eligibility criteria rollout</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Q2-Q4 2025</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Digital platform phased launch</li>
                      <li>• Streamlined process implementation</li>
                      <li>• Training programs for lenders</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">What This Means for Your Business</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  These changes represent the most significant updates to SBA loan programs in recent years and should make SBA financing more accessible and efficient for small businesses across the country.
                </p>
                
                <div className="bg-blue-50 border-l-4 border-[#193a59] p-6 mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Action Steps for Business Owners</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Review your financing needs to take advantage of higher lending limits</li>
                    <li>• Prepare for faster application processes by organizing documentation early</li>
                    <li>• Consider SBA loans if you previously thought the process was too complex</li>
                    <li>• Work with SBA Preferred Lenders who are familiar with the new processes</li>
                    <li>• Stay informed about the digital platform rollout schedule</li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Related Articles</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/blog/business-credit-score-improvement" className="block bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-[#193a59]">5 Ways to Improve Your Business Credit Score</h3>
              <p className="text-gray-600 text-sm mb-3">Learn proven strategies to boost your business credit score and qualify for better financing terms.</p>
              <div className="text-xs text-gray-500">Credit Tips • 8 min read</div>
            </Link>
            <Link href="/guides/complete-sba-loan-guide-2025" className="block bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-[#193a59]">Complete SBA Loan Guide 2025</h3>
              <p className="text-gray-600 text-sm mb-3">Everything you need to know about SBA financing programs and application strategies.</p>
              <div className="text-xs text-gray-500">Guides • 15 min read</div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#193a59] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Take Advantage of These SBA Changes?
          </h2>
          <p className="text-xl text-gray-100 mb-8">
            Our SBA loan specialists stay up-to-date with all program changes and can help you navigate the new application process.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={handleApplyNow}
              className="bg-white text-[#193a59] hover:bg-gray-100 font-bold px-8 py-3 text-lg"
            >
              Apply for SBA Loan
            </Button>
            <div className="text-center">
              <p className="text-sm text-gray-200">Speak with an SBA expert:</p>
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