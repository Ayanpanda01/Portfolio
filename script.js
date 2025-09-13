document.addEventListener('DOMContentLoaded', function () {
    const typingElement = document.querySelector('.hero .typing');

    // Hero Section Entry Animation
    const heroElements = document.querySelectorAll('.hero h1, .hero .tagline, .hero .btn');
    heroElements.forEach((el, index) => {
        // Start animation after the typing effect begins
        setTimeout(() => {
            el.classList.add('visible');
        }, 500 + index * 200);
    });

    if (typingElement) {
        const words = ["Ayan", "a React Developer", "a Web Developer", "a Coder"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const typeSpeed = 150;
        const deleteSpeed = 75;
        const delayBetweenWords = 2000;

        function typeEffect() {
            const currentWord = words[wordIndex];

            // Logic for typing or deleting
            if (isDeleting) {
                typingElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let timeout = isDeleting ? deleteSpeed : typeSpeed;

            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                timeout = delayBetweenWords; // Pause before deleting
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                timeout = 500; // Pause before typing next word
            }

            setTimeout(typeEffect, timeout);
        }
        setTimeout(typeEffect, typeSpeed);
    }

    // Hamburger Menu Logic
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            hamburger.classList.toggle('active');
        });

        // Close menu when a link is clicked
        document.querySelectorAll('.nav-links li a').forEach(link => {
            link.addEventListener('click', () => {
                // Only remove classes if the menu is active
                navLinks.classList.remove('nav-active');
                hamburger.classList.remove('active');
            });
        });
    }

    // Navbar show/hide on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;

            // Add solid background when not at the top
            if (currentScrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // If mobile menu is open, keep navbar visible and do nothing else
            if (hamburger.classList.contains('active')) {
                navbar.classList.remove('navbar-hidden');
                lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY;
                return;
            }

            // Hide on scroll down (and past the navbar height), show on scroll up
            if (currentScrollY > lastScrollY && currentScrollY > navbar.offsetHeight) {
                navbar.classList.add('navbar-hidden');
            } else {
                navbar.classList.remove('navbar-hidden');
            }

            lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY; // Update last scroll position
        });
    }

    // Animate elements on scroll with stagger effect
    const animatedSections = document.querySelectorAll('.animated-section');
    if (animatedSections.length > 0) {
        const sectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const section = entry.target;
                    const itemsToAnimate = section.querySelectorAll('.anim-item');

                    itemsToAnimate.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('visible');
                        }, index * 150); // Staggered delay for items within the section
                    });

                    observer.unobserve(section);
                }
            });
        }, {
            threshold: 0.2, // Trigger when 20% of the section is visible
        });

        animatedSections.forEach(section => sectionObserver.observe(section));
    }

    // Falling Stars Canvas Logic
    const canvas = document.getElementById('stars-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let stars = [];
        const numStars = 50; // Adjust number of stars

        function setCanvasSize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        function initStars() {
            stars = [];
            for (let i = 0; i < numStars; i++) {
                const speed = (Math.random() * 1.5) + 0.5; // Faster speed for "shooting" effect
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 0.8 + 0.2, // Stars of varying sizes, reduced max size
                    speedX: speed,  // Use the same value for X and Y
                    speedY: speed   // to ensure a consistent 45-degree angle
                });
            }
        }

        function drawStars() {
            // Use a semi-transparent background to create a "trail" or "shooting" effect
            ctx.fillStyle = 'rgba(13, 13, 13, 0.5)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw each star
            ctx.fillStyle = '#FFFFFF'; // Star color changed to white
            stars.forEach(star => {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fill();
            });
        }

        function updateStars() {
            stars.forEach(star => {
                // Move stars diagonally
                star.x += star.speedX;
                star.y += star.speedY;

                // If a star goes off the right edge, wrap it to the left.
                if (star.x - star.radius > canvas.width) {
                    star.x = -star.radius;
                }
                // If a star goes off the bottom edge, wrap it to the top.
                if (star.y - star.radius > canvas.height) {
                    star.y = -star.radius;
                }
            });
        }

        function animate() {
            updateStars();
            drawStars();
            requestAnimationFrame(animate);
        }

        // Initial setup and event listener for responsiveness
        setCanvasSize();
        initStars();
        animate();

        window.addEventListener('resize', () => {
            setCanvasSize();
            initStars(); // Re-initialize stars for the new size
        });
    }

    // Custom Cursor Logic
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (cursorDot && cursorOutline) {
        window.addEventListener('mousemove', e => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 300, fill: "forwards" });
        });

        const interactiveElements = document.querySelectorAll('a, button, .btn, .skill, .project-card, #back-to-top');

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.classList.remove('cursor-hover');
            });
        });
    }

    // Back to Top Button Logic
    const backToTopButton = document.getElementById('back-to-top');

    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) { // Show button after scrolling 400px
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});