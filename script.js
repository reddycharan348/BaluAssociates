// Global variables 
let currentEditingIndex = -1; 

// Initialize EmailJS with your public key 
(function(){ 
    emailjs.init("ticqJg3yi_7s1Vmse"); // Your EmailJS public key 
})(); 

// Main functionality 
document.addEventListener('DOMContentLoaded', function() { 
    // Add page transition class 
    document.body.classList.add('page-load'); 
    
    // Trigger animations after short delay 
    setTimeout(() => { 
        document.body.classList.remove('page-load'); 
    }, 50); 
    
    // Viewer count logic 
    let viewerCount = localStorage.getItem('viewerCount'); 
    viewerCount = viewerCount ? parseInt(viewerCount) + 1 : 1; 
    localStorage.setItem('viewerCount', viewerCount); 

    // Form submission handling 
    const consultationForm = document.getElementById('consultationForm');
    if (consultationForm) {
        consultationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            const date = document.getElementById('date').value;
            
            // Prepare email parameters
            const templateParams = {
                from_name: fullName,
                from_email: email,
                phone: phone,
                service: service,
                date: date,
                to_email: 'baluassociates143@gmail.com' // Admin's email
            };
            
            // Send email using EmailJS with your credentials
            emailjs.send('service_2uda0ap', 'template_keddqvl', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    alert(`Thank you, ${fullName}! Your consultation request for ${service} on ${date} has been sent. We will contact you shortly at ${email} or ${phone}.`);
                    consultationForm.reset();
                }, function(error) {
                    console.log('FAILED...', error);
                    alert('Sorry, there was an error sending your request. Please try again later.');
                });
        });
    }

    // Mobile menu toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const mainNav = document.querySelector('.main-nav');

    if (mobileMenu && mainNav) {
        mobileMenu.addEventListener('click', function() {
            mainNav.classList.toggle('open');
        });

        // Close menu when a nav link is clicked
        mainNav.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                mainNav.classList.remove('open');
            });
        });
    }

    // GST Calculator Logic
    const amountInput = document.getElementById('amount');
    const gstRateSelect = document.getElementById('gst-rate');
    const calculateGstBtn = document.getElementById('calculate-gst');
    const resetGstBtn = document.getElementById('reset-gst');
    const gstAmountSpan = document.getElementById('gst-amount');
    const totalAmountSpan = document.getElementById('total-amount');

    if (calculateGstBtn) {
        calculateGstBtn.addEventListener('click', calculateGst);
    }

    if (resetGstBtn) {
        resetGstBtn.addEventListener('click', resetGst);
    }

    function calculateGst() {
        const amount = parseFloat(amountInput.value);
        const gstRate = parseFloat(gstRateSelect.value);

        if (isNaN(amount) || amount < 0) {
            alert("Please enter a valid amount.");
            return;
        }

        const gstAmount = amount * (gstRate / 100);
        const totalAmount = amount + gstAmount;

        gstAmountSpan.textContent = gstAmount.toFixed(2);
        totalAmountSpan.textContent = totalAmount.toFixed(2);
    }

    function resetGst() {
        amountInput.value = "0";
        gstRateSelect.value = "18"; // Default to 18%
        gstAmountSpan.textContent = "0.00";
        totalAmountSpan.textContent = "0.00";
    }
    
    // Review Form Submission
    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        // Star rating functionality
        const stars = document.querySelectorAll('.star');
        const ratingInput = document.getElementById('reviewRating');
        
        stars.forEach(star => {
            star.addEventListener('click', function() {
                const rating = this.getAttribute('data-rating');
                ratingInput.value = rating;
                
                // Update star appearance
                stars.forEach(s => {
                    if (s.getAttribute('data-rating') <= rating) {
                        s.classList.add('active');
                    } else {
                        s.classList.remove('active');
                    }
                });
            });
            
            // Hover effect
            star.addEventListener('mouseover', function() {
                const rating = this.getAttribute('data-rating');
                stars.forEach(s => {
                    if (s.getAttribute('data-rating') <= rating) {
                        s.style.color = '#ffc107';
                    }
                });
            });
            
            star.addEventListener('mouseout', function() {
                stars.forEach(s => {
                    if (!s.classList.contains('active')) {
                        s.style.color = '#ddd';
                    }
                });
            });
        });
        
        // Form submission
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('reviewerName').value;
            const email = document.getElementById('reviewerEmail').value;
            const rating = document.getElementById('reviewRating').value;
            const message = document.getElementById('reviewMessage').value;
            
            if (rating === '0') {
                alert('Please select a rating.');
                return;
            }
            
            // Prepare email parameters for review submission
            const templateParams = {
                from_name: name,
                from_email: email,
                rating: rating,
                message: message,
                to_email: 'baluassociates143@gmail.com' // Admin's email
            };
            
            // Send email using EmailJS
            emailjs.send('service_2uda0ap', 'template_keddqvl', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    alert(`Thank you, ${name}! Your review has been submitted successfully. We appreciate your feedback.`);
                    reviewForm.reset();
                    
                    // Reset star ratings
                    stars.forEach(s => {
                        s.classList.remove('active');
                        s.style.color = '#ddd';
                    });
                }, function(error) {
                    console.log('FAILED...', error);
                    alert('Sorry, there was an error submitting your review. Please try again later.');
                });
        });
    }
}); 

function getStatusColor(status) { 
    const colors = { 
        'Pending': '#ffd700', 
        'Upcoming': '#90EE90', 
        'Completed': '#6495ED', 
        'Cancelled': '#ff6961' 
    }; 
    return colors[status] || '#cccccc'; 
} 

// Add intersection observer for scroll animations 
const observer = new IntersectionObserver((entries) => { 
    entries.forEach(entry => { 
        if (entry.isIntersecting) { 
            entry.target.classList.add('visible'); 
        } 
    }); 
}, { threshold: 0.1 }); 

document.querySelectorAll('section').forEach(section => { 
    observer.observe(section); 
}); 

// Add mouse movement effects 
document.addEventListener('mousemove', (e) => { 
    const x = e.clientX / window.innerWidth; 
    const y = e.clientY / window.innerHeight; 
    
    document.documentElement.style.setProperty('--mouse-x', x); 
    document.documentElement.style.setProperty('--mouse-y', y); 
}); 

// Add floating animation to hero quick links 
document.addEventListener('DOMContentLoaded', function() { 
    const quickLinks = document.querySelectorAll('.hero-quick-links span'); 
    quickLinks.forEach((link, index) => { 
        link.style.setProperty('--delay', index); 
    }); 
    
    const statBoxes = document.querySelectorAll('.hero-stats .stat-box'); 
    statBoxes.forEach((box, index) => { 
        box.style.setProperty('--delay', index); 
    }); 
});