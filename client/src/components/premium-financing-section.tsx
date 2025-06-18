import { useLocation } from "wouter";

export default function PremiumFinancingSection() {
  const [, setLocation] = useLocation();

  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left side - City Image */}
          <div className="order-2 lg:order-1">
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="City skyline representing business growth"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Meet your Goals. Grow your Business.</h3>
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Custom Small Business Solutions
            </h2>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              Streamline financial and marketing systems to increase sales and improve the customer experience.
            </p>
            <p className="text-gray-700 font-medium mb-8">
              PMF and its team of dedicated service advisors will help identify, optimize, and deploy the right business solutions to meet your needs, including:
            </p>
            
            <div className="space-y-3 mb-8">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-[#85abe4] rounded-full mr-4"></div>
                <span className="text-gray-700">Credit Servicing (Personal & Business)</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-[#85abe4] rounded-full mr-4"></div>
                <span className="text-gray-700">Credit Card Processing</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-[#85abe4] rounded-full mr-4"></div>
                <span className="text-gray-700">HR and Payroll Services</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-[#85abe4] rounded-full mr-4"></div>
                <span className="text-gray-700">Search Engine Optimization (SEO) and Web Development</span>
              </div>
            </div>

            <div className="mt-8">
              <button 
                onClick={() => setLocation('/solutions')}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Find out more →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}