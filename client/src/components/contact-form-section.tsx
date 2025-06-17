export default function ContactFormSection() {
  return (
    <section className="py-12 md:py-20" style={{ backgroundColor: '#f5f6f6' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          <div className="flex flex-col justify-between h-[600px] md:h-[700px] lg:h-[900px] lg:space-y-8 space-y-6 md:space-y-12 lg:space-y-0">
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
                Fast, flexible,<br />
                revenue-based capital<br />
                solutions built for growing<br />
                businesses.
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
                A funding partner<br />
                aligned with your<br />
                business goals.
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-1 md:p-2 lg:p-3 w-full max-w-none">
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 px-1 md:px-2">Get working capital today</h3>
            <p className="text-sm text-gray-600 mb-6 px-1 md:px-2">Fill out the form below, and a team member will be in touch.</p>
            <div className="w-full overflow-hidden -mx-1 md:-mx-2">
              <iframe
                src="https://form.jotform.com/251581480799066"
                width="100%"
                height="1200"
                frameBorder="0"
                scrolling="no"
                title="Contact Form"
                className="rounded-lg h-[950px] md:h-[1200px] w-full"
                style={{ 
                  transform: 'scale(1.0)',
                  transformOrigin: 'top left',
                  width: '100%',
                  height: '1200px'
                }}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}