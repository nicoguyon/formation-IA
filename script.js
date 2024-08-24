// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    // Navigation fluide
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Carrousel d'images
    let currentSlide = 0;
    const slides = document.querySelectorAll('.formation-image');
    const prevButton = document.getElementById('prevSlide');
    const nextButton = document.getElementById('nextSlide');

    function showSlide(n) {
        slides.forEach(slide => slide.style.display = 'none');
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].style.display = 'block';
    }

    if (prevButton && nextButton) {
        nextButton.addEventListener('click', () => showSlide(currentSlide + 1));
        prevButton.addEventListener('click', () => showSlide(currentSlide - 1));
    }

    // Initialiser le carrousel
    showSlide(0);

    // Mode sombre
    const darkModeToggle = document.getElementById('darkModeToggle');

    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            darkModeToggle.textContent = 'Mode Clair';
            localStorage.setItem('darkMode', 'enabled');
        } else {
            darkModeToggle.textContent = 'Mode Sombre';
            localStorage.setItem('darkMode', 'disabled');
        }
    }

    // Vérifier la préférence de l'utilisateur au chargement de la page
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        if (darkModeToggle) {
            darkModeToggle.textContent = 'Mode Clair';
        }
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }

    // Filtrage des formations
    const levelFilter = document.getElementById('level-filter');

    function filterFormations() {
        const level = levelFilter.value;
        const rows = document.querySelectorAll('#formations table tbody tr');
        
        rows.forEach(row => {
            const rowLevel = row.children[2].textContent;
            if (level === 'all' || rowLevel === level) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    if (levelFilter) {
        levelFilter.addEventListener('change', filterFormations);
    }

    // Formulaire de contact
    const form = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (formMessage) {
                formMessage.textContent = "Envoi en cours...";
            }

            fetch(form.action, {
                method: form.method,
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Erreur dans la réponse du serveur');
                }
            })
            .then(data => {
                if (formMessage) {
                    formMessage.textContent = "Merci ! Votre message a été envoyé.";
                }
                form.reset();
            })
            .catch(error => {
                if (formMessage) {
                    formMessage.textContent = "Oops! Il y a eu un problème. Veuillez réessayer.";
                }
                console.error('Erreur:', error);
            });
        });
    }
});