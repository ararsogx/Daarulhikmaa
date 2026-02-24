// ===== DARK MODE TOGGLE (SWITCH ICON) =====
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

// Check localStorage for saved theme
const savedTheme = localStorage.getItem('darkMode');
if (savedTheme === 'enabled') {
    document.body.classList.add('dark-mode');
    if (themeIcon) {
        themeIcon.classList.remove('fa-toggle-off');
        themeIcon.classList.add('fa-toggle-on');
    }
} else {
    // Ensure icon is off if dark mode not enabled
    if (themeIcon) {
        themeIcon.classList.remove('fa-toggle-on');
        themeIcon.classList.add('fa-toggle-off');
    }
}

// Toggle theme function
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    
    // Update icon
    if (themeIcon) {
        if (isDark) {
            themeIcon.classList.remove('fa-toggle-off');
            themeIcon.classList.add('fa-toggle-on');
        } else {
            themeIcon.classList.remove('fa-toggle-on');
            themeIcon.classList.add('fa-toggle-off');
        }
    }
    
    // Save preference
    localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
}

// Add event listener if toggle exists
if (themeToggle) {
    themeToggle.addEventListener('click', toggleDarkMode);
}

// Add event listener if toggle exists
if (themeToggle) {
    themeToggle.addEventListener('click', toggleDarkMode);
}
// ===== HEADER SCROLL EFFECT =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ===== MOBILE MENU TOGGLE =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('toggle');
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('toggle');
        });
    });
}

// ===== SCROLL REVEAL (Intersection Observer) =====
const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
});

fadeElements.forEach(el => observer.observe(el));

// ===== ANIMATED COUNTERS =====
const counters = document.querySelectorAll('.stat-number');
const speed = 200;

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = +counter.getAttribute('data-target');
            const updateCount = () => {
                const current = +counter.innerText.replace(/,/g, '');
                const increment = target / speed;
                if (current < target) {
                    counter.innerText = Math.ceil(current + increment).toLocaleString();
                    setTimeout(updateCount, 10);
                } else {
                    counter.innerText = target.toLocaleString();
                }
            };
            updateCount();
            counterObserver.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

// ===== TESTIMONIAL SLIDER =====
const track = document.querySelector('.testimonial-track');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;

function updateSlider(index) {
    if (!track) return;
    const width = track.parentElement.offsetWidth;
    track.style.transform = `translateX(-${index * width}px)`;
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        currentIndex = i;
        updateSlider(currentIndex);
    });
});

let autoSlide = setInterval(() => {
    if (!track) return;
    currentIndex = (currentIndex + 1) % dots.length;
    updateSlider(currentIndex);
}, 5000);

const slider = document.querySelector('.testimonial-slider');
if (slider) {
    slider.addEventListener('mouseenter', () => clearInterval(autoSlide));
    slider.addEventListener('mouseleave', () => {
        autoSlide = setInterval(() => {
            currentIndex = (currentIndex + 1) % dots.length;
            updateSlider(currentIndex);
        }, 5000);
    });
}

// ===== CONTACT FORM VALIDATION =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        const feedback = document.getElementById('form-feedback');

        if (name === '' || email === '' || message === '') {
            feedback.style.color = '#d14545';
            feedback.textContent = 'Please fill in all fields.';
        } else if (!isValidEmail(email)) {
            feedback.style.color = '#d14545';
            feedback.textContent = 'Please enter a valid email address.';
        } else {
            feedback.style.color = '#2e5d3a';
            feedback.textContent = 'Thank you! Your message has been sent (demo).';
            contactForm.reset();
            setTimeout(() => {
                feedback.textContent = '';
            }, 5000);
        }
    });
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ===== FLOATING SUPPORT BUTTON =====
const supportToggle = document.getElementById('supportToggle');
const supportOptions = document.getElementById('supportOptions');

if (supportToggle && supportOptions) {
    supportToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        supportOptions.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
        if (!supportToggle.contains(e.target) && !supportOptions.contains(e.target)) {
            supportOptions.classList.remove('show');
        }
    });
}

// ===== AI CHATBOT =====
const aiChatBtn = document.getElementById('aiChatBtn');
const chatModal = document.getElementById('chatModal');
const closeChat = document.getElementById('closeChat');
const chatBody = document.getElementById('chatBody');
const chatInput = document.getElementById('chatInput');
const sendChatBtn = document.getElementById('sendChatBtn');

