document.addEventListener('DOMContentLoaded', () => {
    // Card
    const cardIcon = document.querySelector("#card-icon");
    const card = document.querySelector(".card");
    const closeCard = document.querySelector("#close-card");

    // Cart indicator
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || []; // Retrieve saved cart items
    const cartIndicator = document.getElementById("cart-indicator");
    const cartContent = document.querySelector('.card-content');
    const totalPriceElement = document.querySelector('.total-price');

    // Open Card
    cardIcon.onclick = () => {
        card.classList.add("active");
    };

    // Close Card
    closeCard.onclick = () => {
        card.classList.remove("active");
    };

    // Update Cart Indicator
    function updateCartIndicator() {
        cartIndicator.textContent = cartItems.length;
        cartIndicator.style.display = cartItems.length > 0 ? 'inline-block' : 'none';
    }

    // Add Item to Cart
    document.querySelectorAll('.add-card').forEach((btn) => {
        btn.addEventListener('click', () => {
            const productBox = btn.parentElement;
            const title = productBox.querySelector('.product-title').innerText;
            const price = parseFloat(productBox.querySelector('.price').innerText.replace('$', ''));
            const imgSrc = productBox.querySelector('.product-img').src;

            const existingItem = cartItems.find(item => item.title === title);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cartItems.push({ title, price, imgSrc, quantity: 1 });
            }
            updateCart();
        });
    });

    // Update Cart UI
    function updateCart() {
        cartContent.innerHTML = ''; // Clear previous content
        let total = 0;
        cartItems.forEach((item, index) => {
            total += item.price * item.quantity;

            const cartBox = document.createElement('div');
            cartBox.classList.add('card-box');
            cartBox.innerHTML = `
                <img src="${item.imgSrc}" alt="${item.title}" class="card-img">
                <div class="detail-box">
                    <div class="card-product-title">${item.title}</div>
                    <div class="card-price">$${item.price.toFixed(2)}</div>
                    <input type="number" value="${item.quantity}" class="card-quantity" min="1">
                </div>
                <i class="bx bx-trash-alt card-remove"></i>
            `;
            cartContent.appendChild(cartBox);

            // Quantity Change
            cartBox.querySelector('.card-quantity').addEventListener('change', (e) => {
                const newQuantity = parseInt(e.target.value);
                if (newQuantity < 1) {
                    cartItems.splice(index, 1);
                } else {
                    item.quantity = newQuantity;
                }
                updateCart();
            });

            // Remove Item
            cartBox.querySelector('.card-remove').addEventListener('click', () => {
                cartItems.splice(index, 1);
                updateCart();
            });
        });

        totalPriceElement.innerText = `$${total.toFixed(2)}`;
        updateCartIndicator();

        // Save cart items to localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }

    // Load Cart from localStorage on page load
    function loadCartFromLocalStorage() {
        if (cartItems.length > 0) {
            updateCart();
        } else {
            cartIndicator.style.display = 'none';
        }
    }

    // Load cart on page load
    loadCartFromLocalStorage();

   // Search Functionality
    function initializeSearchFunctionality() {
        const searchBar = document.querySelector(".search-bar");
        const products = document.querySelectorAll(".product-box");

        searchBar.addEventListener("input", function (e) {
            const query = e.target.value.toLowerCase();
            let visibleCount = 0; // Track how many items are visible

            products.forEach(product => {
                const title = product.querySelector(".product-title").textContent.toLowerCase();
                if (title.includes(query)) {
                    product.style.display = "block";
                    visibleCount++;
                } else {
                    product.style.display = "none";
                }
            });

            // Show a message if no products are found
            const noResultsMessage = document.querySelector(".no-results-message");
            if (visibleCount === 0) {
                if (!noResultsMessage) {
                    const message = document.createElement("div");
                    message.classList.add("no-results-message");
                    message.innerText = "No products found";
                    document.querySelector(".shop-content").appendChild(message);
                }
            } else {
                const existingMessage = document.querySelector(".no-results-message");
                if (existingMessage) {
                    existingMessage.remove();
                }
            }
        });
    }


    // Sorting Functionality
    function initializeSorting() {
        const sortPriceBtn = document.getElementById("sort-price");
        const sortNameBtn = document.getElementById("sort-name");
        const shopContent = document.querySelector(".shop-content");

        sortPriceBtn.addEventListener("click", () => {
            sortProducts(shopContent, "price");
        });

        sortNameBtn.addEventListener("click", () => {
            sortProducts(shopContent, "name");
        });
    }

    function sortProducts(container, type) {
        const products = Array.from(container.getElementsByClassName("product-box"));
        const sortedProducts = products.sort((a, b) => {
            if (type === "price") {
                // Extract prices and sort numerically
                const priceA = parseFloat(a.querySelector(".price").textContent.replace("$", ""));
                const priceB = parseFloat(b.querySelector(".price").textContent.replace("$", ""));
                return priceA - priceB;
            } else if (type === "name") {
                // Extract names and sort alphabetically
                const nameA = a.querySelector(".product-title").textContent.toLowerCase();
                const nameB = b.querySelector(".product-title").textContent.toLowerCase();
                return nameA.localeCompare(nameB);
            }
        });

        // Clear and re-append sorted products
        container.innerHTML = "";
        sortedProducts.forEach(product => container.appendChild(product));
    }

    // Initialize search and sorting functionality
    initializeSearchFunctionality();
    initializeSorting();

    // Initialize cart on page load
    updateCart();
});	

