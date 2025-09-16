import InteractiveLeadCapture from './interactive-lead-capture';
import SectionSeparator from './section-separator';

export default function ContactFormSection() {
  return (
    <>
      <SectionSeparator variant="wave" color="white" flip={true} />
      <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Ready to Get Funded?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of business owners who've secured funding through our streamlined process. 
              Find out if you qualify in under 2 minutes.
            </p>
          </div>
          
          <InteractiveLeadCapture />
        </div>
      </section>
    </>
  );
}