// Knowledge base – answers are based strictly on website content
const knowledgeBase = [
    {
        keywords: ['education', 'program', 'scholarship', 'tutoring', 'after-school', 'stem', 'college'],
        answer: "Darul Hikma's Education program provides need-based scholarships, one-on-one tutoring, STEM workshops, and college application mentorship for youth in Fadis Woreda. We've supported over 1,500 students with a 95% graduation rate. You can apply via our Contact page."
    },
    {
        keywords: ['mission', 'purpose'],
        answer: "Our mission is to nurture the youth of Fadis Woreda, East Hararge, through quality education rooted in Islamic values, empowering them to become confident and contributing members of society."
    },
    {
        keywords: ['vision'],
        answer: "Our vision is a generation of educated, compassionate, and faithful Muslims from Fadis who lead their communities with wisdom and integrity."
    },
    {
        keywords: ['contact', 'phone', 'email', 'address', 'location', 'map'],
        answer: "You can reach us at: Fadis Woreda, East Hararge, Oromia, Ethiopia. Phone: +251 912 345 678. Email: info@darulhikma.org. Our contact page has a form and a map."
    },
    {
        keywords: ['volunteer', 'volunteering', 'help'],
        answer: "We welcome volunteers! Please fill out the volunteer form on our Contact page or call us directly."
    },
    {
        keywords: ['donate', 'donation', 'zakat', 'sadaqah', 'cbe', 'cbo', 'rammis', 'hijra', 'telebirr', 'ebirr'],
        answer: "You can donate via bank transfer or mobile money. Account details: CBE 1000134567890, CBO 2000234567890, Rammis Bank 4000456789012, Hijra Bank 3000345678901. Telebirr: dial *127# and enter merchant 1000123456. Ebirr: dial *123# and enter 1000123457. All funds support our education programs in Fadis."
    },
    {
        keywords: ['team', 'staff', 'founder', 'director'],
        answer: "Our team includes Dr. Ahmed Hassan (Founder & Director), Sr. Fatima Noor (Head of Education), and Br. Yusuf Ali (Youth Coordinator)."
    },
    {
        keywords: ['history', 'timeline', 'journey'],
        answer: "Darul Hikma was founded in 2010 by local educators. We launched our first tutoring program in 2013, started scholarships in 2017, and opened our community center in 2022."
    },
    {
        keywords: ['impact', 'stats', 'students', 'families'],
        answer: "We have supported over 1,500 students, aided 320 families, organized 45 youth programs, and distributed $50,000 in charity. Our education program has held 50 workshops and awarded $250,000 in scholarships."
    },
    {
        keywords: ['testimonial', 'success story'],
        answer: "Amina, a former scholarship recipient, says: 'Darul Hikma helped me continue my education. Now I'm a teacher giving back to my community.' Many families share similar stories of transformation."
    },
    {
        keywords: ['hello', 'hi', 'assalamu alaikum', 'salam'],
        answer: "Wa alaikum assalam! I'm the Darul Hikma assistant. I can answer questions about our education program, mission, contact info, donations, and more. How can I help you today?"
    }
];

const defaultAnswer = "I'm sorry, I didn't understand your question. You can ask about our education program, mission, contact details, donations, team, or how to volunteer in Fadis.";

function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message', sender);
    messageDiv.innerHTML = `<p>${text}</p>`;
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function getAnswer(userInput) {
    const lowerInput = userInput.toLowerCase();
    for (let item of knowledgeBase) {
        for (let keyword of item.keywords) {
            if (lowerInput.includes(keyword)) {
                return item.answer;
            }
        }
    }
    return defaultAnswer;
}

function sendMessage() {
    const message = chatInput.value.trim();
    if (message === '') return;

    addMessage(message, 'user');
    chatInput.value = '';

    setTimeout(() => {
        const answer = getAnswer(message);
        addMessage(answer, 'bot');
    }, 500);
}

if (sendChatBtn) {
    sendChatBtn.addEventListener('click', sendMessage);
}

if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    });
}

if (aiChatBtn && chatModal) {
    aiChatBtn.addEventListener('click', () => {
        chatModal.classList.add('show');
        if (supportOptions) supportOptions.classList.remove('show');
        chatInput.focus();
    });
}

if (closeChat && chatModal) {
    closeChat.addEventListener('click', () => {
        chatModal.classList.remove('show');
    });

    window.addEventListener('click', (e) => {
        if (e.target === chatModal) {
            chatModal.classList.remove('show');
        }
    });
}

// ===== PROGRAM FLIP CARDS =====
const programCards = document.querySelectorAll('.program-card');
programCards.forEach(card => {
    const detailBtn = card.querySelector('.program-detail-btn');
    const backBtn = card.querySelector('.program-back-btn');

    if (detailBtn) {
        detailBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            card.classList.add('flipped');
        });
    }

    if (backBtn) {
        backBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            card.classList.remove('flipped');
        });
    }
});

// ===== FAQ ACCORDION =====
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
        question.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    }
});

// ===== HAMBURGER ANIMATION CSS =====
const style = document.createElement('style');
style.textContent = `
    .hamburger.toggle span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    .hamburger.toggle span:nth-child(2) {
        opacity: 0;
    }
    .hamburger.toggle span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`;
document.head.appendChild(style);

// ===== BANK SELECTION MODAL (UPDATED) =====
const donateBtn = document.getElementById('donateNowBtn');
const bankModal = document.getElementById('bankModal');
const closeModal = document.querySelector('.close-modal');
const paymentGrid = document.getElementById('paymentGrid');
const paymentDetails = document.getElementById('paymentDetails');
const detailsContent = document.getElementById('detailsContent');
const backToGridBtn = document.getElementById('backToGridBtn');

