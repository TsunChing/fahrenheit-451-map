(function() {
    // Get elements
    const menuBtn = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const closeSidebarBtn = document.getElementById('closeSidebarBtn');
    
    // Function to open sidebar
    function openSidebar() {
        sidebar.classList.add('open');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // prevent background scrolling
    }
    
    // Function to close sidebar
    function closeSidebar() {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = ''; // restore scrolling
    }
    
    // Toggle open/close via button
    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        // if sidebar is open, close it; else open it
        if (sidebar.classList.contains('open')) {
            closeSidebar();
        } else {
            openSidebar();
        }
    });
    
    // Close via close button inside sidebar
    if (closeSidebarBtn) {
        closeSidebarBtn.addEventListener('click', closeSidebar);
    }
    
    // Close when clicking overlay background
    overlay.addEventListener('click', closeSidebar);
    
    // Close sidebar when a navigation link is clicked (smooth scroll + close)
    const allNavLinks = document.querySelectorAll('.sidebar-nav a');
    allNavLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            // Get the target section id from href (e.g., "#introduction")
            const targetId = link.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                event.preventDefault(); // prevent instant jump (we'll do smooth scroll)
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Close sidebar first (for good UX)
                    closeSidebar();
                    
                    // Smooth scroll to the element with offset for fixed header (if any)
                    const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                    const offset = 70; // because hamburger button is around 60px tall; adjust as needed
                    window.scrollTo({
                        top: elementPosition - offset,
                        behavior: 'smooth'
                    });
                    
                    // Update URL hash without causing jump (optional, but nice)
                    history.pushState(null, null, targetId);
                }
            } else {
                // If it's an external link or doesn't start with #, just close sidebar
                closeSidebar();
            }
        });
    });
    
    // Optional: Close sidebar if user presses Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('open')) {
            closeSidebar();
        }
    });
    
    // If any existing hash on page load, scroll into view after load (for direct deep linking)
    if (window.location.hash) {
        // slight delay to allow layout to finish
        setTimeout(() => {
            const targetElement = document.querySelector(window.location.hash);
            if (targetElement) {
                const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({
                    top: elementPosition - 70,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }
})();