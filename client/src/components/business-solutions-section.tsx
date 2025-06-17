import { Button } from "@/components/ui/button";

export default function BusinessSolutionsSection() {
  const solutions = [
    "Merchant Cash Advance",
    "Line of Credit", 
    "Equipment Financing",
    "Mortgage Financing",
    "Term Loans",
    "Factoring",
    "P.O. Financing"
  ];

  return (
    <section className="py-24 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Cityscape image */}
          <div className="relative">
            <div className="bg-slate-800 rounded-lg overflow-hidden h-96">
              <img 
                src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop"
                alt="City skyline at night"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            </div>
            
            {/* Overlay text on image */}
            <div className="absolute bottom-8 left-8 bg-white p-6 rounded-lg max-w-sm">
              <h3 className="text-2xl font-bold text-slate-800 mb-3">
                Completely customized financial solution to meet your business needs
              </h3>
              <p className="text-gray-600 text-sm">
                Fast and flexible custom financing solutions help you overcome your business challenges.
              </p>
            </div>
          </div>

          {/* Right side - Content */}
          <div>
            <h2 className="text-4xl font-bold text-slate-800 mb-6">
              Premium Business Financing Solutions
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              FundTek understands how a loan at the right time can make a huge difference in the success of your business. To that end, we've made it fast and easy to access financing solutions completely designed around your small business needs.
            </p>
            
            <p className="text-gray-700 mb-6">We actively help small businesses just like yours with:</p>
            
            <ul className="space-y-3 mb-8">
              {solutions.map((solution, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <span className="w-2 h-2 rounded-full mr-4" style={{ backgroundColor: '#85abe4' }}></span>
                  {solution}
                </li>
              ))}
            </ul>
            
            <p className="text-gray-600 mb-8">
              FundTek offers merchant cash advances, small business loans, SBA loans, equipment financing, factoring, purchase order financing, lines of credit, and commercial mortgages nationwide.
            </p>
            
            <Button 
              onClick={() => window.location.href = '/solutions'}
              style={{ backgroundColor: '#85abe4' }}
              className="hover:opacity-90 text-white px-8 py-4 rounded-lg font-semibold text-lg"
            >
              Find out more →
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}