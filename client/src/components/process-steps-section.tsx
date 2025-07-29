import React from 'react';

export default function ProcessStepsSection() {
  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: '#85abe4' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Business Financing To Fit Your Business Needs.
          </h2>
          <p className="text-xl text-white/90">
            Just 3 Easy Steps
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold" style={{ color: '#85abe4' }}>1</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Apply Online</h3>
            <p className="text-white/90">Quick and secure application process</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold" style={{ color: '#85abe4' }}>2</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Approval in 1 hour</h3>
            <p className="text-white/90">Fast decision process</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold" style={{ color: '#85abe4' }}>3</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Get Funded</h3>
            <p className="text-white/90">Receive your funds fast</p>
          </div>
        </div>
      </div>
    </section>
  );
}