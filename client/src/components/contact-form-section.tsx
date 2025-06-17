export default function ContactFormSection() {
  return (
    <section className="py-20" style={{ backgroundColor: '#f5f6f6' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-12 flex flex-col justify-center h-full">
            <div className="bg-[--primary] p-10 rounded-lg text-white">
              <h3 className="text-3xl font-bold mb-6 leading-relaxed">Over $1B in working capital provided to U.S. small-medium sized businesses.</h3>
            </div>
            
            <div className="text-center space-y-6">
              <h4 className="text-2xl font-semibold text-gray-800 leading-relaxed">
                Fast, flexible, revenue-based capital solutions built for growing businesses.
              </h4>
              <p className="text-gray-600 text-xl leading-relaxed">
                A funding partner aligned with your business goals.
              </p>
              <div className="bg-white p-6 rounded-lg shadow-lg inline-block">
                <p className="text-lg text-gray-700 mb-2">Ready to get started?</p>
                <p className="text-2xl font-bold text-gray-900">Call (305) 307-4658</p>
                <p className="text-sm text-gray-600">Speak with a specialist today</p>
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