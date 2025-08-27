import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function BusinessSolutionsSection() {
  const [, setLocation] = useLocation();
  
  const solutions = [
    "Client Cash Advance",
    "Line of Credit", 
    "Equipment Financing",
    "Mortgage Financing",
    "Term Loans",
    "Factoring",
    "P.O. Financing"
  ];

  return (
    <section className="py-12 md:py-24 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Left side - Cityscape image */}
          <div className="relative order-2 lg:order-1">
            <div className="bg-slate-800 rounded-lg overflow-hidden h-[300px] md:h-[400px] lg:h-[500px]">
              <img 
                src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop"
                alt="City skyline at night"
                className="w-full h-full object-cover"
              />

            </div>
            
            {/* Bottom overlay text spanning full width */}
            <div className="absolute bottom-0 left-0 right-0 bg-slate-800 p-4 md:p-6 m-2 md:m-4 rounded-lg">
              <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                Fully Customized Business Financing Designed for Your Success
              </h3>
              <p className="text-gray-300 text-xs md:text-sm">
                Fast, Flexible Business Funding Solutions to Overcome Your Cash-Flow Challenges
              </p>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="order-1 lg:order-2">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800 mb-4 md:mb-6">
              Custom Business Financing Solutions
            </h2>
            <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8">
              At FundTek, we know timely financing can make or break your business. That's why we deliver fast, flexible working capital and revenue-based loans tailored to your small business—so you get funding when you need it most.
            </p>
            
            <p className="text-gray-700 mb-6">We actively help small businesses just like yours with:</p>
            
            <ul className="space-y-3 mb-8">
              {solutions.map((solution, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <span className="w-2 h-2 rounded-full mr-4" style={{ backgroundColor: '#2563eb' }}></span>
                  {solution}
                </li>
              ))}
            </ul>
            
            <p className="text-gray-600 mb-8">
              FundTek offers merchant cash advances, small business loans, SBA loans, equipment financing, factoring, purchase order financing, lines of credit, and commercial mortgages nationwide.
            </p>
            
            <Button 
              onClick={() => {
                setLocation('/solutions');
                window.scrollTo(0, 0);
              }}
              style={{ backgroundColor: '#2563eb' }}
              className="hover:bg-[#7299d1] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 transform hover:scale-105 active:scale-95 text-white px-8 py-4 rounded-lg font-semibold text-lg min-h-[44px] shadow-lg"
            >
              Explore Your Financing Options →
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}