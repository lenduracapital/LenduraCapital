export default function ProcessSection() {
  return (
    <section id="process-section" className="py-16 md:py-24" style={{ backgroundColor: '#85abe4' }}>
      <div className="container mx-auto px-4">
        <div className="text-center text-white mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">How It Works</h2>
          <p className="text-xl max-w-3xl mx-auto">Simple 3-step process to get your business funding</p>
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
  );
}