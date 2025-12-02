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
