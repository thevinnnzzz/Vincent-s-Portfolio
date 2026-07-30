class ThemeManager {
    static THEMES = {
        DARK: 'dark-theme',
        LIGHT: 'light-theme'
    };

    // Set the default theme to LIGHT
    static currentTheme = ThemeManager.THEMES.LIGHT;

    // Apply the default theme on script load
    static initializeTheme() {
        const html = document.documentElement;
        html.classList.add(this.currentTheme);
    }

    // Toggle between LIGHT and DARK themes
    static toggleTheme() {
        const html = document.documentElement;
        if (this.currentTheme === this.THEMES.DARK) {
            html.classList.replace(this.THEMES.DARK, this.THEMES.LIGHT);
            this.currentTheme = this.THEMES.LIGHT;
        } else {
            html.classList.replace(this.THEMES.LIGHT, this.THEMES.DARK);
            this.currentTheme = this.THEMES.DARK;
        }
        return this.currentTheme;
    }
}

// Initialize the theme when the script loads
ThemeManager.initializeTheme();


class NotificationSystem {
    static notifications = [
        {
            id: 1,
            type: 'success',
            title: 'Deployment Successful',
            message: 'Your latest deployment was completed successfully.',
            time: '2 minutes ago',
            unread: true,
            icon: 'check-circle'
        },
        {
            id: 2,
            type: 'warning',
            title: 'Server Load Alert',
            message: 'Server load is at 92% capacity. Consider optimizing.',
            time: '5 minutes ago',
            unread: true,
            icon: 'exclamation-circle',
            actions: ['View Details', 'Dismiss']
        },
        {
            id: 3,
            type: 'info',
            title: 'New User Registration',
            message: 'Sarah Smith has registered as a new user.',
            time: '10 minutes ago',
            unread: true,
            icon: 'user-plus'
        }
    ];

