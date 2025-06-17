import { Button } from "@/components/ui/button";
import videoPath from "@assets/Video (FundTek) (3)_1749674184351.mp4";
import newLogoPath from "@assets/ChatGPT Image Jun 5, 2025, 12_13_54 PM_1750167134599.png";

export default function HeroSection() {
  const handleApplyNow = () => {
    window.open("https://form.jotform.com/251417715331047", "_blank");
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Video */}
      <video 
        autoPlay 
        muted 
        loop 
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={videoPath} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      
      {/* Logo on Left */}
      <div className="absolute top-8 left-8 z-20">
        <img 
          src={newLogoPath}
          alt="FundTek Capital Group" 
          className="h-32 w-auto"
        />
        <div className="text-white text-lg font-light tracking-wider text-center -mt-2">
          Capital Group
        </div>
      </div>
      
      {/* Content on Right */}
      <div className="relative z-10 h-full flex items-center justify-end px-4 sm:px-6 lg:px-8">
        <div className="max-w-md text-right mr-8 lg:mr-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight text-shadow">
            Flexible Financing for Every Industry
          </h1>
          <p className="text-white text-lg mb-6 leading-relaxed text-shadow">
            Empower your business with custom tailored financial and business solutions
          </p>
          <p className="text-white text-lg mb-8 text-shadow">
            Call us at <span className="text-[--primary] font-bold">(646) 329-4622</span> to see your options
          </p>
          
          <Button 
            onClick={handleApplyNow}
            className="bg-[--primary] hover:bg-[--primary-dark] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Apply Now
          </Button>
        </div>
      </div>
    </section>
  );
}
