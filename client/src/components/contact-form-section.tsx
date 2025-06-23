export default function ContactFormSection() {
  return (
    <section className="py-12 md:py-20" style={{ backgroundColor: '#f5f6f6' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          <div className="flex flex-col justify-between h-[600px] md:h-[700px] lg:h-[800px] lg:space-y-8 space-y-6 md:space-y-12 lg:space-y-0">
            {/* Blue box at the TOP */}
            <div style={{ 
              backgroundColor: '#85abe4', 
              borderRadius: '8px'
            }} className="w-full max-w-md mx-auto lg:mx-0 lg:w-96 p-4 md:p-6 lg:p-8">
              <div style={{
                color: 'white',
                fontSize: 'clamp(16px, 3.5vw, 32px)',
                fontWeight: 'normal',
                lineHeight: '1.4',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}>
                Over $1B in working capital<br />
                provided to U.S. small-medium<br />
                sized businesses.
              </div>
            </div>
            
            {/* Fast flexible text in the MIDDLE */}
            <div className="w-full max-w-md mx-auto lg:mx-0 lg:w-96 px-2 md:px-0">
              <div style={{
                color: 'black',
                fontSize: 'clamp(16px, 3.5vw, 32px)',
                fontWeight: 'normal',
                lineHeight: '1.4',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}>
                Fast Revenue-Based Financing &<br />
                Working Capital Loans for<br />
                Growing Businesses
              </div>
            </div>
            
            {/* A funding partner at the BOTTOM */}
            <div className="w-full max-w-md mx-auto lg:mx-0 lg:w-96 px-2 md:px-0">
              <div style={{
                color: 'black',
                fontSize: 'clamp(16px, 3.5vw, 32px)',
                fontWeight: 'normal',
                lineHeight: '1.4',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}>
                A Funding Partner<br />
                Focused on Your Business<br />
                Growth & Cash Flow
              </div>
            </div>
          </div>
          
          <div className="w-full max-w-2xl">
            <iframe
              src="https://form.jotform.com/251581480799066"
              width="100%"
              height="800"
              frameBorder="0"
              scrolling="no"
              title="Business Funding Application Form - Step 1 of 2"
              className="w-full h-[800px] border-0"
              style={{ 
                border: 'none',
                background: 'transparent',
                transform: 'scale(0.9)',
                transformOrigin: 'top left'
              }}
              loading="lazy"
              sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-top-navigation"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}