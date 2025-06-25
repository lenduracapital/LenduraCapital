import { useState, useEffect } from 'react';
import { X, Shield, Settings } from 'lucide-react';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (cookiesAccepted !== 'true') {
      setShowBanner(true);
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
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <div className="flex-shrink-0 mt-1">
              <Shield className="h-5 w-5 text-[#85abe4]" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">
                Cookie Consent
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                We use cookies to enhance your browsing experience, provide personalized content, analyze site traffic, and improve our services. 
                {!showDetails && (
                  <button
                    onClick={() => setShowDetails(true)}
                    className="text-[#85abe4] hover:text-[#7498d1] underline ml-1 font-medium"
                  >
                    Learn more
                  </button>
                )}
              </p>
              
              {showDetails && (
                <div className="mt-3 p-3 bg-gray-50 rounded-lg text-xs text-gray-600 space-y-2">
                  <div>
                    <strong>Necessary Cookies:</strong> Essential for website functionality and security.
                  </div>
                  <div>
                    <strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website.
                  </div>
                  <div>
                    <strong>Marketing Cookies:</strong> Used to deliver relevant advertisements and measure campaign effectiveness.
                  </div>
                  <div>
                    <strong>Functional Cookies:</strong> Enable enhanced features like chat widgets and form functionality.
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <button
            onClick={closeBanner}
            className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 transition-colors ml-4"
            aria-label="Close cookie banner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <button
            onClick={acceptAllCookies}
            className="bg-[#85abe4] hover:bg-[#7498d1] text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
          >
            Accept All Cookies
          </button>
          
          <button
            onClick={acceptNecessaryOnly}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2.5 rounded-lg text-sm font-medium transition-colors border border-gray-300"
          >
            Necessary Only
          </button>
          
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-[#85abe4] hover:text-[#7498d1] px-4 py-2.5 text-sm font-medium transition-colors flex items-center gap-2"
          >
            <Settings className="h-4 w-4" />
            Customize
          </button>
        </div>
        
        <div className="mt-3 text-xs text-gray-500">
          By clicking "Accept All Cookies", you agree to our{' '}
          <button 
            onClick={() => window.open('/privacy', '_blank')}
            className="text-[#85abe4] hover:text-[#7498d1] underline"
          >
            Privacy Policy
          </button>
          {' '}and{' '}
          <button 
            onClick={() => window.open('/cookies', '_blank')}
            className="text-[#85abe4] hover:text-[#7498d1] underline"
          >
            Cookie Policy
          </button>
        </div>
      </div>
    </div>
  );
}