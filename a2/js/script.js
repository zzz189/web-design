// Loading Animation
document.addEventListener('DOMContentLoaded', () => {
    // Get loader elements
    const loaderWrapper = document.querySelector('.loader-wrapper');
    const body = document.body;

    // Function to hide loader
    const hideLoader = () => {
        loaderWrapper.classList.add('loader-hidden');
        body.classList.remove('loading');
    };

    // Hide loader when page is fully loaded
    window.addEventListener('load', () => {
        // Add a small delay to ensure smooth animation
        setTimeout(hideLoader, 500);
    });
});

// Top Button Functionality
document.addEventListener('DOMContentLoaded', () => {
    const topButton = document.getElementById('topButton');
    
    if (topButton) {
        // Show/hide top button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                topButton.style.display = 'block';
            } else {
                topButton.style.display = 'none';
            }
        });

        // Smooth scroll to top
        topButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// Form Validation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic form validation
        let isValid = true;
        const requiredFields = contactForm.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });

        if (isValid) {
            // Here you would typically send the form data to a server
            alert('表单提交成功！/ Form submitted successfully!');
            contactForm.reset();
        } else {
            alert('请填写所有必填字段 / Please fill in all required fields');
        }
    });
}

// Smooth scroll for navigation links (only for same-page navigation)
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Custom Modal function
function showCustomModal(message, title = 'Notice') {
    const modal = document.getElementById('customModal');
    const modalTitle = document.getElementById('customModalTitle');
    const modalMessage = document.getElementById('customModalMessage');
    const modalClose = document.getElementById('customModalClose');
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modal.style.display = 'flex';
    modalClose.focus();

    function closeModal() {
        modal.style.display = 'none';
        modalClose.removeEventListener('click', closeModal);
        document.removeEventListener('keydown', escListener);
    }
    function escListener(e) {
        if (e.key === 'Escape') closeModal();
    }
    modalClose.addEventListener('click', closeModal);
    document.addEventListener('keydown', escListener);
}

// Handle enrollment button clicks
document.querySelectorAll('.enroll-btn, .modern-enroll-btn').forEach(button => {
    button.addEventListener('click', function() {
        const courseName = this.closest('.course-card').querySelector('h3').textContent;
        const message = `Thank you for your interest in our ${courseName} course! Our team will contact you shortly with enrollment details.`;
        showCustomModal(message);
    });
});

// Handle direction button clicks
document.querySelectorAll('.direction-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent any default button behavior
        
        try {
            const mapPreview = this.closest('.location-card').querySelector('.map-preview');
            if (!mapPreview) {
                console.error('Map preview element not found');
                return;
            }
            
            const address = mapPreview.dataset.address;
            if (!address) {
                console.error('Address data not found');
                return;
            }
            
            const encodedAddress = encodeURIComponent(address);
            const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
            window.open(mapsUrl, '_blank');
        } catch (error) {
            console.error('Error opening directions:', error);
        }
    });
});

// Add hover effect to location cards
document.querySelectorAll('.location-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
    });
});

// Add active state to navigation links
document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === window.location.pathname.split('/').pop()) {
        link.classList.add('active');
    }
});