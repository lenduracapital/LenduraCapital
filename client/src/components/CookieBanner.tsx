import { useState, useEffect } from 'react';
import { X, Shield, Settings, Cookie } from 'lucide-react';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
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

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <>
      {/* Floating Cookie Button */}
      {!isExpanded && (
        <div className="fixed bottom-6 left-6 z-50">
          <button
            onClick={toggleExpanded}
            className="bg-[#85abe4] hover:bg-[#7498d1] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2 group"
            aria-label="Cookie settings"
          >
            <Cookie className="h-6 w-6" />
            <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              Cookie Settings
            </span>
          </button>
        </div>
      )}

      {/* Expanded Cookie Panel */}
      {isExpanded && (
        <div className="fixed bottom-6 left-6 z-50 bg-white border border-gray-200 rounded-xl shadow-2xl max-w-md w-80 max-h-96 overflow-hidden">
          <div className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <Cookie className="h-5 w-5 text-[#85abe4]" />
                <h3 className="text-sm font-semibold text-gray-900">
                  Cookie Consent
                </h3>
              </div>
              <button
                onClick={closeBanner}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close cookie panel"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <p className="text-xs text-gray-600 leading-relaxed mb-3">
              We use cookies to enhance your browsing experience and improve our services.
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
              <div className="mb-3 p-2 bg-gray-50 rounded-lg text-xs text-gray-600 space-y-1 max-h-32 overflow-y-auto">
                <div>
                  <strong>Necessary:</strong> Essential functionality
                </div>
                <div>
                  <strong>Analytics:</strong> Site usage insights
                </div>
                <div>
                  <strong>Marketing:</strong> Relevant advertisements
                </div>
                <div>
                  <strong>Functional:</strong> Enhanced features
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <button
                onClick={acceptAllCookies}
                className="w-full bg-[#85abe4] hover:bg-[#7498d1] text-white px-4 py-2 rounded-lg text-xs font-semibold transition-colors"
              >
                Accept All Cookies
              </button>
              
              <div className="flex gap-2">
                <button
                  onClick={acceptNecessaryOnly}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-xs font-medium transition-colors border border-gray-300"
                >
                  Necessary Only
                </button>
                
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="flex-1 text-[#85abe4] hover:text-[#7498d1] px-3 py-2 text-xs font-medium transition-colors flex items-center justify-center gap-1"
                >
                  <Settings className="h-3 w-3" />
                  Details
                </button>
              </div>
            </div>
            
            <div className="mt-3 text-xs text-gray-500">
              View our{' '}
              <button 
                onClick={() => window.open('/privacy', '_blank')}
                className="text-[#85abe4] hover:text-[#7498d1] underline"
              >
                Privacy Policy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Minimize Button */}
      {isExpanded && (
        <div className="fixed bottom-2 left-6 z-50">
          <button
            onClick={toggleExpanded}
            className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-full shadow-lg transition-all duration-300"
            aria-label="Minimize cookie panel"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </>
  );
}