// Project Overview Page Logic

// Get project ID from URL parameters
function getProjectIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Load and display project data
function loadProjectData() {
    const projectId = getProjectIdFromURL();

    if (!projectId || !projectsData[projectId]) {
        showError();
        return;
    }

    const project = projectsData[projectId];
    displayProject(project);
}

// Display project information
function displayProject(project) {
    // Update page title
    document.getElementById('page-title').textContent = `${project.name} - Vincent's Portfolio`;

    // Update hero section
    document.getElementById('project-category').textContent = project.category;
    document.getElementById('project-name').textContent = project.name;
    document.getElementById('project-tagline').textContent = project.tagline;
    document.getElementById('project-description').textContent = project.detailedDescription;
    document.getElementById('project-image').src = project.image;
    document.getElementById('project-image').alt = project.name;

    // Add project links
    const linksContainer = document.getElementById('project-links');
    linksContainer.innerHTML = '';

    // Check if project has multiple demo options
    if (project.hasMultipleDemos && project.demoOptions) {
        linksContainer.innerHTML += `
            <div class="demo-dropdown relative inline-block">
                <button id="demo-dropdown-btn" class="px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium shadow-lg inline-flex items-center hover:shadow-xl transition-all duration-300">
                    <i class="fas fa-external-link-alt mr-2"></i>
                    Live Demo
                    <i class="fas fa-chevron-down ml-2 text-sm"></i>
                </button>
                <div id="demo-dropdown-menu" class="hidden absolute left-0 mt-2 w-56 rounded-xl bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
                    ${project.demoOptions.map(option => `
                        <a href="${option.url}" target="_blank" rel="noopener noreferrer" 
                            class="block px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white transition-all duration-200">
                            <i class="fas fa-link mr-2"></i>
                            ${option.label}
                        </a>
                    `).join('')}
                </div>
            </div>
        `;

        // Setup dropdown toggle after DOM update
        setTimeout(() => {
            const btn = document.getElementById('demo-dropdown-btn');
            const menu = document.getElementById('demo-dropdown-menu');
            if (btn && menu) {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    menu.classList.toggle('hidden');
                });
                document.addEventListener('click', () => {
                    menu.classList.add('hidden');
                });
            }
        }, 100);
    } else if (project.links.live) {
        linksContainer.innerHTML += `
            <a href="${project.links.live}" target="_blank" rel="noopener noreferrer"
                class="link-button px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium shadow-lg inline-flex items-center">
                <i class="fas fa-external-link-alt mr-2"></i>
                Live Demo
            </a>
        `;
    }

    if (project.links.github) {
        linksContainer.innerHTML += `
            <a href="${project.links.github}" target="_blank" rel="noopener noreferrer"
                class="link-button px-8 py-3 rounded-full border-2 border-gray-300 dark:border-gray-600 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 inline-flex items-center">
                <i class="fab fa-github mr-2"></i>
                View Code
            </a>
        `;
    }

    if (project.links.docs) {
        linksContainer.innerHTML += `
            <a href="${project.links.docs}" target="_blank" rel="noopener noreferrer"
                class="link-button px-8 py-3 rounded-full border-2 border-gray-300 dark:border-gray-600 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 inline-flex items-center">
                <i class="fas fa-book mr-2"></i>
                Documentation
            </a>
        `;
    }

    // Display features
    const featuresGrid = document.getElementById('features-grid');
    featuresGrid.innerHTML = '';

    project.features.forEach((feature, index) => {
        const featureCard = `
            <div class="feature-card bg-white dark:bg-gray-800/50 p-6 rounded-xl shadow-md" style="animation-delay: ${index * 0.1}s">
                <div class="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4">
                    <i class="${feature.icon} text-2xl text-white"></i>
                </div>
                <h3 class="text-xl font-semibold mb-2">${feature.title}</h3>
                <p class="text-gray-600 dark:text-gray-300">${feature.description}</p>
            </div>
        `;
        featuresGrid.innerHTML += featureCard;
    });

    // Display technology stack
    const techStack = document.getElementById('tech-stack');
    techStack.innerHTML = '';

    project.techStack.forEach((tech, index) => {
        const techBadge = `
            <div class="tech-badge bg-white dark:bg-gray-800 px-6 py-4 rounded-full shadow-md hover:shadow-lg flex items-center space-x-3" style="animation-delay: ${index * 0.05}s">
                <i class="${tech.icon} text-2xl ${tech.color}"></i>
                <span class="font-medium">${tech.name}</span>
            </div>
        `;
        techStack.innerHTML += techBadge;
    });

    // Show content and hide loading
    document.getElementById('loading').classList.add('hidden');
    document.getElementById('project-content').classList.remove('hidden');

    // Initialize Image Viewer for iDENTify project
    if (project.hasImageViewer && project.imageViewerConfig) {
        const viewerSection = document.getElementById('image-viewer-section');
        if (viewerSection) {
            viewerSection.classList.remove('hidden');
            // Initialize the image viewer component
            setTimeout(() => {
                if (window.initImageViewer) {
                    window.initImageViewer(project.imageViewerConfig);
                }
            }, 100);
        }
    }

    // Add fade-in animation to feature cards
    setTimeout(() => {
        document.querySelectorAll('.feature-card, .tech-badge').forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('fade-in');
            }, index * 100);
        });
    }, 100);
}

// Show error state
function showError() {
    document.getElementById('loading').classList.add('hidden');
    document.getElementById('error').classList.remove('hidden');
}

// Dark mode toggle
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    // Update icon based on current theme (dark class already applied by early detection script)
    if (document.documentElement.classList.contains('dark')) {
        themeToggle.innerHTML = '<i class="fas fa-sun text-yellow-300"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon text-gray-700"></i>';
    }

    themeToggle.addEventListener('click', () => {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon text-gray-700"></i>';
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun text-yellow-300"></i>';
        }
    });
}

// Scroll to top functionality
function initScrollTop() {
    const scrollTopBtn = document.getElementById('scroll-top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.remove('hidden');
        } else {
            scrollTopBtn.classList.add('hidden');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initScrollTop();
    initSmoothScroll();
    loadProjectData();
});
