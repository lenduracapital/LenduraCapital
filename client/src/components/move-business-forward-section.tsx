import { CheckCircle, Clock, DollarSign } from "lucide-react";

export default function MoveBusinessForwardSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6" style={{ color: '#85abe4' }}>
            Move your Business Forward
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-16">
            FundTek Capital Group empowers your business with custom financing options 
            and premier business services, allowing you to focus on the things that really matter 
            to your business.
          </p>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="mb-6">
                <CheckCircle className="w-16 h-16 mx-auto" style={{ color: '#85abe4' }} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Dedicated specialists</h3>
              <p className="text-gray-600">
                Extremely knowledgeable specialists who understand your specific business financing 
                and operational needs.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-6">
                <Clock className="w-16 h-16 mx-auto" style={{ color: '#85abe4' }} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Fast turnaround</h3>
              <p className="text-gray-600">
                Get the financing and business solutions you need to manage and grow your business 
                in 24 - 48 hours.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-6">
                <DollarSign className="w-16 h-16 mx-auto" style={{ color: '#85abe4' }} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Industry leading rates</h3>
              <p className="text-gray-600">
                Access the best rates on a wide variety of financing options and premier business 
                services to innovate, grow, and compete.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Comparison Chart Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Traditional Banks */}
          <div className="bg-red-50 p-8 rounded-lg border border-red-200">
            <h3 className="text-2xl font-bold text-red-800 mb-6">Traditional Banks</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-red-500 mr-3 mt-1 text-lg">✗</span>
                <span className="text-gray-700">30-90 day approval process</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-3 mt-1 text-lg">✗</span>
                <span className="text-gray-700">Extensive documentation required</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-3 mt-1 text-lg">✗</span>
                <span className="text-gray-700">High credit score requirements</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-3 mt-1 text-lg">✗</span>
                <span className="text-gray-700">Rigid qualification criteria</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-3 mt-1 text-lg">✗</span>
                <span className="text-gray-700">Limited product options</span>
              </li>
            </ul>
          </div>
          
          {/* FundTek Capital Group */}
          <div className="bg-green-50 p-8 rounded-lg border border-green-200">
            <h3 className="text-2xl font-bold text-green-800 mb-6">FundTek Capital Group</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-green-500 mr-3 mt-1 text-lg">✓</span>
                <span className="text-gray-700">24-48 hour approval process</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3 mt-1 text-lg">✓</span>
                <span className="text-gray-700">Minimal documentation needed</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3 mt-1 text-lg">✓</span>
                <span className="text-gray-700">Flexible credit requirements</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3 mt-1 text-lg">✓</span>
                <span className="text-gray-700">Revenue-based qualification</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3 mt-1 text-lg">✓</span>
                <span className="text-gray-700">9 different financing solutions</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}