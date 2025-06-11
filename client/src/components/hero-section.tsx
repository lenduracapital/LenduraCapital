import { Button } from "@/components/ui/button";
import { Rocket, Play } from "lucide-react";

export default function HeroSection() {
  const handleApplyNow = () => {
    alert("Redirecting to funding application...");
  };

  const handleLearnMore = () => {
    alert("Opening company introduction video...");
  };

  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-[--bg-primary] via-[--bg-secondary] to-[--bg-primary]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-[--text-primary]">Fuel Your Business</span><br />
              <span className="text-[--primary]">Growth Today</span>
            </h1>
            
            <p className="text-lg md:text-xl text-[--text-secondary] leading-relaxed max-w-2xl">
              FundTek Capital Group provides innovative funding solutions to help ambitious businesses scale, expand, and achieve their growth objectives with flexible terms and competitive rates.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleApplyNow}
                className="bg-[--primary] hover:bg-[--primary-dark] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <Rocket className="mr-2 h-5 w-5" />
                Apply for Funding
              </Button>
              <Button 
                variant="outline"
                onClick={handleLearnMore}
                className="border-2 border-[--primary] text-[--primary] hover:bg-[--primary] hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Our Story
              </Button>
            </div>
          </div>
          
          {/* Video Placeholder */}
          <div className="relative">
            <div className="bg-[--bg-secondary] rounded-2xl shadow-2xl overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-[--bg-tertiary] to-[--bg-secondary] flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-[--primary] rounded-full flex items-center justify-center mx-auto cursor-pointer hover:bg-[--primary-dark] transition-colors">
                    <Play className="text-white text-2xl ml-1" />
                  </div>
                  <p className="text-[--text-secondary]">Company Introduction Video</p>
                  <p className="text-sm text-[--text-secondary]/70">Click to play our 2-minute overview</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
