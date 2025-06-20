import { CheckCircle, Clock, HandCoins } from "lucide-react";

export default function MoveBusinessForwardSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6" style={{ color: '#85abe4' }}>
            Move your Business Forward
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-16">
            FundTek Capital Group empowers your business with custom financing options 
            and premier business services, allowing you to focus on the things that really matter 
            to your business.
          </p>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="mb-6">
                <svg className="w-16 h-16 mx-auto" style={{ color: '#85abe4' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Dedicated specialists</h3>
              <p className="text-gray-600">
                Extremely knowledgeable specialists who understand your specific business financing 
                and operational needs.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-6">
                <Clock className="w-16 h-16 mx-auto" style={{ color: '#85abe4' }} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Fast turnaround</h3>
              <p className="text-gray-600">
                Get the financing and business solutions you need to manage and grow your business 
                in 24 - 48 hours.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-6">
                <svg className="w-16 h-16 mx-auto" fill="#85abe4" viewBox="0 0 24 24">
                  <path d="M9 16c.5-1 2.5-1.8 4.5-2 .4-.1.8-.2 1.2-.3 1.2-.3 2.3-.8 2.3-1.7 0-.8-.8-1.5-2-1.5s-2 .7-2 1.5H11c0-1.9 1.6-3.5 4-3.5s4 1.6 4 3.5c0 1.5-1.5 2.4-3 2.8V16h-2v-1.2c-.4.1-.8.2-1.2.3-2 .4-4 1-4.5 2H9z"/>
                  <circle cx="15" cy="12" r="2" fill="#85abe4"/>
                  <path d="M15 10v4m-1-2h2" stroke="white" strokeWidth="1"/>
                  <path d="M2 17c0-1 1-2 4-2h12c3 0 4 1 4 2v3c0 1-1 2-4 2H6c-3 0-4-1-4-2v-3z" opacity="0.3"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Industry leading rates</h3>
              <p className="text-gray-600">
                Access the best rates on a wide variety of financing options and premier business 
                services to innovate, grow, and compete.
              </p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}