export default function ContactFormSection() {
  return (
    <section className="py-20 bg-[--bg-primary]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div className="bg-[--primary] p-8 rounded-lg text-white">
              <h3 className="text-2xl font-bold mb-4">Over $1B in working capital provided to U.S. small-medium sized businesses.</h3>
            </div>
            
            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-[--text-primary]">
                Fast, flexible, revenue-based capital solutions built for growing businesses.
              </h4>
              <p className="text-[--text-secondary] text-lg">
                A funding partner aligned with your business goals.
              </p>
            </div>
          </div>
          
          <div className="bg-[--bg-secondary] rounded-lg p-8">
            <h3 className="text-2xl font-bold text-[--text-primary] mb-6">Contact Us</h3>
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