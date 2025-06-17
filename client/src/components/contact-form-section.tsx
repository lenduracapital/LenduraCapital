export default function ContactFormSection() {
  return (
    <section className="py-20" style={{ backgroundColor: '#f5f6f6' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-12 flex flex-col justify-center h-full">
            <div style={{ backgroundColor: '#85abe4' }} className="p-10 rounded-lg">
              <h3 className="text-3xl font-normal mb-0 leading-normal text-white">
                Over $1B in working capital<br />
                provided to U.S. small-medium<br />
                sized businesses.
              </h3>
            </div>
            
            <div className="text-left space-y-12">
              <p className="text-2xl font-normal text-black leading-relaxed">
                Fast, flexible,<br />
                revenue-based capital<br />
                solutions built for growing<br />
                businesses.
              </p>
              <p className="text-2xl font-normal text-black leading-relaxed">
                A funding partner<br />
                aligned with your<br />
                business goals.
              </p>
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