    static show(message, type = 'success', duration = 3000) {
        if (!this.shouldShowNotification()) return;

        const container = document.getElementById('notification-container');
        const notification = document.createElement('div');
        notification.className = `custom-notification ${type}`;

        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'times-circle' : 'exclamation-circle'}"></i>
            <div class="notification-content">
                <p>${message}</p>
            </div>
        `;

        container.appendChild(notification);
        notification.style.animation = 'slideIn 0.3s ease forwards';

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }, duration);
    }

    static shouldShowNotification() {
        const lastAction = localStorage.getItem('lastAction');
        const currentTime = Date.now();

        const allowedActions = ['settings', 'markAllRead', 'clearNotifications'];
        return allowedActions.includes(lastAction);
    }

    static init() {
        const notificationList = document.querySelector('.notification-list');
        const notificationTrigger = document.querySelector('.notification-trigger');
        const notificationsDropdown = document.querySelector('.notifications-dropdown');
        const markAllRead = document.querySelector('.action-button.secondary');
        const filterPills = document.querySelectorAll('.filter-pill');
        const filterButtons = document.querySelectorAll('.filter-button');

        this.renderNotifications();

        if (notificationTrigger) {
            notificationTrigger.addEventListener('click', (e) => {
                e.stopPropagation();
                notificationsDropdown.classList.toggle('active');
            });
        }

        if (markAllRead) {
            markAllRead.addEventListener('click', () => {
                localStorage.setItem('lastAction', 'markAllRead');
                this.notifications.forEach(notif => notif.unread = false);
                this.renderNotifications();
            });
        }

        filterPills.forEach(pill => {
            pill.addEventListener('click', () => {
                filterPills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                this.renderNotifications(pill.textContent.toLowerCase());
            });
        });

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                button.classList.add('active');
            });
        });

        document.addEventListener('click', (e) => {
            if (!notificationsDropdown?.contains(e.target)) {
                notificationsDropdown?.classList.remove('active');
            }
        });
    }

    static renderNotifications(filter = 'all') {
        const notificationList = document.querySelector('.notification-list');
        if (!notificationList) return;

        let filteredNotifications = this.notifications;
        if (filter === 'unread') {
            filteredNotifications = this.notifications.filter(n => n.unread);
        } else if (filter === 'important') {
            filteredNotifications = this.notifications.filter(n => n.type === 'warning');
        }

        notificationList.innerHTML = filteredNotifications.map(notification => `
            <div class="notification-item ${notification.unread ? 'unread' : ''}" data-id="${notification.id}">
                <div class="notification-icon ${notification.type}">
                    <i class="fas fa-${notification.icon}"></i>
                </div>
                <div class="notification-content">
                    <div class="notification-title">${notification.title}</div>
                    <div class="notification-message">${notification.message}</div>
                    <div class="notification-time">${notification.time}</div>
                    ${notification.actions ? `
                        <div class="notification-actions">
                            ${notification.actions.map(action => `
                                <button class="notification-button ${action.toLowerCase() === 'view details' ? 'view' : 'dismiss'}">
                                    ${action === 'View Details' ?
                '<i class="fas fa-eye"></i> View' :
                '<i class="fas fa-times"></i> Dismiss'}
                                </button>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
            </div>
        `).join('');

        const badge = document.querySelector('.notification-badge');
        const unreadCount = this.notifications.filter(n => n.unread).length;
        if (badge) {
            badge.textContent = unreadCount;
            badge.style.display = unreadCount > 0 ? 'block' : 'none';
        }

        const notificationItems = notificationList.querySelectorAll('.notification-item');
        notificationItems.forEach(item => {
            item.addEventListener('click', () => {
                const id = parseInt(item.dataset.id);
                const notification = this.notifications.find(n => n.id === id);
                if (notification && notification.unread) {
                    notification.unread = false;
                    this.renderNotifications(filter);
                }
            });
        });
    }
}

class NavigationSystem {
    static init() {
        const navLinks = document.querySelectorAll('.nav-links li');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.switchSection(link.dataset.section, link.dataset.content);
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }

    static switchSection(section, contentId) {
        document.querySelectorAll('.content-section').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(contentId).classList.add('active');
    }
}

class ChartManager {
    static revenueChartOptions = {
        series: [{
            name: 'Revenue',
            data: [31000, 40000, 28000, 51000, 42000, 109000, 100000]
        }],
        chart: {
            type: 'area',
            height: 300,
            background: 'transparent',
            toolbar: { show: false },
            zoom: { enabled: false }
        },
        colors: ['#6d5acd'],
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.2,
                stops: [0, 90, 100]
            }
        },
        dataLabels: { enabled: false },
        stroke: {
            curve: 'smooth',
            width: 2
        },
        grid: {
            borderColor: '#1a1d25',
            strokeDashArray: 5
        },
        xaxis: {
            categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            labels: {
                style: { colors: '#a0a3bd' }
            }
        },
        yaxis: {
            labels: {
                style: { colors: '#a0a3bd' },
                formatter: (value) => `$${value.toLocaleString()}`
            }
        },
        tooltip: { theme: 'dark' }
    };

    static userActivityChartOptions = {
        series: [{
            name: 'New Users',
            data: [44, 55, 57, 56, 61, 58, 63]
        }, {
            name: 'Returning Users',
            data: [76, 85, 101, 98, 87, 105, 91]
        }],
        chart: {
            type: 'bar',
            height: 300,
            background: 'transparent',
            toolbar: { show: false },
            stacked: true
        },
        colors: ['#4361ee', '#6d5acd'],
        plotOptions: {
            bar: {
                horizontal: false,
                borderRadius: 5,
                columnWidth: '70%'
            }
        },
        dataLabels: { enabled: false },
        grid: {
            borderColor: '#1a1d25',
            strokeDashArray: 5
        },
        xaxis: {
            categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            labels: {
                style: { colors: '#a0a3bd' }
            }
        },
        yaxis: {
            labels: {
                style: { colors: '#a0a3bd' }
            }
        },
        tooltip: { theme: 'dark' }
    };

    static salesTrendOptions = {
        series: [{
            name: 'Sales',
            data: [4800, 5200, 4900, 6500, 7200, 6800, 7400]
        }],
        chart: {
            type: 'area',
            height: 350,
            background: 'transparent',
            toolbar: { show: false }
        },
        colors: ['#4361ee'],
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.2,
                stops: [0, 90, 100]
            }
        },
        stroke: { curve: 'smooth', width: 2 },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            labels: { style: { colors: '#a0a3bd' } }
        },
        yaxis: {
            labels: {
                style: { colors: '#a0a3bd' },
                formatter: (value) => `$${value}`
            }
        },
        tooltip: { theme: 'dark' }
    };

    static conversionOptions = {
        series: [76, 24],
        chart: {
            type: 'donut',
            height: 350,
            background: 'transparent'
        },
        colors: ['#4361ee', '#6d5acd'],
        labels: ['Converted', 'Not Converted'],
        plotOptions: {
            pie: {
                donut: {
                    size: '75%'
                }
            }
        },
        legend: {
            position: 'bottom',
            labels: { colors: '#a0a3bd' }
        },
        tooltip: { theme: 'dark' }
    };

    static init() {
        const charts = [
            {
                element: "#revenueChart",
                options: this.revenueChartOptions
            },
            {
                element: "#userActivityChart",
                options: this.userActivityChartOptions
            },
            {
                element: "#salesTrendChart",
                options: this.salesTrendOptions
            },
            {
                element: "#conversionChart",
                options: this.conversionOptions
            }
        ];

        charts.forEach(chart => {
            const element = document.querySelector(chart.element);
            if (element) {
                new ApexCharts(element, chart.options).render();
            }
        });
    }
}

class ActivityManager {
    static activities = [
        {
            user: 'Ralph Alday',
            action: 'Created a new project',
            time: '2 minutes ago',
            icon: 'folder-plus',
            color: '#4361ee'
        },
        {
            user: 'Jonas Castillo',
            action: 'Uploaded new files',
            time: '5 minutes ago',
            icon: 'upload',
            color: '#6d5acd'
        },
        {
            user: 'Josh Bading',
            action: 'Completed task: Dashboard UI',
            time: '10 minutes ago',
            icon: 'check-circle',
            color: '#2ed573'
        }
    ];

    static init() {
        const activityList = document.getElementById('activityList');
        if (activityList) {
            this.activities.forEach(activity => {
                const activityItem = document.createElement('div');
                activityItem.className = 'activity-item';
                activityItem.innerHTML = `
                    <div class="activity-icon" style="background: ${activity.color}20; color: ${activity.color}">
                        <i class="fas fa-${activity.icon}"></i>
                    </div>
                    <div class="activity-content">
                        <p><strong>${activity.user}</strong> ${activity.action}</p>
                        <span>${activity.time}</span>
                    </div>
                `;
                activityList.appendChild(activityItem);
            });
        }
    }
}

class CounterAnimation {
    static init() {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const prefix = counter.hasAttribute('data-prefix') ? counter.getAttribute('data-prefix') : '';
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = `${prefix}${Math.ceil(current).toLocaleString()}`;
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = `${prefix}${target.toLocaleString()}`;
                }
            };

            updateCounter();
        });
    }
}

class ProfileDropdown {
    static init() {
        const profileName = document.querySelector('.profile-info .profile-name');
        const profileRole = document.querySelector('.profile-info .profile-role');
        const headerName = document.querySelector('.header-info h4');
        const headerEmail = document.querySelector('.header-info span');

        // Retrieve user details from localStorage
        const currentUserEmail = localStorage.getItem('currentUserEmail');
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const currentUser = users.find(user => user.email === currentUserEmail);

        if (currentUser) {
            const { firstName, lastName, email, role } = currentUser;

            // Update profile fields dynamically
            if (profileName) profileName.textContent = `${firstName} ${lastName}`;
            if (profileRole) profileRole.textContent = role || 'User'; // Default to 'User' if no role is defined
            if (headerName) headerName.textContent = `${firstName} ${lastName}`; // Update header name
            if (headerEmail) headerEmail.textContent = email; // Update header email
        }

        // Toggle profile dropdown visibility
        const profileTrigger = document.querySelector('.profile-trigger');
        const profileDropdown = document.querySelector('.profile-dropdown');

        if (profileTrigger && profileDropdown) {
            profileTrigger.addEventListener('click', (e) => {
                e.stopPropagation();
                profileDropdown.classList.toggle('active');
            });

            document.addEventListener('click', (e) => {
                if (!profileDropdown.contains(e.target)) {
                    profileDropdown.classList.remove('active');
                }
            });

            const themeToggle = document.getElementById('theme-toggle');
            if (themeToggle) {
                themeToggle.addEventListener('change', () => {
                    const newTheme = ThemeManager.toggleTheme();
                });
            }
        }
    }
}

class ProfileAvatar {
    static init() {
        const avatarElements = document.querySelectorAll('.avatar-text');

        // Retrieve user details from localStorage
        const currentUserEmail = localStorage.getItem('currentUserEmail');
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const currentUser = users.find(user => user.email === currentUserEmail);

        if (currentUser) {
            const { firstName, lastName } = currentUser;
            const initials = `${firstName[0]}${lastName[0]}`.toUpperCase(); // Get initials

            // Update avatar text
            avatarElements.forEach(avatar => {
                avatar.textContent = initials;
            });
        }
    }
}

// Initialize components on DOMContentLoaded
window.addEventListener('DOMContentLoaded', () => {
    ProfileDropdown.init();
    ProfileAvatar.init();
});





document.addEventListener('DOMContentLoaded', () => {
    NavigationSystem.init();
    ChartManager.init();
    ActivityManager.init();
    CounterAnimation.init();
    NotificationSystem.init();

    const settingsLink = document.querySelector('.dropdown-menu li:nth-child(2)');
    if (settingsLink) {
        settingsLink.addEventListener('click', () => {
            localStorage.setItem('lastAction', 'settings');
        });
    }
});

// admin-js.js
document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logout-btn');

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            window.location.href = 'shop1-html.html';
        });
    }
});


// users content
document.addEventListener('DOMContentLoaded', () => {
    const addUserButton = document.getElementById('add-user-btn');
    const userModal = document.getElementById('user-modal');
    const saveUserButton = document.getElementById('save-user-btn');
    const cancelUserButton = document.getElementById('cancel-user-btn');
    const firstNameInput = document.getElementById('first-name');
    const lastNameInput = document.getElementById('last-name');
    const emailInput = document.getElementById('email');
    const roleInput = document.getElementById('role');
    let editingUserEmail = null; // To track which user is being edited

    function populateBestUsers() {
        const bestUsersList = document.getElementById('best-users-list');
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const loggedInUsers = JSON.parse(localStorage.getItem('loggedInUsers')) || [];
        const currentAdminEmail = localStorage.getItem('currentUserEmail');

        const filteredLoggedInUsers = loggedInUsers.filter(email => email !== currentAdminEmail);

        if (filteredLoggedInUsers.length === 0) {
            bestUsersList.innerHTML = '<p>No users have logged in yet.</p>';
            return;
        }

        bestUsersList.innerHTML = ""; // Clear existing content
        filteredLoggedInUsers.forEach(email => {
            const user = users.find(u => u.email === email);
            if (user) {
                const userItem = document.createElement('div');
                userItem.className = 'user-item';
                userItem.innerHTML = `
                    <img src="https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=ffa502&color=fff" alt="${user.firstName} ${user.lastName}">
                    <div class="user-content">
                        <div class="user-header">
                            <h4>${user.firstName} ${user.lastName}</h4>
                        </div>
                        <p>Email: ${user.email}</p>
                    </div>
                    <div class="user-actions">
                        <button class="edit-user-btn">Edit</button>
                        <button class="delete-user-btn">Delete</button>
                    </div>
                `;

                userItem.querySelector('.edit-user-btn').addEventListener('click', () => {
                    editUser(user.email);
                });

                userItem.querySelector('.delete-user-btn').addEventListener('click', () => {
                    confirmDeleteUser(user.email, userItem); // Confirmation before deleting
                });

                bestUsersList.appendChild(userItem);
            }
        });
    }

    function deleteUser(email, userItem) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const loggedInUsers = JSON.parse(localStorage.getItem('loggedInUsers')) || [];

        const updatedLoggedInUsers = loggedInUsers.filter(userEmail => userEmail !== email);
        localStorage.setItem('loggedInUsers', JSON.stringify(updatedLoggedInUsers));

        userItem.remove();

        const bestUsersList = document.getElementById('best-users-list');
        if (updatedLoggedInUsers.length === 0) {
            bestUsersList.innerHTML = '<p>No users have logged in yet.</p>';
        }
    }

    // Confirmation dialog before deleting a user
    function confirmDeleteUser(email, userItem) {
        const confirmDeletion = confirm("Are you sure you want to delete this user?");
        if (confirmDeletion) {
            deleteUser(email, userItem); // Proceed with deletion if confirmed
        }
    }

    // Function to open the modal for adding a user
    addUserButton.addEventListener('click', () => {
        editingUserEmail = null; // Reset editing mode for adding a new user
        userModal.style.display = 'block'; // Show the modal
        firstNameInput.value = '';
        lastNameInput.value = '';
        emailInput.value = '';
        roleInput.value = 'user'; // Default role
        document.getElementById('modal-title').textContent = 'Add User'; // Set modal title for adding
    });

    // Function to save the user data (both add and edit)
    saveUserButton.addEventListener('click', () => {
        const firstName = firstNameInput.value.trim();
        const lastName = lastNameInput.value.trim();
        const email = emailInput.value.trim();
        const role = roleInput.value;

        if (firstName && lastName && email && role) {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const loggedInUsers = JSON.parse(localStorage.getItem('loggedInUsers')) || [];

            if (editingUserEmail) {
                // Edit existing user
                const userIndex = users.findIndex(u => u.email === editingUserEmail);
                if (userIndex !== -1) {
                    users[userIndex].firstName = firstName;
                    users[userIndex].lastName = lastName;
                    users[userIndex].email = email;
                    users[userIndex].role = role;
                    localStorage.setItem('users', JSON.stringify(users));
                    populateBestUsers(); // Refresh the user list
                }
            } else {
                // Add new user
                const newUser = { firstName, lastName, email, role };
                users.push(newUser);
                loggedInUsers.push(email); // Assuming the user is logged in after creation

                localStorage.setItem('users', JSON.stringify(users));
                localStorage.setItem('loggedInUsers', JSON.stringify(loggedInUsers));

                populateBestUsers(); // Refresh the user list
            }

            userModal.style.display = 'none'; // Close the modal
        } else {
            alert('Please fill in all fields');
        }
    });

    // Function to cancel the action
    cancelUserButton.addEventListener('click', () => {
        userModal.style.display = 'none'; // Close the modal
    });

    // Function to open the modal for editing a user
    function editUser(email) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email);
        if (user) {
            editingUserEmail = email; // Set the email of the user being edited
            firstNameInput.value = user.firstName;
            lastNameInput.value = user.lastName;
            emailInput.value = user.email;
            roleInput.value = user.role;

            document.getElementById('modal-title').textContent = 'Edit User'; // Set modal title for editing
            userModal.style.display = 'block'; // Show the modal
        }
    }

    // Run the function on page load
    if (document.getElementById('best-users-content')) {
        populateBestUsers();
    }
});

//function for add product

document.addEventListener('DOMContentLoaded', function () {
    const addProductButton = document.querySelector('.add-product');
    const addProductForm = document.getElementById('add-product-form');
    const productForm = document.getElementById('product-form');
    const productImageInput = document.getElementById('product-image');
    const imagePreview = document.getElementById('image-preview');
    const previewImg = document.getElementById('preview-img');
    let editingRow = null; // Track which product is being edited

    // Toggle visibility of the Add Product Form
    addProductButton.addEventListener('click', function () {
        addProductForm.style.display = addProductForm.style.display === 'none' ? 'block' : 'none';
    });

    // Display image preview when an image is selected
    productImageInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                previewImg.src = e.target.result;
                imagePreview.style.display = 'block'; // Show the preview
            };
            reader.readAsDataURL(file);
        } else {
            imagePreview.style.display = 'none'; // Hide preview if no file is selected
        }
    });

    // Handle adding a new product
    productForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Get the input values
        const productName = document.getElementById('product-name').value;
        const productCategory = document.getElementById('product-category').value;
        const productSales = document.getElementById('product-sales').value;
        const productStock = document.getElementById('product-stock').value;
        const productPrice = document.getElementById('product-price').value;

        // Create or update a product row
        const newRow = editingRow || document.createElement('div');
        newRow.classList.add('products-row');

        newRow.innerHTML = `
            <div class="product-cell image">
                <img src="${previewImg.src}" alt="product">
                <span>${productName}</span>
            </div>
            <div class="product-cell category">${productCategory}</div>
            <div class="product-cell sales">${productSales}</div>
            <div class="product-cell stock">${productStock}</div>
            <div class="product-cell price">$${productPrice}</div>
            <div class="product-cell actions">
                <button class="edit-button">Edit</button>
                <button class="delete-button">Delete</button>
            </div>
        `;

        // If this is a new product, append it, otherwise replace the existing row
        if (!editingRow) {
            document.querySelector('.products-area-wrapper').appendChild(newRow);
        } else {
            editingRow.replaceWith(newRow);
        }

        // Reset the form and hide it
        productForm.reset();
        imagePreview.style.display = 'none';
        addProductForm.style.display = 'none';
        editingRow = null; // Reset editing state
    });

    // Handle edit button click
    document.querySelector('.products-area-wrapper').addEventListener('click', function (event) {
        if (event.target && event.target.classList.contains('edit-button')) {
            const row = event.target.closest('.products-row');
            editProduct(row);
        }
    });

    // Handle delete button click
    document.querySelector('.products-area-wrapper').addEventListener('click', function (event) {
        if (event.target && event.target.classList.contains('delete-button')) {
            const row = event.target.closest('.products-row');

            // Show confirmation before deleting
            const confirmDelete = window.confirm('Are you sure you want to delete this product?');
            if (confirmDelete) {
                row.remove(); // If confirmed, remove the product row
            }
        }
    });

    // Function to prefill the form with the product's current details
    function editProduct(row) {
        // Set the row as the editing target
        editingRow = row;

        // Fill in the form with the current product data
        document.getElementById('product-name').value = row.querySelector('.image span').innerText;
        document.getElementById('product-category').value = row.querySelector('.category').innerText;
        document.getElementById('product-sales').value = row.querySelector('.sales').innerText;
        document.getElementById('product-stock').value = row.querySelector('.stock').innerText;
        document.getElementById('product-price').value = row.querySelector('.price').innerText.replace('$', '');

        const imgSrc = row.querySelector('.image img').src;
        previewImg.src = imgSrc;
        imagePreview.style.display = 'block';

        // Show the form
        addProductForm.style.display = 'block';
    }
});


// delete products function
