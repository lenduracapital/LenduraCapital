import { Clock, DollarSign } from "lucide-react";

export default function MoveBusinessForwardSection() {
  return (
    <section className="pt-8 pb-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6" style={{ color: '#193a59' }}>
            Move your Business Forward
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-16">Lendura Capital empowers your business with tailored financing solutions and strategic services—so you can stay focused on what drives your success.</p>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center flex flex-col h-full">
              <div className="mb-6">
                <svg className="w-16 h-16 mx-auto" style={{ color: '#193a59' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 min-h-[5rem] flex items-center justify-center">Expert financing specialists</h3>
              <p className="text-gray-600 flex-1">
                Expert financing specialists who tailor solutions to your unique business and operational goals.
              </p>
            </div>

            <div className="text-center flex flex-col h-full">
              <div className="mb-6">
                <Clock className="w-16 h-16 mx-auto" style={{ color: '#193a59' }} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 min-h-[5rem] flex items-center justify-center">Fast turnaround</h3>
              <p className="text-gray-600 flex-1">
                Get the financing and business solutions you need to manage and grow your business 
                in 24 - 48 hours.
              </p>
            </div>

            <div className="text-center flex flex-col h-full">
              <div className="mb-6">
                <DollarSign className="w-16 h-16 mx-auto" style={{ color: '#193a59' }} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 min-h-[5rem] flex items-center justify-center">Competitive financing solutions</h3>
              <p className="text-gray-600 flex-1">
                Access Top-Tier Financing Rates and Tailored Business Services Designed to Drive Innovation, Growth, and Market Leadership.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}