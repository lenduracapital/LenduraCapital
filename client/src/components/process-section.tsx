export default function ProcessSection() {
  return (
    <section className="py-16" style={{ backgroundColor: '#2563eb' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Business Financing To Fit Your Business Needs.
          </h2>
          <p className="text-lg text-white">Just 3 Easy Steps</p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
          <div className="text-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-2xl font-bold text-[--primary]">1</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Apply Online</h3>
            <p className="text-white">Quick and secure application process</p>
          </div>
          
          <div className="hidden md:block text-white">
            <svg width="60" height="20" viewBox="0 0 60 20" fill="currentColor">
              <path d="M0 10 L50 10 M45 5 L50 10 L45 15" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
          </div>
          
          <div className="text-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-2xl font-bold text-[--primary]">2</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Approval in 1 hour</h3>
            <p className="text-white">Fast decision process</p>
          </div>
          
          <div className="hidden md:block text-white">
            <svg width="60" height="20" viewBox="0 0 60 20" fill="currentColor">
              <path d="M0 10 L50 10 M45 5 L50 10 L45 15" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
          </div>
          
          <div className="text-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-2xl font-bold text-[--primary]">3</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Get Funded</h3>
            <p className="text-white">Receive your funds quickly</p>
          </div>
        </div>
      </div>
    </section>
  );
}