// User authentication system
let users = JSON.parse(localStorage.getItem('users')) || []; // Retrieve users from localStorage

// Check if user is logged in on page load
window.addEventListener('DOMContentLoaded', () => {
    const authBtn = document.getElementById('auth-btn');
    let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // Check if user is logged in
    let userRole = localStorage.getItem('userRole'); // Retrieve the stored role

    // Show Login/Logout button based on login status
    function updateAuthButton() {
        if (isLoggedIn) {
            authBtn.textContent = `Logout (${userRole})`; // Show "Logout" with role
        } else {
            authBtn.textContent = 'Login'; // Show "Login" if not logged in
        }
    }

    updateAuthButton();

    // If user is logged in, skip the login modal and allow "Buy Now"
    document.querySelector('.btn-buy').addEventListener('click', () => {
        if (isLoggedIn) {
            window.location.href = 'checkout-html.html'; // Redirect to checkout page
        } else {
            document.getElementById('login-modal').style.display = 'block'; // Show login modal
        }
    });

    // Login/Logout Button functionality
    authBtn.addEventListener('click', () => {
        if (isLoggedIn) {
            // Handle logout
            isLoggedIn = false;
            localStorage.removeItem('isLoggedIn'); // Remove login status
            localStorage.removeItem('userRole'); // Remove role
            updateAuthButton(); // Update button text

            // Show logout success message with animation
            const logoutMessage = document.createElement('div');
            logoutMessage.classList.add('logout-success-message');
            logoutMessage.innerText = "You have successfully logged out!";
            document.body.appendChild(logoutMessage);

            setTimeout(() => logoutMessage.classList.add('popup-animation'), 50); // Trigger animation
            setTimeout(() => logoutMessage.remove(), 3000); // Remove after 3 seconds

            alert("You have successfully logged out!"); // Fallback notification
        } else {
            // Show login modal if not logged in
            document.getElementById('login-modal').style.display = 'block';
        }
    });
});

// Close modals
document.getElementById('close-modal').addEventListener('click', () => {
    document.getElementById('login-modal').style.display = 'none';
});
document.getElementById('close-signup-modal').addEventListener('click', () => {
    document.getElementById('signup-modal').style.display = 'none';
});

// Show sign-up modal from login modal
document.getElementById('show-signup').addEventListener('click', () => {
    document.getElementById('login-modal').style.display = 'none';
    document.getElementById('signup-modal').style.display = 'block';
});

// Back to login from sign-up modal
document.getElementById('back-to-login').addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default link behavior
    document.getElementById('signup-modal').style.display = 'none';
    document.getElementById('login-modal').style.display = 'block';
});

// Close modals on outside click
window.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
});

// Handle role selection
function setupRoleSelection(modalSelector) {
    const roleInputs = document.querySelectorAll(`${modalSelector} input[name$="-role"]`);
    roleInputs.forEach(roleInput => {
        roleInput.addEventListener('click', function () {
            if (this.dataset.selected === 'true') {
                this.checked = false; // Uncheck if already selected
                this.dataset.selected = 'false'; // Update dataset
            } else {
                roleInputs.forEach(input => input.dataset.selected = 'false'); // Reset other buttons
                this.dataset.selected = 'true'; // Mark this as selected
            }
        });
    });
}

