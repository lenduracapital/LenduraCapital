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
      
      {/* Content on Left */}
      <div className="relative z-10 h-full flex items-center justify-start px-4 sm:px-6 lg:px-8">
        <div className="max-w-md text-left ml-8 lg:ml-16 flex flex-col justify-between h-2/3">
          {/* Top Text */}
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2 leading-tight text-shadow">
              Over $1B
            </h1>
            <p className="text-white text-lg text-shadow">
              in funding provided
            </p>
          </div>
          
          {/* Middle Text */}
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight text-shadow">
              Fast, Flexible Financing Solutions
            </h2>
            <p className="text-white text-lg mb-6 leading-relaxed text-shadow">
              Custom tailored financial solutions for your business needs
            </p>
            <p className="text-white text-lg mb-8 text-shadow">
              Call us at <span className="text-[--primary] font-bold">(305) 307-4658</span> to see your options
            </p>
            
            <Button 
              onClick={handleApplyNow}
              className="bg-[--primary] hover:bg-[--primary-dark] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Apply Now
            </Button>
          </div>
          
          {/* Bottom Text */}
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white text-shadow">
              Your Trusted Funding Partner
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
