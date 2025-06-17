export default function ContactFormSection() {
  return (
    <section className="py-20" style={{ backgroundColor: '#f5f6f6' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between',
            height: '900px'
          }}>
            {/* Blue box at the TOP */}
            <div style={{ 
              backgroundColor: '#85abe4', 
              padding: '30px', 
              borderRadius: '8px',
              width: '400px'
            }}>
              <div style={{
                color: 'white',
                fontSize: '32px',
                fontWeight: 'normal',
                lineHeight: '1.5',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}>
                Over $1B in working capital<br />
                provided to U.S. small-medium<br />
                sized businesses.
              </div>
            </div>
            
            {/* Fast flexible text in the MIDDLE */}
            <div style={{ width: '400px' }}>
              <div style={{
                color: 'black',
                fontSize: '32px',
                fontWeight: 'normal',
                lineHeight: '1.5',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}>
                Fast, flexible,<br />
                revenue-based capital<br />
                solutions built for growing<br />
                businesses.
              </div>
            </div>
            
            {/* A funding partner at the BOTTOM */}
            <div style={{ width: '400px' }}>
              <div style={{
                color: 'black',
                fontSize: '32px',
                fontWeight: 'normal',
                lineHeight: '1.5',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}>
                A funding partner<br />
                aligned with your<br />
                business goals.
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Get working capital today</h3>
            <p className="text-sm text-gray-600 mb-6">Fill out the form below, and a team member will be in touch.</p>
            <div className="w-full">
              <iframe
                src="https://form.jotform.com/251581480799066"
                width="100%"
                height="800"
                frameBorder="0"
                scrolling="yes"
                title="Contact Form"
                className="rounded-lg"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}