// Apply role selection toggle for both modals
setupRoleSelection('#signup-modal');
setupRoleSelection('#login-modal');

// Handle sign-up form submission
document.getElementById('signup-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const firstName = document.getElementById('signup-first-name').value;
    const lastName = document.getElementById('signup-last-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const role = document.querySelector('#signup-modal input[name="signup-role"]:checked')?.value || null;

    if (!role) {
        alert("Please select a role to proceed.");
        return;
    }

    if (users.find(user => user.email === email)) {
        alert("This email is already registered. Please login.");
        return;
    }

    // Save the new user
    const newUser = { firstName, lastName, email, password, role };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users)); // Save users to localStorage
    console.log("New user registered:", newUser);

    // Show the success animation
    const signupMessage = document.createElement('div');
    signupMessage.classList.add('signup-success-message');
    signupMessage.innerText = `Welcome, ${firstName} ${lastName}! You can now login as ${role}.`;
    const modalContent = document.querySelector('#signup-modal .modal-content');
    modalContent.appendChild(signupMessage);

    setTimeout(() => signupMessage.classList.add('popup-animation'), 50); // Trigger animation
    setTimeout(() => {
        signupMessage.remove();
        document.getElementById('signup-modal').style.display = 'none';
        document.getElementById('login-modal').style.display = 'block';
    }, 3000);

    document.getElementById('signup-form').reset();
});


// Handle login form submission
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const role = document.querySelector('#login-modal input[name="login-role"]:checked')?.value || null;

    console.log('Login Attempt:', { email, password, role }); // Debug log

    const user = users.find(user => user.email === email && user.password === password && user.role === role);

    if (user) {
        console.log('User Found:', user); // Debug log
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userRole', role);
        localStorage.setItem('currentUserEmail', email); // Store current user's email

        // Track all logged-in users
        const loggedInUsers = JSON.parse(localStorage.getItem('loggedInUsers')) || [];
        if (!loggedInUsers.includes(email)) {
            loggedInUsers.push(email);
            localStorage.setItem('loggedInUsers', JSON.stringify(loggedInUsers));
        }

        if (role === 'admin') {
            alert("Admin login successful! Redirecting to admin dashboard...");
            document.getElementById('login-modal').style.display = 'none';
            window.location.href = 'admin-html.html'; // Redirect to admin page
        } else {
            alert(`${role} login successful! Welcome, ${user.email}.`);
            document.getElementById('login-modal').style.display = 'none';
            location.reload();
        }
    } else {
        alert("Invalid credentials. Please try again.");
    }

    document.getElementById('login-form').reset();
});
// Category Filter Functionality
document.addEventListener("DOMContentLoaded", () => {
    const categorySelect = document.getElementById("category-select");
    const productBoxes = document.querySelectorAll(".product-box");

    categorySelect.addEventListener("change", () => {
        const selectedCategory = categorySelect.value;

        productBoxes.forEach(box => {
            const productCategory = box.getAttribute("data-category");

            if (selectedCategory === "all" || productCategory === selectedCategory) {
                box.style.display = "block"; // Show the product
            } else {
                box.style.display = "none"; // Hide the product
            }
        });
    });
});

// Get all product images and lightbox elements
const productImages = document.querySelectorAll('.product-img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.getElementById('close-btn');

// Function to open the lightbox and display the clicked image
productImages.forEach(image => {
    image.addEventListener('click', () => {
        const fullImageSrc = image.getAttribute('data-full'); // Get the full-size image source from the data-full attribute
        lightboxImg.src = fullImageSrc; // Set the full-size image in the lightbox
        lightbox.style.display = 'flex'; // Display the lightbox
    });
});

// Close the lightbox when the user clicks the close button
closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

// Close the lightbox when the user clicks outside the image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
    }
});

// product details
const productDetails = document.querySelectorAll('.product-detail-icon');
productDetails.forEach((detailIcon) => {
  detailIcon.addEventListener('click', (event) => {
    const productBox = event.target.closest('.product-box');
    const productId = productBox.getAttribute('data-id');
    // Redirect to the product detail page with the productId as a query parameter
    window.location.href = `detail.html?product=${productId}`;
  });
});
