import { CheckCircle, Clock, DollarSign } from "lucide-react";

export default function ProcessSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Simple 3-Step Process
          </h2>
          <p className="text-lg text-gray-600">
            Get funded quickly with our streamlined application process
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">1. Apply Online</h3>
            <p className="text-gray-600">Complete our quick 5-minute application form</p>
          </div>
          
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">2. Get Approved</h3>
            <p className="text-gray-600">Receive approval decision within 24 hours</p>
          </div>
          
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">3. Receive Funds</h3>
            <p className="text-gray-600">Get your funds deposited same day</p>
          </div>
        </div>
      </div>
    </section>
  );
}