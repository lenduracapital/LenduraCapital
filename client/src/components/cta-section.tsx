import { Button } from "@/components/ui/button";
import { Rocket, Phone } from "lucide-react";

export default function CTASection() {
  const handleApplyNow = () => {
    alert("Redirecting to funding application...");
  };

  const handleContact = () => {
    alert("Connecting you with an expert...");
  };

  return (
    <section className="py-20 bg-gradient-to-r from-[--primary] to-[--primary-dark]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to Accelerate Your Business Growth?
        </h2>
        <p className="text-xl text-blue-100 mb-8">
          Join thousands of successful businesses that have partnered with FundTek Capital Group. Apply today and get a funding decision within 48 hours.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={handleApplyNow}
            className="bg-white text-[--primary] hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105"
          >
            <Rocket className="mr-2 h-5 w-5" />
            Start Your Application
          </Button>
          <Button 
            variant="outline"
            onClick={handleContact}
            className="border-2 border-white text-white hover:bg-white hover:text-[--primary] px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200"
          >
            <Phone className="mr-2 h-5 w-5" />
            Speak with an Expert
          </Button>
        </div>
      </div>
    </section>
  );
}
