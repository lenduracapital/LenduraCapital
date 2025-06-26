export default function ServicesSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Financing Solutions</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive funding options designed to meet your business needs
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Term Loans</h3>
            <p className="text-gray-600 mb-6">Traditional business loans with fixed repayment terms and competitive rates</p>
            <button 
              onClick={() => window.open("https://form.jotform.com/251417715331047", "_blank")}
              className="bg-[#85abe4] text-white px-6 py-2 rounded-lg hover:bg-[#7299d6] transition-colors"
            >
              Learn More
            </button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">SBA Loans</h3>
            <p className="text-gray-600 mb-6">Government-backed loans with favorable terms for small businesses</p>
            <button 
              onClick={() => window.open("https://form.jotform.com/251417715331047", "_blank")}
              className="bg-[#85abe4] text-white px-6 py-2 rounded-lg hover:bg-[#7299d6] transition-colors"
            >
              Learn More
            </button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Equipment Financing</h3>
            <p className="text-gray-600 mb-6">Specialized loans for purchasing business equipment and machinery</p>
            <button 
              onClick={() => window.open("https://form.jotform.com/251417715331047", "_blank")}
              className="bg-[#85abe4] text-white px-6 py-2 rounded-lg hover:bg-[#7299d6] transition-colors"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}