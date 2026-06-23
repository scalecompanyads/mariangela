document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Sticky Header ---
    const header = document.querySelector('.header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check on load
    
    
    // --- 2. FAQ Accordion ---
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isActive = header.classList.contains('active');
            const parentItem = header.parentElement;
            
            // Close all other accordion items first
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== header) {
                    otherHeader.classList.remove('active');
                    otherHeader.parentElement.classList.remove('active');
                    otherHeader.nextElementSibling.style.maxHeight = null;
                }
            });
            
            // Toggle active state for current clicked item
            if (isActive) {
                header.classList.remove('active');
                parentItem.classList.remove('active');
                content.style.maxHeight = null;
            } else {
                header.classList.add('active');
                parentItem.classList.add('active');
                // Set max-height to scrollHeight to animate smooth expansion
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });
    
    
    // --- 3. Scroll Reveal Animations (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.fade-up, .fade-in, .scale-up, .fade-in-left, .fade-in-right');
    
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null, // Viewport
            rootMargin: '0px',
            threshold: 0.15 // Trigger when 15% of the element is visible
        };
        
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Stop observing once animated
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        revealElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        // Fallback for browsers that do not support IntersectionObserver
        revealElements.forEach(element => {
            element.classList.add('visible');
        });
    }
});
