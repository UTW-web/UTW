 // Smooth scroll for anchor links
 document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Reveal animations on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
});

document.querySelectorAll('.service-card').forEach((el) => {
    observer.observe(el);
});

// Form submission handling
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    
    try {
        const response = await fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            status.innerHTML = "Thanks for your message! I'll respond shortly.";
            status.classList.add('success');
            status.classList.remove('error');
            form.reset();
        } else {
            const errorData = await response.json();
            if (errorData.errors) {
                status.innerHTML = errorData.errors.map(error => error.message).join(', ');
            } else {
                status.innerHTML = "Oops! There was a problem submitting your form";
            }
            status.classList.add('error');
            status.classList.remove('success');
        }
    } catch (error) {
        status.innerHTML = "Oops! There was a problem submitting your form";
        status.classList.add('error');
        status.classList.remove('success');
    }
    
    status.style.display = 'block';
}
