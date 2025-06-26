export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-black/90 text-white p-4 fixed w-full top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">FundTek Capital Group</h1>
          <button 
            onClick={() => window.open("https://form.jotform.com/251417715331047", "_blank")}
            className="bg-[#85abe4] px-6 py-2 rounded hover:bg-[#7299d6]"
          >
            Apply Now
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 min-h-screen bg-gradient-to-r from-blue-900 to-blue-700 text-white flex items-center">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Flexible Financing for Every Industry
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Get the working capital your business needs with our comprehensive funding solutions. 
            Fast approval, competitive rates, and expert guidance.
          </p>
          <button 
            onClick={() => window.open("https://form.jotform.com/251417715331047", "_blank")}
            className="bg-white text-blue-900 px-12 py-4 text-xl rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-lg"
          >
            Apply Now
          </button>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24" style={{ backgroundColor: '#85abe4' }}>
        <div className="container mx-auto px-4">
          <div className="text-center text-white mb-16">
            <h2 className="text-4xl font-bold mb-6">How It Works</h2>
            <p className="text-xl">Simple 3-step process to get your business funding</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center text-white">
              <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Apply Online</h3>
              <p className="text-lg">Complete our quick 5-minute application</p>
            </div>
            
            <div className="text-center text-white">
              <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Get Approved</h3>
              <p className="text-lg">Receive approval in 24 hours</p>
            </div>
            
            <div className="text-center text-white">
              <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Receive Funds</h3>
              <p className="text-lg">Get your working capital fast</p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">Why Choose FundTek Capital Group</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="text-5xl font-bold text-[#85abe4] mb-2">50+</div>
              <p className="text-lg text-gray-600">Expert financing specialists</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-[#85abe4] mb-2">12</div>
              <p className="text-lg text-gray-600">Financing solutions</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-[#85abe4] mb-2">$20M</div>
              <p className="text-lg text-gray-600">Funding available</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-[#85abe4] mb-2">24hrs</div>
              <p className="text-lg text-gray-600">Fast approval</p>
            </div>
          </div>

          <button 
            onClick={() => window.open("https://form.jotform.com/251417715331047", "_blank")}
            className="bg-[#85abe4] text-white px-12 py-4 text-xl rounded-lg font-bold hover:bg-[#7299d6] transition-colors shadow-lg"
          >
            Get Started Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">FundTek Capital Group</h3>
          <p className="text-gray-300 mb-6">Fast Business Financing Solutions</p>
          <p className="text-gray-400">Contact: (305) 307-4658 | admin@fundtekcapitalgroup.com</p>
          <p className="text-gray-400 mt-4">Copyright 2025 FundTek Capital Group. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}