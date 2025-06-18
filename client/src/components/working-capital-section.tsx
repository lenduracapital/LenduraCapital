import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

const CountUp = ({ end, duration = 3000, suffix = "", prefix = "" }: { 
  end: number; 
  duration?: number; 
  suffix?: string; 
  prefix?: string; 
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

  return <span ref={elementRef}>{prefix}{count}{suffix}</span>;
};

export default function WorkingCapitalSection() {
  const [, setLocation] = useLocation();
  
  return (
    <section className="bg-gray-50 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 md:space-y-4 mb-12 md:mb-16">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-gray-800">
            Accelerate the growth of your business
          </h1>
          <p className="text-base md:text-lg text-gray-600">
            Small Business Loans · Merchant Cash Advances · Lines of Credit
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-5xl mx-auto mb-8 md:mb-12">
          <div className="text-center bg-white p-4 md:p-6 rounded-lg shadow-md">
            <p className="text-3xl md:text-5xl font-black text-[--primary] mb-1 md:mb-2">
              <CountUp end={50} suffix="+" />
            </p>
            <p className="text-[--primary] font-semibold text-sm md:text-lg">Specialists</p>
            <p className="text-gray-500 mt-1 md:mt-2 text-xs md:text-sm">Experienced funding experts</p>
          </div>
          <div className="text-center bg-white p-4 md:p-6 rounded-lg shadow-md">
            <p className="text-3xl md:text-5xl font-black text-[--primary] mb-1 md:mb-2">
              <CountUp end={5} suffix="+" />
            </p>
            <p className="text-[--primary] font-semibold text-sm md:text-lg">Financing options</p>
            <p className="text-gray-500 mt-1 md:mt-2 text-xs md:text-sm">Multiple capital products</p>
          </div>
          <div className="text-center bg-white p-4 md:p-6 rounded-lg shadow-md">
            <p className="text-3xl md:text-5xl font-black text-[--primary] mb-1 md:mb-2">
              $<CountUp end={20} suffix="M" />
            </p>
            <p className="text-[--primary] font-semibold text-sm md:text-lg">Funding up to</p>
            <p className="text-gray-500 mt-1 md:mt-2 text-xs md:text-sm">Unsecured capital available</p>
          </div>
          <div className="text-center bg-white p-4 md:p-6 rounded-lg shadow-md">
            <p className="text-3xl md:text-5xl font-black text-[--primary] mb-1 md:mb-2">
              <CountUp end={24} />
            </p>
            <p className="text-[--primary] font-semibold text-sm md:text-lg">Hours</p>
            <p className="text-gray-500 mt-1 md:mt-2 text-xs md:text-sm">Typical turnaround</p>
          </div>
        </div>

        {/* Comparison Chart Section */}
        <div className="max-w-6xl mx-auto mb-12 md:mb-16">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
            {/* Traditional Banks */}
            <div className="bg-red-50 p-6 md:p-8 rounded-lg border border-red-200">
              <h3 className="text-xl md:text-2xl font-bold text-red-800 mb-4 md:mb-6">Traditional Banks</h3>
              <ul className="space-y-3 md:space-y-4">
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 mt-1 text-lg">✗</span>
                  <span className="text-gray-700 text-sm md:text-base">30-90 day approval process</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 mt-1 text-lg">✗</span>
                  <span className="text-gray-700 text-sm md:text-base">Extensive documentation required</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 mt-1 text-lg">✗</span>
                  <span className="text-gray-700 text-sm md:text-base">High credit score requirements</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 mt-1 text-lg">✗</span>
                  <span className="text-gray-700 text-sm md:text-base">Rigid qualification criteria</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 mt-1 text-lg">✗</span>
                  <span className="text-gray-700 text-sm md:text-base">Limited product options</span>
                </li>
              </ul>
            </div>
            
            {/* FundTek Capital Group */}
            <div className="bg-green-50 p-6 md:p-8 rounded-lg border border-green-200">
              <h3 className="text-xl md:text-2xl font-bold text-green-800 mb-4 md:mb-6">FundTek Capital Group</h3>
              <ul className="space-y-3 md:space-y-4">
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1 text-lg">✓</span>
                  <span className="text-gray-700 text-sm md:text-base">24-48 hour approval process</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1 text-lg">✓</span>
                  <span className="text-gray-700 text-sm md:text-base">Minimal documentation needed</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1 text-lg">✓</span>
                  <span className="text-gray-700 text-sm md:text-base">Flexible credit requirements</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1 text-lg">✓</span>
                  <span className="text-gray-700 text-sm md:text-base">Revenue-based qualification</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1 text-lg">✓</span>
                  <span className="text-gray-700 text-sm md:text-base">9 different financing solutions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button 
            onClick={() => setLocation('/solutions')}
            style={{ backgroundColor: '#85abe4' }}
            className="hover:opacity-90 text-white px-6 md:px-8 py-2 md:py-3 rounded-lg font-semibold text-base md:text-lg w-full sm:w-auto"
          >
            See full list of services
          </Button>
        </div>
      </div>
    </section>
  );
}