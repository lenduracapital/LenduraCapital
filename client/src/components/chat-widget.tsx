import { useState, useEffect, useRef, memo } from "react";
import { X, MessageCircle, Bot, Send, Phone, Clock, MapPin, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

interface ChatMessage {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
}

interface ChatState {
  step: 'welcome' | 'user_type' | 'financing_timeline' | 'info_category' | 'product' | 'debt_q1' | 'debt_q2' | 'revenue' | 'business_info' | 'first_name' | 'phone_number' | 'email' | 'complete';
  responses: {
    firstName?: string;
    phoneNumber?: string;
    email?: string;
    userType?: string;
    timeline?: string;
    infoCategory?: string;
    product?: string;
    debtQ1?: string;
    debtQ2?: string;
    revenue?: string;
    businessType?: string;
  };
}

interface Conversation {
  sessionId: string;
  firstName?: string;
  timestamp: Date;
  lastMessage?: string;
}

function ChatWidget() {
  const [location] = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Start collapsed on mobile
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [chatState, setChatState] = useState<ChatState>({
    step: 'welcome',
    responses: {}
  });
  const [showHistory, setShowHistory] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile and show widget after delay
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      // Start collapsed on mobile, expanded on desktop
      if (!mobile && messages.length === 0) {
        setIsOpen(true);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Clear any previous dismissal so chat always appears on page load
    sessionStorage.removeItem('chatWidgetDismissed');
    
    // Generate or get session ID
    let sessionId = localStorage.getItem('chatSessionId');
    if (!sessionId) {
      sessionId = `CHAT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('chatSessionId', sessionId);
    }
    setCurrentSessionId(sessionId);
    
    // Load conversation history
    loadConversationHistory();
    
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, isMobile ? 5000 : 2000); // Longer delay on mobile
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize chat with welcome message only once
  useEffect(() => {
    if (isOpen && messages.length === 0 && chatState.step === 'welcome') {
      setTimeout(() => {
        const welcomeMessage: ChatMessage = {
          id: `welcome-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          text: "Hi! I'm here to help with business financing questions.",
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages([welcomeMessage]);
        
        // Ask about their business needs after a delay
        setTimeout(() => {
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
            const businessMessage: ChatMessage = {
              id: `business-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              text: "What can I help you with today?",
              sender: 'bot',
              timestamp: new Date()
            };
            setMessages(prev => [...prev, businessMessage]);
            setChatState(prevState => ({ ...prevState, step: 'user_type' }));
          }, 1500);
        }, 3000);
      }, 500);
    }
  }, [isOpen, chatState.step]);

  const addMessage = (text: string, sender: 'bot' | 'user', delay: number = 0) => {
    if (delay > 0) {
      setTimeout(() => {
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
        }, 1500); // Typing indicator duration
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

  const handleTextInput = (text: string) => {
    addMessage(text, 'user');
    
    if (chatState.step === 'first_name') {
      const newResponses = { ...chatState.responses, firstName: text };
      addMessage(`Thanks, ${text}!`, 'bot', 2000);
      setTimeout(() => {
        addMessage("What's your phone number?", 'bot');
        setChatState({ step: 'phone_number', responses: newResponses });
      }, 5000);
    } else if (chatState.step === 'phone_number') {
      const newResponses = { ...chatState.responses, phoneNumber: text };
      addMessage("Got it. What's your email address?", 'bot', 2000);
      setTimeout(() => {
        setChatState({ step: 'email', responses: newResponses });
      }, 4500);
    } else if (chatState.step === 'email') {
      const newResponses = { ...chatState.responses, email: text };
      addMessage("Perfect! I'll have someone from our team contact you.", 'bot', 2000);
      setTimeout(() => {
        addMessage("A FundTek expert will reach out at their earliest convenience. For immediate help, you can schedule a call at https://calendly.com/admin-fundtekcapitalgroup/30min", 'bot');
      }, 5500);
      setChatState({ step: 'complete', responses: newResponses });
      
      // Send data to backend
      sendChatData(newResponses);
    } else if (chatState.step === 'debt_q1') {
      const newResponses = { ...chatState.responses, debtQ1: text };
      addMessage("Got it! Dealing with multiple lenders can be a real headache.", 'bot', 2000);
      setTimeout(() => {
        addMessage("What's the approximate balance you're looking to consolidate?", 'bot');
      }, 4200);
      setChatState({ step: 'debt_q2', responses: newResponses });
    } else if (chatState.step === 'debt_q2') {
      const newResponses = { ...chatState.responses, debtQ2: text };
      addMessage("Thanks! That helps me understand your situation better.", 'bot', 1800);
      setTimeout(() => {
        addMessage("What's your business's monthly revenue range? This helps me recommend the best consolidation options for you.", 'bot');
      }, 4000);
      setChatState({ step: 'revenue', responses: newResponses });
    }
  };

  const handleUserSelection = (selection: string, responseKey: keyof ChatState['responses']) => {
    addMessage(selection, 'user');
    
    const newResponses = { ...chatState.responses, [responseKey]: selection };
    
    if (chatState.step === 'user_type') {
      if (selection.includes('financing')) {
        addMessage("Great! Let me ask a few questions.", 'bot', 2500);
        setTimeout(() => {
          addMessage("How soon do you need funding?", 'bot');
        }, 6000);
        setChatState({ step: 'financing_timeline', responses: newResponses });
      } else if (selection.includes('information')) {
        addMessage("I can help with that.", 'bot', 2500);
        setTimeout(() => {
          addMessage("What would you like to know about?", 'bot');
        }, 6000);
        setChatState({ step: 'info_category', responses: newResponses });
      } else if (selection.includes('existing application')) {
        addMessage("I'll connect you with someone who can help.", 'bot', 2500);
        setTimeout(() => {
          addMessage("A FundTek expert will reach out at their earliest convenience, or call us at (305) 307-4658.", 'bot');
        }, 6000);
        setChatState({ step: 'complete', responses: newResponses });
        sendChatData({ ...newResponses, userType: selection });
      }
    } else if (chatState.step === 'financing_timeline') {
      if (selection === 'ASAP') {
        addMessage("We can work with urgent timelines.", 'bot', 2500);
      } else if (selection === 'Within 30 days') {
        addMessage("That gives us good time to find the best option.", 'bot', 2500);
      } else {
        addMessage("Smart to research early.", 'bot', 2500);
      }
      setTimeout(() => {
        addMessage("What type of funding are you looking for?", 'bot');
      }, 6000);
      setChatState({ step: 'product', responses: newResponses });
    } else if (chatState.step === 'info_category') {
      const categoryResponses = {
        'Financing options and rates': "Our financing options include Term Loans (6-36 months), SBA Loans (up to 25 years), Lines of Credit (flexible access), and Merchant Cash Advances (3-18 months). Rates vary from 8-35% based on qualifications.",
        'Application requirements': "We typically need: 3+ months in business, $10K+ monthly revenue, 550+ credit score, bank statements, and basic business documents. Most applications are processed within 24 hours.",
        'How FundTek works': "FundTek Capital Group is a professional financing firm that connects businesses with our network of trusted lenders. We analyze your business profile and match you with the most suitable funding solutions, managing the entire process from application to funding.",
        'Industry expertise': "We specialize in restaurants, retail, healthcare, construction, trucking, e-commerce, professional services, and many other industries with tailored solutions for each sector's unique needs."
      };
      
      const response = categoryResponses[selection as keyof typeof categoryResponses];
      if (response) {
        addMessage(response, 'bot', 2000);
        addMessage("Would you like to explore specific financing options, or do you have other questions?", 'bot', 5000);
        setChatState({ step: 'business_info', responses: newResponses });
      } else {
        addMessage("Let me connect you with a specialist who can provide detailed information about that topic.", 'bot', 2000);
        setChatState({ step: 'complete', responses: newResponses });
        sendChatData({ ...newResponses, infoCategory: selection });
      }
    } else if (chatState.step === 'product') {
      if (selection === 'Debt Consolidation') {
        addMessage("Debt consolidation can help simplify payments.", 'bot', 2500);
        setTimeout(() => {
          addMessage("Who is your main lender currently?", 'bot');
        }, 6000);
        setChatState({ step: 'debt_q1', responses: newResponses });
      } else {
        const productResponses = {
          'Term Loans': "Term loans offer predictable monthly payments.",
          'Merchant Cash Advance': "Good for quick funding needs.",
          'Lines of Credit': "Lines of credit provide flexible access to funds.",
          'SBA Loans': "SBA loans typically have competitive terms.",
          'Equipment Financing': "Equipment financing can cover 100% of equipment costs.",
          'Invoice Factoring': "Invoice factoring helps improve cash flow."
        };
        
        const response = productResponses[selection as keyof typeof productResponses] || "That's a good financing option.";
        addMessage(response, 'bot', 2500);
        setTimeout(() => {
          addMessage("What's your monthly business revenue?", 'bot');
        }, 6000);
        setChatState({ step: 'revenue', responses: newResponses });
      }

    } else if (chatState.step === 'revenue') {
      addMessage("Thanks! Let me get your contact info.", 'bot', 2500);
      setTimeout(() => {
        addMessage("What's your first name?", 'bot');
      }, 6000);
      setChatState({ step: 'first_name', responses: newResponses });
    } else if (chatState.step === 'business_info') {
      if (selection.includes('financing options')) {
        addMessage("Excellent! Let me ask a quick question to recommend the best options.", 'bot', 1500);
        addMessage("What's your business's monthly revenue range?", 'bot', 4000);
        setChatState({ step: 'revenue', responses: newResponses });
      } else if (selection.includes('more questions')) {
        addMessage("I'd be happy to connect you with a specialist who can answer your specific questions in detail.", 'bot', 1500);
        addMessage("Let me get your contact information so they can reach you.", 'bot', 4000);
        addMessage("What's your first name?", 'bot', 6500);
        setChatState({ step: 'first_name', responses: newResponses });
      } else {
        addMessage("Great! I'm glad I could help. Feel free to reach out anytime if you need financing assistance.", 'bot', 1500);
        addMessage("Let me get your contact details in case you need assistance later.", 'bot', 4000);
        addMessage("What's your first name?", 'bot', 6500);
        setChatState({ step: 'first_name', responses: newResponses });
      }
    }
  };

  const sendChatData = async (responses: ChatState['responses']) => {
    try {
      const response = await fetch('/api/chat/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: currentSessionId,
          firstName: responses.firstName || '',
          phoneNumber: responses.phoneNumber || '',
          email: responses.email || '',
          userType: responses.userType || '',
          timeline: responses.timeline || '',
          product: responses.product || '',
          revenue: responses.revenue || '',
          businessType: responses.businessType || '',
          debtQ1: responses.debtQ1 || '',
          debtQ2: responses.debtQ2 || '',
          messages: messages // Save messages for history
        })
      });
      
      const result = await response.json();
      if (result.success) {
        console.log('Chat data submitted successfully:', result.sessionId);
        // Save session ID to local storage
        const savedSessionIds = JSON.parse(localStorage.getItem('chatSessionIds') || '[]');
        if (!savedSessionIds.includes(currentSessionId)) {
          savedSessionIds.push(currentSessionId);
          localStorage.setItem('chatSessionIds', JSON.stringify(savedSessionIds));
        }
      }
    } catch (error) {
      console.error('Failed to send chat data:', error);
    }
  };

  const loadConversationHistory = async () => {
    try {
      const savedSessionIds = JSON.parse(localStorage.getItem('chatSessionIds') || '[]');
      if (savedSessionIds.length > 0) {
        const response = await fetch('/api/chat/history');
        if (response.ok) {
          const history = await response.json();
          setConversations(history.filter((conv: Conversation) => 
            savedSessionIds.includes(conv.sessionId)
          ));
        }
      }
    } catch (error) {
      console.error('Error loading conversation history:', error);
    }
  };

  const loadConversation = async (sessionId: string) => {
    try {
      const response = await fetch(`/api/chat/messages/${sessionId}`);
      if (response.ok) {
        const messages = await response.json();
        setMessages(messages.map((msg: any) => ({
          id: msg.messageId,
          text: msg.text,
          sender: msg.sender,
          timestamp: new Date(msg.timestamp)
        })));
        setCurrentSessionId(sessionId);
        setShowHistory(false);
      }
    } catch (error) {
      console.error('Error loading conversation:', error);
    }
  };

  const toggleChat = () => {
    if (isOpen) {
      // User is closing the chat - keep bubble visible but close chat window
      sessionStorage.setItem('chatWidgetDismissed', 'true');
      setIsOpen(false);
      setShowHistory(false); // Reset to chat view when closing
      // DON'T set setIsVisible(false) - this keeps the bubble visible
    } else {
      setIsOpen(true);
      // Check for previous conversations when opening
      if (conversations.length > 0 && messages.length === 0) {
        setShowHistory(true);
      }
    }
  };



  const handleSubmitText = () => {
    if (textInput.trim()) {
      handleTextInput(textInput.trim());
      setTextInput('');
    }
  };

  const renderInput = () => {
    if (chatState.step === 'first_name' || chatState.step === 'phone_number' || chatState.step === 'email' || chatState.step === 'debt_q1' || chatState.step === 'debt_q2') {
      const placeholders = {
        'first_name': 'Enter your first name...',
        'phone_number': 'Enter your phone number...',
        'email': 'Enter your email address...'
      };
      
      return (
        <div className="flex gap-2 mt-3">
          <input
            type={chatState.step === 'email' ? 'email' : 'text'}
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmitText()}
            placeholder={
              chatState.step === 'first_name' ? 'Enter your first name...' :
              chatState.step === 'phone_number' ? 'Enter your phone number...' :
              chatState.step === 'email' ? 'Enter your email address...' :
              chatState.step === 'debt_q1' ? 'Enter lender name...' :
              chatState.step === 'debt_q2' ? 'Enter current balance...' :
              'Enter your response...'
            }
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            autoFocus
          />
          <button
            onClick={handleSubmitText}
            disabled={!textInput.trim()}
            className="bg-[#85abe4] hover:bg-[#7ba0d9] disabled:bg-gray-300 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      );
    }
    return null;
  };

  const renderButtons = () => {
    switch (chatState.step) {
      case 'first_name':
      case 'phone_number':
      case 'email':
        return null;
        
      case 'user_type':
        return (
          <div className="flex flex-col gap-2 mt-3">
            <button
              onClick={() => handleUserSelection("I need financing for my business", 'userType')}
              className="bg-blue-50 hover:bg-blue-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 transform hover:scale-105 active:scale-95 text-blue-700 px-4 py-3 rounded-lg text-sm font-medium text-left"
            >
              💰 I need business funding
            </button>
            <button
              onClick={() => handleUserSelection("I want information about your services", 'userType')}
              className="bg-blue-50 hover:bg-blue-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 transform hover:scale-105 active:scale-95 text-blue-700 px-4 py-3 rounded-lg text-sm font-medium text-left"
            >
              📋 I have questions about services
            </button>
            <button
              onClick={() => handleUserSelection("I have questions about an existing application", 'userType')}
              className="bg-blue-50 hover:bg-blue-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 transform hover:scale-105 active:scale-95 text-blue-700 px-4 py-3 rounded-lg text-sm font-medium text-left"
            >
              📞 Questions about my application
            </button>
          </div>
        );
        
      case 'financing_timeline':
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
        
      case 'info_category':
        return (
          <div className="flex flex-col gap-2 mt-3">
            {[
              'Financing options and rates',
              'Application requirements', 
              'How FundTek works',
              'Industry expertise'
            ].map((option) => (
              <button
                key={option}
                onClick={() => handleUserSelection(option, 'infoCategory')}
                className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left"
              >
                {option}
              </button>
            ))}
          </div>
        );
        
      case 'business_info':
        return (
          <div className="flex flex-col gap-2 mt-3">
            <button
              onClick={() => handleUserSelection("I'd like to explore financing options", 'businessType')}
              className="bg-[#85abe4] hover:bg-[#7099d6] text-white px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left"
            >
              💰 Explore financing options for my business
            </button>
            <button
              onClick={() => handleUserSelection("I have more questions", 'businessType')}
              className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left"
            >
              ❓ I have more specific questions
            </button>
            <button
              onClick={() => handleUserSelection("That answered my questions", 'businessType')}
              className="bg-green-50 hover:bg-green-100 text-green-700 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left"
            >
              ✅ That answered my questions
            </button>
          </div>
        );
        
      case 'product':
        const products = [
          'Term Loans', 'Merchant Cash Advance', 'Lines of Credit', 'Debt Consolidation',
          'SBA Loans', 'Equipment Financing', 'Invoice Factoring'
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
        
      case 'debt_q1':
      case 'debt_q2':
        return null; // These now use the text input system
        
      
      case 'revenue':
        return (
          <div className="flex flex-col gap-2 mt-3">
            {['<$100K', '$100K - $250K', '$250K - $500K', '$500K - $1M', '$1M+'].map((option) => (
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
                onClick={() => window.open('https://calendly.com/admin-fundtekcapitalgroup/30min', '_blank')}
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
      {/* Floating Chat Button - Only when visible but closed */}
      {isVisible && !isOpen && (
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
          className={`fixed z-50 transition-all duration-300 ease-in-out ${
            isMobile ? 'bottom-0 right-0 left-0' : 'bottom-4 right-4'
          }`}
          style={{ 
            maxWidth: isMobile ? '100vw' : 'calc(100vw - 2rem)',
            width: isMobile ? '100%' : 'min(420px, 90vw)',
            maxHeight: isMobile ? '70vh' : 'calc(100vh - 2rem)'
          }}
        >
          <div className={`bg-white shadow-2xl border overflow-hidden ${
            isMobile ? 'rounded-t-lg' : 'rounded-lg'
          }`}>
            {/* Header */}
            <div className="bg-[#85abe4] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {showHistory && (
                  <button
                    onClick={() => setShowHistory(false)}
                    className="text-white hover:text-blue-200 transition-colors p-1"
                    aria-label="Back to chat"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                )}
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-[#85abe4]" />
                </div>
                <div>
                  <div className={`font-semibold ${isMobile ? 'text-base' : 'text-lg'}`}>
                    {showHistory ? 'Conversation(s)' : 'FundTek'}
                  </div>
                  <div className={`text-blue-100 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                    {showHistory ? '' : 'Here to assist!'}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!showHistory && (
                  <button
                    onClick={() => setShowHistory(true)}
                    className="text-white hover:text-blue-200 transition-colors p-1"
                    aria-label="View conversation history"
                  >
                    <Clock className="w-5 h-5" />
                  </button>
                )}
                <button
                  onClick={toggleChat}
                  className="text-white hover:text-blue-200 transition-colors p-1"
                  aria-label="Close chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages Area or Conversation History */}
            <div className={`overflow-y-auto p-4 bg-gray-50 ${isMobile ? 'h-80' : 'h-96'}`}>
              {showHistory ? (
                // Conversation History View
                <div className="space-y-2">
                  {conversations.length > 0 ? (
                    conversations.map((conv) => (
                      <div
                        key={conv.sessionId}
                        onClick={() => loadConversation(conv.sessionId)}
                        className={`${isMobile ? 'p-3' : 'p-4'} bg-white rounded-lg border hover:border-[#85abe4] cursor-pointer transition-colors`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`${isMobile ? 'w-8 h-8' : 'w-10 h-10'} bg-gray-100 rounded-full flex items-center justify-center`}>
                              <MessageCircle className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-gray-600`} />
                            </div>
                            <div>
                              <div className={`font-medium ${isMobile ? 'text-sm' : 'text-base'}`}>
                                {conv.firstName || 'FundTek Chat'}
                              </div>
                              <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600`}>
                                {new Date(conv.timestamp).toLocaleDateString()} • 
                                {new Date(conv.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </div>
                            </div>
                          </div>
                          <Clock className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} text-gray-400`} />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No previous conversations found
                    </div>
                  )}
                </div>
              ) : (
                // Chat Messages View
                <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] ${isMobile ? 'p-2 text-sm' : 'p-3 text-base'} rounded-lg shadow-sm ${
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
              )}
              {!showHistory && renderButtons()}
              {!showHistory && renderInput()}
              <div ref={messagesEndRef} />
            </div>

          </div>
        </div>
      )}
    </>
  );
}

export default memo(ChatWidget);