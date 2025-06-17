import { CheckCircle, Clock, DollarSign } from "lucide-react";

export default function MoveBusinessForwardSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* First section - centered text with icons */}
        <div className="text-center mb-20">
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
    </section>
  );
}