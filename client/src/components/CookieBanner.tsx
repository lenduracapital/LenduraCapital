import { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (cookiesAccepted !== 'true') {
      setShowBanner(true);
      // Add slight delay for slide-up animation
      setTimeout(() => setIsVisible(true), 100);
    }
  }, []);

  const acceptCookies = () => {
    setIsVisible(false);
    // Wait for animation to complete before hiding
    setTimeout(() => {
      localStorage.setItem('cookiesAccepted', 'true');
      setShowBanner(false);
    }, 300);
  };

  const dismissBanner = () => {
    setIsVisible(false);
    setTimeout(() => {
      localStorage.setItem('cookiesAccepted', 'true');
      setShowBanner(false);
    }, 300);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      <div className="bg-white/95 backdrop-blur-md text-gray-800 shadow-lg border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-3">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <Cookie className="w-4 h-4 text-[#85abe4] flex-shrink-0" />
              <p className="text-gray-700 text-xs sm:text-sm font-medium truncate">
                We use cookies for better experience.
                <span className="hidden sm:inline"> By continuing, you accept our policy.</span>
              </p>
            </div>
            
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              <button
                onClick={acceptCookies}
                className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-md font-medium text-xs sm:text-sm text-white transition-all duration-200 hover:shadow-md active:scale-95"
                style={{ 
                  backgroundColor: '#85abe4',
                  minWidth: '60px'
                }}
              >
                Accept
              </button>
              
              <button
                onClick={dismissBanner}
                className="p-1.5 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200"
                aria-label="Dismiss"
              >
                <X className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}