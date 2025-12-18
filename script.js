// Dark mode toggle
const themeToggle = document.getElementById('theme-toggle');
const mobileThemeToggle = document.getElementById('mobile-theme-toggle');

// Update icons based on current theme (dark class already applied by early detection script in HTML)
if (document.documentElement.classList.contains('dark')) {
    if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun text-yellow-300"></i>';
    if (mobileThemeToggle) mobileThemeToggle.innerHTML = '<i class="fas fa-sun text-yellow-300"></i>';
} else {
    if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-moon text-gray-700"></i>';
    if (mobileThemeToggle) mobileThemeToggle.innerHTML = '<i class="fas fa-moon text-gray-700"></i>';
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon text-gray-700"></i>';
            if (mobileThemeToggle) mobileThemeToggle.innerHTML = '<i class="fas fa-moon text-gray-700"></i>';
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun text-yellow-300"></i>';
            if (mobileThemeToggle) mobileThemeToggle.innerHTML = '<i class="fas fa-sun text-yellow-300"></i>';
        }
    });
}

if (mobileThemeToggle) {
    mobileThemeToggle.addEventListener('click', () => {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
            if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-moon text-gray-700"></i>';
            mobileThemeToggle.innerHTML = '<i class="fas fa-moon text-gray-700"></i>';
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
            if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun text-yellow-300"></i>';
            mobileThemeToggle.innerHTML = '<i class="fas fa-sun text-yellow-300"></i>';
        }
    });
}

// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });

        // Close mobile menu if open
        mobileMenu.classList.add('hidden');
    });
});

// Active navigation link based on scroll position
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active-nav');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active-nav');
        }
    });

    // Navbar scroll effect
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    }
});

// Animate skill bars on scroll
function initSkillBarsAnimation() {
    const skillSection = document.querySelector('#skills');
    if (!skillSection) return;

    const skillProgressBars = skillSection.querySelectorAll('.skill-progress');

    // Store the target widths and set initial state
    skillProgressBars.forEach(bar => {
        const targetWidth = bar.style.width || bar.getAttribute('data-width');
        if (targetWidth) {
            bar.setAttribute('data-target-width', targetWidth);
            bar.style.width = '0'; // Start at 0 for animation
        }
    });

    // Create observer for the skills section
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate all skill bars when section comes into view
                skillProgressBars.forEach((bar, index) => {
                    const targetWidth = bar.getAttribute('data-target-width');
                    if (targetWidth) {
                        // Stagger the animations slightly for a nicer effect
                        setTimeout(() => {
                            bar.style.width = targetWidth;
                        }, index * 100);
                    }
                });
                // Only animate once
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    // Observe the skills section itself
    skillsObserver.observe(skillSection);
}

// Initialize skill bars when DOM is ready
document.addEventListener('DOMContentLoaded', initSkillBarsAnimation);

// Dynamically generate project cards from projects-data.js
function loadProjectCards() {
    const projectsGrid = document.getElementById('projects-grid');

    if (!projectsGrid || typeof projectsData === 'undefined') {
        return;
    }

    // Clear existing content
    projectsGrid.innerHTML = '';

    // Generate project cards from data
    Object.values(projectsData).forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card h-80';
        projectCard.setAttribute('data-project-id', project.id);
        projectCard.style.cursor = 'pointer';

        projectCard.innerHTML = `
            <div class="relative w-full h-full rounded-xl overflow-hidden shadow-lg">
                <img src="${project.image}" alt="${project.name}" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-6">
                    <h3 class="text-xl font-bold text-white mb-2">${project.name}</h3>
                    <p class="text-gray-300 text-sm mb-3">${project.category}</p>
                    <p class="text-gray-200 text-sm mb-4 line-clamp-2">${project.shortDescription}</p>
                </div>
            </div>
        `;

        // Add click event for navigation
        projectCard.addEventListener('click', function (e) {
            // Don't navigate if clicking on a link inside the card
            if (e.target.tagName === 'A' || e.target.closest('a')) {
                return;
            }

            window.location.href = `project-overview.html?id=${project.id}`;
        });

        projectsGrid.appendChild(projectCard);
    });
}

// Load project cards when DOM is ready
document.addEventListener('DOMContentLoaded', loadProjectCards);

