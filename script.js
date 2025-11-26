const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            const targetNumber = parseInt(element.textContent.replace(/,/g, ''));
            animateNumber(element, targetNumber);
            observer.unobserve(element);
        }
    });
}, observerOptions);

function animateNumber(element, targetNumber) {
    let currentNumber = 0;
    const duration = 2000; //2 seconds
    const startTime = Date.now();
    
    const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        
        currentNumber = targetNumber * easeProgress;
        element.textContent = Math.floor(currentNumber).toLocaleString('en-US');
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    };
    
    animate();
}

document.addEventListener('DOMContentLoaded', () => {
    observer.observe(document.querySelector('.cycle'));
    observer.observe(document.querySelector('.year'));
});

// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    // Form submit event
    contactForm.addEventListener('submit', function(e) {
        // Prevent page reload
        e.preventDefault();

        // Collect form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Basic validation
        if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
            showMessage('Please fill all the spaces!', 'error');
            return;
        }

        // Email format validation
        if (!isValidEmail(email)) {
            showMessage('Invalid email!', 'error');
            return;
        }

        // Send success message
        showMessage(`Thank you ${name}! Your message has been sent, I will try respond as soon as I can!`, 'success');

        // Clear form
        contactForm.reset();

        // Close the message after 5 seconds
        setTimeout(function() {
            formMessage.style.display = 'none';
        }, 5000);
    });

    // Message display function
    function showMessage(text, type) {
        formMessage.textContent = text;
        formMessage.className = 'form-message ' + type;
        formMessage.style.display = 'block';
    }

    // Email validation function
    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});