// Payment methods data (CBE, CBO, Rammis, Hijra, Telebirr, Ebirr)
const paymentData = {
    cbe: {
        name: 'Commercial Bank of Ethiopia (CBE)',
        accountNumber: '1000134567890',
        accountHolder: 'Darul Hikma Charity Fund',
        ussd: '*847#',
        instructions: 'Dial *847# and follow the prompts to transfer to the above account. You can also use CBE Birr or mobile banking.'
    },
    cbo: {
        name: 'Cooperative Bank of Oromia (CBO)',
        accountNumber: '2000234567890',
        accountHolder: 'Darul Hikma Charity Fund',
        ussd: '*847#',
        instructions: 'Dial *847# and follow the prompts. Select "Transfer" and enter the account number.'
    },
    hijra: {
        name: 'Hijra Bank',
        accountNumber: '3000345678901',
        accountHolder: 'Darul Hikma Charity Fund',
        ussd: '*809#',
        instructions: 'Dial *809# and choose "Fund Transfer". Enter the account number to complete donation.'
    },
    rammis: {
        name: 'Rammis Bank',
        accountNumber: '4000456789012',
        accountHolder: 'Darul Hikma Charity Fund',
        ussd: '*808#',
        instructions: 'Use *808# to access mobile banking and transfer to the provided account.'
    },
    telebirr: {
        name: 'Telebirr',
        accountNumber: '1000123456',
        accountHolder: 'Darul Hikma',
        ussd: '*127#',
        instructions: 'Dial *127# and choose "Send Money". Enter the merchant account 1000123456. You will receive a confirmation SMS.'
    },
    ebirr: {
        name: 'Ebirr',
        accountNumber: '1000123457',
        accountHolder: 'Darul Hikma',
        ussd: '*123#',
        instructions: 'Dial *123# and select "Send Money". Enter the account number 1000123457 and the amount. Follow the prompts to complete.'
    }
};

function copyToClipboard(text, buttonElement) {
    navigator.clipboard.writeText(text).then(() => {
        const originalHTML = buttonElement.innerHTML;
        buttonElement.innerHTML = '<i class="fas fa-check"></i>';
        setTimeout(() => {
            buttonElement.innerHTML = originalHTML;
        }, 1500);
    }).catch(err => {
        alert('Failed to copy: ' + err);
    });
}

if (donateBtn && bankModal) {
    donateBtn.addEventListener('click', () => {
        bankModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        paymentGrid.style.display = 'block';
        paymentDetails.style.display = 'none';
    });

    const closeModalFunc = () => {
        bankModal.style.display = 'none';
        document.body.style.overflow = '';
    };

    if (closeModal) {
        closeModal.addEventListener('click', closeModalFunc);
    }

    window.addEventListener('click', (e) => {
        if (e.target === bankModal) {
            closeModalFunc();
        }
    });

    const bankItems = document.querySelectorAll('.bank-item');
    bankItems.forEach(item => {
        item.addEventListener('click', () => {
            const bankKey = item.getAttribute('data-bank');
            const data = paymentData[bankKey];
            if (!data) return;

            let detailsHtml = `
                <div class="details-card">
                    <h3>${data.name}</h3>
                    <div class="detail-row">
                        <i class="fas fa-user"></i>
                        <strong>Account Holder:</strong>
                        <span id="accountHolderText">${data.accountHolder}</span>
                        <button class="copy-btn" data-copy="${data.accountHolder}" title="Copy account holder name">
                            <i class="far fa-copy"></i>
                        </button>
                    </div>
                    <div class="detail-row">
                        <i class="fas fa-hashtag"></i>
                        <strong>Account Number:</strong>
                        <span id="accountNumberText">${data.accountNumber}</span>
                        <button class="copy-btn" data-copy="${data.accountNumber}" title="Copy account number">
                            <i class="far fa-copy"></i>
                        </button>
                    </div>
                    <div class="detail-row">
                        <i class="fas fa-info-circle"></i>
                        <strong>Instructions:</strong>
                    </div>
                    <div class="instruction-box">
                        ${data.instructions}
                    </div>
                    <button class="btn donate-now-large" data-ussd="${data.ussd}">
                        <i class="fas fa-phone-alt"></i> Donate Now (Dial ${data.ussd})
                    </button>
                    <p style="font-size:0.8rem; margin-top:0.5rem; color:#666;">Clicking the button will open your phone dialer with the USSD code. Follow the prompts to complete payment.</p>
                </div>
            `;

            detailsContent.innerHTML = detailsHtml;
            
            paymentGrid.style.display = 'none';
            paymentDetails.style.display = 'block';

            const copyButtons = document.querySelectorAll('.copy-btn');
            copyButtons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const text = btn.getAttribute('data-copy');
                    copyToClipboard(text, btn);
                });
            });

            const donateNowDetailBtn = document.querySelector('.donate-now-large');
            if (donateNowDetailBtn) {
                donateNowDetailBtn.addEventListener('click', (e) => {
                    const ussd = e.currentTarget.getAttribute('data-ussd');
                    window.location.href = `tel:${ussd}`;
                });
            }
        });
    });

    if (backToGridBtn) {
        backToGridBtn.addEventListener('click', () => {
            paymentGrid.style.display = 'block';
            paymentDetails.style.display = 'none';
        });
    }
}