// VIRASAT — Dedicated Maharashtra Interactive Controller & AI Cultural Guide

const MAHARASHTRA_KNOWLEDGE = {
    'wari': "The Pandharpur Wari is a 700-year-old pilgrimage where over a million Varkaris walk 250 km from Alandi and Dehu to Pandharpur over 21 days, carrying the sacred Padukas of saints Dnyaneshwar and Tukaram, singing Abhangs and erasing caste barriers.",
    'warli': "Warli painting is a GI-tagged tribal art from Palghar made with white rice paste on ochre/mud walls. It uses primal geometric forms — circles for the sun/moon, triangles for mountains/trees, and squares for sacred enclosures, depicting the famous spiral Tarpa dance.",
    'ganesh': "Ganesh Chaturthi was transformed into a massive 10-day public festival in 1893 by Lokmanya Bal Gangadhar Tilak in Pune to foster unity and nationalism. It features vibrant Dhol-Tasha pathaks, Modak sweets, and grand Visarjan processions.",
    'fort': "Maharashtra has over 300 historic forts built and fortified by Chhatrapati Shivaji Maharaj using guerrilla warfare strategy (Ganimi Kava). They are categorized into Girikot (hill forts like Raigad and Rajgad), Bhuikot (land forts), and Jalkot (sea forts like Sindhudurg and Murud-Janjira).",
    'caves': "Ajanta and Ellora Caves in Chhatrapati Sambhaji Nagar (Aurangabad) are UNESCO World Heritage Sites spanning 2nd century BCE to 10th century CE. Ajanta houses exquisite Buddhist frescoes, while Ellora features Cave 16 — the Kailasa Temple, the largest monolithic rock excavation in the world.",
    'food': "Maharashtra's cuisine features iconic street foods like Vada Pav and spicy Misal Pav, festival delicacies like Ukdiche Modak and Puran Poli, fiery Kolhapuri Tambda-Pandhra Rassa, and coastal seafood with refreshing Sol Kadhi.",
    'paithani': "The Paithani saree is a 2,000-year-old silk and zari weaving tradition from Paithan dating to the Satavahana era. Woven using the Kadiyal tapestry technique, it features iconic peacock (Bangadi-mor) and lotus motifs in pure gold zari.",
    'lavani': "Lavani is Maharashtra's high-energy traditional dance set to the 14-beat Dhadya rhythm of the Dholki. It has two forms: Nirguni (philosophical/spiritual) and Shringari (celebratory/erotic), traditionally performed in Nauvari (9-yard) sarees.",
    'default': "Namaskar! I'm Shrishti, your cultural guide for Maharashtra. Ask me about Maratha hill forts, Ajanta-Ellora caves, Warli painting, the Pandharpur Wari pilgrimage, or delicious Maharashtrian cuisine!"
};

function initPage() {
    initializeNavigation();
    initializeChatbot();
    initializeSuggestions();
    initializeScrollSpy();
    initializeMobileMenu();
    initializeCardHoverEffects();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPage);
} else {
    initPage();
}

// ==================== NAVIGATION FUNCTIONALITY ==================== //
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link, .nav-sublist a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    updateActiveNavItem(this);
                }
            }
        });
    });
}

function updateActiveNavItem(clickedLink) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    const parentNavItem = clickedLink.closest('.nav-item');
    if (parentNavItem) {
        parentNavItem.classList.add('active');
    }
}

// ==================== SCROLL SPY ==================== //
function initializeScrollSpy() {
    const sections = document.querySelectorAll('.content-section');
    const navItems = document.querySelectorAll('.nav-item');
    
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                
                navItems.forEach(item => {
                    item.classList.remove('active');
                    const link = item.querySelector(`a[href="#${sectionId}"]`);
                    if (link) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// ==================== CHATBOT FUNCTIONALITY ==================== //
let virasatSessionId = null;
let isChatSending = false;

function initializeChatbot() {
    const chatInput = document.querySelector('.chat-input');
    const sendBtn = document.querySelector('.send-btn');
    const chatMessages = document.querySelector('.chat-messages');
    
    if (sendBtn && chatInput && chatMessages) {
        if (sendBtn.__chatBound) return;
        sendBtn.__chatBound = true;

        sendBtn.addEventListener('click', function(e) {
            e.preventDefault();
            sendMessage(chatInput, chatMessages);
        });
        
        chatInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                sendMessage(chatInput, chatMessages);
            }
        });
    }
}

function showLoadingIndicator(container) {
    const loaderDiv = document.createElement('div');
    loaderDiv.className = 'chat-message ai-message chat-loading';
    loaderDiv.id = 'chatTypingIndicator';
    loaderDiv.innerHTML = `
        <div class="typing-indicator" aria-label="Shrishti is thinking...">
            <span></span><span></span><span></span>
        </div>
    `;
    container.appendChild(loaderDiv);
    container.scrollTop = container.scrollHeight;
    return loaderDiv;
}

function removeLoadingIndicator(container) {
    const loader = container.querySelector('#chatTypingIndicator');
    if (loader) loader.remove();
}

