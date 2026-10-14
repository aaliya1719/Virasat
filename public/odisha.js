// VIRASAT — Dedicated Odisha (Puri) Interactive Controller & AI Cultural Guide

const ODISHA_KNOWLEDGE = {
    'rath': "The Rath Yatra is the world's largest chariot festival where three massive wooden chariots — Nandighosh (Jagannath, 45 ft, 16 wheels), Taladhwaja (Balabhadra, 44 ft, 14 wheels), and Darpadalana (Subhadra, 43 ft, 12 wheels) — are built anew every year without blueprints or nails using 862 timber logs, pulled along the 2.5 km Grand Road by over a million pilgrims.",
    'chariot': "The three chariots are built annually by hereditary master craftsmen (Maharanas, Kamaras) starting on Akshaya Tritiya. Nandighosh has 16 wheels with red and yellow fabric; Taladhwaja has 14 wheels with red and green fabric; Darpadalana has 12 wheels with red and black fabric.",
    'temple': "The Shree Jagannath Temple in Puri is a 12th-century Kalinga architectural masterpiece rising 65 meters (214 ft). Built by Eastern Ganga King Chodaganga Deva and Anangabhima Deva III, it features the Vimana, Jagamohana, Natamandapa, Bhoga Mandapa, and 120+ inner shrines enclosed by the Meghnad Pacheri wall.",
    'food': "Puri's food is centered around sacred Mahaprasad cooked in the world's largest traditional kitchen (Roshaghara) with 752 hearths. Signature dishes include Dalma (lentils with raw vegetables), Kanika sweet rice, Pakhala Bhata (probiotic fermented rice), crisp Puri Khaja, and GI-tagged Odisha Rasagola offered during Niladri Bije.",
    'mahaprasad': "Mahaprasad is cooked in unglazed clay pots (kudua) stacked atop woodfire ovens in the temple Roshaghara. Once offered to Lord Jagannath and blessed by Goddess Vimala in her 9th-century shrine, it becomes Mahaprasad and is shared without caste or class discrimination in Anand Bazaar.",
    'pattachitra': "Odisha Pattachitra is a GI-tagged classical scroll painting tradition from Raghurajpur and Puri. Painted on cloth treated with tamarind seed paste and chalk powder, using 100% natural mineral pigments (Hingula, Haritala, Conch white, Lamp black) and fine mongoose/squirrel hair brushes, finished with glowing lac varnish.",
    'raghurajpur': "Raghurajpur is India's premier heritage craft village, 14 km from Puri, where ~140 households actively practice Pattachitra painting, Tala Pattachitra (palm-leaf engraving with iron styluses), wood carving, and Gotipua dance gurukuls.",
    'dance': "Odissi is one of India's eight classical dances, characterized by Tribhangi (three-bend posture) and Chauka. It evolved from ancient temple Maharis and Gotipua boys' acrobatics, revived globally in the 1950s by legends like Guru Kelucharan Mohapatra.",
    'odissi': "Odissi is defined by Tribhangi (three-bend posture), Chauka (square stance), lyrical abhinaya based on Jayadeva's Gita Govinda, and the intricate rhythm of the Mardala drum.",
    'tribal': "Lord Jagannath originated as 'Daru Brahma' (wooden pillar deity) worshipped by the Austroasiatic Sabara tribe under chieftain Viswavasu. The non-Brahmin Daitapati priests trace descent from Viswavasu and maintain exclusive ritual authority during Anavasara and Nabakalebara.",
    'sabara': "The Sabara (Saora) tribe's ancestral worship of Kitung / Daru Brahma forms the foundation of Lord Jagannath's iconography. Non-Brahmin Daitapatis continue this lineage as the Lord's intimate family servitors.",
    'rasagola': "Odisha Rasagola received GI Tag No. 612 in 2019, supported by historical evidence that the soft cottage cheese sweet has been offered to Goddess Lakshmi during Niladri Bije since at least the 12th–15th century, described in Balarama Das's 15th-century Odia Dandi Ramayana.",
    'nabakalebara': "Nabakalebara is the periodic renewal of the wooden deities occurring every 8 to 19 years when an extra month (Adhimasa) of Ashadha occurs. It involves a sacred search for neem trees (Banajaga Yatra), secret carving, and the midnight transfer of the mysterious life-force (Brahma Padartha).",
    'konark': "The Sun Temple at Konark, 35 km from Puri along the Marine Drive, is a 13th-century UNESCO World Heritage Site built by Ganga King Narasimhadeva I as a gigantic stone chariot for Surya with 24 carved stone wheels.",
    'pipili': "Pipili is famous for GI-tagged applique craft (Chandua) — bright colored fabrics stitched with mirrors into chariot canopies (chhatris), umbrellas, and temple banners.",
    'khandua': "Khandua Pata is the sacred Nuapatna silk Bandha textile woven with calligraphic verses of Jayadeva's Gita Govinda, draped on Lord Jagannath nightly during Badasinghara Besha.",
    'default': "Jai Jagannath! I'm Shrishti, your cultural guide for Odisha (Puri). Ask me about the 12th-century Jagannath Temple, Rath Yatra chariots, Pattachitra paintings, sacred Mahaprasad, or classical Odissi!"
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
            region_id: 'odisha',
            message: message,
            page_context: document.title || 'Odisha Cultural Archive'
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
            const fallbackReply = generateOdishaAIResponse(message);
            const guestSources = ["Odisha Tourism Development Corporation (OTDC)", "Archaeological Survey of India (ASI)"];
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
            addMessage(chatMessages, generateOdishaAIResponse(message), 'ai', ["Odisha Tourism Development Corporation (OTDC)"]);
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

function generateOdishaAIResponse(userMessage) {
    const lower = userMessage.toLowerCase();
    
    for (const [key, response] of Object.entries(ODISHA_KNOWLEDGE)) {
        if (key !== 'default' && lower.includes(key)) {
            return response;
        }
    }
    
    if (lower.includes('food') || lower.includes('dish') || lower.includes('eat') || lower.includes('cuisine') || lower.includes('sweet')) {
        return ODISHA_KNOWLEDGE['food'];
    }
    if (lower.includes('festival') || lower.includes('celebration') || lower.includes('yatra') || lower.includes('chandan') || lower.includes('snana')) {
        return ODISHA_KNOWLEDGE['rath'];
    }
    if (lower.includes('art') || lower.includes('craft') || lower.includes('painting') || lower.includes('scroll')) {
        return ODISHA_KNOWLEDGE['pattachitra'];
    }
    if (lower.includes('dance') || lower.includes('music') || lower.includes('song')) {
        return ODISHA_KNOWLEDGE['dance'];
    }
    if (lower.includes('temple') || lower.includes('monument') || lower.includes('place') || lower.includes('jagannath')) {
        return ODISHA_KNOWLEDGE['temple'];
    }
    
    return ODISHA_KNOWLEDGE['default'];
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
        btn.onclick = function() {
            const question = this.textContent.trim();
            if (chatInput && chatMessages) {
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
