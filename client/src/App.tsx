export default function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-black/90 text-white p-4 fixed w-full top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">FundTek Capital Group</h1>
          <button 
            onClick={() => window.open("https://form.jotform.com/251417715331047", "_blank")}
            className="bg-[#85abe4] px-6 py-2 rounded hover:bg-[#7299d6] transition-colors"
          >
            Apply Now
          </button>
        </div>
      </nav>

      {/* Hero Section with Video Background */}
      <section className="pt-20 min-h-screen relative overflow-hidden bg-black">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/attached_assets/Video (FundTek) (3)_1749674184351.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/30" />
        
        <div className="relative z-10 container mx-auto px-4 text-white flex items-center min-h-screen">
          <div className="w-full max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-wider">
              Flexible Financing for Every Industry
            </h1>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed">
              Get the working capital your business needs with our comprehensive funding solutions. 
              Fast approval, competitive rates, and expert guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => window.open("https://form.jotform.com/251417715331047", "_blank")}
                className="bg-white text-black px-8 py-4 text-lg font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                Apply Now
              </button>
              <button
                className="border-white text-white px-8 py-4 text-lg font-semibold rounded-lg hover:bg-white/10 transition-colors border-2"
              >
                Learn More
              </button>
            </div>
          </div>
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
              <p className="text-lg">Complete our quick 5-minute application with basic business information</p>
            </div>
            
            <div className="text-center text-white">
              <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Get Approved</h3>
              <p className="text-lg">Receive approval decision in as little as 24 hours</p>
            </div>
            
            <div className="text-center text-white">
              <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Receive Funds</h3>
              <p className="text-lg">Get your working capital deposited directly to your business account</p>
            </div>
          </div>
        </div>
      </section>

      {/* Working Capital Statistics */}
      <section className="py-16 md:py-24" style={{ backgroundColor: '#85abe4' }}>
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Accelerate the growth of your business</h2>
            <p className="text-xl mb-12 max-w-3xl mx-auto">
              Frustrated by funding delays? Connect one-on-one with a dedicated specialist who understands your industry and can tailor solutions to your unique business and operational goals.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">50+</div>
                <p className="text-lg">Expert financing specialists</p>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">12</div>
                <p className="text-lg">Financing solutions</p>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">$20M</div>
                <p className="text-lg">Unsecured funding available</p>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">24 hrs</div>
                <p className="text-lg">Get funding fast</p>
              </div>
            </div>

            <button 
              onClick={() => window.open("https://form.jotform.com/251417715331047", "_blank")}
              className="bg-white text-[#85abe4] px-8 py-4 text-xl rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-lg"
            >
              Browse 12 Funding Solutions
            </button>
          </div>
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