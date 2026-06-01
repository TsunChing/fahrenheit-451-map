document.querySelectorAll('.random-location').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const locationsAttr = this.getAttribute('data-locations');
        if (locationsAttr) {
            const locations = locationsAttr.split(',').map(s => s.trim());
            const randomId = locations[Math.floor(Math.random() * locations.length)];
            const targetElement = document.getElementById(randomId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                console.warn('Element with id "' + randomId + '" not found');
            }
        }
    });
});