import LoanApplicationForm from '@/components/loan-application-form';

export default function ApplyNow() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-[#193a59] text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Loan Application
          </h1>
          <p className="text-xl text-blue-100 mb-6">
            4 Steps to Funding - Complete Your Application Today
          </p>
          <div className="flex justify-center items-center space-x-8 text-sm">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-white text-[#193a59] rounded-full flex items-center justify-center font-bold mr-2">1</div>
              <span>Personal Info</span>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-white text-[#193a59] rounded-full flex items-center justify-center font-bold mr-2">2</div>
              <span>Business Details</span>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-white text-[#193a59] rounded-full flex items-center justify-center font-bold mr-2">3</div>
              <span>Financial Info</span>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-white text-[#193a59] rounded-full flex items-center justify-center font-bold mr-2">4</div>
              <span>Submit</span>
            </div>
          </div>
        </div>
      </div>

      {/* Application Form */}
      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <p className="text-gray-600 text-lg">
              Thank you for placing your trust in us. Please take a few minutes to complete the form below. 
              We will process your request right away.
            </p>
          </div>
          
          <LoanApplicationForm />
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="bg-white py-8 border-t">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-[#193a59] mb-2">🔒</div>
              <h3 className="font-semibold text-gray-900 mb-1">Secure & Protected</h3>
              <p className="text-sm text-gray-600">Your information is encrypted and protected with bank-level security.</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#193a59] mb-2">⚡</div>
              <h3 className="font-semibold text-gray-900 mb-1">Fast Processing</h3>
              <p className="text-sm text-gray-600">Get pre-approved in as little as 24 hours with our streamlined process.</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#193a59] mb-2">🎯</div>
              <h3 className="font-semibold text-gray-900 mb-1">No Obligation</h3>
              <p className="text-sm text-gray-600">Applying is free and doesn't affect your credit score until you accept an offer.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}