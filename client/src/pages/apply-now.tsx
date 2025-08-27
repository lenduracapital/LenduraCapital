import LoanApplicationForm from '@/components/loan-application-form';

export default function ApplyNow() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section - Matching PMF */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-[#193a59] mb-4">
              Information form
            </h1>
            <h2 className="text-xl text-gray-600 mb-6">
              4 steps to funding
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Thank you for placing your trust in us. Please take a few minutes to complete the form below. 
              We will process your request right away.
            </p>
          </div>
        </div>
      </div>

      {/* Step Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-center">
            <div className="flex items-center space-x-8 text-sm">
              <span className="text-[#193a59] font-medium">Contact Information</span>
              <span className="text-gray-400">Business Details</span>
              <span className="text-gray-400">Basic Documents</span>
              <span className="text-gray-400">Signature</span>
            </div>
          </div>
        </div>
      </div>

      {/* Application Form */}
      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <LoanApplicationForm />
        </div>
      </div>
    </div>
  );
}