export default function ProcessSection() {
  return (
    <section className="py-16" style={{ backgroundColor: '#2563eb' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Get Funding in 3 Simple Steps
          </h2>
          <p className="text-lg text-white">Apply, get approved, receive funds</p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
          <div className="text-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-2xl font-bold text-[--primary]">1</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Submit Application</h3>
            <p className="text-white">Complete our simple online form</p>
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
            <h3 className="text-xl font-semibold text-white mb-2">Get Decision</h3>
            <p className="text-white">Approval within 24 hours</p>
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
            <h3 className="text-xl font-semibold text-white mb-2">Receive Funds</h3>
            <p className="text-white">Money in your account fast</p>
          </div>
        </div>
      </div>
    </section>
  );
}