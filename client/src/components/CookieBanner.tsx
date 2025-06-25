import { useState, useEffect } from 'react';
import { X, Shield, Settings, Cookie, CheckCircle, Info } from 'lucide-react';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Always show the button, but auto-expand for new users
    setShowBanner(true);
    
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (cookiesAccepted !== 'true') {
      // Auto-expand on first visit after 2 seconds
      setTimeout(() => {
        setIsExpanded(true);
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
    setIsExpanded(false); // Minimize to button but keep visible
  };

  const acceptNecessaryOnly = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    localStorage.setItem('cookiePreferences', JSON.stringify({
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false
    }));
    setIsExpanded(false); // Minimize to button but keep visible
  };

  const closeBanner = () => {
    setIsExpanded(false); // Just minimize, don't hide completely
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
        <div className="fixed bottom-6 left-6 z-40">
          <div className="relative">
            <button
              onClick={toggleExpanded}
              className="bg-gradient-to-r from-[#85abe4] to-[#7498d1] hover:from-[#7498d1] hover:to-[#6385be] text-white w-14 h-14 rounded-full shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-110 flex items-center justify-center group relative overflow-hidden"
              aria-label="Cookie settings"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-full"></div>
              <Cookie className="h-6 w-6 z-10 drop-shadow-sm" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center animate-pulse">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Expanded Cookie Panel */}
      {isExpanded && (
        <div className="fixed bottom-20 left-6 z-50 bg-white border border-gray-200 rounded-2xl shadow-2xl max-w-md w-80 max-h-96 overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
          <div className="relative">
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-[#85abe4] to-[#7498d1] p-4 text-white">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Shield className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">
                      Cookie Preferences
                    </h3>
                    <p className="text-xs text-white/80">
                      Manage your privacy settings
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeBanner}
                  className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/20 rounded"
                  aria-label="Close cookie panel"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-start gap-2 mb-4">
                <Info className="h-4 w-4 text-[#85abe4] mt-0.5 flex-shrink-0" />
                <p className="text-xs text-gray-600 leading-relaxed">
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
              </div>
              
              {showDetails && (
                <div className="mb-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3 border border-blue-100">
                  <div className="space-y-2 text-xs text-gray-700">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span><strong>Necessary:</strong> Essential functionality</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-blue-500" />
                      <span><strong>Analytics:</strong> Site usage insights</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-purple-500" />
                      <span><strong>Marketing:</strong> Relevant advertisements</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-orange-500" />
                      <span><strong>Functional:</strong> Enhanced features</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="space-y-3">
                <button
                  onClick={acceptAllCookies}
                  className="w-full bg-gradient-to-r from-[#85abe4] to-[#7498d1] hover:from-[#7498d1] hover:to-[#6385be] text-white px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <CheckCircle className="h-4 w-4" />
                  Accept All Cookies
                </button>
                
                <div className="flex gap-2">
                  <button
                    onClick={acceptNecessaryOnly}
                    className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-300 border border-gray-200 hover:border-gray-300 hover:shadow-sm"
                  >
                    Necessary Only
                  </button>
                  
                  <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="flex-1 text-[#85abe4] hover:text-[#7498d1] hover:bg-blue-50 px-3 py-2.5 text-xs font-medium transition-all duration-300 flex items-center justify-center gap-1 rounded-xl border border-blue-200 hover:border-blue-300"
                  >
                    <Settings className="h-3 w-3" />
                    {showDetails ? 'Hide' : 'Details'}
                  </button>
                </div>
              </div>
              
              <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-gray-500 text-center">
                View our{' '}
                <button 
                  onClick={() => window.open('/privacy', '_blank')}
                  className="text-[#85abe4] hover:text-[#7498d1] underline font-medium"
                >
                  Privacy Policy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Minimize Button */}
      {isExpanded && (
        <div className="fixed bottom-6 left-6 z-40">
          <button
            onClick={toggleExpanded}
            className="bg-gradient-to-r from-[#85abe4] to-[#7498d1] hover:from-[#7498d1] hover:to-[#6385be] text-white w-14 h-14 rounded-full shadow-xl transition-all duration-500 transform hover:scale-110 flex items-center justify-center group relative overflow-hidden"
            aria-label="Minimize cookie panel"
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-full"></div>
            <Cookie className="h-6 w-6 z-10 drop-shadow-sm" />
          </button>
        </div>
      )}
    </>
  );
}