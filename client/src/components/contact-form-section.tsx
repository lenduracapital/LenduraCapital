import SimplifiedModernContactForm from './simplified-modern-contact-form';
import SectionSeparator from './section-separator';

export default function ContactFormSection() {
  return (
    <>
      <SectionSeparator variant="wave" color="white" flip={true} />
      <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          <div className="flex flex-col justify-between h-[400px] sm:h-[500px] md:h-[700px] lg:h-[800px] space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-0">
            {/* Blue box at the TOP */}
            <div style={{ 
              backgroundColor: '#193a59', 
              borderRadius: '8px'
            }} className="w-full max-w-md mx-auto lg:mx-0 lg:w-96 p-4 md:p-6 lg:p-8">
              <div style={{
                color: 'black',
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
                Quick Approval Business<br />
                Funding When You Need It<br />
                Most
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
                Your Business Growth<br />
                Partner - Not Just Another<br />
                Lender
              </div>
            </div>
          </div>
          
          <div className="w-full max-w-2xl">
            <SimplifiedModernContactForm />
          </div>
        </div>
      </div>
      </section>
    </>
  );
}