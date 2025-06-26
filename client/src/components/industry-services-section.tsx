export default function IndustryServicesSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Industries We Serve</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Specialized financing solutions for businesses across all industries
          </p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center p-6 border rounded-lg hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Restaurant & Food Service</h3>
            <p className="text-gray-600 text-sm">Equipment, working capital, and expansion funding</p>
          </div>
          
          <div className="text-center p-6 border rounded-lg hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Manufacturing</h3>
            <p className="text-gray-600 text-sm">Equipment financing and production capital</p>
          </div>
          
          <div className="text-center p-6 border rounded-lg hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Retail</h3>
            <p className="text-gray-600 text-sm">Inventory financing and store expansion</p>
          </div>
          
          <div className="text-center p-6 border rounded-lg hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Construction</h3>
            <p className="text-gray-600 text-sm">Equipment and project financing</p>
          </div>
          
          <div className="text-center p-6 border rounded-lg hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Healthcare</h3>
            <p className="text-gray-600 text-sm">Medical equipment and practice funding</p>
          </div>
          
          <div className="text-center p-6 border rounded-lg hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Transportation</h3>
            <p className="text-gray-600 text-sm">Vehicle and fleet financing</p>
          </div>
          
          <div className="text-center p-6 border rounded-lg hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Professional Services</h3>
            <p className="text-gray-600 text-sm">Working capital and growth funding</p>
          </div>
          
          <div className="text-center p-6 border rounded-lg hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Technology</h3>
            <p className="text-gray-600 text-sm">Equipment and expansion capital</p>
          </div>
        </div>
      </div>
    </section>
  );
}