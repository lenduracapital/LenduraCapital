export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-[#85abe4] text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">FundTek Capital Group</h1>
            <nav className="hidden md:flex space-x-6">
              <a href="/" className="hover:underline">Home</a>
              <a href="/solutions" className="hover:underline">Solutions</a>
              <a href="/about" className="hover:underline">About</a>
              <a href="/contact" className="hover:underline">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#85abe4] to-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Flexible Financing for Every Industry
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get flexible business financing with FundTek Capital Group. Term loans, merchant cash advances, equipment financing & more.
          </p>
          <div className="space-x-4">
            <button className="bg-white text-[#85abe4] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
              Apply Now
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#85abe4]">
              Call (305) 307-4658
            </button>
          </div>
        </div>
      </section>

      {/* Three Steps Process */}
      <section className="py-16 bg-[#85abe4]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Get Funded in 3 Simple Steps
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center text-white">
              <div className="bg-white text-[#85abe4] w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Apply Online</h3>
              <p>Complete our simple application in minutes</p>
            </div>
            <div className="text-center text-white">
              <div className="bg-white text-[#85abe4] w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Approved</h3>
              <p>Receive approval in as little as 24 hours</p>
            </div>
            <div className="text-center text-white">
              <div className="bg-white text-[#85abe4] w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Receive Funds</h3>
              <p>Get your money and grow your business</p>
            </div>
          </div>
        </div>
      </section>

      {/* Funding Solutions */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Business Funding Solutions
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-[#85abe4]">Term Loans</h3>
              <p className="text-gray-600 mb-4">Traditional business loans with fixed payments and competitive rates.</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• $5,000 - $5,000,000</li>
                <li>• 6 months - 10 years</li>
                <li>• Fixed or variable rates</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-[#85abe4]">Merchant Cash Advance</h3>
              <p className="text-gray-600 mb-4">Quick access to working capital based on future sales.</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• $2,500 - $2,000,000</li>
                <li>• 3-18 months</li>
                <li>• Daily or weekly payments</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-[#85abe4]">Equipment Financing</h3>
              <p className="text-gray-600 mb-4">Finance new or used equipment to grow your business.</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• $5,000 - $5,000,000</li>
                <li>• Up to 7 years</li>
                <li>• Equipment as collateral</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-[#85abe4] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8">
            Contact our team today to discuss your business funding needs.
          </p>
          <div className="space-x-4">
            <button className="bg-white text-[#85abe4] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
              Apply Online
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#85abe4]">
              Call (305) 307-4658
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">FundTek Capital Group</h3>
              <p className="text-gray-400">
                Your trusted partner for business funding solutions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Solutions</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Term Loans</li>
                <li>Merchant Cash Advance</li>
                <li>Equipment Financing</li>
                <li>SBA Loans</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Contact</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Phone: (305) 307-4658</li>
                <li>Email: info@fundtekcapitalgroup.com</li>
                <li>Miami, FL</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 FundTek Capital Group. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}