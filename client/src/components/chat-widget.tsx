import { useState, useEffect } from "react";
import { X, MessageCircle, Bot } from "lucide-react";

interface ChatMessage {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
}

interface ChatState {
  step: 'initial' | 'timeline' | 'product' | 'consolidation' | 'revenue' | 'complete';
  responses: {
    userType?: string;
    timeline?: string;
    product?: string;
    lenderName?: string;
    currentBalance?: string;
    revenue?: string;
  };
}

export default function ChatWidget() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatState, setChatState] = useState<ChatState>({
    step: 'initial',
    responses: {}
  });

  // Show widget after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Initialize chat with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: '1',
        text: "Hi there! Looking to speak to a FundTek representative? I can help! Let us know what kind of support you are looking for and I will route your chat to the appropriate department!",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  const addMessage = (text: string, sender: 'bot' | 'user') => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleUserSelection = (selection: string, responseKey: keyof ChatState['responses']) => {
    addMessage(selection, 'user');
    
    const newResponses = { ...chatState.responses, [responseKey]: selection };
    
    // Progress through conversation flow
    if (chatState.step === 'initial') {
      addMessage("When are you looking to secure funding?", 'bot');
      setChatState({ step: 'timeline', responses: newResponses });
    } else if (chatState.step === 'timeline') {
      addMessage("What type of funding product are you interested in?", 'bot');
      setChatState({ step: 'product', responses: newResponses });
    } else if (chatState.step === 'product' && selection === 'Debt Consolidation') {
      addMessage("Please provide your current lender name and balance:", 'bot');
      setChatState({ step: 'consolidation', responses: newResponses });
    } else if (chatState.step === 'product') {
      addMessage("What is your business's annual revenue?", 'bot');
      setChatState({ step: 'revenue', responses: newResponses });
    } else if (chatState.step === 'revenue' || chatState.step === 'consolidation') {
      addMessage("Thank you! I'll connect you with a specialist right away. Please expect a call within 24 hours.", 'bot');
      setChatState({ step: 'complete', responses: newResponses });
      
      // Send data to backend
      sendChatData({ ...newResponses, [responseKey]: selection });
    }
  };

  const sendChatData = async (responses: ChatState['responses']) => {
    try {
      await fetch('/api/chat-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          responses,
          timestamp: new Date().toISOString(),
          email: 'brian@fundtekcapitalgroup.com'
        })
      });
    } catch (error) {
      console.error('Failed to send chat data:', error);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const renderButtons = () => {
    switch (chatState.step) {
      case 'initial':
        return (
          <div className="flex flex-col gap-2 mt-3">
            <button
              onClick={() => handleUserSelection("I am a business looking for financing", 'userType')}
              className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left"
            >
              I am a business looking for financing
            </button>
            <button
              onClick={() => handleUserSelection("I am a broker/referral partner", 'userType')}
              className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left"
            >
              I am a broker/referral partner
            </button>
          </div>
        );
        
      case 'timeline':
        return (
          <div className="flex flex-col gap-2 mt-3">
            {['ASAP', 'Within 30 days', 'Just researching'].map((option) => (
              <button
                key={option}
                onClick={() => handleUserSelection(option, 'timeline')}
                className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left"
              >
                {option}
              </button>
            ))}
          </div>
        );
        
      case 'product':
        const products = [
          'Term Loans', 'Lines of Credit', 'SBA Loans', 'Equipment Financing',
          'Invoice Factoring', 'P.O. Financing', 'Debt Consolidation',
          'Credit Services', 'Merchant Cash Advance'
        ];
        
        return (
          <div className="flex flex-col gap-2 mt-3">
            {products.map((product) => (
              <button
                key={product}
                onClick={() => handleUserSelection(product, 'product')}
                className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left"
              >
                {product}
              </button>
            ))}
          </div>
        );
        
      case 'consolidation':
        return (
          <div className="flex flex-col gap-3 mt-3">
            <input
              type="text"
              placeholder="Current lender/funder name"
              className="border border-gray-300 px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#85abe4]"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  const target = e.target as HTMLInputElement;
                  if (target.value.trim()) {
                    handleUserSelection(`Lender: ${target.value}`, 'lenderName');
                  }
                }
              }}
            />
            <input
              type="text"
              placeholder="Current balance(s)"
              className="border border-gray-300 px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#85abe4]"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  const target = e.target as HTMLInputElement;
                  if (target.value.trim()) {
                    handleUserSelection(`Balance: ${target.value}`, 'currentBalance');
                  }
                }
              }}
            />
          </div>
        );
      
      case 'revenue':
        return (
          <div className="flex flex-col gap-2 mt-3">
            {['<$50K', '$50K-$200K', '>$200K'].map((option) => (
              <button
                key={option}
                onClick={() => handleUserSelection(option, 'revenue')}
                className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left"
              >
                {option}
              </button>
            ))}
          </div>
        );
      
      default:
        return null;
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Floating Chat Button - Only when closed */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 z-40 bg-[#85abe4] hover:bg-blue-600 text-white p-4 rounded-full shadow-lg transition-all duration-200"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Widget Container - Only when open */}
      {isOpen && (
        <div 
          className="fixed bottom-4 right-4 z-40 transition-all duration-300 ease-in-out"
          style={{ 
            maxWidth: 'calc(100vw - 2rem)',
            width: 'min(380px, 80vw)'
          }}
        >
          <div className="bg-white rounded-lg shadow-2xl border overflow-hidden">
            {/* Header */}
            <div className="bg-[#85abe4] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-[#85abe4]" />
                </div>
                <div>
                  <div className="font-semibold text-lg">FundTek</div>
                  <div className="text-blue-100 text-sm">Here to assist!</div>
                </div>
              </div>
              <button
                onClick={toggleChat}
                className="text-white hover:text-blue-200 transition-colors p-1"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="h-80 overflow-y-auto p-4 bg-gray-50">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-[#85abe4] text-white'
                        : 'bg-white text-gray-800 border'
                    }`}>
                      {message.text}
                    </div>
                  </div>
                ))}
              </div>
              {renderButtons()}
            </div>
          </div>
        </div>
      )}
    </>
  );
}