// Certificates Data for Index Page
const indexCertificatesData = {
    networking: [
        { title: "CCNA: Introduction to Networks", org: "Cisco Systems Inc.", date: "July 10, 2024" },
        { title: "Partner: NDG Linux Unhatched", org: "NDG", date: "April 25, 2024" },
        { title: "CCNA: Enterprise Networking, Security and Automation", org: "Cisco Systems Inc.", date: "June 10, 2025" },
        { title: "CCNA: Switching, Routing and Wireless Essentials", org: "Cisco Systems Inc.", date: "June 30, 2025" },
        { title: "Computer Troubleshooting and Repair", org: "Cisco Systems Inc.", date: "July 31, 2025" },
        { title: "Career Path in Networking", org: "Lyceum of the Philippines University Batangas", date: "October 11, 2025" },
        { title: "CyberOps Associate", org: "Cisco Systems Inc.", date: "December 2025" },
        { title: "IoT Devices", org: "University of Illinois Urbana-Champaign", date: "May 22, 2025" },
        { title: "2nd Place Winner – Hackathon/Pitching Competition", org: "Lyceum of the Philippines University – Batangas", date: "December 11, 2024" }
    ],
    cybersecurity: [
        { title: "Introduction to Cybersecurity Essentials", org: "IBM", date: "May 23, 2025" },
        { title: "Behind Firewalls: The Innerworkings of Cybersecurity and Data Privacy", org: "Lyceum of the Philippines University – Batangas ", date: "November 25, 2025" },
        { title: "Cybersecurity Conference 2025", org: "Holy Angel University", date: "October 3, 2025" }
    ],
    ai: [
        { title: "AI Fundamentals with IBM SkillsBuild", org: "IBM", date: "April 04, 2025" },
        { title: "Introduction to Machine Learning", org: "Duke University", date: "May 22, 2025" },
        { title: "Introduction to Deep Learning & Neural Networks with Keras", org: "IBM", date: "May 22, 2025" },
        { title: "Deep Learning with Keras and TensorFlow", org: "IBM", date: "May 23, 2025" },
        { title: "DATABIZ 2025: Data Science, Artificial Intelligence, and Business Analytics", org: "Lipa Academy of Sports, Culture, and Arts", date: "October 10, 2025" }
    ],
    multimedia: [
        { title: "VR and 360 Video Production", org: "Google AR and VR", date: "May 22, 2025" },
        { title: "Adobe Premiere Pro for Beginners", org: "Coursera Project Network", date: "May 22, 2025" },
        { title: "Using Video in Social Media Posts with Canva", org: "Coursera Project Network", date: "May 22, 2025" },
        { title: "Marketing with Pictory. AI: Create and Edit Videos", org: "Coursera Project Network", date: "May 22, 2025" },
        { title: "Multimedia in Marketing and Branding", org: "Lyceum of the Philippines University Batangas", date: "September 13, 2025" },
        { title: "Designing for Impact: A Seminar on User Experience", org: "Lyceum of the Philippines University Batangas", date: "November 8, 2025" },
        { title: "Visual Graphic NC III (Partial Fulfillment)", org: "TESDA", date: "December 2025" }
    ],
    microsoft: [
        { title: "Microsoft Office Specialist: Excel Associate (Microsoft 365 Apps)", org: "Microsoft", date: "December 15, 2025" }
    ]
};

const certTabIcons = {
    networking: 'fa-network-wired',
    cybersecurity: 'fa-shield-alt',
    ai: 'fa-brain',
    multimedia: 'fa-photo-video',
    microsoft: 'fa-microsoft'
};

const certTabColors = {
    networking: 'from-blue-500 to-cyan-500',
    cybersecurity: 'from-red-500 to-orange-500',
    ai: 'from-purple-500 to-pink-500',
    multimedia: 'from-green-500 to-teal-500',
    microsoft: 'from-green-600 to-blue-600'
};