function formatMessageContent(text) {
    if (!text) return '';
    const escaped = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    // Bold **text**
    let formatted = escaped.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Italic *text*
    formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
    // Double newlines to paragraphs
    const paragraphs = formatted.split(/\n\n+/);
    return paragraphs.map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('');
}

function sendMessage(chatInput, chatMessages) {
    if (isChatSending) return;
    const message = (chatInput.value || '').trim();
    if (!message) return;

    isChatSending = true;
    addMessage(chatMessages, message, 'user');
    chatInput.value = '';
    chatInput.disabled = true;
    const sendBtn = document.querySelector('.send-btn');
    if (sendBtn) sendBtn.disabled = true;

    showLoadingIndicator(chatMessages);

    const chatApi = window.__virasatChat?.send;
    if (chatApi) {
        chatApi({
            session_id: virasatSessionId,
            region_id: 'maharashtra',
            message: message,
            page_context: document.title || 'Maharashtra Cultural Archive'
        })
        .then(response => {
            removeLoadingIndicator(chatMessages);
            if (response && response.session_id) {
                virasatSessionId = response.session_id;
            }
            addMessage(chatMessages, response.reply, 'ai', response.sources || []);
        })
        .catch(err => {
            console.warn('[Shrishti] API error, falling back to local archives:', err);
            removeLoadingIndicator(chatMessages);
            // Preserve guest chat flow or fallback when offline/unauthenticated
            const fallbackReply = generateMaharashtraAIResponse(message);
            const guestSources = ["Maharashtra Tourism Development Corporation (MTDC)", "Archaeological Survey of India (ASI)"];
            addMessage(chatMessages, fallbackReply, 'ai', guestSources);
        })
        .finally(() => {
            isChatSending = false;
            chatInput.disabled = false;
            if (sendBtn) sendBtn.disabled = false;
            chatInput.focus();
        });
    } else {
        setTimeout(function() {
            removeLoadingIndicator(chatMessages);
            addMessage(chatMessages, generateMaharashtraAIResponse(message), 'ai', ["Maharashtra Tourism Development Corporation (MTDC)"]);
            isChatSending = false;
            chatInput.disabled = false;
            if (sendBtn) sendBtn.disabled = false;
            chatInput.focus();
        }, 500);
    }
}

