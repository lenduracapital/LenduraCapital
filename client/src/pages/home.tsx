export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-blue-600 mb-6">FundTek Capital Group</h1>
          <p className="text-2xl text-gray-700 mb-8">Fast Business Financing Solutions</p>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Get the working capital your business needs with our flexible financing options. 
            Quick approval, competitive rates, and dedicated support.
          </p>
          <button className="bg-blue-600 text-white px-12 py-4 text-xl rounded-lg hover:bg-blue-700 transition-colors shadow-lg">
            Apply Now
          </button>
        </div>
        
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Fast Approval</h3>
            <p className="text-gray-600">Get approved in as little as 24 hours with our streamlined process.</p>
          </div>
          <div className="text-center p-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Flexible Terms</h3>
            <p className="text-gray-600">Customized financing solutions to match your business needs.</p>
          </div>
          <div className="text-center p-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Expert Support</h3>
            <p className="text-gray-600">Dedicated specialists to guide you through every step.</p>
          </div>
        </div>
      </div>
    </div>
  );
}