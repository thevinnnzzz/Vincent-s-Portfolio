// Certificates Data
const certificatesData = {
    networking: [
        { title: "Google IT Support (Professional Certificate)", org: "Google", date: "Completed", link: "https://coursera.org/share/0c8cd004f079ef70a9a99db19b52e90f" },
        { title: "CCNA: Introduction to Networks", org: "Cisco Systems Inc.", date: "July 10, 2024" },
        { title: "Partner: NDG Linux Unhatched", org: "Cisco Systems Inc.", date: "April 25, 2024" },
        { title: "CCNA: Enterprise Networking, Security and Automation", org: "Cisco Systems Inc.", date: "June 10, 2025" },
        { title: "CCNA: Switching, Routing and Wireless Essentials", org: "Cisco Systems Inc.", date: "June 30, 2025" },
        { title: "Computer Troubleshooting and Repair", org: "Cisco Systems Inc.", date: "July 31, 2025" },
        { title: "Career Path in Networking", org: "Lyceum of the Philippines University Batangas", date: "October 11, 2025" },
        { title: "CyberOps Associate", org: "Cisco Systems Inc.", date: "December 2025" },
        { title: "IoT Devices", org: "University of Illinois Urbana-Champaign - Coursera", date: "May 22, 2025" },
        { title: "2nd Place Winner – Hackathon/Pitching Competition", org: "Lyceum of the Philippines University – Batangas", date: "December 11, 2024" }
    ],
    cybersecurity: [
        { title: "Google Cybersecurity (Professional Certificate)", org: "Google", date: "Completed", link: "https://coursera.org/share/e795b4d9f1ccc3ff141ee3451d721fb2" },
        { title: "Introduction to Cybersecurity Essentials", org: "IBM - Coursera", date: "May 23, 2025" },
        { title: "Behind Firewalls: The Innerworkings of Cybersecurity and Data Privacy", org: "Lyceum of the Philippines University - Batangas", date: "November 25, 2025" },
        { title: "Cybersecurity Conference 2025", org: "Holy Angel University", date: "October 3, 2025" }
    ],
    ai: [
        { title: "Google AI (Professional Certificate)", org: "Google", date: "Completed", link: "https://www.coursera.org/account/accomplishments/specialization/BL39PWQJA9XP?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=prof" },
        { title: "AI Fundamentals with IBM SkillsBuild", org: "IBM - Coursera", date: "April 04, 2025" },
        { title: "Introduction to Machine Learning", org: "Duke University - Coursera", date: "May 22, 2025" },
        { title: "Introduction to Deep Learning & Neural Networks with Keras", org: "IBM - Coursera", date: "May 22, 2025" },
        { title: "Deep Learning with Keras and TensorFlow", org: "IBM - Coursera", date: "May 23, 2025" },
        { title: "DATABIZ 2025: Data Science, Artificial Intelligence, and Business Analytics", org: "Lipa Academy of Sports, Culture, and Arts", date: "October 10, 2025" }
    ],
    multimedia: [
        { title: "VR and 360 Video Production", org: "Google AR and VR - Coursera", date: "May 22, 2025" },
        { title: "Adobe Premiere Pro for Beginners", org: "Coursera Project Network", date: "May 22, 2025" },
        { title: "Using Video in Social Media Posts with Canva", org: "Coursera Project Network", date: "May 22, 2025" },
        { title: "Marketing with Pictory. AI: Create and Edit Videos", org: "Coursera Project Network", date: "May 22, 2025" },
        { title: "Multimedia in Marketing and Branding", org: "Lyceum of the Philippines University Batangas", date: "September 13, 2025" },
        { title: "Designing for Impact: A Seminar on User Experience", org: "Lyceum of the Philippines University Batangas", date: "November 8, 2025" },
        { title: "Visual Graphic NC III (Partial Fulfillment)", org: "TESDA", date: "December 2025" }
    ],
    microsoft: [
        { title: "Microsoft Office Specialist: Excel Associate (Microsoft 365 Apps)", org: "Microsoft - Coursera", date: "December 15, 2025" }
    ],
    web: [
        { title: "Full Stack Web Development", org: "AWS", date: "Completed", link: "https://coursera.org/share/5c660b3d71c1a0c841bd16cef1237295" }
    ]
};

// Tab icons
const tabIcons = {
    networking: 'fa-network-wired',
    cybersecurity: 'fa-shield-alt',
    ai: 'fa-brain',
    multimedia: 'fa-photo-video',
    microsoft: 'fa-microsoft',
    web: 'fa-code'
};

// Tab colors
const tabColors = {
    networking: { bg: 'blue', gradient: 'from-blue-500 to-cyan-500' },
    cybersecurity: { bg: 'red', gradient: 'from-red-500 to-orange-500' },
    ai: { bg: 'purple', gradient: 'from-purple-500 to-pink-500' },
    multimedia: { bg: 'green', gradient: 'from-green-500 to-teal-500' },
    microsoft: { bg: 'green', gradient: 'from-green-600 to-blue-600' },
    web: { bg: 'blue', gradient: 'from-blue-600 to-indigo-600' }
};

