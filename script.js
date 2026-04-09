document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('binary-rain');
    if (canvas) {
        const ctx = canvas.getContext('2d');

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const chars = '01';
        const fontSize = 14;
        const columns = Math.floor(canvas.width / fontSize);
        const drops = Array.from({ length: columns }, () => Math.random() * canvas.height / fontSize);

        function drawRain() {
            ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#ff4d00';
            ctx.font = `${fontSize}px 'Share Tech Mono', monospace`;

            for (let i = 0; i < drops.length; i++) {
                const char = chars[Math.floor(Math.random() * chars.length)];
                const x = i * fontSize;
                const y = drops[i] * fontSize;
                ctx.fillText(char, x, y);

                if (y > canvas.height && Math.random() > 0.98) {
                    drops[i] = 0;
                }
                drops[i] += 0.3;
            }
            requestAnimationFrame(drawRain);
        }
        drawRain();
    }

    const typedEl = document.getElementById('typed-output');
    if (typedEl) {
        const phrases = [
            'Full-stack developer focused on fast, secure, and resilient systems.',
            'Building scalable web applications with modern tooling.',
            'Turning complex problems into clean, efficient code.',
            'Systems architect. Frontend specialist. Problem solver.'
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 50;

        function typeWriter() {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                typedEl.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 25;
            } else {
                typedEl.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 50;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                typingSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typingSpeed = 500;
            }

            setTimeout(typeWriter, typingSpeed);
        }
        typeWriter();
    }

    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            navToggle.classList.toggle('active');
        });
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                navToggle.classList.remove('active');
            });
        });
    }

    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');

    function highlightNav() {
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${id}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNav);
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const parent = entry.target.parentElement;
                const siblings = parent ? Array.from(parent.querySelectorAll('.terminal-window')) : [];
                const siblingIndex = siblings.indexOf(entry.target);
                const delay = siblingIndex * 150;

                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.terminal-window:not(.hero-terminal):not(.quote-terminal)').forEach(el => {
        observer.observe(el);
    });

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fills = entry.target.querySelectorAll('.skill-bar-fill, .exp-bar-fill');
                fills.forEach(fill => {
                    const width = fill.style.width;
                    fill.style.width = '0%';
                    setTimeout(() => {
                        fill.style.width = width;
                    }, 300);
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.skill-list, .terminal-body').forEach(el => {
        skillObserver.observe(el);
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    let mouseX = 0;
    let mouseY = 0;
    const heroTerminal = document.querySelector('.hero-terminal');

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;

        if (heroTerminal) {
            heroTerminal.style.transform = `perspective(1000px) rotateY(${mouseX * 0.5}deg) rotateX(${-mouseY * 0.5}deg)`;
        }
    });

    const glitchText = document.querySelector('.glitch-text');
    if (glitchText) {
        glitchText.addEventListener('mouseenter', () => {
            glitchText.style.animation = 'none';
            void glitchText.offsetHeight;
            glitchText.classList.add('glitch-hover');
        });

        glitchText.addEventListener('mouseleave', () => {
            glitchText.classList.remove('glitch-hover');
        });
    }

    const nav = document.querySelector('.nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 80) {
            nav.style.borderBottomColor = 'rgba(255, 77, 0, 0.3)';
        } else {
            nav.style.borderBottomColor = '';
        }

        lastScroll = currentScroll;
    });

    // ── CONSOLE EASTER EGG ─────────────────────────────────
    console.log('%c╔══════════════════════════════════════╗', 'color: #ff4d00; font-family: monospace;');
    console.log('%c║     ALEX.SYS PORTFOLIO v3.2.1       ║', 'color: #ff4d00; font-family: monospace;');
    console.log('%c║     All systems operational.         ║', 'color: #00ff41; font-family: monospace;');
    console.log('%c╚══════════════════════════════════════╝', 'color: #ff4d00; font-family: monospace;');

});
