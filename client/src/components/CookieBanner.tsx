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
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-2xl border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1">
              <div className="flex-shrink-0 p-2 rounded-full bg-white/10 backdrop-blur-sm">
                <Cookie className="w-5 h-5 text-white" />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-white font-medium text-sm leading-relaxed">
                  We use cookies to enhance your browsing experience and provide personalized content.
                </p>
                <p className="text-gray-300 text-xs mt-1">
                  By continuing to use our site, you accept our cookie policy.
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={acceptCookies}
                className="px-6 py-2.5 rounded-lg font-semibold text-sm text-white transition-all duration-200 transform hover:scale-105 hover:shadow-lg active:scale-95 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                style={{ 
                  background: 'linear-gradient(135deg, #85abe4 0%, #6b9bd8 100%)',
                  boxShadow: '0 4px 14px 0 rgba(133, 171, 228, 0.3)'
                }}
              >
                Accept All
              </button>
              
              <button
                onClick={dismissBanner}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200"
                aria-label="Dismiss cookie banner"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}