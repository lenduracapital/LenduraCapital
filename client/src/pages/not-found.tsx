import { Link } from "wouter";
import SEOHead from "@/components/seo-head";

export default function NotFound() {
  return (
    <>
      <SEOHead
        title="Page Not Found - FundTek Capital Group"
        description="The page you're looking for doesn't exist. Explore our business funding solutions including term loans, equipment financing, and merchant cash advances."
        canonical="/404"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4">
        <div className="text-center max-w-2xl mx-auto">
          {/* 404 Visual */}
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-[#85abe4] opacity-20 mb-4">404</h1>
            <div className="w-24 h-1 bg-[#85abe4] mx-auto mb-8"></div>
          </div>
          
          {/* Error Message */}
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back to finding the right business funding solution.
          </p>
          
          {/* Quick Actions */}
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center mb-12">
            <Link href="/">
              <button className="w-full sm:w-auto bg-[#85abe4] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#7299d1] transition-colors duration-200">
                Return Home
              </button>
            </Link>
            <Link href="/solutions">
              <button className="w-full sm:w-auto border-2 border-[#85abe4] text-[#85abe4] px-8 py-3 rounded-lg font-semibold hover:bg-[#85abe4] hover:text-white transition-colors duration-200">
                Browse Solutions
              </button>
            </Link>
            <Link href="/contact">
              <button className="w-full sm:w-auto border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:border-gray-400 transition-colors duration-200">
                Contact Us
              </button>
            </Link>
          </div>
          
          {/* Popular Links */}
          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Pages</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <Link href="/solutions/term-loans" className="text-[#85abe4] hover:underline">
                Term Loans
              </Link>
              <Link href="/solutions/merchant-cash-advance" className="text-[#85abe4] hover:underline">
                Cash Advance
              </Link>
              <Link href="/solutions/equipment-financing" className="text-[#85abe4] hover:underline">
                Equipment Financing
              </Link>
              <Link href="/solutions/sba-loans" className="text-[#85abe4] hover:underline">
                SBA Loans
              </Link>
              <Link href="/qualified-industries" className="text-[#85abe4] hover:underline">
                Qualified Industries
              </Link>
              <Link href="/testimonials" className="text-[#85abe4] hover:underline">
                Success Stories
              </Link>
            </div>
          </div>
          
          {/* Contact Info */}
          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <p className="text-gray-600 mb-2">Need immediate assistance?</p>
            <a href="tel:3053074658" className="text-2xl font-bold text-[#85abe4] hover:underline">
              (305) 307-4658
            </a>
            <p className="text-sm text-gray-500 mt-2">
              Speak with a funding specialist today
            </p>
          </div>
        </div>
      </div>
    </>
  );
}