import { useState, useEffect, useRef } from "react";
import { X, MessageCircle, Bot, Send, Phone } from "lucide-react";

interface ChatMessage {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
}

interface ChatState {
  step: 'initial' | 'timeline' | 'product' | 'consolidation' | 'revenue' | 'connecting' | 'live' | 'complete';
  responses: {
    userType?: string;
    timeline?: string;
    product?: string;
    lenderName?: string;
    currentBalance?: string;
    revenue?: string;
  };
  isLiveChat?: boolean;
}

export default function ChatWidget() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [chatState, setChatState] = useState<ChatState>({
    step: 'initial',
    responses: {},
    isLiveChat: false
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatId = useRef(Date.now().toString());

  // Show widget after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Listen for admin messages
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'ADMIN_MESSAGE' && event.data.chatId === chatId.current) {
        addMessage(event.data.message, 'bot');
      } else if (event.data.type === 'ADMIN_TAKEOVER' && event.data.chatId === chatId.current) {
        setChatState(prev => ({ ...prev, step: 'live', isLiveChat: true }));
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Store chat in localStorage for admin access
  useEffect(() => {
    if (chatState.step === 'connecting') {
      const waitingChats = JSON.parse(localStorage.getItem('waitingChats') || '[]');
      const newChat = {
        id: chatId.current,
        status: 'connecting',
        lastMessage: 'Waiting for specialist...',
        timestamp: new Date(),
        responses: chatState.responses
      };
      localStorage.setItem('waitingChats', JSON.stringify([...waitingChats, newChat]));
    }
  }, [chatState.step]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize chat with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        const welcomeMessage: ChatMessage = {
          id: `welcome-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          text: "👋 Hi! I'm here to help you find the perfect financing solution for your business. What brings you to FundTek today?",
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages([welcomeMessage]);
      }, 500);
    }
  }, [isOpen, messages.length]);

  const addMessage = (text: string, sender: 'bot' | 'user', delay: number = 0) => {
    if (delay > 0) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const newMessage: ChatMessage = {
          id: `${sender}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          text,
          sender,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, newMessage]);
      }, delay);
    } else {
      const newMessage: ChatMessage = {
        id: `${sender}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        text,
        sender,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newMessage]);
    }
  };

  const handleUserSelection = (selection: string, responseKey: keyof ChatState['responses']) => {
    addMessage(selection, 'user');
    
    const newResponses = { ...chatState.responses, [responseKey]: selection };
    
    // Progress through conversation flow with personalized responses
    if (chatState.step === 'initial') {
      if (selection.includes('financing')) {
        addMessage("Great! Let me ask a few quick questions to match you with the right specialist.", 'bot', 1000);
        addMessage("How soon do you need the funding?", 'bot', 2500);
      } else if (selection.includes('information')) {
        addMessage("Perfect! I'd be happy to help you learn about our financing options.", 'bot', 1000);
        addMessage("What's your timeline for exploring funding?", 'bot', 2500);
      }
      setChatState({ step: 'timeline', responses: newResponses });
    } else if (chatState.step === 'timeline') {
      if (selection === 'ASAP') {
        addMessage("Understood - time is critical! We specialize in fast approvals.", 'bot', 1000);
      } else if (selection === 'Within 30 days') {
        addMessage("Perfect timing! That gives us room to find the best solution for you.", 'bot', 1000);
      } else {
        addMessage("Smart to research early! Knowledge is power when it comes to financing.", 'bot', 1000);
      }
      addMessage("Which type of funding best describes what you're looking for?", 'bot', 2500);
      setChatState({ step: 'product', responses: newResponses });
    } else if (chatState.step === 'product' && selection === 'Debt Consolidation') {
      addMessage("Debt consolidation can really improve cash flow! Let me gather some details.", 'bot', 1000);
      addMessage("Can you share your current lender name and approximate balance?", 'bot', 2500);
      setChatState({ step: 'consolidation', responses: newResponses });
    } else if (chatState.step === 'product') {
      const productResponses = {
        'Term Loans': "Excellent choice! Term loans offer predictable payments and competitive rates.",
        'Lines of Credit': "Smart thinking! Lines of credit provide flexibility for ongoing needs.",
        'SBA Loans': "Great option! SBA loans offer some of the best terms available.",
        'Equipment Financing': "Perfect! Equipment financing often provides 100% financing with great rates.",
        'Merchant Cash Advance': "Good for quick access to capital! These fund very quickly.",
        'Invoice Factoring': "Ideal for improving cash flow! Turn your invoices into immediate capital."
      };
      
      const response = productResponses[selection as keyof typeof productResponses] || "That's a solid financing option!";
      addMessage(response, 'bot', 1000);
      addMessage("What's your business's annual revenue range?", 'bot', 2500);
      setChatState({ step: 'revenue', responses: newResponses });
    } else if (chatState.step === 'revenue' || chatState.step === 'consolidation') {
      addMessage("Perfect! Let me connect you with one of our specialists right now...", 'bot', 1000);
      addMessage("🔄 Connecting you with a FundTek specialist...", 'bot', 2500);
      setChatState({ step: 'connecting', responses: newResponses, isLiveChat: false });
      
      // Send data to backend and wait for specialist
      sendChatData({ ...newResponses, [responseKey]: selection });
      
      // Simulate specialist connection after 5 seconds
      setTimeout(() => {
        addMessage("👋 Hi! This is a FundTek specialist. I've reviewed your information and I'm here to help you get the funding you need. What questions can I answer for you?", 'bot', 1000);
        setChatState(prev => ({ ...prev, step: 'live', isLiveChat: true }));
      }, 5000);
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

  const handleSendMessage = () => {
    if (inputMessage.trim() && chatState.isLiveChat) {
      addMessage(inputMessage, 'user');
      setInputMessage('');
      // In live chat mode, messages are handled by the specialist
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const renderButtons = () => {
    switch (chatState.step) {
      case 'initial':
        return (
          <div className="flex flex-col gap-2 mt-3">
            <button
              onClick={() => handleUserSelection("I need financing for my business", 'userType')}
              className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left"
            >
              💰 I need financing for my business
            </button>
            <button
              onClick={() => handleUserSelection("I want information about your services", 'userType')}
              className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left"
            >
              📋 I want information about your services
            </button>
            <button
              onClick={() => handleUserSelection("I have questions about an existing application", 'userType')}
              className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left"
            >
              📞 I have questions about an existing application
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
          'Merchant Cash Advance', 'Term Loans', 'Lines of Credit', 'Equipment Financing',
          'Invoice Factoring', 'SBA Loans', 'P.O. Financing', 'Debt Consolidation',
          'Credit Services'
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
      
      case 'complete':
        return (
          <div className="flex flex-col gap-3 mt-4 p-4 bg-gradient-to-r from-[#85abe4]/10 to-blue-50 rounded-lg border border-[#85abe4]/20">
            <div className="text-center text-gray-700 text-sm font-medium mb-2">
              Need immediate assistance?
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => window.open('tel:+13053074658', '_self')}
                className="flex items-center justify-center gap-2 bg-[#85abe4] hover:bg-blue-600 text-white px-4 py-3 rounded-lg text-sm font-medium transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call (305) 307-4658
              </button>
              <button
                onClick={() => window.open('https://form.jotform.com/251417715331047', '_blank')}
                className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-[#85abe4] border-2 border-[#85abe4] px-4 py-3 rounded-lg text-sm font-medium transition-colors"
              >
                <Send className="w-4 h-4" />
                Apply Online
              </button>
            </div>
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
          className="fixed bottom-4 right-4 z-50 transition-all duration-300 ease-in-out"
          style={{ 
            maxWidth: 'calc(100vw - 2rem)',
            width: 'min(380px, 80vw)',
            maxHeight: 'calc(100vh - 2rem)'
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
                    <div className={`max-w-[80%] p-3 rounded-lg shadow-sm ${
                      message.sender === 'user'
                        ? 'bg-[#85abe4] text-white rounded-br-sm'
                        : 'bg-white text-gray-800 border rounded-bl-sm'
                    }`}>
                      {message.text}
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white text-gray-800 border p-3 rounded-lg rounded-bl-sm shadow-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {renderButtons()}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input Area - only show in live chat */}
            {chatState.isLiveChat && (
              <div className="p-4 border-t bg-white">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:border-[#85abe4]"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="bg-[#85abe4] hover:bg-blue-600 text-white p-2 rounded-lg transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                <div className="text-xs text-gray-500 mt-2 text-center">
                  You're now chatting with a FundTek specialist
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}