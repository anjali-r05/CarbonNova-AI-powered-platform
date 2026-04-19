// Global Script for CarbonNova

// Ensure Chatbot exists on pages
function injectChatbot() {
    if(document.getElementById('ai-chatbot')) return;
    
    const botHtml = `
    <div id="ai-chatbot" class="ai-chatbot">
        <div class="chat-window" id="chat-window">
            <div class="chat-header">
                <i class="fas fa-brain text-cyan"></i>
                <span class="fw-bold">Nova AI Coach</span>
                <i class="fas fa-times" style="margin-left:auto; cursor:pointer;" onclick="toggleChat()"></i>
            </div>
            <div class="chat-body" id="chat-body">
                <div class="chat-message bot">
                    Hello! I'm Nova, your AI Carbon Coach. How can I help you reduce your emissions today?
                </div>
            </div>
            <div class="chat-input">
                <i class="fas fa-microphone" style="color:var(--text-muted); cursor:pointer;" title="Voice input mock"></i>
                <input type="text" id="chat-input-field" placeholder="Ask about eco habits...">
                <button onclick="sendMessage()"><i class="fas fa-paper-plane"></i></button>
            </div>
        </div>
        <div class="chat-btn" onclick="toggleChat()">
            <i class="fas fa-comment-dots"></i>
        </div>
    </div>
    `;
    document.body.insertAdjacentHTML('beforeend', botHtml);

    // Enter key support for chat
    document.getElementById('chat-input-field').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') sendMessage();
    });
}

function toggleChat() {
    const chatWin = document.getElementById('chat-window');
    chatWin.classList.toggle('active');
}

function sendMessage() {
    const input = document.getElementById('chat-input-field');
    const msg = input.value.trim();
    if(!msg) return;

    const chatBody = document.getElementById('chat-body');
    
    // User Message
    chatBody.insertAdjacentHTML('beforeend', `<div class="chat-message user">${msg}</div>`);
    input.value = '';
    
    // Scroll to bottom
    chatBody.scrollTop = chatBody.scrollHeight;

    // Simulate Typing
    setTimeout(() => {
        chatBody.insertAdjacentHTML('beforeend', `<div class="chat-message bot" id="typing-indicator">... typing ...</div>`);
        chatBody.scrollTop = chatBody.scrollHeight;
        
        setTimeout(() => {
            document.getElementById('typing-indicator').remove();
            let reply = getMockAIResponse(msg);
            chatBody.insertAdjacentHTML('beforeend', `<div class="chat-message bot">${reply}</div>`);
            chatBody.scrollTop = chatBody.scrollHeight;
        }, 1500);
    }, 500);
}

function getMockAIResponse(msg) {
    const lower = msg.toLowerCase();
    if(lower.includes('reduce') || lower.includes('emissions')) {
        return "Try replacing one car trip with cycling this week. It can save up to 2.5kg of CO2!";
    }
    if(lower.includes('score drop')) {
        return "Your score dropped because your electricity usage was 15% higher than average yesterday. Try unplugging standby devices.";
    }
    if(lower.includes('money') || lower.includes('save')) {
        return "Switching to LED bulbs can save both energy and reduce your electricity bill by 10% monthly.";
    }
    return "That's a great question! Stay tuned to your daily missions to learn more about sustainable living.";
}

// User State Initialization
function initUserState() {
    if (!localStorage.getItem('carbonNovaUser')) {
        localStorage.setItem('carbonNovaUser', 'Earth Guardian');
    }
    if (!localStorage.getItem('carbonNovaCoins')) {
        localStorage.setItem('carbonNovaCoins', '1250');
    }
    if (!localStorage.getItem('carbonNovaXP')) {
        localStorage.setItem('carbonNovaXP', '5400');
    }
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    initUserState();
    injectChatbot();
    
    // Auto-reveal elements on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
