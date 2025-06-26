export default function TrustSignalsSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Why Choose FundTek Capital Group</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Trusted by thousands of businesses nationwide
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-[#85abe4] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <span className="text-white text-2xl font-bold">A+</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">BBB Rated</h3>
            <p className="text-gray-600">Better Business Bureau A+ rating for exceptional service and transparency</p>
          </div>
          
          <div className="text-center">
            <div className="bg-[#85abe4] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <span className="text-white text-2xl">★</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Expert Team</h3>
            <p className="text-gray-600">50+ financing specialists with deep industry expertise</p>
          </div>
          
          <div className="text-center">
            <div className="bg-[#85abe4] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <span className="text-white text-2xl">✓</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Trusted Network</h3>
            <p className="text-gray-600">Extensive network of verified lenders and financial partners</p>
          </div>
        </div>
      </div>
    </section>
  );
}