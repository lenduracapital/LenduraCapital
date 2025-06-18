// Chat Widget External JavaScript - CSP Compliant
(function() {
    'use strict';

    // Chat widget state
    let chatState = {
        isOpen: false,
        step: 'initial',
        responses: {}
    };

    // Initialize widget after 3 seconds
    function initializeWidget() {
        setTimeout(() => {
            const chatWidget = document.getElementById('chatWidget');
            if (chatWidget) {
                chatWidget.style.display = 'block';
                chatWidget.classList.add('slide-up-enter');
            }
        }, 3000);
    }

    // Toggle chat window
    function toggleChat() {
        const chatWindow = document.getElementById('chatWindow');
        const chatToggle = document.getElementById('chatToggle');
        
        chatState.isOpen = !chatState.isOpen;
        
        if (chatState.isOpen) {
            chatWindow.classList.remove('closed');
            chatWindow.classList.add('open');
            chatToggle.style.opacity = '0';
            chatToggle.style.pointerEvents = 'none';
            
            // Initialize chat if first time opening
            if (chatState.step === 'initial') {
                initializeChat();
            }
        } else {
            chatWindow.classList.remove('open');
            chatWindow.classList.add('closed');
            chatToggle.style.opacity = '1';
            chatToggle.style.pointerEvents = 'auto';
        }
    }

    // Initialize chat with welcome message
    function initializeChat() {
        const welcomeMessage = "Hi there! Looking to speak to a FundTek representative? I can help! Let us know what kind of support you are looking for and I will route your chat to the appropriate department!";
        
        addMessage(welcomeMessage, 'bot');
        
        setTimeout(() => {
            showOptions([
                "I am a business looking for financing"
            ]);
        }, 1000);
    }

    // Add message to chat
    function addMessage(text, sender) {
        const messagesContainer = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        const bubbleDiv = document.createElement('div');
        bubbleDiv.className = 'message-bubble';
        bubbleDiv.textContent = text;
        
        messageDiv.appendChild(bubbleDiv);
        messagesContainer.appendChild(messageDiv);
        
        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Show typing indicator
    function showTyping() {
        const messagesContainer = document.getElementById('chatMessages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot';
        typingDiv.id = 'typingIndicator';
        
        const bubbleDiv = document.createElement('div');
        bubbleDiv.className = 'message-bubble';
        
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'typing-indicator';
        typingIndicator.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
        
        bubbleDiv.appendChild(typingIndicator);
        typingDiv.appendChild(bubbleDiv);
        messagesContainer.appendChild(typingDiv);
        
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Remove typing indicator
    function removeTyping() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    // Show option buttons
    function showOptions(options) {
        const optionsContainer = document.getElementById('chatOptions');
        optionsContainer.innerHTML = '';
        
        options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'option-button';
            button.textContent = option;
            button.addEventListener('click', () => handleOptionClick(option));
            optionsContainer.appendChild(button);
        });
    }

    // Handle option click
    function handleOptionClick(option) {
        // Add user's response
        addMessage(option, 'user');
        
        // Clear options
        document.getElementById('chatOptions').innerHTML = '';
        
        // Show typing indicator
        showTyping();
        
        // Process response after delay
        setTimeout(() => {
            removeTyping();
            processUserResponse(option);
        }, 1500);
    }

    // Process user response and advance conversation
    function processUserResponse(response) {
        switch (chatState.step) {
            case 'initial':
                if (response === "I am a business looking for financing") {
                    chatState.responses.userType = response;
                    chatState.step = 'timeline';
                    addMessage("Great! What's your ideal funding timeline?", 'bot');
                    setTimeout(() => {
                        showOptions(['ASAP', '1-2 weeks', 'Longer']);
                    }, 500);
                }
                break;
                
            case 'timeline':
                chatState.responses.timeline = response;
                chatState.step = 'product';
                addMessage("Which product interests you most?", 'bot');
                setTimeout(() => {
                    showOptions(['Term loan', 'Line of credit', 'Consolidation']);
                }, 500);
                break;
                
            case 'product':
                chatState.responses.product = response;
                chatState.step = 'revenue';
                addMessage("What's your monthly revenue range?", 'bot');
                setTimeout(() => {
                    showOptions(['<$50K', '$50K-$200K', '>$200K']);
                }, 500);
                break;
                
            case 'revenue':
                chatState.responses.revenue = response;
                chatState.step = 'complete';
                addMessage("Perfect! I'm connecting you with one of our funding specialists who will reach out shortly. Thank you for your interest in FundTek Capital Group!", 'bot');
                
                // Send data to backend
                sendChatData();
                break;
        }
    }

    // Send chat data to backend
    async function sendChatData() {
        try {
            const chatData = {
                timestamp: new Date().toISOString(),
                userType: chatState.responses.userType,
                timeline: chatState.responses.timeline,
                product: chatState.responses.product,
                revenue: chatState.responses.revenue,
                source: 'Chat Widget'
            };

            const response = await fetch('/api/chat-submissions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(chatData)
            });

            if (!response.ok) {
                // Silent failure for production
            }
        } catch (error) {
            // Silent failure for production
        }
    }

    // Close chat when clicking outside
    function handleOutsideClick(event) {
        const chatWidget = document.getElementById('chatWidget');
        const chatWindow = document.getElementById('chatWindow');
        const chatToggle = document.getElementById('chatToggle');
        
        if (chatState.isOpen && chatWidget && 
            !chatWindow.contains(event.target) && 
            !chatToggle.contains(event.target)) {
            toggleChat();
        }
    }

    // Keyboard accessibility
    function handleKeydown(event) {
        if (event.key === 'Escape' && chatState.isOpen) {
            toggleChat();
        }
    }

    // Initialize event listeners when DOM is ready
    function initializeEventListeners() {
        // Toggle button click
        const chatToggle = document.getElementById('chatToggle');
        const chatClose = document.querySelector('.chat-close');
        
        if (chatToggle) {
            chatToggle.addEventListener('click', toggleChat);
        }
        
        if (chatClose) {
            chatClose.addEventListener('click', toggleChat);
        }

        // Outside click and keyboard handlers
        document.addEventListener('click', handleOutsideClick);
        document.addEventListener('keydown', handleKeydown);
    }

    // Initialize when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initializeEventListeners();
            initializeWidget();
        });
    } else {
        initializeEventListeners();
        initializeWidget();
    }

    // Make toggleChat available globally for HTML compatibility
    window.toggleChat = toggleChat;
})();