let currentTab = 'networking';

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    renderCertificates('networking');
    setupTabListeners();
    setupThemeToggle();
    setupMobileMenu();
});

// Render certificates for a category
function renderCertificates(category) {
    const container = document.getElementById('certificates-grid');
    const certificates = certificatesData[category];
    const color = tabColors[category];
    const icon = tabIcons[category];

    // Adjust container classes based on number of certificates
    if (certificates.length < 3) {
        container.className = 'flex flex-wrap justify-center gap-6';
    } else {
        container.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
    }

    container.innerHTML = certificates.map(cert => `
        <div class="cert-card bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 ${certificates.length < 3 ? 'w-full md:w-96' : ''}">
            <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-xl ${cert.org === 'Cisco Systems Inc.' || cert.org === 'IBM - Coursera' || cert.org === 'Duke University - Coursera' || cert.org.includes('Lyceum') || cert.org.includes('Illinois') || cert.org === 'Holy Angel University' || cert.org.includes('Lipa') || cert.org === 'Coursera Project Network' || cert.org === 'TESDA' || cert.org === 'Microsoft - Coursera' || cert.org === 'Google AR and VR - Coursera' || cert.org === 'Google' || cert.org === 'AWS' ? 'bg-white p-1.5' : 'bg-gradient-to-br ' + color.gradient} flex items-center justify-center flex-shrink-0">
                    ${cert.org === 'Cisco Systems Inc.'
            ? '<img src="icons/Cisco_logo.svg" alt="Cisco Logo" class="w-full h-full object-contain">'
            : cert.org === 'IBM - Coursera'
                ? '<img src="icons/IBM_logo.svg" alt="IBM Logo" class="w-full h-full object-contain">'
                : cert.org === 'Duke University - Coursera'
                    ? '<img src="icons/Duke_University_logo.svg" alt="Duke University Logo" class="w-full h-full object-contain">'
                    : cert.org.includes('Lyceum')
                        ? '<img src="icons/lpu_logo_png.png" alt="LPU Logo" class="w-full h-full object-contain">'
                        : cert.org.includes('Illinois')
                            ? '<img src="icons/University_of_Illinois_at_Urbana\u2013Champaign_logo.svg" alt="University of Illinois Logo" class="w-full h-full object-contain">'
                            : cert.org === 'Holy Angel University'
                                ? '<img src="icons/Holy_angel_logo.png" alt="Holy Angel University Logo" class="w-full h-full object-contain">'
                                : cert.org.includes('Lipa')
                                    ? '<img src="icons/lipa.png" alt="Lipa Academy Logo" class="w-full h-full object-contain">'
                                    : cert.org === 'Coursera Project Network'
                                        ? '<img src="icons/Coursera-Logo_600x600.svg" alt="Coursera Logo" class="w-full h-full object-contain">'
                                        : cert.org === 'TESDA'
                                            ? '<img src="icons/Technical_Education_and_Skills_Development_Authority_(TESDA).svg" alt="TESDA Logo" class="w-full h-full object-contain">'
                                            : cert.org === 'Microsoft - Coursera'
                                                ? '<img src="icons/Microsoft_logo.svg" alt="Microsoft Logo" class="w-full h-full object-contain">'
                                                : cert.org === 'Google AR and VR - Coursera' || cert.org === 'Google'
                                                    ? '<img src="icons/Google__G__logo.svg" alt="Google Logo" class="w-full h-full object-contain">'
                                                    : cert.org === 'AWS'
                                                        ? '<img src="icons/AWS.svg" alt="AWS Logo" class="w-full h-full object-contain">'
                                                        : '<i class="fas ' + icon + ' text-white text-lg"></i>'}
                </div>
                <div class="flex-1 min-w-0">
                    <h3 class="font-semibold text-gray-800 dark:text-white mb-2 leading-tight">${cert.title}</h3>
                    ${cert.org ? `<p class="text-sm text-gray-600 dark:text-gray-400 mb-2">${cert.org}</p>` : ''}
                    <div class="flex items-center text-sm text-gray-500 dark:text-gray-500">
                        <i class="fas fa-calendar-alt mr-2"></i>
                        <span>${cert.date}</span>
                    </div>
                    ${cert.link ? `<div class="mt-4"><a href="${cert.link}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium rounded-lg shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"><i class="fas fa-external-link-alt"></i> Verify</a></div>` : ''}
                </div>
            </div>
        </div>
    `).join('');

    // Update count
    document.getElementById('cert-count').textContent = `${certificates.length} ${certificates.length === 1 ? 'Certificate' : 'Certificates'}`;
}

// Tab switching
function setupTabListeners() {
    const tabs = document.querySelectorAll('.tab-btn');

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
            currentTab = category;
            renderCertificates(category);
        });
    });
}

// Theme toggle
function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');

    // Check for saved theme
    if (localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    }

    function toggleTheme() {
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    }

    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
    if (mobileThemeToggle) mobileThemeToggle.addEventListener('click', toggleTheme);
}

// Mobile menu
function setupMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
}
