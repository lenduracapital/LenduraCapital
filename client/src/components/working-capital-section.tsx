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
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
            Accelerate the growth of your business
          </h1>
          <p className="text-lg text-gray-600">
            Small Business Loans · Merchant Cash Advances · Lines of Credit
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          <div className="text-center bg-white p-6 rounded-lg shadow-md">
            <p className="text-5xl font-black text-[--primary] mb-2">
              <CountUp end={50} suffix="+" />
            </p>
            <p className="text-[--primary] font-semibold text-lg">Specialists</p>
            <p className="text-gray-500 mt-2">Experienced funding experts</p>
          </div>
          <div className="text-center bg-white p-6 rounded-lg shadow-md">
            <p className="text-5xl font-black text-[--primary] mb-2">
              <CountUp end={5} suffix="+" />
            </p>
            <p className="text-[--primary] font-semibold text-lg">Financing options</p>
            <p className="text-gray-500 mt-2">Multiple capital products</p>
          </div>
          <div className="text-center bg-white p-6 rounded-lg shadow-md">
            <p className="text-5xl font-black text-[--primary] mb-2">
              $<CountUp end={20} suffix="M" />
            </p>
            <p className="text-[--primary] font-semibold text-lg">Funding up to</p>
            <p className="text-gray-500 mt-2">Unsecured capital available</p>
          </div>
          <div className="text-center bg-white p-6 rounded-lg shadow-md">
            <p className="text-5xl font-black text-[--primary] mb-2">
              <CountUp end={48} />
            </p>
            <p className="text-[--primary] font-semibold text-lg">Hours</p>
            <p className="text-gray-500 mt-2">Typical turnaround</p>
          </div>
        </div>
      </div>
    </section>
  );
}