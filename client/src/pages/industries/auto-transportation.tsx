
import CountUp from "@/components/count-up";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft, Star, Car, Wrench, Settings } from "lucide-react";
import { useLocation } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";

const CountUp = ({ end, duration = 3000, suffix = "", prefix = "", className = "" }: { 
  end: number; 
  duration?: number; 
  suffix?: string; 
  prefix?: string;
  className?: string;
}) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          
          let startTime: number;
          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeOutCubic * end));
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration, hasStarted]);

  return <span ref={elementRef} className={className}>{prefix}{count}{suffix}</span>;
};

export default function AutoTransportation() {
  const [, setLocation] = useLocation();

  const handleApplyNow = () => {
    window.open("https://form.jotform.com/251417715331047", "_blank");
  };

  const handleBackToIndustries = () => {
    setLocation("/qualified-industries");
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 md:pt-40 pb-20 md:pb-32 bg-gradient-to-br from-[#85abe4] to-blue-600 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#85abe4]/30 to-transparent"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&h=600&fit=crop')"
          }}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            onClick={handleBackToIndustries}
            style={{ backgroundColor: '#85abe4', color: 'white' }}
            className="mb-8 text-white border-white hover:bg-white hover:text-[#85abe4] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Industries
          </Button>
          
          <div className="text-left max-w-4xl mt-8 md:mt-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Auto & Transportation Financing
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Drive your business forward with financing for inventory, equipment, and facility improvements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleApplyNow}
                size="lg"
                style={{ backgroundColor: '#85abe4', color: 'white' }}
                className="hover:opacity-90 text-lg px-8 py-3 font-semibold"
              >
                Get Approved in 24 Hours
              </Button>
              <Button 
                onClick={() => setLocation("/solutions")}
                style={{ backgroundColor: '#85abe4', color: 'white' }}
                size="lg"
                style={{ color: 'white', borderColor: 'white' }}
                className="hover:bg-white hover:text-[#85abe4] text-lg px-8 py-3 font-semibold"
              >
                View All Solutions
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Accelerate Growth Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Accelerate the growth of your business
            </h2>
            <p className="text-lg md:text-xl text-gray-600">
              Small Business Loans • Merchant Cash Advances • Lines of Credit
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <CountUp end={50} suffix="+" className="text-4xl md:text-5xl font-bold text-[#85abe4] mb-2 block" />
              <div className="text-lg font-semibold text-gray-900 mb-1">Specialists</div>
              <div className="text-sm text-gray-600">Over 50+ specialists to keep you going</div>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <CountUp end={12} className="text-4xl md:text-5xl font-bold text-[#85abe4] mb-2 block" />
              <div className="text-lg font-semibold text-gray-900 mb-1">Financing options</div>
              <div className="text-sm text-gray-600">12 financing solutions and small business products</div>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <CountUp end={20} prefix="$" suffix="M" className="text-4xl md:text-5xl font-bold text-[#85abe4] mb-2 block" />
              <div className="text-lg font-semibold text-gray-900 mb-1">Funding up to</div>
              <div className="text-sm text-gray-600">Unsecured funding up to $20,000,000</div>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <CountUp end={24} className="text-4xl md:text-5xl font-bold text-[#85abe4] mb-2 block" />
              <div className="text-lg font-semibold text-gray-900 mb-1">Hours</div>
              <div className="text-sm text-gray-600">Get funding in 24 hours</div>
            </div>
          </div>
        </div>
      </section>
      </section>

      {/* Industry Overview */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6 md:mb-8">
                Accelerating Auto Business Success
              </h2>
              <div className="text-lg md:text-xl text-gray-700 mb-8 md:mb-12 leading-relaxed space-y-4">
                <p>Auto and transportation businesses face unique challenges: inventory costs, equipment expenses, seasonal fluctuations, and maintaining competitive service levels in a fast-paced industry.</p>
                <p>FundTek Capital Group understands the automotive industry and provides flexible financing solutions that help dealerships, repair shops, and transportation companies maintain inventory and grow operations.</p>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-black mb-6">Common Financing Needs</h3>
              <ul className="space-y-4 mb-8 md:mb-12">
                {[
                  "Vehicle inventory and floor planning",
                  "Shop equipment and diagnostic tools", 
                  "Facility improvements and expansions",
                  "Parts inventory and supplies",
                  "Working capital for operations",
                  "Fleet expansion and upgrades"
                ].map((need, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0" style={{ color: '#85abe4' }} />
                    <span className="text-gray-700">{need}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop"
                alt="Auto dealership and transportation business"
                className="w-full h-80 md:h-96 lg:h-[500px] object-cover rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-[#85abe4] text-white p-6 rounded-lg shadow-lg">
                <div className="text-sm font-medium text-white">Fast Approval</div>
                <div className="text-2xl font-bold text-white">24-48hrs</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accelerate Growth Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Accelerate the growth of your business
            </h2>
            <p className="text-lg md:text-xl text-gray-600">
              Small Business Loans • Merchant Cash Advances • Lines of Credit
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <CountUp end={50} suffix="+" className="text-4xl md:text-5xl font-bold text-[#85abe4] mb-2 block" />
              <div className="text-lg font-semibold text-gray-900 mb-1">Specialists</div>
              <div className="text-sm text-gray-600">Over 50+ specialists to keep you going</div>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <CountUp end={12} className="text-4xl md:text-5xl font-bold text-[#85abe4] mb-2 block" />
              <div className="text-lg font-semibold text-gray-900 mb-1">Financing options</div>
              <div className="text-sm text-gray-600">12 financing solutions and small business products</div>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <CountUp end={20} prefix="$" suffix="M" className="text-4xl md:text-5xl font-bold text-[#85abe4] mb-2 block" />
              <div className="text-lg font-semibold text-gray-900 mb-1">Funding up to</div>
              <div className="text-sm text-gray-600">Unsecured funding up to $20,000,000</div>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <CountUp end={24} className="text-4xl md:text-5xl font-bold text-[#85abe4] mb-2 block" />
              <div className="text-lg font-semibold text-gray-900 mb-1">Hours</div>
              <div className="text-sm text-gray-600">Get funding in 24 hours</div>
            </div>
          </div>
        </div>
      </section>
      </section>

      {/* Success Stories */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real auto businesses that accelerated growth with FundTek Capital Group financing
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Steve Johnson",
                company: "Johnson Auto Sales",
                story: "Used floor plan financing to expand vehicle inventory by 40%. Increased monthly sales and secured better terms with manufacturers.",
                funding: "$300,000 Inventory Financing"
              },
              {
                name: "Maria Santos",
                company: "Santos Auto Repair",
                story: "Secured equipment financing for diagnostic equipment and lifts. Improved service capacity and customer satisfaction ratings significantly.",
                funding: "$85,000 Equipment Financing"
              },
              {
                name: "Tom Wilson",
                company: "Wilson Transportation",
                story: "Got working capital to expand delivery fleet and hire drivers. Secured major corporate contract worth $150K annually.",
                funding: "$120,000 Line of Credit"
              }
            ].map((story, index) => (
              <div key={index} className="bg-white p-8 rounded-lg border-l-4 border-[#85abe4] shadow-lg">
                <div className="flex items-start space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{story.story}"</p>
                <div className="border-t pt-4">
                  <div className="font-semibold text-black">{story.name}</div>
                  <div className="text-sm text-gray-600 mb-2">{story.company}</div>
                  <div className="text-sm font-medium" style={{ color: '#85abe4' }}>{story.funding}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accelerate Growth Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Accelerate the growth of your business
            </h2>
            <p className="text-lg md:text-xl text-gray-600">
              Small Business Loans • Merchant Cash Advances • Lines of Credit
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <CountUp end={50} suffix="+" className="text-4xl md:text-5xl font-bold text-[#85abe4] mb-2 block" />
              <div className="text-lg font-semibold text-gray-900 mb-1">Specialists</div>
              <div className="text-sm text-gray-600">Over 50+ specialists to keep you going</div>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <CountUp end={12} className="text-4xl md:text-5xl font-bold text-[#85abe4] mb-2 block" />
              <div className="text-lg font-semibold text-gray-900 mb-1">Financing options</div>
              <div className="text-sm text-gray-600">12 financing solutions and small business products</div>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <CountUp end={20} prefix="$" suffix="M" className="text-4xl md:text-5xl font-bold text-[#85abe4] mb-2 block" />
              <div className="text-lg font-semibold text-gray-900 mb-1">Funding up to</div>
              <div className="text-sm text-gray-600">Unsecured funding up to $20,000,000</div>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <CountUp end={24} className="text-4xl md:text-5xl font-bold text-[#85abe4] mb-2 block" />
              <div className="text-lg font-semibold text-gray-900 mb-1">Hours</div>
              <div className="text-sm text-gray-600">Get funding in 24 hours</div>
            </div>
          </div>
        </div>
      </section>
      </section>

      {/* Recommended Solutions */}
      <section className="py-16 md:py-24 bg-[#85abe4] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
            Recommended Financing Solutions
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
            Based on typical auto industry needs, these solutions work best for automotive businesses
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <h3 className="text-xl font-bold mb-4 text-white">Lines of Credit</h3>
              <p className="text-blue-100 mb-6">Perfect for inventory purchases and operational cash flow management</p>
              <Button 
                onClick={() => setLocation("/solutions/lines-of-credit")}
                style={{ backgroundColor: '#85abe4', color: 'white' }}
                className="hover:opacity-90 font-semibold"
              >
                Learn More
              </Button>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <h3 className="text-xl font-bold mb-4 text-white">Equipment Financing</h3>
              <p className="text-blue-100 mb-6">Ideal for shop equipment, diagnostic tools, and facility improvements</p>
              <Button 
                onClick={() => setLocation("/solutions/equipment-financing")}
                style={{ backgroundColor: '#85abe4', color: 'white' }}
                className="hover:opacity-90 font-semibold"
              >
                Learn More
              </Button>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <h3 className="text-xl font-bold mb-4 text-white">Term Loans</h3>
              <p className="text-blue-100 mb-6">Long-term financing for expansion projects and major investments</p>
              <Button 
                onClick={() => setLocation("/solutions/term-loans")}
                style={{ backgroundColor: '#85abe4', color: 'white' }}
                className="hover:opacity-90 font-semibold"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Accelerate Growth Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Accelerate the growth of your business
            </h2>
            <p className="text-lg md:text-xl text-gray-600">
              Small Business Loans • Merchant Cash Advances • Lines of Credit
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <CountUp end={50} suffix="+" className="text-4xl md:text-5xl font-bold text-[#85abe4] mb-2 block" />
              <div className="text-lg font-semibold text-gray-900 mb-1">Specialists</div>
              <div className="text-sm text-gray-600">Over 50+ specialists to keep you going</div>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <CountUp end={12} className="text-4xl md:text-5xl font-bold text-[#85abe4] mb-2 block" />
              <div className="text-lg font-semibold text-gray-900 mb-1">Financing options</div>
              <div className="text-sm text-gray-600">12 financing solutions and small business products</div>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <CountUp end={20} prefix="$" suffix="M" className="text-4xl md:text-5xl font-bold text-[#85abe4] mb-2 block" />
              <div className="text-lg font-semibold text-gray-900 mb-1">Funding up to</div>
              <div className="text-sm text-gray-600">Unsecured funding up to $20,000,000</div>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <CountUp end={24} className="text-4xl md:text-5xl font-bold text-[#85abe4] mb-2 block" />
              <div className="text-lg font-semibold text-gray-900 mb-1">Hours</div>
              <div className="text-sm text-gray-600">Get funding in 24 hours</div>
            </div>
          </div>
        </div>
      </section>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to Accelerate Your Auto Business?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Get the funding you need to stock inventory, purchase equipment, and expand your automotive operations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleApplyNow}
              size="lg"
              style={{ backgroundColor: '#85abe4' }}
              className="hover:opacity-90 text-lg px-8 py-3 font-semibold text-white"
            >
              Apply Now - Get Approved in 24 Hours
            </Button>
            <Button 
              onClick={() => setLocation("/contact")}
              style={{ backgroundColor: '#85abe4', color: 'white' }}
              size="lg"
              className="text-white border-white hover:bg-white hover:text-gray-900 text-lg px-8 py-3 font-semibold"
            >
              Contact Our Specialists
            </Button>
          </div>
        </div>
      </section>

      {/* Accelerate Growth Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Accelerate the growth of your business
            </h2>
            <p className="text-lg md:text-xl text-gray-600">
              Small Business Loans • Merchant Cash Advances • Lines of Credit
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <CountUp end={50} suffix="+" className="text-4xl md:text-5xl font-bold text-[#85abe4] mb-2 block" />
              <div className="text-lg font-semibold text-gray-900 mb-1">Specialists</div>
              <div className="text-sm text-gray-600">Over 50+ specialists to keep you going</div>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <CountUp end={12} className="text-4xl md:text-5xl font-bold text-[#85abe4] mb-2 block" />
              <div className="text-lg font-semibold text-gray-900 mb-1">Financing options</div>
              <div className="text-sm text-gray-600">12 financing solutions and small business products</div>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <CountUp end={20} prefix="$" suffix="M" className="text-4xl md:text-5xl font-bold text-[#85abe4] mb-2 block" />
              <div className="text-lg font-semibold text-gray-900 mb-1">Funding up to</div>
              <div className="text-sm text-gray-600">Unsecured funding up to $20,000,000</div>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <CountUp end={24} className="text-4xl md:text-5xl font-bold text-[#85abe4] mb-2 block" />
              <div className="text-lg font-semibold text-gray-900 mb-1">Hours</div>
              <div className="text-sm text-gray-600">Get funding in 24 hours</div>
            </div>
          </div>
        </div>
      </section>
      </section>

      <Footer />
    </div>
  );
}