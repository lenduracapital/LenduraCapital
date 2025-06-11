import { Button } from "@/components/ui/button";
import videoPath from "@assets/Video (FundTek) (3)_1749674184351.mp4";

export default function HeroSection() {
  const handleApplyNow = () => {
    window.open("https://form.jotform.com/251417715331047", "_blank");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          <span className="text-white">Flexible Financing</span><br />
          <span className="text-white">for </span>
          <span className="text-[--primary]">Every Industry</span>
        </h1>
        
        <div className="bg-[--primary] bg-opacity-80 p-6 rounded-lg max-w-2xl mx-auto mb-8">
          <p className="text-lg md:text-xl text-white leading-relaxed">
            Empower your business with custom tailored<br />
            financial and business solutions, call us at <br />
            <span className="text-yellow-300 font-bold">(646) 329-4622</span> to see your options
          </p>
        </div>
        
        <Button 
          onClick={handleApplyNow}
          className="bg-[--primary] hover:bg-[--primary-dark] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          Apply Now
        </Button>
      </div>
    </section>
  );
}
