const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});


navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; 
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});


const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavigation);


function showItinerary(itineraryId, event) {
    const itineraryContents = document.querySelectorAll('.itinerary-content');
    itineraryContents.forEach(content => {
        content.classList.remove('active');
    });
    
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    const selectedContent = document.getElementById(itineraryId);
    if (selectedContent) {
        selectedContent.classList.add('active');
    }
    
    const clickedButton = event.target;
    if (clickedButton) {
        clickedButton.classList.add('active');
    }
}

window.showItinerary = showItinerary;


const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const subjectError = document.getElementById('subjectError');
const messageError = document.getElementById('messageError');
const formSuccess = document.getElementById('formSuccess');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateName() {
    const nameValue = nameInput.value.trim();
    
    if (nameValue === '') {
        showError(nameError, 'Name is required');
        return false;
    } else if (nameValue.length < 2) {
        showError(nameError, 'Name must be at least 2 characters');
        return false;
    } else {
        hideError(nameError);
        return true;
    }
}

function validateEmail() {
    const emailValue = emailInput.value.trim();
    
    if (emailValue === '') {
        showError(emailError, 'Email is required');
        return false;
    } else if (!emailRegex.test(emailValue)) {
        showError(emailError, 'Please enter a valid email address');
        return false;
    } else {
        hideError(emailError);
        return true;
    }
}

function validateSubject() {
    const subjectValue = subjectInput.value.trim();
    
    if (subjectValue === '') {
        showError(subjectError, 'Subject is required');
        return false;
    } else if (subjectValue.length < 3) {
        showError(subjectError, 'Subject must be at least 3 characters');
        return false;
    } else {
        hideError(subjectError);
        return true;
    }
}

function validateMessage() {
    const messageValue = messageInput.value.trim();
    
    if (messageValue === '') {
        showError(messageError, 'Message is required');
        return false;
    } else if (messageValue.length < 10) {
        showError(messageError, 'Message must be at least 10 characters');
        return false;
    } else {
        hideError(messageError);
        return true;
    }
}

function showError(element, message) {
    element.textContent = message;
    element.classList.add('show');
}

function hideError(element) {
    element.textContent = '';
    element.classList.remove('show');
}

nameInput.addEventListener('blur', validateName);
emailInput.addEventListener('blur', validateEmail);
subjectInput.addEventListener('blur', validateSubject);
messageInput.addEventListener('blur', validateMessage);

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isSubjectValid = validateSubject();
    const isMessageValid = validateMessage();
    
    if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
        hideError(nameError);
        hideError(emailError);
        hideError(subjectError);
        hideError(messageError);
        
        formSuccess.textContent = '✓ Thank you for your message! We will get back to you within 24 hours.';
        formSuccess.classList.add('show');
        
        contactForm.reset();
        
        setTimeout(() => {
            formSuccess.classList.remove('show');
        }, 5000);
        
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
       
        formSuccess.classList.remove('show');
    }
});


function revealOnScroll() {
    const cards = document.querySelectorAll('.highlight-card, .attraction-card, .stay-card, .dish-item, .experience-item');
    
    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        if (cardTop < windowHeight - revealPoint) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.highlight-card, .attraction-card, .stay-card, .dish-item, .experience-item');
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    revealOnScroll();
});

window.addEventListener('scroll', revealOnScroll);


window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;
    
    if (hero) {
        hero.style.backgroundPositionY = `${scrolled * parallaxSpeed}px`;
    }
});


document.addEventListener('DOMContentLoaded', () => {
    console.log('Berat Tourism Website Loaded Successfully!');
    
    const firstItinerary = document.getElementById('day1');
    if (firstItinerary) {
        firstItinerary.classList.add('active');
    }
    highlightNavigation();
});

const scrollTopButton = document.createElement('button');
scrollTopButton.innerHTML = '↑';
scrollTopButton.setAttribute('aria-label', 'Scroll to top');
scrollTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: var(--accent-color);
    color: white;
    font-size: 24px;
    border: none;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

document.body.appendChild(scrollTopButton);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopButton.style.opacity = '1';
        scrollTopButton.style.visibility = 'visible';
    } else {
        scrollTopButton.style.opacity = '0';
        scrollTopButton.style.visibility = 'hidden';
    }
});

scrollTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopButton.addEventListener('mouseenter', () => {
    scrollTopButton.style.transform = 'scale(1.1)';
});

scrollTopButton.addEventListener('mouseleave', () => {
    scrollTopButton.style.transform = 'scale(1)';
});

function openMap(location) {
    const encodedLocation = encodeURIComponent(location);
    window.open(
        `https://www.google.com/maps?q=${encodedLocation}`,
        "_blank"
    );
}

