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
// JavaScript
function checkVisibility() {
    const elements = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;
  
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      
      if (elementTop < windowHeight * 0.9) {
        element.classList.add('active');
      }
    });
  }
  
  // Initial check
  checkVisibility();
  
  // Listen for scroll events with debounce
  let isScrolling;
  window.addEventListener('scroll', () => {
    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(checkVisibility, 100);
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
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            status.innerHTML = "Thanks for your message! I'll respond shortly.";
            status.classList.add('success');
            status.classList.remove('error');
            form.reset();
        } else {
            const errorData = await response.json();
            status.innerHTML = errorData.errors 
                ? errorData.errors.map(error => error.message).join(', ') 
                : "Oops! There was a problem submitting your form";
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

/* Hamburger dropdown */
function myFunction() {
    var x = document.getElementById("myLinks");
    x.style.display = x.style.display === "block" ? "none" : "block";
}

// Cookie Consent Handling
document.addEventListener("DOMContentLoaded", function() {
    const banner = document.getElementById("cookie-banner");
    const modal = document.getElementById("cookie-modal");
    const manageBtn = document.getElementById("manage-cookies");
    const acceptAllBtn = document.getElementById("accept-all");
    const savePreferencesBtn = document.getElementById("save-preferences");

    const analyticsCheckbox = document.getElementById("analytics-cookies");
    const marketingCheckbox = document.getElementById("marketing-cookies");

    const savedPreferences = JSON.parse(localStorage.getItem("cookiePreferences")) || {};

    analyticsCheckbox.checked = savedPreferences.analytics || false;
    marketingCheckbox.checked = savedPreferences.marketing || false;

    if (savedPreferences.essential) {
        banner.style.display = "none";
        loadCookies();
    }

    manageBtn.addEventListener("click", function() {
        modal.style.display = "block";
    });

    acceptAllBtn.addEventListener("click", function() {
        savePreferences({ essential: true, analytics: true, marketing: true });
    });

    savePreferencesBtn.addEventListener("click", function () {
        savePreferences({
            essential: true,
            analytics: analyticsCheckbox.checked,
            marketing: marketingCheckbox.checked
        });
    });

    function savePreferences(preferences) {
        localStorage.setItem("cookiePreferences", JSON.stringify(preferences));
        banner.style.display = "none";
        modal.style.display = "none";  // Hide modal after saving preferences
        loadCookies();
    }

    function loadCookies() {
        const preferences = JSON.parse(localStorage.getItem("cookiePreferences")) || {};

        if (preferences.analytics) {
            loadGoogleAnalytics();
        }
        if (preferences.marketing) {
            loadMarketingScripts();
        }
    }

    function loadGoogleAnalytics() {
        console.log("Google Analytics Loaded!");

        const script = document.createElement("script");
        script.async = true;
        script.src = "https://www.googletagmanager.com/gtag/js?id=G-T3VV570ZD6";
        document.head.appendChild(script);

        script.onload = function () {
            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            window.gtag = gtag;

            gtag('js', new Date());
            gtag('config', 'G-T3VV570ZD6'); // Replace with your actual GA ID
        };
    }

    function loadMarketingScripts() {
        console.log("Marketing Scripts Loaded");
    }

    // Run cookie preferences check on page load
    loadCookies();
});
