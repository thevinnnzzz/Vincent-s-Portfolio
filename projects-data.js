// Project data for portfolio
const projectsData = {
    'lyceumvault': {
        id: 'lyceumvault',
        name: 'LyceumVault',
        category: 'Thesis Archive System',
        tagline: 'Modern Thesis Document Management & Archive',
        image: 'images/Projects/LyceumVault.png',
        shortDescription: 'A modern web application for managing and archiving thesis documents.',
        detailedDescription: 'LyceumVault is a comprehensive thesis archive and management system built with modern web technologies. The platform streamlines the process of storing, organizing, and accessing academic thesis documents with robust authentication, email verification, and cloud-based storage. Designed for educational institutions, it provides students and faculty with secure access to research materials while maintaining data integrity and user privacy through Supabase backend integration.',
        features: [
            {
                icon: 'fas fa-book',
                title: 'Thesis Archive',
                description: 'Comprehensive digital archive system for storing and organizing thesis documents'
            },
            {
                icon: 'fas fa-shield-alt',
                title: 'Secure Authentication',
                description: 'Email verification and secure user authentication powered by Supabase'
            },
            {
                icon: 'fas fa-cloud-upload-alt',
                title: 'Cloud Storage',
                description: 'Reliable cloud-based document storage with Supabase backend'
            },
            {
                icon: 'fas fa-search',
                title: 'Advanced Search',
                description: 'Powerful search and filtering capabilities to find thesis documents quickly'
            },
            {
                icon: 'fas fa-mobile-alt',
                title: 'Responsive Design',
                description: 'Modern UI built with React and Tailwind CSS, optimized for all devices'
            },
            {
                icon: 'fas fa-code',
                title: 'Type-Safe',
                description: 'Built with TypeScript for enhanced code quality and maintainability'
            }
        ],
        techStack: [
            { name: 'React', icon: 'fab fa-react', color: 'text-blue-400' },
            { name: 'TypeScript', icon: 'fas fa-code', color: 'text-blue-600' },
            { name: 'Vite', icon: 'fas fa-bolt', color: 'text-purple-500' },
            { name: 'Tailwind CSS', icon: 'fas fa-palette', color: 'text-blue-500' },
            { name: 'Supabase', icon: 'fas fa-database', color: 'text-green-600' },
            { name: 'shadcn-ui', icon: 'fas fa-layer-group', color: 'text-gray-700' },
            { name: 'Resend', icon: 'fas fa-envelope', color: 'text-blue-500' },
            { name: 'Git', icon: 'fab fa-git-alt', color: 'text-orange-600' }
        ],
        links: {
            live: 'https://lyceumvault.netlify.app',
            github: null,
            docs: null
        }
    },
    'aceresto': {
        id: 'aceresto',
        name: 'Ace Resto',
        category: 'Event & Reservation System',
        tagline: 'Event Booking & Management Platform',
        image: 'images/Projects/Aceresto.png',
        shortDescription: 'A comprehensive web-based management solution for event venues, function halls, and catering businesses.',
        detailedDescription: 'Ace Resto Event & Reservation System is a complete event booking and restaurant management platform designed specifically for event venues, function halls, and catering businesses. The system streamlines the entire event booking process from initial reservation to payment confirmation, providing both customers and administrators with an intuitive and efficient platform. Features include real-time availability checking, multi-service selection, payment processing with GCash integration, role-based access control, and comprehensive reporting and analytics.',
        features: [
            {
                icon: 'fas fa-calendar-check',
                title: 'Online Booking System',
                description: 'Customers can book events directly through the website with real-time availability checking'
            },
            {
                icon: 'fas fa-credit-card',
                title: 'Payment Processing',
                description: 'Multiple payment methods including GCash, bank transfer, with payment proof upload'
            },
            {
                icon: 'fas fa-users-cog',
                title: 'Role-Based Access Control',
                description: 'Superuser, Admin, and User roles with custom permissions management'
            },
            {
                icon: 'fas fa-chart-bar',
                title: 'Advanced Reporting',
                description: 'Booking reports, revenue analytics, and event statistics with date filtering'
            },
            {
                icon: 'fas fa-file-invoice',
                title: 'Invoice Generation',
                description: 'Automatically generate professional invoices for bookings and events'
            },
            {
                icon: 'fas fa-bell',
                title: 'Notification System',
                description: 'Automated alerts for new bookings, status updates, and payment confirmations'
            }
        ],
        techStack: [
            { name: 'PHP', icon: 'fab fa-php', color: 'text-indigo-600' },
            { name: 'MySQL', icon: 'fas fa-database', color: 'text-blue-600' },
            { name: 'Bootstrap', icon: 'fab fa-bootstrap', color: 'text-purple-600' },
            { name: 'jQuery', icon: 'fas fa-code', color: 'text-blue-500' },
            { name: 'JavaScript', icon: 'fab fa-js', color: 'text-yellow-500' },
            { name: 'Font Awesome', icon: 'fab fa-font-awesome', color: 'text-blue-700' }
        ],
        links: {
            live: 'https://aceresto.net',
            github: null,
            docs: null
        }
    },
    'identify': {
        id: 'identify',
        name: 'iDENTify',
        category: 'Dental Patient Management System',
        tagline: 'Professional Clinical Management Platform',
        image: 'images/Projects/iDENTify_LAYOUT/admin/admin-dashboard.png',
        shortDescription: 'A comprehensive web-based dental patient management system designed to streamline clinical operations for dental clinics and schools.',
        detailedDescription: 'iDENTify is a comprehensive web-based dental patient management system designed to streamline clinical operations for dental clinics, academic institutions, and dental schools. The system provides complete solutions for managing patient information, clinical procedures, treatment records, and multi-level clinical supervision workflows. Features include multi-role authentication (Admin, Clinician, Clinical Instructor, COD), comprehensive Patient Information Records (PIR) with 5-step forms, procedure logging with auto-assignment to Clinical Instructors, and advanced analytics dashboard with real-time reporting.',
        features: [
            {
                icon: 'fas fa-user-shield',
                title: 'Multi-Role Authentication',
                description: 'Admin, Clinician, Clinical Instructor, and COD roles with role-based access control (RBAC)'
            },
            {
                icon: 'fas fa-file-medical',
                title: 'Patient Information Records',
                description: 'Multi-step patient registration with demographics, health questionnaire, dental examination, and consent forms'
            },
            {
                icon: 'fas fa-stethoscope',
                title: 'Procedure Logging',
                description: 'Comprehensive dental procedure logging with auto-assignment to available Clinical Instructors'
            },
            {
                icon: 'fas fa-user-md',
                title: 'Clinical Workflows',
                description: 'COD assigns patients to Clinical Instructors with acceptance/approval workflows'
            },
            {
                icon: 'fas fa-chart-line',
                title: 'Analytics Dashboard',
                description: 'Role-specific statistics, patient status charts, and monthly submission trends'
            },
            {
                icon: 'fas fa-moon',
                title: 'Modern UI/UX',
                description: 'Dark mode support, responsive design, and smooth animations with Tailwind CSS'
            }
        ],
        techStack: [
            { name: 'PHP', icon: 'fab fa-php', color: 'text-indigo-600' },
            { name: 'MySQL', icon: 'fas fa-database', color: 'text-blue-600' },
            { name: 'Tailwind CSS', icon: 'fas fa-palette', color: 'text-blue-500' },
            { name: 'JavaScript', icon: 'fab fa-js', color: 'text-yellow-500' },
            { name: 'Chart.js', icon: 'fas fa-chart-pie', color: 'text-purple-500' },
            { name: 'PDO', icon: 'fas fa-shield-alt', color: 'text-green-600' }
        ],
        links: {
            live: null,
            github: null,
            docs: null
        },
        // Image Viewer Configuration
        hasImageViewer: true,
        imageViewerConfig: {
            userTypes: [
                { id: 'admin', name: 'Admin', count: 54 },
                { id: 'cod', name: 'COD', count: 11 },
                { id: 'clinician', name: 'Clinician', count: 44 },
                { id: 'ci', name: 'Clinical Instructor', count: 38 }
            ],
            basePath: 'images/Projects/iDENTify_layout/'
        }
    },
    'vincent-triluxe-shop': {
        id: 'vincent-triluxe-shop',
        name: 'Vincent Triluxe Shop',
        category: 'E-commerce, JavaScript',
        tagline: 'Premium Fashion E-commerce Platform',
        image: 'BSIT3A_IT8-Final-Lab_Delacruz/img/Screenshot 2025-12-13 153254.png',
        shortDescription: 'A complete e-commerce platform with product catalog, shopping cart, checkout, and admin panel.',
        detailedDescription: 'Vincent Triluxe Shop is a comprehensive e-commerce web application designed for premium fashion retail. The platform features a complete shopping experience with product browsing, advanced search and filtering, shopping cart management, user authentication with role-based access control (Admin/User), and a full checkout system. The admin panel provides inventory management, product CRUD operations, and sales analytics. Built with vanilla JavaScript, it showcases modern frontend development practices.',
        features: [
            {
                icon: 'fas fa-shopping-cart',
                title: 'Shopping Cart',
                description: 'Fully functional cart with quantity management and real-time price updates'
            },
            {
                icon: 'fas fa-search',
                title: 'Product Search & Filter',
                description: 'Advanced search with category filtering and sorting by price or name'
            },
            {
                icon: 'fas fa-user-shield',
                title: 'User Authentication',
                description: 'Login/signup system with role-based access control (Admin/User)'
            },
            {
                icon: 'fas fa-user-cog',
                title: 'Admin Panel',
                description: 'Complete admin dashboard for product and inventory management'
            },
            {
                icon: 'fas fa-credit-card',
                title: 'Checkout System',
                description: 'Streamlined checkout process with order confirmation'
            },
            {
                icon: 'fas fa-expand',
                title: 'Product Lightbox',
                description: 'Image preview with lightbox for detailed product viewing'
            }
        ],
        techStack: [
            { name: 'JavaScript', icon: 'fab fa-js', color: 'text-yellow-500' },
            { name: 'HTML5', icon: 'fab fa-html5', color: 'text-orange-500' },
            { name: 'CSS3', icon: 'fab fa-css3-alt', color: 'text-blue-500' },
            { name: 'LocalStorage', icon: 'fas fa-database', color: 'text-green-600' },
            { name: 'Boxicons', icon: 'fas fa-icons', color: 'text-purple-500' }
        ],
        links: {
            live: 'BSIT3A_IT8-Final-Lab_Delacruz/shop1-html.html',
            github: null,
            docs: null
        },
        hasMultipleDemos: true,
        demoOptions: [
            { label: 'Vincent Triluxe Shop', url: 'BSIT3A_IT8-Final-Lab_Delacruz/shop1-html.html' },
            { label: 'Admin Panel', url: 'BSIT3A_IT8-Final-Lab_Delacruz/admin-html.html' }
        ]
    },
    'portfolio-template': {
        id: 'portfolio-template',
        name: 'Vincent Portfolio',
        category: 'HTML, CSS, JavaScript',
        tagline: 'Personal Portfolio & E-commerce Showcase',
        image: 'BSIT3A_IT8-Final-Lab_Delacruz/img/Screenshot 2025-12-13 152942.png',
        shortDescription: 'A personal portfolio website with animated typing effects, skills showcase, and integrated e-commerce project.',
        detailedDescription: 'Vincent Portfolio is a personal portfolio website showcasing web development skills, services, and projects. Built with modern web technologies, it features animated typing effects using Typed.js, smooth scroll animations with Waypoints, and an interactive project carousel using Owl Carousel. The portfolio includes sections for About Me, Services (Design, Development, SEO, Video Editing, Digital Marketing, App Development), Skills with animated progress bars, Projects showcase, and a Contact form.',
        features: [
            {
                icon: 'fas fa-keyboard',
                title: 'Animated Typing',
                description: 'Dynamic text animations using Typed.js for engaging hero section'
            },
            {
                icon: 'fas fa-palette',
                title: 'Services Showcase',
                description: 'Interactive service cards for Design, Development, SEO, and more'
            },
            {
                icon: 'fas fa-chart-bar',
                title: 'Skill Progress Bars',
                description: 'Animated skill bars displaying proficiency in HTML, CSS, JavaScript, SQL'
            },
            {
                icon: 'fas fa-images',
                title: 'Project Carousel',
                description: 'Owl Carousel integration for smooth project browsing experience'
            },
            {
                icon: 'fas fa-envelope',
                title: 'Contact Form',
                description: 'Professional contact section with form and social media links'
            },
            {
                icon: 'fas fa-water',
                title: 'Wave Animations',
                description: 'Beautiful animated wave effects in footer section'
            }
        ],
        techStack: [
            { name: 'HTML5', icon: 'fab fa-html5', color: 'text-orange-500' },
            { name: 'CSS3', icon: 'fab fa-css3-alt', color: 'text-blue-500' },
            { name: 'JavaScript', icon: 'fab fa-js', color: 'text-yellow-500' },
            { name: 'jQuery', icon: 'fas fa-code', color: 'text-blue-600' },
            { name: 'Typed.js', icon: 'fas fa-keyboard', color: 'text-purple-500' },
            { name: 'Owl Carousel', icon: 'fas fa-images', color: 'text-green-500' }
        ],
        links: {
            live: 'BSIT3A_IT8-Final-Lab_Delacruz/portfolio-html.html',
            github: null,
            docs: null
        }
    },
    'recipe-finder': {
        id: 'recipe-finder',
        name: 'Recipe Finder',
        category: 'React, API Integration',
        tagline: 'Discover Your Next Meal',
        image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1636&q=80',
        shortDescription: 'Search and discover recipes with filtering by ingredients, dietary restrictions, and cooking time.',
        detailedDescription: 'A comprehensive recipe discovery application that helps users find the perfect meal based on available ingredients, dietary preferences, and time constraints. Built with React and integrated with multiple recipe APIs, it offers a vast database of recipes with detailed nutritional information, step-by-step cooking instructions, and the ability to save favorites and create shopping lists.',
        features: [
            {
                icon: 'fas fa-utensils',
                title: 'Recipe Search',
                description: 'Search from thousands of recipes worldwide'
            },
            {
                icon: 'fas fa-filter',
                title: 'Smart Filters',
                description: 'Filter by ingredients, diet type, cuisine, and more'
            },
            {
                icon: 'fas fa-heart',
                title: 'Save Favorites',
                description: 'Bookmark your favorite recipes for easy access'
            },
            {
                icon: 'fas fa-shopping-cart',
                title: 'Shopping Lists',
                description: 'Generate shopping lists from recipe ingredients'
            },
            {
                icon: 'fas fa-apple-alt',
                title: 'Nutrition Info',
                description: 'Detailed nutritional information for each recipe'
            },
            {
                icon: 'fas fa-clock',
                title: 'Time Filter',
                description: 'Find recipes based on available cooking time'
            }
        ],
        techStack: [
            { name: 'React', icon: 'fab fa-react', color: 'text-blue-400' },
            { name: 'JavaScript', icon: 'fab fa-js', color: 'text-yellow-500' },
            { name: 'REST API', icon: 'fas fa-server', color: 'text-purple-500' },
            { name: 'CSS3', icon: 'fab fa-css3-alt', color: 'text-blue-500' },
            { name: 'LocalStorage', icon: 'fas fa-database', color: 'text-green-600' }
        ],
        links: {
            live: '#',
            github: '#',
            docs: null
        }
    }
};

// Make available globally
if (typeof module !== 'undefined' && module.exports) {
    module.exports = projectsData;
}
