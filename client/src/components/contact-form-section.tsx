import { Button } from "@/components/ui/button";

export default function ContactFormSection() {
  const handleApplyNow = () => {
    window.open("https://form.jotform.com/251965461165159", "_blank");
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Ready to Get Started?
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Apply now and get approved for funding in as little as 24 hours
        </p>
        <Button 
          onClick={handleApplyNow}
          className="bg-[#85abe4] hover:bg-[#6b8ed4] text-white px-8 py-3 text-lg"
        >
          Get Approved in 24 Hours
        </Button>
      </div>
    </section>
  );
}