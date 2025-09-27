// Global variables 
let currentEditingIndex = -1; 

// Initialize EmailJS with your public key 
(function(){ 
    emailjs.init("af64TBfoEJrp350Rf"); // Your EmailJS public key 
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
            emailjs.send('service_flbkmk1', 'template_uxhpc1g', templateParams)
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