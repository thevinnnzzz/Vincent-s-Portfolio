/**
 * iDENTify Image Viewer Component
 * Interactive lightbox image viewer with carousel toggle option
 */

class ImageViewer {
    constructor(config) {
        this.config = config;
        this.currentUserType = config.userTypes ? config.userTypes[0].id : 'admin';
        this.images = {};
        this.currentImageIndex = 0;
        this.isLightboxOpen = false;
        this.viewMode = 'grid';
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.animating = false;

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

        const userTypes = this.config.userTypes || [
            { id: 'admin', name: 'Admin', icon: 'fas fa-user-shield' },
            { id: 'cod', name: 'COD', icon: 'fas fa-users-cog' },
            { id: 'clinician', name: 'Clinician', icon: 'fas fa-user-md' },
            { id: 'ci', name: 'Clinical Instructor', icon: 'fas fa-chalkboard-teacher' }
        ];

        const iconMap = {
            'dashboard': 'fas fa-chart-line',
            'students': 'fas fa-users',
            'attendance': 'fas fa-clipboard-check',
            'reports': 'fas fa-file-alt',
            'user-management': 'fas fa-user-cog',
            'teacher': 'fas fa-chalkboard-teacher',
            'screens': 'fas fa-mobile-alt'
        };

        container.innerHTML = userTypes.map(type => `
            <button 
                class="user-type-btn ${type.id === this.currentUserType ? 'active' : ''}" 
                data-type="${type.id}"
            >
                <i class="${type.icon || iconMap[type.id] || 'fas fa-image'}"></i>
                ${type.name}
            </button>
        `).join('');

        container.querySelectorAll('.user-type-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const type = e.currentTarget.dataset.type;
                this.switchUserType(type);
            });
        });
    }

    renderViewToggle() {
        const container = document.getElementById('image-viewer-container');
        if (!container) return;

        const toggleHtml = `
            <div class="view-toggle fade-in">
                <button class="view-toggle-btn ${this.viewMode === 'grid' ? 'active' : ''}" data-view="grid">
                    <i class="fas fa-th"></i> Grid
                </button>
                <button class="view-toggle-btn ${this.viewMode === 'carousel' ? 'active' : ''}" data-view="carousel">
                    <i class="fas fa-images"></i> Carousel
                </button>
            </div>
        `;

        const existingToggle = container.querySelector('.view-toggle');
        if (existingToggle) {
            existingToggle.outerHTML = toggleHtml;
        } else {
            container.insertAdjacentHTML('afterbegin', toggleHtml);
        }

        container.querySelectorAll('.view-toggle-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const view = e.currentTarget.dataset.view;
                this.switchViewMode(view);
            });
        });
    }

    switchViewMode(mode) {
        if (this.viewMode === mode) return;
        this.viewMode = mode;
        this.renderViewToggle();

        const images = this.images[this.currentUserType];
        if (!images || images.length === 0) return;

        if (mode === 'carousel') {
            this.renderCarousel(images);
        } else {
            this.renderImageGrid(images);
        }
    }

    async switchUserType(userType) {
        if (userType === this.currentUserType) return;

        this.currentUserType = userType;

        document.querySelectorAll('.user-type-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.type === userType);
        });

        await this.loadImages(userType);
    }

    async loadImages(userType) {
        const container = document.getElementById('image-viewer-container');
        if (!container) return;

        container.innerHTML = `
            <div class="loading-container fade-in">
                <div class="loading-spinner"></div>
                <p class="loading-text">Loading ${this.getUserTypeName(userType)} screenshots...</p>
            </div>
        `;

        try {
            const images = await this.fetchImagesForUserType(userType);

            if (!images || images.length === 0) {
                this.showEmptyState(userType);
                return;
            }

            this.images[userType] = images;
            this.currentImageIndex = 0;
            this.viewMode = 'grid';

            if (this.viewMode === 'carousel') {
                this.renderCarousel(images);
            } else {
                this.renderImageGrid(images);
            }
        } catch (error) {
            console.error('Error loading images:', error);
            this.showEmptyState(userType);
        }
    }

    async fetchImagesForUserType(userType) {
        const basePath = this.config.basePath || 'images/Projects/iDENTify_layout/';

        if (this.config.images && Array.isArray(this.config.images)) {
            return this.config.images.map((filename, index) => ({
                src: basePath + filename,
                caption: this.formatCaption(filename),
                index: index
            }));
        }

        const isNestedStructure = this.config.userTypes && this.config.userTypes.some(t => t.id === 'admin' || t.id === 'cod');

        let imageFiles;
        if (isNestedStructure) {
            const nestedPath = basePath + userType + '/';
            imageFiles = this.discoverImages(nestedPath, userType);
        } else {
            imageFiles = this.discoverFlatImages(basePath, userType);
        }

        return imageFiles.map((filename, index) => ({
            src: (isNestedStructure ? basePath + userType + '/' : basePath) + filename,
            caption: this.formatCaption(filename),
            index: index
        }));
    }

    discoverFlatImages(basePath, userType) {
        const flatImageMap = {
            'teacher': ['login_form.png', 'dashboard_tab.png', 'Students_tab.png', 'Attendance_tab.png', 'Reports_tab.png', 'User_management_tab.png'],
            'dashboard': ['dashboard_tab.png'],
            'students': ['Students_tab.png'],
            'attendance': ['Attendance_tab.png'],
            'reports': ['Reports_tab.png'],
            'user-management': ['User_management_tab.png'],
            'login': ['login_form.png']
        };

        return flatImageMap[userType] || [];
    }

    discoverImages(basePath, userType) {
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
        return filename
            .replace(/\.(png|jpg|jpeg|webp)$/i, '')
            .replace(/[-_]/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    getUserTypeName(userType) {
        if (this.config.userTypes) {
            const found = this.config.userTypes.find(t => t.id === userType);
            if (found) return found.name;
        }

        const names = {
            'admin': 'Admin',
            'cod': 'COD',
            'clinician': 'Clinician',
            'ci': 'Clinical Instructor',
            'dashboard': 'Dashboard',
            'students': 'Students',
            'attendance': 'Attendance',
            'reports': 'Reports',
            'user-management': 'User Management',
            'teacher': 'Teacher',
            'screens': 'App Screens'
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

        container.querySelectorAll('.image-grid-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const index = parseInt(e.currentTarget.dataset.index);
                this.openLightbox(index);
            });
        });

        this.renderViewToggle();
    }

    renderCarousel(images) {
        const container = document.getElementById('image-viewer-container');
        if (!container) return;

        container.innerHTML = `
            <div class="carousel-wrapper fade-in">
                <div class="carousel-container">
                    <button class="carousel__arrow carousel__arrow--left" aria-label="Previous screenshot">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <div class="carousel" id="carousel"></div>
                    <button class="carousel__arrow carousel__arrow--right" aria-label="Next screenshot">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
                <div class="carousel__footer">
                    <div class="carousel__counter" id="carousel-counter">1 / ${images.length}</div>
                </div>
            </div>
        `;

        const carousel = document.getElementById('carousel');

        const left = document.createElement('div');
        const center = document.createElement('div');
        const right = document.createElement('div');
        const out = document.createElement('div');

        left.classList.add('carousel__item', 'carousel__item--left');
        center.classList.add('carousel__item', 'carousel__item--center');
        right.classList.add('carousel__item', 'carousel__item--right');
        out.classList.add('carousel__item', 'carousel__item--out', 'carousel__item--right');

        carousel.appendChild(left);
        carousel.appendChild(center);
        carousel.appendChild(right);
        carousel.appendChild(out);

        this.carouselElements = { left, center, right, out, carousel };
        this.currentCarouselIndex = 0;

        this.updateCarouselImages(images, 0);

        const arrowLeft = container.querySelector('.carousel__arrow--left');
        const arrowRight = container.querySelector('.carousel__arrow--right');

        arrowLeft.addEventListener('click', () => this.carouselSlide(false));
        arrowRight.addEventListener('click', () => this.carouselSlide(true));

        this.renderViewToggle();
    }

    updateCarouselImages(images, centerIndex) {
        const el = this.carouselElements;
        if (!el) return;

        const length = images.length;
        const getIdx = (offset) => ((centerIndex + offset) % length + length) % length;

        el.out.style.backgroundImage = `url('${images[getIdx(-1)].src}')`;
        el.left.style.backgroundImage = `url('${images[getIdx(-1)].src}')`;
        el.center.style.backgroundImage = `url('${images[getIdx(0)].src}')`;
        el.right.style.backgroundImage = `url('${images[getIdx(1)].src}')`;

        el.out.classList.add('carousel__item--out');
        el.out.classList.add('carousel__item--right');

        const counter = document.getElementById('carousel-counter');
        if (counter) counter.textContent = `${centerIndex + 1} / ${length}`;
    }

    carouselSlide(forward) {
        if (this.animating) return;
        this.animating = true;

        const images = this.images[this.currentUserType];
        if (!images || images.length < 2) {
            this.animating = false;
            return;
        }

        const el = this.carouselElements;
        if (!el) {
            this.animating = false;
            return;
        }

        const length = images.length;
        const newIndex = forward
            ? (this.currentCarouselIndex + 1) % length
            : (this.currentCarouselIndex - 1 + length) % length;

        if (forward) {
            el.out.style.backgroundImage = `url('${images[(newIndex + 1) % length].src}')`;
            el.out.classList.add('static');

            setTimeout(() => {
                el.out.classList.add('carousel__item--right');
                el.out.classList.remove('carousel__item--left');

                setTimeout(() => {
                    el.out.classList.remove('static');

                    setTimeout(() => {
                        el.left.classList.add('carousel__item--out');

                        el.center.classList.remove('carousel__item--center');
                        el.center.classList.add('carousel__item--left');

                        el.right.classList.remove('carousel__item--right');
                        el.right.classList.add('carousel__item--center');

                        el.out.classList.remove('carousel__item--out');
                    }, 50);
                }, 50);
            }, 50);
        } else {
            el.out.style.backgroundImage = `url('${images[(newIndex - 1 + length) % length].src}')`;
            el.out.classList.add('static');

            setTimeout(() => {
                el.out.classList.add('carousel__item--left');
                el.out.classList.remove('carousel__item--right');

                setTimeout(() => {
                    el.out.classList.remove('static');

                    setTimeout(() => {
                        el.right.classList.add('carousel__item--out');

                        el.center.classList.remove('carousel__item--center');
                        el.center.classList.add('carousel__item--right');

                        el.left.classList.remove('carousel__item--left');
                        el.left.classList.add('carousel__item--center');

                        el.out.classList.remove('carousel__item--out');
                    }, 50);
                }, 50);
            }, 50);
        }

        this.currentCarouselIndex = newIndex;

        const counter = document.getElementById('carousel-counter');
        if (counter) counter.textContent = `${this.currentCarouselIndex + 1} / ${length}`;

        setTimeout(() => {
            this.carouselElements.left = this.carouselElements.carousel.querySelector('.carousel__item--left:not(.carousel__item--out)');
            this.carouselElements.center = this.carouselElements.carousel.querySelector('.carousel__item--center');
            this.carouselElements.right = this.carouselElements.carousel.querySelector('.carousel__item--right:not(.carousel__item--out)');
            this.carouselElements.out = this.carouselElements.carousel.querySelector('.carousel__item--out');

            this.animating = false;
        }, 200);
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

        if (!document.getElementById('image-lightbox')) {
            this.createLightbox();
        }

        this.updateLightboxImage();

        const lightbox = document.getElementById('image-lightbox');
        setTimeout(() => lightbox.classList.add('active'), 10);

        document.body.style.overflow = 'hidden';
    }

    createLightbox() {
        const lightbox = document.createElement('div');
        lightbox.id = 'image-lightbox';
        lightbox.className = 'lightbox-overlay';
        lightbox.innerHTML = `
            <div class="lightbox-container">
                <div class="lightbox-image-wrapper">
                    <img class="lightbox-image" src="" alt="">
                    <div class="lightbox-caption"></div>
                </div>
                
                <div class="lightbox-nav">
                    <button class="lightbox-btn lightbox-prev" title="Previous (←)">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <div class="lightbox-counter"></div>
                    <button class="lightbox-btn lightbox-next" title="Next (→)">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
                
                <div class="lightbox-indicators-wrapper">
                    <div class="lightbox-indicators"></div>
                </div>
                
                <div class="swipe-indicator left">
                    <i class="fas fa-chevron-left"></i>
                </div>
                <div class="swipe-indicator right">
                    <i class="fas fa-chevron-right"></i>
                </div>
            </div>
        `;

        document.body.appendChild(lightbox);

        lightbox.querySelector('.lightbox-prev').addEventListener('click', () => this.previousImage());
        lightbox.querySelector('.lightbox-next').addEventListener('click', () => this.nextImage());

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

        this.updateIndicators();
        this.preloadAdjacentImages();
    }

    updateIndicators() {
        const images = this.images[this.currentUserType];
        const indicatorsContainer = document.querySelector('.lightbox-indicators');

        if (!indicatorsContainer || !images) return;

        indicatorsContainer.innerHTML = images.map((img, index) => `
            <div class="indicator-dot ${index === this.currentImageIndex ? 'active' : ''}" data-index="${index}"></div>
        `).join('');

        indicatorsContainer.querySelectorAll('.indicator-dot').forEach(dot => {
            dot.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                this.currentImageIndex = index;
                this.updateLightboxImage();
            });
        });

        const activeDot = indicatorsContainer.querySelector('.indicator-dot.active');
        if (activeDot) {
            activeDot.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
    }

    preloadAdjacentImages() {
        const images = this.images[this.currentUserType];
        if (!images) return;

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
                this.nextImage();
                this.showSwipeIndicator('right');
            } else {
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

function initImageViewer(config) {
    return new ImageViewer(config);
}

if (typeof window !== 'undefined') {
    window.ImageViewer = ImageViewer;
    window.initImageViewer = initImageViewer;
}