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
  const [isOpen, setIsOpen] = useState(true); // Start expanded by default
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatState, setChatState] = useState<ChatState>({
    step: 'initial',
    responses: {}
  });

  // Prevent chat widget from interfering with page links
  const handleContainerClick = (e: React.MouseEvent) => {
    // Only prevent propagation for clicks within the chat widget area
    if (e.currentTarget === e.target || e.currentTarget.contains(e.target as Node)) {
      e.stopPropagation();
    }
  };

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
    // Add user's response
    addMessage(selection, 'user');
    
    // Update chat state
    const newState = {
      ...chatState,
      responses: {
        ...chatState.responses,
        [responseKey]: selection
      }
    };

    // Progress to next step
    setTimeout(() => {
      switch (chatState.step) {
        case 'initial':
          if (selection === "I am a business looking for financing") {
            newState.step = 'timeline';
            addMessage("Great! What's your ideal funding timeline?", 'bot');
          }
          break;
        case 'timeline':
          newState.step = 'product';
          addMessage("Which product interests you most?", 'bot');
          break;
        case 'product':
          if (selection === 'Consolidation') {
            newState.step = 'consolidation';
            addMessage("Please provide your current lender or funder name and current balance(s).", 'bot');
          } else {
            newState.step = 'revenue';
            addMessage("What's your monthly revenue range?", 'bot');
          }
          break;
        case 'consolidation':
          newState.step = 'revenue';
          addMessage("What's your monthly revenue range?", 'bot');
          break;
        case 'revenue':
          newState.step = 'complete';
          addMessage("Perfect! I'm connecting you with one of our funding specialists who will reach out shortly. Thank you for your interest in FundTek Capital Group!", 'bot');
          // Send email with collected information
          sendChatData(newState.responses);
          break;
      }
      setChatState(newState);
    }, 500);
  };

  const sendChatData = async (responses: ChatState['responses']) => {
    try {
      const chatData = {
        timestamp: new Date().toISOString(),
        userType: responses.userType,
        timeline: responses.timeline,
        product: responses.product,
        revenue: responses.revenue,
        source: 'Chat Widget'
      };

      // Send to backend API
      await fetch('/api/chat-submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(chatData)
      });
    } catch (error) {
      console.error('Failed to send chat data:', error);
    }
  };

  const toggleChat = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
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
          </div>
        );
      
      case 'timeline':
        return (
          <div className="flex flex-col gap-2 mt-3">
            {['ASAP', '1-2 weeks', 'Longer'].map((option) => (
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
        return (
          <div className="flex flex-col gap-2 mt-3">
            {[
              'Term Loans', 
              'Line of Credit', 
              'SBA', 
              'Consolidation', 
              'Equipment Financing', 
              'Invoice Factoring', 
              'P.O Financing', 
              'Merchant Cash Advance', 
              'Credit Services'
            ].map((option) => (
              <button
                key={option}
                onClick={() => handleUserSelection(option, 'product')}
                className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left"
              >
                {option}
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
      {/* Chat Widget Container */}
      <div 
        className={`fixed bottom-4 right-4 z-40 transition-all duration-300 ease-in-out ${
          isOpen ? 'transform-none' : 'transform'
        }`}
        style={{ 
          maxWidth: 'calc(100vw - 2rem)',
          width: isOpen ? 'min(380px, 80vw)' : 'auto',
          pointerEvents: isOpen ? 'auto' : 'none'
        }}
        onClick={handleContainerClick}
        onMouseDown={handleContainerClick}
      >
        {/* Chat Window */}
        <div 
          className={`bg-white rounded-lg shadow-2xl border overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
          }`}
        >
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
                    <div className="text-sm leading-relaxed">{message.text}</div>
                  </div>
                </div>
              ))}
              
              {/* Render interactive buttons for current step */}
              {messages.length > 0 && chatState.step !== 'complete' && (
                <div className="flex justify-start">
                  <div className="max-w-[80%]">
                    {renderButtons()}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Chat Toggle Button */}
        <div className={`transition-all duration-300 ease-in-out ${
          isOpen ? 'opacity-0 scale-75 pointer-events-none' : 'opacity-100 scale-100'
        }`}>
          <button
            onClick={toggleChat}
            className="bg-[#85abe4] hover:bg-[#7299d9] text-white p-4 rounded-full shadow-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 mt-4 ml-auto block"
            aria-label="Open chat"
          >
            <MessageCircle className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile responsive adjustments handled by Tailwind classes */}
    </>
  );
}