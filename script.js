// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('flex');
        });
        
        // Close menu when a link is clicked
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
            });
        });
    }
    
    // Dark mode toggle initialization
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleBtnMobile = document.getElementById('theme-toggle-mobile');
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
    const themeToggleDarkIconMobile = document.getElementById('theme-toggle-dark-icon-mobile');
    const themeToggleLightIconMobile = document.getElementById('theme-toggle-light-icon-mobile');

    // Function to update all icons based on current theme
    function updateIcons(isDark) {
        // Update desktop icons
        if (themeToggleDarkIcon && themeToggleLightIcon) {
            themeToggleDarkIcon.classList.toggle('hidden', isDark);
            themeToggleLightIcon.classList.toggle('hidden', !isDark);
        }
        
        // Update mobile icons
        if (themeToggleDarkIconMobile && themeToggleLightIconMobile) {
            themeToggleDarkIconMobile.classList.toggle('hidden', isDark);
            themeToggleLightIconMobile.classList.toggle('hidden', !isDark);
        }
    }

    // Initialize icons based on current theme and system preferences
    if (localStorage.getItem('color-theme') === 'dark' || 
       (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        updateIcons(true);
    } else {
        document.documentElement.classList.remove('dark');
        updateIcons(false);
    }

    // Function to toggle theme
    function toggleTheme() {
        const isDark = document.documentElement.classList.contains('dark');
        
        // Toggle dark class
        document.documentElement.classList.toggle('dark');
        
        // Update localStorage
        localStorage.setItem('color-theme', isDark ? 'light' : 'dark');
        
        // Update icons
        updateIcons(!isDark);
    }

    // Add click handlers to both buttons
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }
    
    if (themeToggleBtnMobile) {
        themeToggleBtnMobile.addEventListener('click', toggleTheme);
    }

    // Contact Form Submission Handler
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            const formData = new FormData(contactForm);
            const formValues = {};
            for (let [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            // In a real project, you would send this data to a server
            console.log('Form data:', formValues);
            
            // Show success message
            const successMsg = document.getElementById('form-success');
            if (successMsg) {
                successMsg.classList.remove('hidden');
                setTimeout(() => {
                    successMsg.classList.add('hidden');
                }, 5000);
            }
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Smooth scrolling for anchor links
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // If we're linking to a section (not just "#")
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Get height of fixed header for offset
                    const header = document.querySelector('header');
                    const headerHeight = header ? header.offsetHeight : 0;
                    
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Set active link based on current section
    const setActiveLink = () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const scrollPosition = window.scrollY;
            
            // Get header height for offset
            const header = document.querySelector('header');
            const headerHeight = header ? header.offsetHeight : 0;
            
            if (scrollPosition >= sectionTop - headerHeight - 100 && 
                scrollPosition < sectionTop + sectionHeight - headerHeight) {
                currentSectionId = `#${section.getAttribute('id')}`;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('text-blue-600', 'font-semibold', 'dark:text-blue-400');
            link.classList.add('text-gray-600', 'dark:text-gray-300');
            
            if (link.getAttribute('href') === currentSectionId) {
                link.classList.remove('text-gray-600', 'dark:text-gray-300');
                link.classList.add('text-blue-600', 'font-semibold', 'dark:text-blue-400');
            }
        });
    };
    
    // Animate elements when they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('is-visible');
            }
        });
    };
    
    // Initialize active link and animations
    setActiveLink();
    animateOnScroll();
    
    // Update on scroll
    window.addEventListener('scroll', () => {
        setActiveLink();
        animateOnScroll();
    });
}); 