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
                  <span className="text-gray-700 text-sm md:text-base">12 different financing solutions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* FundTek Tailored Section */}
        <div className="max-w-7xl mx-auto mb-12 md:mb-16 px-4">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
            {/* Left Side - No Impact & Application */}
            <div className="space-y-6 md:space-y-8">
              {/* No Impact on Credit Score */}
              <div className="relative bg-gradient-to-br from-emerald-50 to-green-100 p-5 md:p-8 lg:p-10 rounded-2xl shadow-xl border border-emerald-200 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200 rounded-full opacity-20 -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-green-300 rounded-full opacity-15 translate-y-12 -translate-x-12"></div>
                <div className="relative text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-emerald-500 rounded-full mb-4 md:mb-6">
                    <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-emerald-800 mb-2 md:mb-3">No Impact</h3>
                  <p className="text-base md:text-lg text-emerald-700 font-medium mb-3">On Your FICO</p>
                  <div className="text-xs md:text-sm text-emerald-600">
                    Soft credit check only - won't affect your rating
                  </div>
                </div>
              </div>
              
              {/* Application Process */}
              <div className="relative bg-gradient-to-br from-slate-700 to-slate-900 p-5 md:p-8 lg:p-10 rounded-2xl text-white shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#85abe4] rounded-full opacity-10 -translate-y-20 translate-x-20"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-400 rounded-full opacity-10 translate-y-16 -translate-x-16"></div>
                <div className="relative">
                  <div className="text-center mb-6 md:mb-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-[#85abe4] rounded-full mb-4 md:mb-6">
                      <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6 leading-tight px-2">Get Started in Minutes and See Your Options</h3>
                    <Button 
                      onClick={() => window.open("https://form.jotform.com/251417715331047", "_blank")}
                      className="bg-gradient-to-r from-[#85abe4] to-[#6b8cc4] hover:from-[#6b8cc4] hover:to-[#5a7ab8] text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-base md:text-lg shadow-lg transform hover:scale-105 transition-all duration-200 w-full sm:w-auto min-h-[44px]"
                    >
                      Apply Now ➤
                    </Button>
                  </div>
                  <div className="text-center border-t border-slate-600 pt-4 md:pt-6">
                    <div className="text-3xl md:text-5xl lg:text-6xl font-black mb-2 md:mb-3 bg-gradient-to-r from-[#85abe4] to-blue-300 bg-clip-text text-transparent">5 Min.</div>
                    <div className="text-base md:text-lg opacity-90 font-medium">Application Process</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Expert Advice & Requirements */}
            <div className="space-y-6 md:space-y-8">
              {/* Expert Advice */}
              <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 p-5 md:p-8 lg:p-10 rounded-2xl shadow-xl border border-blue-200 overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#85abe4] rounded-full opacity-10 -translate-y-20 translate-x-20"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-300 rounded-full opacity-10 translate-y-16 -translate-x-16"></div>
                
                <div className="relative flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-6">
                  <div className="flex-shrink-0 mx-auto sm:mx-0">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#85abe4] to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#85abe4] mb-3 md:mb-4 leading-tight">
                      Get 1-2-1 advice from an in-house team of experts on funding
                    </h3>
                    <p className="text-gray-700 text-sm md:text-base mb-6 md:mb-8 leading-relaxed">
                      Tired of funding delays? Partner with a dedicated specialist for fast working capital loans, equipment financing, payroll support, and tailored revenue-based funding to power your growth. Whether you need cash for marketing campaigns, inventory restocks, or expansion initiatives, we deliver same-day approval, transparent terms, and reliable service—so you can focus on running your business, not chasing capital.
                    </p>
                    
                    {/* Information Needed */}
                    <div className="bg-white p-3 md:p-4 rounded-lg shadow-md border border-gray-200 mb-3 md:mb-4">
                      <h4 className="font-bold text-gray-800 text-sm md:text-base mb-2 md:mb-3 text-center sm:text-left">Information Needed</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-0 sm:divide-x divide-gray-300">
                        <div className="text-center">
                          <div className="text-[#85abe4] font-bold text-xs md:text-sm">Personal Info</div>
                          <div className="text-gray-600 text-xs">To Verify Identity</div>
                        </div>
                        <div className="text-center sm:px-3">
                          <div className="text-[#85abe4] font-bold text-xs md:text-sm">Business Info</div>
                          <div className="text-gray-600 text-xs">For Verification</div>
                        </div>
                        <div className="text-center sm:px-3">
                          <div className="text-[#85abe4] font-bold text-xs md:text-sm">Bank Connection</div>
                          <div className="text-gray-600 text-xs">To Evaluate Revenue</div>
                        </div>
                      </div>
                    </div>

                    {/* Minimum Qualifications */}
                    <div className="bg-white p-3 md:p-4 rounded-lg shadow-md border border-gray-200">
                      <h4 className="font-bold text-gray-800 text-sm md:text-base mb-2 md:mb-3 text-center sm:text-left">Minimum Qualifications</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-0 sm:divide-x divide-gray-300">
                        <div className="text-center">
                          <div className="text-[#85abe4] font-bold text-lg md:text-xl">550+</div>
                          <div className="text-gray-600 text-xs">Min. Credit Score</div>
                        </div>
                        <div className="text-center sm:px-3">
                          <div className="text-[#85abe4] font-bold text-lg md:text-xl">6+</div>
                          <div className="text-gray-600 text-xs">Months Time In Business</div>
                        </div>
                        <div className="text-center sm:px-3">
                          <div className="text-[#85abe4] font-bold text-lg md:text-xl">$10K+</div>
                          <div className="text-gray-600 text-xs">Min. Monthly Revenue</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button 
            onClick={() => {
              setLocation('/solutions');
              window.scrollTo(0, 0);
            }}
            style={{ backgroundColor: '#85abe4' }}
            className="hover:bg-[#7299d1] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 transform hover:scale-105 active:scale-95 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-base md:text-lg w-full sm:w-auto min-h-[44px] shadow-lg"
          >
            Browse 12 Funding Solutions
          </Button>
        </div>
      </div>
    </section>
  );
}