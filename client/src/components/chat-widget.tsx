import { useState, useEffect, useRef } from "react";
import { X, MessageCircle, Bot, Send, Phone } from "lucide-react";

interface ChatMessage {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
}

interface ChatState {
  step: 'initial' | 'timeline' | 'product' | 'solution_q1' | 'solution_q2' | 'solution_q3' | 'revenue' | 'complete';
  responses: {
    userType?: string;
    timeline?: string;
    product?: string;
    solutionQ1?: string;
    solutionQ2?: string;
    solutionQ3?: string;
    revenue?: string;
  };
}

export default function ChatWidget() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [chatState, setChatState] = useState<ChatState>({
    step: 'initial',
    responses: {}
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Show widget after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

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
        addMessage("Great! Let me ask a few quick questions to match you with the right specialist.", 'bot', 1500);
        addMessage("How soon do you need the funding?", 'bot', 4000);
        setChatState({ step: 'timeline', responses: newResponses });
      } else if (selection.includes('information')) {
        addMessage("Perfect! I'd be happy to help you learn about our financing options.", 'bot', 1500);
        addMessage("What's your timeline for exploring funding?", 'bot', 4000);
        setChatState({ step: 'timeline', responses: newResponses });
      } else if (selection.includes('existing application')) {
        addMessage("I understand you have questions about your application. Let me connect you with the right specialist immediately.", 'bot', 1500);
        addMessage("A FundTek expert will call you within 2 hours to assist with your application. For immediate help, call us at (305) 307-4658.", 'bot', 4000);
        setChatState({ step: 'complete', responses: newResponses });
        
        // Send application inquiry to backend
        sendChatData({ ...newResponses, userType: selection });
      }
    } else if (chatState.step === 'timeline') {
      if (selection === 'ASAP') {
        addMessage("Understood - time is critical! We specialize in fast approvals.", 'bot', 1500);
      } else if (selection === 'Within 30 days') {
        addMessage("Perfect timing! That gives us room to find the best solution for you.", 'bot', 1500);
      } else {
        addMessage("Smart to research early! Knowledge is power when it comes to financing.", 'bot', 1500);
      }
      addMessage("Which type of funding best describes what you're looking for?", 'bot', 4000);
      setChatState({ step: 'product', responses: newResponses });
    } else if (chatState.step === 'product') {
      const productResponses = {
        'Term Loans': "Excellent choice! Term loans offer predictable payments and competitive rates.",
        'Merchant Cash Advance': "Good for quick access to capital! These fund very quickly.",
        'Lines of Credit': "Smart thinking! Lines of credit provide flexibility for ongoing needs.",
        'Debt Consolidation': "Smart move! This can simplify payments and potentially reduce your overall costs.",
        'SBA Loans': "Great option! SBA loans offer some of the best terms available.",
        'Equipment Financing': "Perfect! Equipment financing often provides 100% financing with great rates.",
        'Invoice Factoring': "Ideal for improving cash flow! Turn your invoices into immediate capital.",
        'P.O. Financing': "Great for growth! This helps you fulfill large orders you couldn't otherwise handle.",
        'Credit Services': "Wise choice! Improving your credit opens doors to better financing options.",
        'Marketing': "Smart investment! Digital marketing drives business growth and customer acquisition.",
        'Card Processing': "Essential service! Efficient payment processing improves cash flow and customer experience.",
        'CRE Lending': "Excellent for real estate! Commercial properties can be great investments and business assets.",
        'Mortgage Loans': "Great choice! Property financing can provide stability and equity building opportunities."
      };
      
      const response = productResponses[selection as keyof typeof productResponses] || "That's a solid financing option!";
      addMessage(response, 'bot', 1500);
      
      // Route to solution-specific questions
      const firstQuestion = getSolutionQuestion(selection, 1);
      addMessage(firstQuestion, 'bot', 4000);
      setChatState({ step: 'solution_q1', responses: newResponses });
    } else if (chatState.step === 'solution_q1') {
      const secondQuestion = getSolutionQuestion(chatState.responses.product || '', 2);
      addMessage("Got it!", 'bot', 1500);
      addMessage(secondQuestion, 'bot', 3500);
      setChatState({ step: 'solution_q2', responses: newResponses });
    } else if (chatState.step === 'solution_q2') {
      const thirdQuestion = getSolutionQuestion(chatState.responses.product || '', 3);
      addMessage("Perfect!", 'bot', 1500);
      addMessage(thirdQuestion, 'bot', 3500);
      setChatState({ step: 'solution_q3', responses: newResponses });
    } else if (chatState.step === 'solution_q3') {
      addMessage("Excellent! Now let me ask about your business revenue.", 'bot', 1500);
      addMessage("What's your business's annual revenue range?", 'bot', 4000);
      setChatState({ step: 'revenue', responses: newResponses });
    } else if (chatState.step === 'revenue') {
      addMessage("Perfect! Based on your answers, I can connect you with the right specialist.", 'bot', 1500);
      addMessage("A FundTek expert will call you within 24 hours. You can also call us directly at (305) 307-4658 for immediate assistance!", 'bot', 4500);
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

  const getSolutionQuestion = (product: string, questionNumber: 1 | 2 | 3): string => {
    const questions = {
      'Term Loans': [
        "What's the primary purpose for this term loan?",
        "How much funding are you looking to secure?",
        "What's your preferred repayment timeline?"
      ],
      'Merchant Cash Advance': [
        "What's your average monthly credit card processing volume?",
        "How quickly do you need access to the funds?",
        "What will you use the advance for?"
      ],
      'Lines of Credit': [
        "Do you need funds for seasonal fluctuations or ongoing operations?",
        "What credit limit range are you considering?",
        "How often do you anticipate drawing from the line?"
      ],
      'Debt Consolidation': [
        "How many current debts are you looking to consolidate?",
        "What's your approximate total debt amount?",
        "Are you current on all existing payments?"
      ],
      'SBA Loans': [
        "Is this for startup, expansion, or acquisition?",
        "Do you have the required down payment available?",
        "What's your target loan amount?"
      ],
      'Equipment Financing': [
        "Are you purchasing new or used equipment?",
        "What type of equipment do you need?",
        "Do you have quotes or specifications ready?"
      ],
      'Invoice Factoring': [
        "What's your average monthly invoice volume?",
        "How long are your typical payment terms?",
        "Do you have credit-worthy customers?"
      ],
      'P.O. Financing': [
        "What's the size of the purchase order?",
        "Who is your customer for this order?",
        "What's the delivery timeline?"
      ],
      'Credit Services': [
        "Are you focusing on personal or business credit?",
        "What's your current credit score range?",
        "What credit goals are you trying to achieve?"
      ],
      'Marketing': [
        "What marketing channels are you most interested in?",
        "What's your current monthly marketing budget?",
        "What are your primary business goals?"
      ],
      'Card Processing': [
        "What's your current monthly processing volume?",
        "Are you looking to switch processors or set up new?",
        "Do you process online, in-person, or both?"
      ],
      'CRE Lending': [
        "What type of commercial property are you financing?",
        "Is this for purchase, refinance, or construction?",
        "What's your target loan amount?"
      ],
      'Mortgage Loans': [
        "Is this for primary residence or investment property?",
        "Are you purchasing or refinancing?",
        "What's your target loan amount?"
      ]
    };

    return questions[product as keyof typeof questions]?.[questionNumber - 1] || "Tell me more about your specific needs.";
  };

  const getSolutionOptions = (product: string, questionNumber: 1 | 2 | 3): string[] => {
    const options = {
      'Term Loans': [
        ['Business expansion', 'Equipment purchase', 'Working capital', 'Debt consolidation'],
        ['$25K - $100K', '$100K - $500K', '$500K - $1M', '$1M+'],
        ['1-2 years', '3-5 years', '5-7 years', '7+ years']
      ],
      'Merchant Cash Advance': [
        ['$10K - $50K', '$50K - $100K', '$100K - $250K', '$250K+'],
        ['Within 24 hours', 'Within 1 week', 'Within 2 weeks', 'No rush'],
        ['Inventory', 'Marketing', 'Equipment', 'Working capital']
      ],
      'Lines of Credit': [
        ['Seasonal needs', 'Ongoing operations', 'Emergency backup', 'Growth opportunities'],
        ['$25K - $100K', '$100K - $250K', '$250K - $500K', '$500K+'],
        ['Daily', 'Weekly', 'Monthly', 'Occasionally']
      ],
      'Debt Consolidation': [
        ['2-3 debts', '4-6 debts', '7-10 debts', '10+ debts'],
        ['$25K - $100K', '$100K - $250K', '$250K - $500K', '$500K+'],
        ['Yes, all current', 'Most are current', 'Some behind', 'Struggling with payments']
      ],
      'SBA Loans': [
        ['Startup funding', 'Business expansion', 'Equipment purchase', 'Real estate acquisition'],
        ['Yes, ready', 'Almost ready', 'Need guidance', 'Not sure what\'s required'],
        ['$150K - $500K', '$500K - $1M', '$1M - $2M', '$2M+']
      ],
      'Equipment Financing': [
        ['New equipment', 'Used equipment', 'Both new and used', 'Not sure yet'],
        ['Manufacturing', 'Construction', 'Medical', 'Technology', 'Transportation', 'Other'],
        ['Yes, have quotes', 'Know what I need', 'Still researching', 'Need help choosing']
      ],
      'Invoice Factoring': [
        ['$50K - $200K', '$200K - $500K', '$500K - $1M', '$1M+'],
        ['Net 30', 'Net 60', 'Net 90', 'Varies'],
        ['Yes, strong credit', 'Mixed credit', 'Some concerns', 'Not sure']
      ],
      'P.O. Financing': [
        ['$50K - $250K', '$250K - $500K', '$500K - $1M', '$1M+'],
        ['Government agency', 'Large corporation', 'Established business', 'New customer'],
        ['30 days', '60 days', '90 days', '90+ days']
      ],
      'Credit Services': [
        ['Personal credit', 'Business credit', 'Both', 'Not sure'],
        ['Below 600', '600-650', '650-700', '700+'],
        ['Increase credit score', 'Remove negative items', 'Build business credit', 'General improvement']
      ],
      'Marketing': [
        ['SEO/Website', 'Social media', 'Google Ads', 'All digital marketing'],
        ['Under $2K', '$2K - $5K', '$5K - $10K', '$10K+'],
        ['Increase leads', 'Brand awareness', 'Online presence', 'Sales growth']
      ],
      'Card Processing': [
        ['Under $25K', '$25K - $100K', '$100K - $500K', '$500K+'],
        ['Switch processors', 'Set up new', 'Add services', 'Compare rates'],
        ['Online only', 'In-person only', 'Both', 'Mobile/events']
      ],
      'CRE Lending': [
        ['Office building', 'Retail space', 'Warehouse', 'Mixed use', 'Land'],
        ['Purchase', 'Refinance', 'Construction', 'Renovation'],
        ['$500K - $1M', '$1M - $3M', '$3M - $10M', '$10M+']
      ],
      'Mortgage Loans': [
        ['Primary residence', 'Investment property', 'Second home', 'Not sure'],
        ['Purchasing', 'Refinancing', 'Cash-out refi', 'HELOC'],
        ['$200K - $500K', '$500K - $1M', '$1M - $2M', '$2M+']
      ]
    };

    return options[product as keyof typeof options]?.[questionNumber - 1] || ['Yes', 'No', 'Maybe', 'Need more info'];
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
          'Term Loans', 'Merchant Cash Advance', 'Lines of Credit', 'Debt Consolidation',
          'SBA Loans', 'Equipment Financing', 'Invoice Factoring', 'P.O. Financing',
          'Credit Services', 'Marketing', 'Card Processing', 'CRE Lending', 'Mortgage Loans'
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
        
      case 'solution_q1':
      case 'solution_q2':
      case 'solution_q3':
        const questionNumber = chatState.step === 'solution_q1' ? 1 : chatState.step === 'solution_q2' ? 2 : 3;
        const responseKey = chatState.step === 'solution_q1' ? 'solutionQ1' : chatState.step === 'solution_q2' ? 'solutionQ2' : 'solutionQ3';
        const options = getSolutionOptions(chatState.responses.product || '', questionNumber);
        
        return (
          <div className="flex flex-col gap-2 mt-3">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleUserSelection(option, responseKey)}
                className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left"
              >
                {option}
              </button>
            ))}
          </div>
        );
      
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
            

          </div>
        </div>
      )}
    </>
  );
}