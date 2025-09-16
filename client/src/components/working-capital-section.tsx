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
            <p className="text-gray-500 mt-1 md:mt-2 text-xs md:text-sm">Over 50 specialists to keep you going</p>
          </div>
          <div className="text-center bg-white p-4 md:p-6 rounded-lg shadow-md">
            <p className="text-3xl md:text-5xl font-black text-[--primary] mb-1 md:mb-2">
              <CountUp end={12} duration={2000} />
            </p>
            <p className="text-[--primary] font-semibold text-sm md:text-lg">Financing options</p>
            <p className="text-gray-500 mt-1 md:mt-2 text-xs md:text-sm">12 financing solutions and small business products</p>
          </div>
          <div className="text-center bg-white p-4 md:p-6 rounded-lg shadow-md">
            <p className="text-3xl md:text-5xl font-black text-[--primary] mb-1 md:mb-2">
              $<CountUp end={20} suffix="M" />
            </p>
            <p className="text-[--primary] font-semibold text-sm md:text-lg">Funding up to</p>
            <p className="text-gray-500 mt-1 md:mt-2 text-xs md:text-sm">Unsecured funding up to $20,000,000</p>
          </div>
          <div className="text-center bg-white p-4 md:p-6 rounded-lg shadow-md">
            <p className="text-3xl md:text-5xl font-black text-[--primary] mb-1 md:mb-2">
              <CountUp end={24} />
            </p>
            <p className="text-[--primary] font-semibold text-sm md:text-lg">Hours</p>
            <p className="text-gray-500 mt-1 md:mt-2 text-xs md:text-sm">Get funding in 24 hours</p>
          </div>
        </div>

        {/* Comparison Chart Section */}
        <div className="max-w-6xl mx-auto mb-12 md:mb-16">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
            {/* Traditional Banks */}
            <div className="p-6 md:p-8 rounded-lg border border-red-200 bg-[#d9d9d9]">
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
            
            {/* Lendura Capital */}
            <div className="bg-green-50 p-6 md:p-8 rounded-lg border border-green-200">
              <h3 className="text-xl md:text-2xl font-bold text-green-800 mb-4 md:mb-6">Lendura Capital</h3>
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
                  <span className="text-gray-700 text-sm md:text-base">12 different financing solutions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Simplified Action Section */}
        <div className="max-w-6xl mx-auto mb-12 md:mb-16 px-4">
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Fast Approval */}
            <div className="text-center bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-[#193a59] to-[#285d8a] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Same Day</h3>
              <p className="text-lg text-[#193a59] font-semibold mb-2">Approval</p>
              <p className="text-gray-600 text-sm">Get approved in hours, not weeks</p>
            </div>

            {/* Funding Range */}
            <div className="text-center bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-[#193a59] to-[#285d8a] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-3 text-xl leading-tight">$10K - $20M</h3>
              <p className="text-lg text-[#193a59] font-semibold mb-2">Available</p>
              <p className="text-gray-600 text-sm">Flexible amounts for any business size</p>
            </div>

            {/* Credit Protection */}
            <div className="text-center bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No Impact</h3>
              <p className="text-lg font-semibold mb-2 text-[#193a59]">On Credit Score</p>
              <p className="text-gray-600 text-sm">Soft check only - protects your rating</p>
            </div>

          </div>
        </div>

        {/* Simple CTA Section */}
        <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16 px-4">
          <div className="bg-gradient-to-br from-[#193a59] to-[#285d8a] rounded-3xl p-8 md:p-12 text-white shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Grow Your Business?</h2>
            <p className="text-xl mb-8 opacity-90">Get the capital you need with transparent terms and no hidden fees</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <Button 
                onClick={() => window.location.href = '/apply-now'}
                className="bg-white text-[#193a59] hover:bg-gray-100 px-8 py-4 rounded-xl font-bold text-lg shadow-lg transform hover:scale-105 transition-all duration-200 flex-1"
              >
                Apply Now ➤
              </Button>
              <Button 
                onClick={() => {
                  setLocation('/solutions');
                  window.scrollTo(0, 0);
                }}
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#193a59] px-8 py-4 rounded-xl font-bold text-lg transform hover:scale-105 transition-all duration-200 flex-1"
              >
                View Solutions
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}