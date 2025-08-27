import LoanApplicationForm from '@/components/loan-application-form';

export default function ApplyNow() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-[#193a59] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Apply for Funding
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            Get pre-approved in as little as 24 hours
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="flex flex-col items-center">
              <div className="text-3xl mb-2">🔒</div>
              <h3 className="font-semibold mb-1">Secure & Protected</h3>
              <p className="text-blue-100">Your information is encrypted and protected with bank-level security.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="font-semibold mb-1">Fast Processing</h3>
              <p className="text-blue-100">Get pre-approved in as little as 24 hours with our streamlined process.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-semibold mb-1">No Obligation</h3>
              <p className="text-blue-100">Applying is free and doesn't affect your credit score until you accept an offer.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Application Form */}
      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <p className="text-gray-600 text-lg">
              Thank you for placing your trust in Lendura Capital. Please take a few minutes to complete the form below. 
              We will process your request right away.
            </p>
          </div>
          
          <LoanApplicationForm />
        </div>
      </div>
    </div>
  );
}