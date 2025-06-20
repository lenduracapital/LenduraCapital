import { useState, useEffect } from 'react';
import { Send, Users, MessageCircle, X } from 'lucide-react';

interface AdminMessage {
  id: string;
  text: string;
  timestamp: Date;
  chatId: string;
}

interface ActiveChat {
  id: string;
  customerName?: string;
  status: 'bot' | 'connecting' | 'live';
  lastMessage: string;
  timestamp: Date;
  responses: {
    userType?: string;
    timeline?: string;
    product?: string;
    revenue?: string;
  };
}

export default function ChatAdmin() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeChats, setActiveChats] = useState<ActiveChat[]>([]);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [adminMessage, setAdminMessage] = useState('');
  const [messages, setMessages] = useState<AdminMessage[]>([]);
  const [hasNewChats, setHasNewChats] = useState(false);
  const [lastChatCount, setLastChatCount] = useState(0);

  // Check for active chats and detect new ones
  useEffect(() => {
    const interval = setInterval(() => {
      const waitingChats = JSON.parse(localStorage.getItem('waitingChats') || '[]');
      
      // Check if there are new chats
      if (waitingChats.length > lastChatCount) {
        setHasNewChats(true);
        // Play notification sound
        try {
          const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmIZBzqIzfTWfy0EKXzK7+ONOSH0j5Qp');
          audio.volume = 0.3;
          audio.play().catch(() => {}); // Ignore errors if audio fails
        } catch (e) {
          // Fallback: use visual notification only
        }
        
        // Show desktop notification if permission granted
        if (Notification.permission === 'granted') {
          new Notification('New Chat Request', {
            body: 'A customer is waiting to speak with a specialist',
            icon: '/favicon.svg'
          });
        } else if (Notification.permission !== 'denied') {
          Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
              new Notification('New Chat Request', {
                body: 'A customer is waiting to speak with a specialist',
                icon: '/favicon.svg'
              });
            }
          });
        }
      }
      
      setActiveChats(waitingChats);
      setLastChatCount(waitingChats.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [lastChatCount]);

  const handleSendMessage = () => {
    if (adminMessage.trim() && selectedChat) {
      const newMessage: AdminMessage = {
        id: Date.now().toString(),
        text: adminMessage,
        timestamp: new Date(),
        chatId: selectedChat
      };
      
      setMessages(prev => [...prev, newMessage]);
      
      // Send to the actual chat widget
      window.postMessage({
        type: 'ADMIN_MESSAGE',
        chatId: selectedChat,
        message: adminMessage
      }, '*');
      
      setAdminMessage('');
    }
  };

  const takeOverChat = (chatId: string) => {
    setSelectedChat(chatId);
    // Notify the chat widget that admin is taking over
    window.postMessage({
      type: 'ADMIN_TAKEOVER',
      chatId: chatId
    }, '*');
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-lg z-50 transition-colors"
        title="Chat Admin"
      >
        <Users className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 w-96 h-[500px] bg-white border shadow-xl rounded-lg z-50 flex flex-col">
      {/* Header */}
      <div className="bg-red-600 text-white p-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          <span className="font-medium">Chat Admin</span>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white hover:bg-red-700 p-1 rounded"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 flex">
        {/* Chat List */}
        <div className="w-1/2 border-r">
          <div className="p-3 border-b bg-gray-50">
            <h3 className="font-medium text-sm">Active Chats ({activeChats.length})</h3>
          </div>
          <div className="overflow-y-auto h-full">
            {activeChats.length === 0 ? (
              <div className="p-4 text-center text-gray-500 text-sm">
                No active chats
              </div>
            ) : (
              activeChats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => takeOverChat(chat.id)}
                  className={`p-3 border-b cursor-pointer hover:bg-gray-50 ${
                    selectedChat === chat.id ? 'bg-blue-50 border-blue-200' : ''
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <MessageCircle className="w-4 h-4 text-gray-400" />
                    <span className="font-medium text-sm">
                      {chat.customerName || `Customer ${chat.id.slice(-4)}`}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mb-1">
                    {chat.responses.product} • {chat.responses.revenue}
                  </div>
                  <div className="text-xs text-gray-400">
                    {chat.timestamp.toLocaleTimeString()}
                  </div>
                  {chat.status === 'connecting' && (
                    <div className="text-xs text-orange-600 font-medium mt-1">
                      🔄 Waiting for specialist
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Chat Interface */}
        <div className="w-1/2 flex flex-col">
          {selectedChat ? (
            <>
              <div className="p-3 border-b bg-gray-50">
                <h3 className="font-medium text-sm">Specialist Chat</h3>
              </div>
              
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-3">
                {messages
                  .filter(msg => msg.chatId === selectedChat)
                  .map((message) => (
                    <div key={message.id} className="mb-3">
                      <div className="bg-blue-100 text-blue-800 p-2 rounded text-sm">
                        {message.text}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  ))}
              </div>
              
              {/* Input */}
              <div className="p-3 border-t">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={adminMessage}
                    onChange={(e) => setAdminMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type as specialist..."
                    className="flex-1 px-3 py-2 border rounded text-sm focus:outline-none focus:border-blue-300"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500 text-sm">
              Select a chat to respond
            </div>
          )}
        </div>
      </div>
    </div>
  );
}