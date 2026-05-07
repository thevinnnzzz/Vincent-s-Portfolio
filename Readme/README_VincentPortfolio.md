# Vincent's Portfolio website
### 🎨 Modern, Interactive Personal Portfolio

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![FontAwesome](https://img.shields.io/badge/Font_Awesome-528DD7?style=for-the-badge&logo=font-awesome&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## 📋 Project Overview

**Vincent's Portfolio** is a professionally designed, fully responsive personal website built to showcase my skills, projects, certifications, and professional experience. It features a modern, clean aesthetic with advanced animations, dark mode support, and a seamless user experience.

The website serves as a digital resume and a central hub for my professional identity, demonstrating my proficiency in frontend development and UX design.

### 🎯 Purpose & Goals

-   **Professional Showcase**: Display projects, skills, and achievements in an engaging manner.
-   **User Experience Focus**: Provide a smooth, interactive experience with animations and intuitive navigation.
-   **Accessible Design**: Ensure the site is accessible and looks great on all devices (mobile, tablet, desktop).
-   **Theme Customization**: Offer both Dark and Light modes for user preference.

---

## ✨ Key Features

### Core Functionality

-   **🎨 Dynamic Theme System**
    -   Dark/Light mode toggle with persistence (localStorage).
    -   Flicker-free page transitions using early theme detection.
    -   Consistent theming across all pages and components.

-   **✨ Advanced Animations**
    -   **Scroll Reveal**: Elements fade, slide, and scale in as you scroll.
    -   **Typing Animation**: Dynamic typewriting effect in the hero section (Typed.js).
    -   **Hover Effects**: 3D tilts, glows, bounces, and underlines on interaction.
    -   **Parallax Effects**: Subtle background movement for a immersive feel.

-   **📂 Project Showcase**
    -   **Dynamic Loading**: Project details loaded from a central data file (`projects-data.js`).
    -   **Dedicated Overview Page**: Detailed view for each project with features, tech stack, and screenshots.
    -   **Image Viewer**: Custom lightbox for viewing project screenshots (e.g., iDENTify).

-   **📜 Certificates & Awards**
    -   Categorized tab system (Networking, Cybersecurity, AI, Multimedia).
    -   Interactive cards with hover details.

-   **📱 Responsive Design**
    -   Mobile-first approach using Tailwind CSS.
    -   Collapsible mobile navigation menu.
    -   Adaptive layouts for different screen sizes.

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose |
|------------|---------|
| **HTML5** | Semantic structure and content |
| **Tailwind CSS** | Utility-first styling and responsive design |
| **JavaScript (ES6+)** | Logic, animations, and data handling |

### Libraries & Tools

| Library | Purpose |
|---------|---------|
| **Font Awesome** | Icons for UI elements and social links |
| **Typed.js** | Typewriting animation effect |
| **Google Fonts** | Typography (Poppins) |
| **Intersection Observer** | Scroll-triggered animations |

---

## 📂 Project Structure

```
Vincent-s-Portfolio-main/
│
├── 📄 index.html                # Main landing page
├── 📄 project-overview.html     # Project details template
├── 📄 certificates.html         # Certificates and awards page
│
├── 📁 js/ (Logic)
│   ├── script.js               # Main global logic (animations, theme)
│   ├── project-overview.js     # Logic for project detail page
│   ├── certificates.js         # Logic for certificates page
│   ├── projects-data.js        # Data source for projects
│   └── image-viewer.js         # Lightbox component
│
├── 📄 tailwind-config.js        # Tailwind configuration
│
└── 📁 Readme/                   # Documentation
    ├── README_VincentPortfolio.md
    └── [Other Project READMEs]
```

---

## 🚀 Installation & Setup

### Prerequisites

-   A modern web browser (Chrome, Firefox, Edge, Safari).
-   No server required (Static HTML/JS), but a local server (e.g., Live Server) is recommended for best performance.

### Running the Project

1.  **Clone or Download**
    ```bash
    git clone https://github.com/thevinnnzzz/Vincent-s-Portfolio.git
    ```

2.  **Open the Project**
    -   Simply open `index.html` in your web browser.
    -   **OR**
    -   Use VS Code "Live Server" extension to launch.

---

## 📖 Usage Guide

### Navigation
-   **Home**: Introduction and hero section.
-   **About**: Personal bio and background.
-   **Skills**: Technical proficiency with animated progress bars.
-   **Projects**: Grid of featured projects. Click "View Project" for details.
-   **Experience**: Timeline of education and work history.
-   **Certificates**: Dedicated page for awards and certs (Link in nav).
-   **Contact**: Form and social media links.

### Theme Toggle
-   Click the **Moon/Sun icon** in the navbar (or mobile menu) to switch between Dark and Light modes.
-   Your preference is saved automatically for future visits.

---

## 🚧 Future Improvements

-   [ ] **Backend Integration**: Connect contact form to a secure backend (e.g., EmailJS or Node.js).
-   [ ] **Blog Section**: Add a blog to share technical insights and articles.
-   [ ] **CMS**: Implement a CMS to manage projects and certificates without editing code.
-   [ ] **PWA Support**: Convert the site into a Progressive Web App for offline access.
-   [ ] **Performance**: Further optimize image loading and asset bundling.

---

## 👨‍💻 Developer Information

| Field | Details |
|-------|---------|
| **Developer** | Vincent Dela Cruz |
| **Role** | Frontend Developer / IT Student |
| **Email** | delacruzvincent085@gmail.com |
| **Location** | Batangas, Philippines |

### Social Links
-   [Facebook](https://www.facebook.com/thevinnnzzz)
-   [Instagram](https://www.instagram.com/the_vinnnzzz/)
-   [GitHub](https://github.com/thevinnnzzz)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
© 2023 Vincent Dela Cruz. All rights reserved.
