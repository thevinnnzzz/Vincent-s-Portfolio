/**
 * iDENTify Image Viewer Component
 * Interactive lightbox image viewer for showcasing system screenshots
 */

class ImageViewer {
    constructor(config) {
        this.config = config;
        this.currentUserType = 'admin';
        this.images = {};
        this.currentImageIndex = 0;
        this.isLightboxOpen = false;
        this.touchStartX = 0;
        this.touchEndX = 0;

        this.init();
    }

    async init() {
        this.renderUserTypeSelector();
        await this.loadImages(this.currentUserType);
        this.setupEventListeners();
    }

    renderUserTypeSelector() {
        const container = document.getElementById('user-type-selector');
        if (!container) return;

        const userTypes = [
            { id: 'admin', name: 'Admin', icon: 'fas fa-user-shield' },
            { id: 'cod', name: 'COD', icon: 'fas fa-users-cog' },
            { id: 'clinician', name: 'Clinician', icon: 'fas fa-user-md' },
            { id: 'ci', name: 'Clinical Instructor', icon: 'fas fa-chalkboard-teacher' }
        ];

        container.innerHTML = userTypes.map(type => `
            <button 
                class="user-type-btn ${type.id === this.currentUserType ? 'active' : ''}" 
                data-type="${type.id}"
            >
                <i class="${type.icon}"></i>
                ${type.name}
            </button>
        `).join('');

        // Add click handlers
        container.querySelectorAll('.user-type-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const type = e.currentTarget.dataset.type;
                this.switchUserType(type);
            });
        });
    }

    async switchUserType(userType) {
        if (userType === this.currentUserType) return;

        this.currentUserType = userType;

        // Update active button
        document.querySelectorAll('.user-type-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.type === userType);
        });

        // Load and display images for new user type
        await this.loadImages(userType);
    }

    async loadImages(userType) {
        const container = document.getElementById('image-viewer-container');
        if (!container) return;

        // Show loading state
        container.innerHTML = `
            <div class="loading-container fade-in">
                <div class="loading-spinner"></div>
                <p class="loading-text">Loading ${this.getUserTypeName(userType)} screenshots...</p>
            </div>
        `;

        try {
            // Get images for this user type
            const images = await this.fetchImagesForUserType(userType);

            if (!images || images.length === 0) {
                this.showEmptyState(userType);
                return;
            }

            this.images[userType] = images;
            this.renderImageGrid(images);
        } catch (error) {
            console.error('Error loading images:', error);
            this.showEmptyState(userType);
        }
    }

    async fetchImagesForUserType(userType) {
        // Get all images from the folder
        const basePath = `images/Projects/iDENTify_layout/${userType}/`;

        // For now, we'll use a predefined list of images
        // In a real implementation, you might use a directory listing API
        const imageFiles = this.discoverImages(basePath, userType);

        return imageFiles.map((filename, index) => ({
            src: basePath + filename,
            caption: this.formatCaption(filename),
            index: index
        }));
    }

    discoverImages(basePath, userType) {
        // This function tries to load images by checking common patterns
        // Since we can't list directory contents directly in the browser,
        // we'll fetch the images we know exist from the folder listing

        const imageList = {
            'admin': [
                'admin-dashboard.png', 'admin-dashboard1.png', '1stp-edit.png', '1stp-edit1.png',
                '1stp-edit2.png', '2ndp-edit.png', '2ndp-edit1.png', '2ndp-edit2.png',
                '3rdp-edit.png', '3rdp-edit1.png', '4thp-edit.png', '4thp-edit1.png',
                '4thp-edit2.png', '5th-edit.png', 'ad-1rev.png', 'ad-1rev1.png',
                'ad-2rev.png', 'ad-2rev1.png', 'ad-2rev2.png', 'ad-2rev3.png',
                'ad-2rev4.png', 'ad-3rev.png', 'ad-3rev1.png', 'ad-3rev2.png',
                'ad-3rev3.png', 'ad-4rev.png', 'ad-4rev1.png', 'ad-4rev2.png',
                'ad-4rev3.png', 'ad-5rev.png', 'ad-5rev1.png', 'ad-System-users.png',
                'ad-adduser.png', 'ad-admin-filter.png', 'ad-ci-filter.png',
                'ad-clinician-filter.png', 'ad-cod-filter.png', 'ad-delete-patient.png',
                'ad-delete-user.png', 'ad-edit-procedure-details.png', 'ad-edit-profile.png',
                'ad-edit-user.png', 'ad-log-a-proceedure.png', 'ad-log-a-proceedure1.png',
                'ad-patient-section.png', 'ad-procedure-log-report.png', 'ad-profile-pic.png',
                'ad-profile.png', 'ad-profile1.png', 'ad-settings.png',
                'ad-view-user.png', 'clinician-fingerprint-scanned.png',
                'clinician-fingerprint.png', 'logout.png'
            ],
            'cod': [
                'COD DASHBOARD.png', 'COD PATIENT SECTION.png', 'cod-Patient-Assignment-tab.png',
                'cod-add-ci.png', 'cod-edit-profile.png', 'cod-profile-pic-upload.png',
                'cod-profile.png', 'cod-profile1.png', 'cod-reassign.png',
                'cod-settings.png', 'logout.png'
            ],
            'clinician': [
                'clinician-dashboard.png', 'clinician-dashboard1.png', 'clinician-addpatient.png',
                'clinician-filter.png', 'clinician-fingerprint-scanned.png',
                'clinician-fingerprint.png', 'clinician-logproc-editprof.png',
                'clinician-logproc.png', 'clinician-logproc1.png', 'clinician-patienttab.png',
                'clinician-profile.png', 'clinician-profile1.png', 'clinician-settings.png',
                '1stp-edit.png', '1stp-edit1.png', '1stp-edit2.png', '1stp-review.png',
                '1stp-review1.png', '1stp-review2.png', '2ndp-edit.png', '2ndp-edit1.png',
                '2ndp-edit2.png', '2ndp-rev.png', '2ndp-rev1.png', '2ndp-rev2.png',
                '2ndp-rev3.png', '2ndp-rev4.png', '3rd-review.png', '3rd-review1.png',
                '3rd-review2.png', '3rd-review3.png', '3rdp-edit.png', '3rdp-edit1.png',
                '4th-review.png', '4th-review1.png', '4th-review2.png', '4th-review3.png',
                '4thp-edit.png', '4thp-edit1.png', '4thp-edit2.png', '5th-edit.png',
                '5th-review.png', 'upload-profile.png', 'logout.png'
            ],
            'ci': [
                'ci-dashboard.png', 'ci-dashboard1.png', 'ci-patienttab.png',
                'edit-profile.png', 'patient-assignment-tab-review.png',
                'patient-assignment-tab.png', 'patient-tab-edit.png', 'patient-tab-edit1.png',
                'profile.png', 'profile1.png', 'settings.png',
                'transfer-patient-history-sent.png', 'transfer-patient-outgoing.png',
                'transfer-patient.png', 'transfered-patient(another-ci).png',
                'transfered-patient-accept(another-ci).png', 'transfered-patient-reject(another-ci).png',
                'transfered-patient-transfer-history(another-ci).png',
                'transfered-patient-view-details(another-ci).png', 'upload-profile-pic.png',
                '1review.png', '1review1.png', '1review2.png', '2rev.png',
                '2rev1.png', '2rev2.png', '2rev3.png', '2rev4.png',
                '3rev.png', '3rev1.png', '3rev2.png', '3rev3.png',
                '4rev.png', '4rev1.png', '4rev2.png', '5rev.png',
                '5rev1.png', 'logout.png'
            ]
        };

        return imageList[userType] || [];
    }

    formatCaption(filename) {
        // Remove extension and format the filename
        return filename
            .replace(/\.(png|jpg|jpeg|webp)$/i, '')
            .replace(/[-_]/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    getUserTypeName(userType) {
        const names = {
            'admin': 'Admin',
            'cod': 'COD',
            'clinician': 'Clinician',
            'ci': 'Clinical Instructor'
        };
        return names[userType] || userType;
    }

    renderImageGrid(images) {
        const container = document.getElementById('image-viewer-container');
        if (!container) return;

        container.innerHTML = `
            <div class="image-grid fade-in">
                ${images.map((img, index) => `
                    <div class="image-grid-item" data-index="${index}">
                        <img src="${img.src}" alt="${img.caption}" loading="lazy">
                        <div class="image-overlay">
                            <span class="image-overlay-text">${img.caption}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        // Add click handlers to open lightbox
        container.querySelectorAll('.image-grid-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const index = parseInt(e.currentTarget.dataset.index);
                this.openLightbox(index);
            });
        });
    }

    showEmptyState(userType) {
        const container = document.getElementById('image-viewer-container');
        if (!container) return;

        container.innerHTML = `
            <div class="empty-state fade-in">
                <i class="fas fa-images"></i>
                <p class="empty-state-text">No screenshots available for ${this.getUserTypeName(userType)}</p>
            </div>
        `;
    }

    openLightbox(index) {
        this.currentImageIndex = index;
        this.isLightboxOpen = true;

        const images = this.images[this.currentUserType];
        if (!images || !images[index]) return;

        // Create lightbox if it doesn't exist
        if (!document.getElementById('image-lightbox')) {
            this.createLightbox();
        }

        this.updateLightboxImage();

        const lightbox = document.getElementById('image-lightbox');
        setTimeout(() => lightbox.classList.add('active'), 10);

        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    createLightbox() {
        const lightbox = document.createElement('div');
        lightbox.id = 'image-lightbox';
        lightbox.className = 'lightbox-overlay';
        lightbox.innerHTML = `
            <div class="lightbox-container">
                <button class="lightbox-btn lightbox-close" title="Close (ESC)">
                    <i class="fas fa-times"></i>
                </button>
                <button class="lightbox-btn lightbox-prev" title="Previous (←)">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <button class="lightbox-btn lightbox-next" title="Next (→)">
                    <i class="fas fa-chevron-right"></i>
                </button>
                
                <div class="lightbox-counter"></div>
                
                <div class="lightbox-image-wrapper">
                    <img class="lightbox-image" src="" alt="">
                    <div class="lightbox-caption"></div>
                </div>
                
                <div class="lightbox-indicators"></div>
                
                <div class="swipe-indicator left">
                    <i class="fas fa-chevron-left"></i>
                </div>
                <div class="swipe-indicator right">
                    <i class="fas fa-chevron-right"></i>
                </div>
            </div>
        `;

        document.body.appendChild(lightbox);

        // Setup lightbox event listeners
        lightbox.querySelector('.lightbox-close').addEventListener('click', () => this.closeLightbox());
        lightbox.querySelector('.lightbox-prev').addEventListener('click', () => this.previousImage());
        lightbox.querySelector('.lightbox-next').addEventListener('click', () => this.nextImage());

        // Close on overlay click
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                this.closeLightbox();
            }
        });
    }

    updateLightboxImage() {
        const images = this.images[this.currentUserType];
        if (!images || !images[this.currentImageIndex]) return;

        const currentImage = images[this.currentImageIndex];
        const lightboxImage = document.querySelector('.lightbox-image');
        const lightboxCaption = document.querySelector('.lightbox-caption');
        const lightboxCounter = document.querySelector('.lightbox-counter');

        // Add transition effect
        lightboxImage.classList.add('transitioning');

        setTimeout(() => {
            lightboxImage.src = currentImage.src;
            lightboxImage.alt = currentImage.caption;
            lightboxCaption.textContent = currentImage.caption;
            lightboxCounter.textContent = `${this.currentImageIndex + 1} / ${images.length}`;

            setTimeout(() => {
                lightboxImage.classList.remove('transitioning');
            }, 50);
        }, 200);

        // Update indicators
        this.updateIndicators();

        // Preload adjacent images
        this.preloadAdjacentImages();
    }

    updateIndicators() {
        const images = this.images[this.currentUserType];
        const indicatorsContainer = document.querySelector('.lightbox-indicators');

        if (!indicatorsContainer || !images) return;

        indicatorsContainer.innerHTML = images.map((img, index) => `
            <div class="indicator-dot ${index === this.currentImageIndex ? 'active' : ''}" data-index="${index}"></div>
        `).join('');

        // Add click handlers
        indicatorsContainer.querySelectorAll('.indicator-dot').forEach(dot => {
            dot.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                this.currentImageIndex = index;
                this.updateLightboxImage();
            });
        });

        // Scroll active indicator into view
        const activeDot = indicatorsContainer.querySelector('.indicator-dot.active');
        if (activeDot) {
            activeDot.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
    }

    preloadAdjacentImages() {
        const images = this.images[this.currentUserType];
        if (!images) return;

        // Preload next and previous images
        const nextIndex = (this.currentImageIndex + 1) % images.length;
        const prevIndex = (this.currentImageIndex - 1 + images.length) % images.length;

        [nextIndex, prevIndex].forEach(index => {
            const img = new Image();
            img.src = images[index].src;
        });
    }

    nextImage() {
        const images = this.images[this.currentUserType];
        if (!images) return;

        this.currentImageIndex = (this.currentImageIndex + 1) % images.length;
        this.updateLightboxImage();
    }

    previousImage() {
        const images = this.images[this.currentUserType];
        if (!images) return;

        this.currentImageIndex = (this.currentImageIndex - 1 + images.length) % images.length;
        this.updateLightboxImage();
    }

    closeLightbox() {
        const lightbox = document.getElementById('image-lightbox');
        if (lightbox) {
            lightbox.classList.remove('active');
            setTimeout(() => {
                this.isLightboxOpen = false;
                document.body.style.overflow = '';
            }, 300);
        }
    }

    setupEventListeners() {
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.isLightboxOpen) return;

            switch (e.key) {
                case 'Escape':
                    this.closeLightbox();
                    break;
                case 'ArrowLeft':
                    this.previousImage();
                    break;
                case 'ArrowRight':
                case ' ':
                    e.preventDefault();
                    this.nextImage();
                    break;
            }
        });

        // Touch/swipe gestures
        const lightbox = document.getElementById('image-lightbox');
        if (lightbox) {
            lightbox.addEventListener('touchstart', (e) => {
                this.touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            lightbox.addEventListener('touchend', (e) => {
                this.touchEndX = e.changedTouches[0].screenX;
                this.handleSwipe();
            }, { passive: true });
        }
    }

    handleSwipe() {
        const swipeThreshold = 50;
        const diff = this.touchStartX - this.touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next image
                this.nextImage();
                this.showSwipeIndicator('right');
            } else {
                // Swipe right - previous image
                this.previousImage();
                this.showSwipeIndicator('left');
            }
        }
    }

    showSwipeIndicator(direction) {
        const indicator = document.querySelector(`.swipe-indicator.${direction}`);
        if (indicator) {
            indicator.classList.add('visible');
            setTimeout(() => {
                indicator.classList.remove('visible');
            }, 300);
        }
    }
}

// Initialize the image viewer when the page loads
function initImageViewer(config) {
    return new ImageViewer(config);
}

// Export for use in project-overview.js
if (typeof window !== 'undefined') {
    window.ImageViewer = ImageViewer;
    window.initImageViewer = initImageViewer;
}
