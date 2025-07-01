import { useEffect } from "react";

export default function ChatWidgetIsolated() {
  useEffect(() => {
    // Only run if widget doesn't already exist
    if (document.getElementById('isolated-chat-widget')) return;

    // Create the widget with pure DOM/JS to avoid React re-renders
    const script = document.createElement('script');
    script.innerHTML = `
      (function() {
        if (document.getElementById('isolated-chat-widget')) return;
        
        let isVisible = false;
        let isOpen = false;
        
        // Create widget HTML
        const widgetHTML = \`
          <div id="isolated-chat-widget" style="
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 9999;
            font-family: system-ui, -apple-system, sans-serif;
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.3s ease-in-out;
          ">
            <!-- Chat Button -->
            <div id="chat-button" style="
              width: 60px;
              height: 60px;
              background: #85abe4;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              box-shadow: 0 4px 12px rgba(0,0,0,0.15);
              color: white;
              font-size: 24px;
            ">💬</div>
            
            <!-- Chat Window -->
            <div id="chat-window" style="
              position: absolute;
              bottom: 70px;
              right: 0;
              width: 350px;
              height: 450px;
              background: white;
              border-radius: 12px;
              box-shadow: 0 8px 32px rgba(0,0,0,0.12);
              display: none;
              flex-direction: column;
              overflow: hidden;
            ">
              <!-- Header -->
              <div style="
                background: #85abe4;
                color: white;
                padding: 16px;
                display: flex;
                justify-content: space-between;
                align-items: center;
              ">
                <div>
                  <div style="font-weight: 600;">FundTek Capital</div>
                  <div style="font-size: 12px; opacity: 0.9;">We're here to help!</div>
                </div>
                <button id="close-chat" style="
                  background: none;
                  border: none;
                  color: white;
                  font-size: 20px;
                  cursor: pointer;
                  padding: 4px;
                ">✕</button>
              </div>
              
              <!-- Messages -->
              <div id="chat-messages" style="
                flex: 1;
                padding: 16px;
                overflow-y: auto;
                background: #f8fafc;
              ">
                <div style="
                  background: white;
                  padding: 12px;
                  border-radius: 8px;
                  margin-bottom: 12px;
                  border-left: 3px solid #85abe4;
                ">
                  👋 Hi! I'm here to help you find the perfect financing solution for your business. What's your first name?
                </div>
              </div>
              
              <!-- Input -->
              <div style="
                padding: 16px;
                border-top: 1px solid #e2e8f0;
                background: white;
              ">
                <div style="display: flex; gap: 8px;">
                  <input id="chat-input" type="text" placeholder="Type your message..." style="
                    flex: 1;
                    padding: 10px;
                    border: 1px solid #d1d5db;
                    border-radius: 6px;
                    outline: none;
                  ">
                  <button id="send-message" style="
                    background: #85abe4;
                    color: white;
                    border: none;
                    padding: 10px 16px;
                    border-radius: 6px;
                    cursor: pointer;
                  ">Send</button>
                </div>
              </div>
            </div>
          </div>
        \`;
        
        // Add widget to page
        document.body.insertAdjacentHTML('beforeend', widgetHTML);
        
        // Get elements
        const widget = document.getElementById('isolated-chat-widget');
        const button = document.getElementById('chat-button');
        const window = document.getElementById('chat-window');
        const closeBtn = document.getElementById('close-chat');
        const input = document.getElementById('chat-input');
        const sendBtn = document.getElementById('send-message');
        const messages = document.getElementById('chat-messages');
        
        // Show widget after 2 seconds
        setTimeout(() => {
          if (sessionStorage.getItem('chatWidgetDismissed') !== 'true') {
            isVisible = true;
            widget.style.transform = 'translateY(0)';
            widget.style.opacity = '1';
            
            // Auto-open after appearing
            setTimeout(() => {
              isOpen = true;
              button.style.display = 'none';
              window.style.display = 'flex';
            }, 500);
          }
        }, 2000);
        
        // Button click handler
        button.addEventListener('click', () => {
          isOpen = true;
          button.style.display = 'none';
          window.style.display = 'flex';
        });
        
        // Close button handler
        closeBtn.addEventListener('click', () => {
          sessionStorage.setItem('chatWidgetDismissed', 'true');
          widget.style.transform = 'translateY(100px)';
          widget.style.opacity = '0';
          setTimeout(() => {
            widget.remove();
          }, 300);
        });
        
        // Send message handler
        function sendMessage() {
          const text = input.value.trim();
          if (text) {
            // Add user message
            messages.innerHTML += \`
              <div style="
                text-align: right;
                margin-bottom: 12px;
              ">
                <div style="
                  background: #85abe4;
                  color: white;
                  padding: 8px 12px;
                  border-radius: 8px;
                  display: inline-block;
                  max-width: 80%;
                ">
                  \${text}
                </div>
              </div>
            \`;
            
            input.value = '';
            messages.scrollTop = messages.scrollHeight;
            
            // Simple bot response
            setTimeout(() => {
              messages.innerHTML += \`
                <div style="
                  background: white;
                  padding: 12px;
                  border-radius: 8px;
                  margin-bottom: 12px;
                  border-left: 3px solid #85abe4;
                ">
                  Thanks! A specialist will contact you at <strong>(305) 307-4658</strong> within 1 hour.
                </div>
              \`;
              messages.scrollTop = messages.scrollHeight;
            }, 1000);
          }
        }
        
        sendBtn.addEventListener('click', sendMessage);
        input.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') sendMessage();
        });
        
      })();
    `;
    
    document.head.appendChild(script);
    
    return () => {
      const widget = document.getElementById('isolated-chat-widget');
      if (widget) widget.remove();
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  return null; // This component renders nothing in React
}