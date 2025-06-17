import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const CountUp = ({ end, duration = 2000, suffix = "", prefix = "" }: { 
  end: number; 
  duration?: number; 
  suffix?: string; 
  prefix?: string; 
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
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
  }, [end, duration]);

  return <span>{prefix}{count}{suffix}</span>;
};

export default function WorkingCapitalSection() {
  const handleApplyNow = () => {
    window.open("https://form.jotform.com/251417715331047", "_blank");
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Accelerate the growth of your business
          </h2>
          <p className="text-xl text-gray-600">
            Small Business Loans. Merchant Cash Advances. Payroll. HR. Employee Benefits. Websites & SEO.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="text-5xl md:text-6xl font-bold text-gray-800 mb-2">
              <CountUp end={50} suffix="+" />
            </div>
            <div className="text-lg text-[--primary] font-semibold mb-2">Specialists</div>
            <p className="text-sm text-gray-600">Over 50 funding specialists to keep you going</p>
          </div>

          <div className="text-center">
            <div className="text-5xl md:text-6xl font-bold text-gray-800 mb-2">
              <CountUp end={5} suffix="+" />
            </div>
            <div className="text-lg text-[--primary] font-semibold mb-2">Financing options</div>
            <p className="text-sm text-gray-600">5+ financing options and small business products</p>
          </div>

          <div className="text-center">
            <div className="text-5xl md:text-6xl font-bold text-gray-800 mb-2">
              $<CountUp end={20} suffix="M" />
            </div>
            <div className="text-lg text-[--primary] font-semibold mb-2">Funding up to</div>
            <p className="text-sm text-gray-600">Unsecured funding up to $20,000,000</p>
          </div>

          <div className="text-center">
            <div className="text-5xl md:text-6xl font-bold text-gray-800 mb-2">
              <CountUp end={48} />
            </div>
            <div className="text-lg text-[--primary] font-semibold mb-2">Hours</div>
            <p className="text-sm text-gray-600">Get funding in 48 hours</p>
          </div>
        </div>

        {/* Working Capital Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="space-y-6">
            <div className="bg-gray-800 text-white px-6 py-4 rounded-lg inline-block">
              <p className="text-lg font-semibold">
                Over $1B in working capital provided to U.S. small-medium sized businesses.
              </p>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-4xl font-bold text-[--primary]">
                Quick, efficient, revenue-based financing solutions.
              </h3>
              
              <div className="bg-gray-800 text-white px-6 py-4 rounded-lg">
                <p className="text-lg font-semibold">
                  A funding partner that cares about your business objectives.
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h4 className="text-2xl font-bold text-gray-800 mb-6">
              Get working capital today
            </h4>
            <p className="text-gray-600 mb-6">
              Fill out the form below, and we'll arrange a consultation at a time most suitable for you.
            </p>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="John Smith"
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[--primary] focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Business Name"
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[--primary] focus:border-transparent"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="email"
                  placeholder="example@mail.com"
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[--primary] focus:border-transparent"
                />
                <input
                  type="tel"
                  placeholder="000-000-0000"
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[--primary] focus:border-transparent"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <select className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[--primary] focus:border-transparent">
                  <option>Monthly Revenue</option>
                  <option>$0 - $10K</option>
                  <option>$10K - $50K</option>
                  <option>$50K - $100K</option>
                  <option>$100K+</option>
                </select>
                <select className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[--primary] focus:border-transparent">
                  <option>State</option>
                  <option>NY</option>
                  <option>CA</option>
                  <option>TX</option>
                  <option>FL</option>
                </select>
              </div>
              
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[--primary] focus:border-transparent">
                <option>Service I need</option>
                <option>Term Loan</option>
                <option>Merchant Cash Advance</option>
                <option>Line of Credit</option>
                <option>Equipment Financing</option>
              </select>
              
              <textarea
                placeholder="Write your message"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[--primary] focus:border-transparent"
              />
              
              <div className="flex items-start space-x-3">
                <input type="checkbox" className="mt-1" />
                <p className="text-sm text-gray-600">
                  By clicking Submit, I hereby acknowledge that I have read, and I agree, to all terms and conditions, the cookie policy, and the privacy policy.
                </p>
              </div>
              
              <Button 
                onClick={handleApplyNow}
                className="w-full bg-[--primary] hover:bg-[--primary-dark] text-white py-3 px-6 rounded-lg font-semibold text-lg transition-all duration-200"
              >
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}