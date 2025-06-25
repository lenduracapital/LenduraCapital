import { useState, useEffect } from 'react';
import { X, Cookie } from 'lucide-react';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (cookiesAccepted !== 'true') {
      // Show banner after 2 seconds
      setTimeout(() => {
        setShowBanner(true);
      }, 2000);
    }
  }, []);

  const acceptAllCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    localStorage.setItem('cookiePreferences', JSON.stringify({
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true
    }));
    setShowBanner(false);
  };

  const acceptNecessaryOnly = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    localStorage.setItem('cookiePreferences', JSON.stringify({
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false
    }));
    setShowBanner(false);
  };

  const closeBanner = () => {
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-xl animate-in slide-in-from-bottom duration-500">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <Cookie className="h-6 w-6 text-[#85abe4] flex-shrink-0" />
          <p className="text-sm text-gray-700">
            We use cookies to enhance your browsing experience and improve our services. 
            By continuing to use our site, you consent to our use of cookies.
          </p>
        </div>
        
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={acceptNecessaryOnly}
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Necessary Only
          </button>
          
          <button
            onClick={acceptAllCookies}
            className="px-4 py-2 text-sm font-medium text-white bg-[#85abe4] hover:bg-[#7498d1] rounded-lg transition-colors"
          >
            Accept All
          </button>
          
          <button
            onClick={closeBanner}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close cookie banner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}