import React from 'react';

export default function WorkingCapitalInfoSection() {
  const handleApplyNow = () => {
    window.open('https://form.jotform.com/251965461165159', '_blank');
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6 md:mb-8">
              Working Capital Solutions for Every Business
            </h2>
            <div className="text-lg md:text-xl text-gray-700 mb-8 md:mb-12 leading-relaxed space-y-4">
              <p>Every business faces cash flow challenges. Whether it's seasonal fluctuations, unexpected expenses, growth opportunities, or payment delays from customers, working capital needs can arise at any time.</p>
              <p>FundTek Capital Group provides flexible financing solutions designed to keep your business moving forward, regardless of your industry or credit situation.</p>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold text-black mb-6">Common Business Needs</h3>
            <ul className="space-y-4 mb-8 md:mb-12">
              {[
                "Inventory and equipment purchases", 
                "Payroll and operational expenses",
                "Marketing and expansion initiatives",
                "Bridge financing for contracts",
                "Emergency repairs and maintenance",
                "Seasonal cash flow management"
              ].map((need, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-2 h-2 rounded-full mt-3 mr-4 flex-shrink-0" style={{ backgroundColor: '#85abe4' }}></div>
                  <span className="text-gray-700 text-lg">{need}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleApplyNow}
                className="px-8 py-4 rounded-lg font-semibold text-lg text-white hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
                style={{ backgroundColor: '#85abe4' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#7299d1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#85abe4';
                }}
              >
                Get Pre-Qualified Now
              </button>
            </div>
          </div>

          <div className="lg:pl-12">
            <div className="bg-gray-50 rounded-xl p-8 shadow-lg">
              <h4 className="text-2xl font-bold text-black mb-6">Why Choose FundTek?</h4>
              <div className="space-y-6">
                {[
                  { title: "Fast Approval", desc: "Get approved in as little as 24 hours" },
                  { title: "Flexible Terms", desc: "Repayment options that work with your cash flow" },
                  { title: "No Collateral", desc: "Most funding options require no personal guarantees" },
                  { title: "Bad Credit OK", desc: "We focus on business performance, not just credit scores" }
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-3 h-3 rounded-full mt-2 mr-4 flex-shrink-0" style={{ backgroundColor: '#85abe4' }}></div>
                    <div>
                      <h5 className="font-semibold text-black mb-1">{benefit.title}</h5>
                      <p className="text-gray-600">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}