function addMessage(container, text, sender, sources = []) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}-message`;
    
    let contentHtml = (sender === 'user')
        ? `<p>${text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>`
        : formatMessageContent(text);
        
    if (sender === 'ai' && sources && Array.isArray(sources) && sources.length > 0) {
        const sourceTags = sources.map(s => `<span class="source-tag">${s.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</span>`).join('');
        contentHtml += `
            <div class="chat-sources">
                <span class="chat-sources-label"><i class="fas fa-landmark"></i> Sources:</span>
                ${sourceTags}
            </div>
        `;
    }
    
    messageDiv.innerHTML = contentHtml;
    container.appendChild(messageDiv);
    container.scrollTop = container.scrollHeight;
}

function generateMaharashtraAIResponse(userMessage) {
    const lower = userMessage.toLowerCase();
    
    for (const [key, response] of Object.entries(MAHARASHTRA_KNOWLEDGE)) {
        if (key !== 'default' && lower.includes(key)) {
            return response;
        }
    }
    
    if (lower.includes('food') || lower.includes('dish') || lower.includes('eat') || lower.includes('cuisine') || lower.includes('vada') || lower.includes('misal')) {
        return MAHARASHTRA_KNOWLEDGE['food'];
    }
    if (lower.includes('festival') || lower.includes('celebration') || lower.includes('ganesh')) {
        return MAHARASHTRA_KNOWLEDGE['ganesh'];
    }
    if (lower.includes('art') || lower.includes('craft') || lower.includes('painting') || lower.includes('warli')) {
        return MAHARASHTRA_KNOWLEDGE['warli'];
    }
    if (lower.includes('dance') || lower.includes('music') || lower.includes('lavani')) {
        return MAHARASHTRA_KNOWLEDGE['lavani'];
    }
    if (lower.includes('temple') || lower.includes('monument') || lower.includes('cave') || lower.includes('fort') || lower.includes('place')) {
        return MAHARASHTRA_KNOWLEDGE['fort'];
    }
    
    return MAHARASHTRA_KNOWLEDGE['default'];
}

// Add styles for chat messages dynamically matching Earthy India tokens
const chatStyles = document.createElement('style');
chatStyles.textContent = `
    .chat-message {
        margin-bottom: 0.8rem;
        padding: 0.75rem 0.9rem;
        border-radius: var(--radius-md, 12px);
        animation: fadeIn 0.4s ease-out;
    }
    .user-message {
        background: linear-gradient(135deg, var(--ei-olive-dark, #3E3A24) 0%, var(--ei-olive, #585334) 100%);
        color: #FFFFFF;
        margin-left: 1.5rem;
        border-bottom-right-radius: 3px;
        box-shadow: 0 2px 8px rgba(62, 58, 36, 0.2);
    }
    .ai-message {
        background: var(--ei-bg-cream-alt, #EEE0C8);
        color: var(--ei-brown, #4A2B13);
        margin-right: 1.5rem;
        border-bottom-left-radius: 3px;
        border-left: 3.5px solid var(--ei-terracotta, #97572C);
        box-shadow: var(--ei-shadow-sm, 0 2px 8px rgba(74, 43, 19, 0.1));
    }
    .chat-message p {
        margin: 0 0 0.4rem 0;
        font-size: 0.88rem;
        line-height: 1.6;
    }
    .chat-message p:last-child {
        margin-bottom: 0;
    }
    .chat-sources {
        margin-top: 0.55rem;
        padding-top: 0.45rem;
        border-top: 1px dashed rgba(74, 43, 19, 0.2);
        display: flex;
        flex-wrap: wrap;
        gap: 0.35rem;
        align-items: center;
    }
    .chat-sources-label {
        font-size: 0.72rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        opacity: 0.8;
        display: flex;
        align-items: center;
        gap: 0.25rem;
    }
    .source-tag {
        font-size: 0.7rem;
        background: rgba(151, 87, 44, 0.12);
        color: var(--ei-terracotta, #97572C);
        border: 1px solid rgba(151, 87, 44, 0.25);
        border-radius: 999px;
        padding: 0.15rem 0.5rem;
        font-weight: 500;
        display: inline-block;
    }
    .typing-indicator {
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        padding: 0.35rem 0.2rem;
    }
    .typing-indicator span {
        width: 7px;
        height: 7px;
        background: var(--ei-terracotta, #97572C);
        border-radius: 50%;
        animation: typingBounce 1.4s infinite ease-in-out both;
    }
    .typing-indicator span:nth-child(1) { animation-delay: -0.32s; }
    .typing-indicator span:nth-child(2) { animation-delay: -0.16s; }
    @keyframes typingBounce {
        0%, 80%, 100% { transform: scale(0.3); opacity: 0.3; }
        40% { transform: scale(1); opacity: 1; }
    }
`;
document.head.appendChild(chatStyles);

// ==================== SUGGESTION BUTTONS ==================== //
function initializeSuggestions() {
    const suggestionBtns = document.querySelectorAll('.suggestion-btn');
    const chatInput = document.querySelector('.chat-input');
    const chatMessages = document.querySelector('.chat-messages');
    
    suggestionBtns.forEach(btn => {
        btn.onclick = function(e) {
            e.preventDefault();
            const clone = this.cloneNode(true);
            clone.querySelectorAll('i').forEach(icon => icon.remove());
            const question = clone.textContent.trim();
            if (question && chatInput && chatMessages) {
                chatInput.value = question;
                sendMessage(chatInput, chatMessages);
            }
        };
    });
}

// ==================== MOBILE MENU ==================== //
function initializeMobileMenu() {
    let menuToggle = document.querySelector('.mobile-menu-toggle');
    const sidebar = document.querySelector('.cultural-sidebar');
    
    if (!menuToggle) {
        menuToggle = document.createElement('button');
        menuToggle.className = 'mobile-menu-toggle';
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        menuToggle.setAttribute('aria-label', 'Toggle Navigation');
        
        const mobileStyles = document.createElement('style');
        mobileStyles.textContent = `
            .mobile-menu-toggle {
                display: none;
                position: fixed;
                bottom: 1.5rem;
                right: 1.5rem;
                z-index: 1100;
                width: 52px;
                height: 52px;
                border-radius: 50%;
                background: linear-gradient(135deg, var(--ei-terracotta) 0%, var(--ei-ochre) 100%);
                color: #fff;
                border: none;
                box-shadow: 0 6px 20px rgba(151, 87, 44, 0.4);
                font-size: 1.25rem;
                cursor: pointer;
            }
            @media (max-width: 1150px) {
                .mobile-menu-toggle { display: flex; align-items: center; justify-content: center; }
            }
        `;
        document.head.appendChild(mobileStyles);
        document.body.appendChild(menuToggle);
    }
    
    if (sidebar) {
        menuToggle.onclick = function() {
            sidebar.classList.toggle('open');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.className = sidebar.classList.contains('open') ? 'fas fa-times' : 'fas fa-bars';
            }
        };
        
        document.querySelectorAll('.cultural-navigation a').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 1150) {
                    sidebar.classList.remove('open');
                    const icon = menuToggle.querySelector('i');
                    if (icon) icon.className = 'fas fa-bars';
                }
            });
        });
    }
}

// ==================== CARD HOVER EFFECTS ==================== //
function initializeCardHoverEffects() {
    const cards = document.querySelectorAll('.explore-card, .festival-card, .food-card, .craft-card, .monument-card, .practice-card');
    
    cards.forEach(card => {
        card.onmouseenter = function() {
            this.style.transition = 'transform 0.25s ease, box-shadow 0.25s ease';
        };
    });
}
