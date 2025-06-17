import { Button } from "@/components/ui/button";

export default function BusinessSolutionsSection() {
  const services = [
    "Term Loans",
    "Lines of Credit", 
    "Equipment Financing",
    "Invoice Factoring",
    "P.O. Financing"
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop" 
              alt="City skyline at night" 
              className="w-full h-96 object-cover rounded-lg"
            />
            <div className="absolute bottom-6 left-6 bg-white p-6 rounded-lg shadow-lg max-w-xs">
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                Completely customized financial solution to meet your business needs
              </h4>
              <p className="text-gray-600 text-sm">
                Fast and flexible custom financing solutions help you overcome your business challenges.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Premium Business Financing Solutions
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              FundTek understands how a loan at the right time can make a huge difference in the success of your business. To that end, we've made it fast and easy to access financing solutions completely designed around your small business needs.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              We actively help small businesses just like yours with:
            </p>

            <ul className="space-y-3 mb-8">
              {services.map((service, index) => (
                <li key={index} className="flex items-center">
                  <div className="w-2 h-2 rounded-full mr-4" style={{ backgroundColor: '#85abe4' }}></div>
                  <span className="text-gray-700">{service}</span>
                </li>
              ))}
            </ul>

            <p className="text-gray-600 mb-8 text-sm">
              FundTek offers merchant cash advances, small business loans, SBA loans, equipment financing, factoring, purchase order financing, lines of credit, and commercial mortgages nationwide.
            </p>

            <Button 
              onClick={() => window.location.href = '/solutions'}
              style={{ backgroundColor: '#85abe4' }}
              className="hover:opacity-90 text-white px-6 py-2 rounded font-semibold"
            >
              Find out more →
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}