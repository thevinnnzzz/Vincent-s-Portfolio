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
    'social-dashboard': {
        id: 'social-dashboard',
        name: 'Social Media Dashboard',
        category: 'React, GraphQL, TailwindCSS',
        tagline: 'Analytics at Your Fingertips',
        image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1636&q=80',
        shortDescription: 'Analytics dashboard for tracking social media metrics with interactive charts and data visualization.',
        detailedDescription: 'An advanced social media analytics platform that aggregates data from multiple social networks into a unified dashboard. Built with React and GraphQL, it provides real-time insights into audience engagement, content performance, and growth trends. The dashboard features interactive charts, customizable widgets, and AI-powered recommendations to optimize your social media strategy.',
        features: [
            {
                icon: 'fas fa-chart-bar',
                title: 'Interactive Charts',
                description: 'Beautiful, interactive data visualizations for easy insights'
            },
            {
                icon: 'fas fa-network-wired',
                title: 'Multi-Platform',
                description: 'Connect and analyze multiple social media accounts'
            },
            {
                icon: 'fas fa-brain',
                title: 'AI Insights',
                description: 'Machine learning-powered recommendations and predictions'
            },
            {
                icon: 'fas fa-file-export',
                title: 'Export Reports',
                description: 'Generate and export comprehensive analytics reports'
            },
            {
                icon: 'fas fa-clock',
                title: 'Real-time Data',
                description: 'Live metrics and instant updates from all platforms'
            },
            {
                icon: 'fas fa-sliders-h',
                title: 'Custom Widgets',
                description: 'Customizable dashboard widgets for personalized views'
            }
        ],
        techStack: [
            { name: 'React', icon: 'fab fa-react', color: 'text-blue-400' },
            { name: 'GraphQL', icon: 'fas fa-project-diagram', color: 'text-pink-500' },
            { name: 'TailwindCSS', icon: 'fas fa-palette', color: 'text-blue-500' },
            { name: 'Chart.js', icon: 'fas fa-chart-pie', color: 'text-purple-500' },
            { name: 'Node.js', icon: 'fab fa-node-js', color: 'text-green-500' }
        ],
        links: {
            live: '#',
            github: '#',
            docs: null
        }
    },
    'weather-app': {
        id: 'weather-app',
        name: 'Weather Application',
        category: 'JavaScript, API Integration',
        tagline: 'Weather Forecasting Made Simple',
        image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1636&q=80',
        shortDescription: 'Real-time weather forecast app with location detection and 5-day predictions.',
        detailedDescription: 'A sleek and modern weather application that provides accurate, real-time weather information and forecasts. Utilizing advanced weather APIs and geolocation services, the app delivers hyper-local weather data, 5-day forecasts, and severe weather alerts. Features a beautiful, intuitive interface with animated weather icons and detailed meteorological data.',
        features: [
            {
                icon: 'fas fa-map-marker-alt',
                title: 'Auto Location',
                description: 'Automatic location detection for instant local weather'
            },
            {
                icon: 'fas fa-calendar-alt',
                title: '5-Day Forecast',
                description: 'Detailed weather predictions for the next 5 days'
            },
            {
                icon: 'fas fa-exclamation-triangle',
                title: 'Weather Alerts',
                description: 'Real-time severe weather warnings and notifications'
            },
            {
                icon: 'fas fa-wind',
                title: 'Detailed Metrics',
                description: 'Comprehensive data including humidity, wind speed, and pressure'
            },
            {
                icon: 'fas fa-globe',
                title: 'Global Coverage',
                description: 'Search weather information for any location worldwide'
            },
            {
                icon: 'fas fa-star',
                title: 'Favorites',
                description: 'Save and track multiple locations simultaneously'
            }
        ],
        techStack: [
            { name: 'JavaScript', icon: 'fab fa-js', color: 'text-yellow-500' },
            { name: 'HTML5', icon: 'fab fa-html5', color: 'text-orange-500' },
            { name: 'CSS3', icon: 'fab fa-css3-alt', color: 'text-blue-500' },
            { name: 'OpenWeather API', icon: 'fas fa-cloud', color: 'text-gray-400' },
            { name: 'Geolocation API', icon: 'fas fa-location-arrow', color: 'text-red-500' }
        ],
        links: {
            live: '#',
            github: '#',
            docs: null
        }
    },
    'portfolio-template': {
        id: 'portfolio-template',
        name: 'Portfolio Template',
        category: 'HTML, CSS, JavaScript',
        tagline: 'Your Professional Presence',
        image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1636&q=80',
        shortDescription: 'A responsive portfolio template with smooth animations and dark mode support.',
        detailedDescription: 'A beautifully crafted, fully responsive portfolio template designed for developers, designers, and creative professionals. Built with vanilla HTML, CSS, and JavaScript, it features smooth scroll animations, an elegant dark mode, and a modern, clean design. The template is highly customizable and optimized for performance, making it perfect for showcasing your work and skills.',
        features: [
            {
                icon: 'fas fa-mobile-alt',
                title: 'Fully Responsive',
                description: 'Perfect display on all devices from mobile to desktop'
            },
            {
                icon: 'fas fa-moon',
                title: 'Dark Mode',
                description: 'Beautiful dark mode with smooth transitions'
            },
            {
                icon: 'fas fa-magic',
                title: 'Smooth Animations',
                description: 'Engaging scroll animations and micro-interactions'
            },
            {
                icon: 'fas fa-paint-brush',
                title: 'Customizable',
                description: 'Easy to customize colors, fonts, and layouts'
            },
            {
                icon: 'fas fa-rocket',
                title: 'Performance',
                description: 'Optimized for fast loading and smooth performance'
            },
            {
                icon: 'fas fa-code',
                title: 'Clean Code',
                description: 'Well-structured, documented, and maintainable code'
            }
        ],
        techStack: [
            { name: 'HTML5', icon: 'fab fa-html5', color: 'text-orange-500' },
            { name: 'CSS3', icon: 'fab fa-css3-alt', color: 'text-blue-500' },
            { name: 'JavaScript', icon: 'fab fa-js', color: 'text-yellow-500' },
            { name: 'GSAP', icon: 'fas fa-film', color: 'text-green-500' }
        ],
        links: {
            live: '#',
            github: '#',
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