// Render certificates for index page
function renderIndexCertificates(category) {
    const container = document.getElementById('index-certificates-grid');
    if (!container) return;

    const certificates = indexCertificatesData[category];
    const icon = certTabIcons[category];
    const gradient = certTabColors[category];

    // Adjust container classes based on number of certificates
    if (certificates.length < 3) {
        container.className = 'flex flex-wrap justify-center gap-6';
    } else {
        container.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
    }

    container.innerHTML = certificates.map((cert, index) => `
        <div class="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 ${certificates.length < 3 ? 'w-full md:w-96' : ''}" style="animation: fadeInUp 0.5s ease forwards; animation-delay: ${index * 0.05}s; opacity: 0;">
            <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0">
                    <i class="fas ${icon} text-white text-lg"></i>
                </div>
                <div class="flex-1 min-w-0">
                    <h3 class="font-semibold text-gray-800 dark:text-white mb-2 leading-tight">${cert.title}</h3>
                    ${cert.org ? `<p class="text-sm text-gray-600 dark:text-gray-400 mb-2">${cert.org}</p>` : ''}
                    <div class="flex items-center text-sm text-gray-500 dark:text-gray-500">
                        <i class="fas fa-calendar-alt mr-2"></i>
                        <span>${cert.date}</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    // Update count
    const countEl = document.getElementById('index-cert-count');
    if (countEl) {
        countEl.textContent = `${certificates.length} ${certificates.length === 1 ? 'Certificate' : 'Certificates'}`;
    }
}

// Setup certificate tab listeners for index page
function setupIndexCertTabs() {
    const tabs = document.querySelectorAll('.cert-tab-btn');
    if (tabs.length === 0) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const category = tab.dataset.category;

            // Update active tab
            tabs.forEach(t => {
                t.classList.remove('active', 'bg-gradient-to-r', 'from-blue-500', 'to-purple-600', 'text-white', 'shadow-lg');
                t.classList.add('text-gray-600', 'dark:text-gray-400', 'hover:bg-gray-100', 'dark:hover:bg-gray-700');
            });

            tab.classList.add('active', 'bg-gradient-to-r', 'from-blue-500', 'to-purple-600', 'text-white', 'shadow-lg');
            tab.classList.remove('text-gray-600', 'dark:text-gray-400', 'hover:bg-gray-100', 'dark:hover:bg-gray-700');

            // Render certificates
            renderIndexCertificates(category);
        });
    });

    // Initial render
    renderIndexCertificates('networking');
}

// Initialize certificates when DOM is ready
document.addEventListener('DOMContentLoaded', setupIndexCertTabs);

// Typewriting animation for hero section
document.addEventListener('DOMContentLoaded', function () {
    const typingElement = document.querySelector('.typing');
    const cursorElement = document.querySelector('.typed-cursor');

    if (typingElement && typeof Typed !== 'undefined') {
        // Hide the manual cursor since Typed.js creates its own
        if (cursorElement) {
            cursorElement.style.display = 'none';
        }

        new Typed('.typing', {
            strings: ['Freelancer', 'Programmer', 'Designer', 'Full-Stack Web Developer', 'Starting IT Technician'],
            typeSpeed: 80,
            backSpeed: 50,
            backDelay: 1500,
            startDelay: 500,
            loop: true,
            showCursor: true,
            cursorChar: '|',
            autoInsertCss: true
        });
    }
});

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================

function initScrollRevealAnimations() {
    // Select all elements with reveal classes
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Section title animations
    const sectionTitles = document.querySelectorAll('.section-title');
    const titleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.5 });

    sectionTitles.forEach(title => titleObserver.observe(title));
}

// ============================================
// STAGGERED CARD ANIMATIONS
// ============================================

function initStaggeredAnimations() {
    // Add stagger classes to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.classList.add('reveal-scale');
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    // Add stagger to tool icons
    const toolIcons = document.querySelectorAll('#skills .bg-white, #skills .dark\\:bg-gray-800');
    toolIcons.forEach((icon, index) => {
        icon.classList.add('reveal-scale', 'icon-bounce');
        icon.style.transitionDelay = `${index * 0.05}s`;
    });

    // Add shimmer to buttons
    const buttons = document.querySelectorAll('a[href="#contact"], a[href="#projects"], button[type="submit"]');
    buttons.forEach(btn => {
        btn.classList.add('btn-shimmer', 'glow-on-hover', 'ripple');
    });

    // Add animation to timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.classList.add('reveal');
        item.style.transitionDelay = `${index * 0.15}s`;
    });

    // Add animation to about section content
    const aboutImage = document.querySelector('#about .relative');
    const aboutText = document.querySelector('#about > div > div:last-child');
    if (aboutImage) aboutImage.classList.add('reveal-left');
    if (aboutText) aboutText.classList.add('reveal-right');

    // Add animations to contact section
    const contactLeft = document.querySelector('#contact .column.left, #contact > div > div > div:first-child');
    const contactRight = document.querySelector('#contact .column.right, #contact > div > div > div:last-child');
    if (contactLeft) contactLeft.classList.add('reveal-left');
    if (contactRight) contactRight.classList.add('reveal-right');
}

// ============================================
// PARALLAX EFFECT FOR FLOATING BLOBS
// ============================================

function initParallaxEffect() {
    const blobs = document.querySelectorAll('.blob');

    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        blobs.forEach((blob, index) => {
            const speed = (index + 1) * 20;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;

            blob.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// ============================================
// SMOOTH SCROLL PROGRESS INDICATOR
// ============================================

function initScrollProgress() {
    // Create progress bar element
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899);
        z-index: 9999;
        transition: width 0.1s ease;
        width: 0%;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = `${scrollPercent}%`;
    });
}

// ============================================
// TILT EFFECT FOR CARDS
// ============================================

function initTiltEffect() {
    const tiltCards = document.querySelectorAll('.tilt-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

// ============================================
// COUNTER ANIMATION FOR STATS
// ============================================

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }

    updateCounter();
}

// ============================================
// MAGNETIC BUTTON EFFECT
// ============================================

function initMagneticButtons() {
    const magneticButtons = document.querySelectorAll('.magnetic-btn');

    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}

// ============================================
// INITIALIZE ALL ANIMATIONS
// ============================================

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all animation systems
    initScrollRevealAnimations();
    initStaggeredAnimations();
    initParallaxEffect();
    initScrollProgress();
    initTiltEffect();
    initMagneticButtons();

    // Add reveal classes to main sections
    const mainSections = document.querySelectorAll('section > div > .text-center');
    mainSections.forEach(section => {
        section.classList.add('reveal');
    });

    // Re-observe after adding classes
    setTimeout(() => {
        initScrollRevealAnimations();
    }, 100);
});
