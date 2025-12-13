// Dark mode toggle
const themeToggle = document.getElementById('theme-toggle');
const mobileThemeToggle = document.getElementById('mobile-theme-toggle');

if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    themeToggle.innerHTML = '<i class="fas fa-sun text-yellow-300"></i>';
    mobileThemeToggle.innerHTML = '<i class="fas fa-sun text-yellow-300"></i>';
} else {
    document.documentElement.classList.remove('dark');
    themeToggle.innerHTML = '<i class="fas fa-moon text-gray-700"></i>';
    mobileThemeToggle.innerHTML = '<i class="fas fa-moon text-gray-700"></i>';
}

themeToggle.addEventListener('click', () => {
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-moon text-gray-700"></i>';
        mobileThemeToggle.innerHTML = '<i class="fas fa-moon text-gray-700"></i>';
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun text-yellow-300"></i>';
        mobileThemeToggle.innerHTML = '<i class="fas fa-sun text-yellow-300"></i>';
    }
});

mobileThemeToggle.addEventListener('click', () => {
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-moon text-gray-700"></i>';
        mobileThemeToggle.innerHTML = '<i class="fas fa-moon text-gray-700"></i>';
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun text-yellow-300"></i>';
        mobileThemeToggle.innerHTML = '<i class="fas fa-sun text-yellow-300"></i>';
    }
});

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
});

// Animate skill bars on scroll
const skillBars = document.querySelectorAll('.skill-progress');

function animateSkillBars() {
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';

        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelector('#skills').querySelectorAll('.skill-bar').forEach(el => {
    observer.observe(el);
});

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
    ]
};

const certTabIcons = {
    networking: 'fa-network-wired',
    cybersecurity: 'fa-shield-alt',
    ai: 'fa-brain',
    multimedia: 'fa-photo-video'
};

const certTabColors = {
    networking: 'from-blue-500 to-cyan-500',
    cybersecurity: 'from-red-500 to-orange-500',
    ai: 'from-purple-500 to-pink-500',
    multimedia: 'from-green-500 to-teal-500'
};

// Render certificates for index page
function renderIndexCertificates(category) {
    const container = document.getElementById('index-certificates-grid');
    if (!container) return;

    const certificates = indexCertificatesData[category];
    const icon = certTabIcons[category];
    const gradient = certTabColors[category];

    container.innerHTML = certificates.map((cert, index) => `
        <div class="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700" style="animation: fadeInUp 0.5s ease forwards; animation-delay: ${index * 0.05}s; opacity: 0;">
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
