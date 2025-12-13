const imgs = document.querySelectorAll('.img-select a');
const imgBtns = [...imgs];
let imgId = 1;

// When an image is clicked, update imgId and slide image
imgBtns.forEach((imgItem) => {
    imgItem.addEventListener('click', (event) => {
        event.preventDefault();
        imgId = parseInt(imgItem.dataset.id);  // Make sure imgId is an integer
        slideImage();
    });
});

function slideImage() {
    const displayWidth = document.querySelector('.img-showcase img:first-child').clientWidth;
    const imgShowcase = document.querySelector('.img-showcase');
    
    // Ensure the showcase is transformed based on the updated imgId
    imgShowcase.style.transition = 'transform 0.5s ease';  // Smooth transition for sliding
    imgShowcase.style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
}

// Update image position when the window is resized
window.addEventListener('resize', slideImage);

// Initial slide position in case the page is loaded with specific image showing
window.addEventListener('load', slideImage);


// Extract productId from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('product');

// A function that simulates product data
const productsData = {
  'breeze-linen-shirt': {
    productId: 'breeze-linen-shirt',
    title: 'Breeze Linen Shirt',
    price: '$27.28',
    oldPrice: '$30.00',
    images: [
      'img/shirt/Breeze Linen Shirt-₱1,595.00.png',
      'img/shirt/linen r.jpg',
      'img/shirt/linen y.jpg',
      'img/shirt/linen g.jpg'
    ],
    description: 'A lightweight and breathable linen shirt perfect for warm weather.',
    details: [
      { label: 'Color', value: 'Red, Yellow, Green' },
      { label: 'Available', value: 'In stock' },
      { label: 'Category', value: 'Shirts' },
      { label: 'Shipping Area', value: 'Worldwide' },
      { label: 'Shipping Fee', value: 'Free' }
    ]
  },
'frontier-cowboy-hat': {
    productId: 'frontier-cowboy-hat',
    title: 'Frontier Classic Cowboy Hat',
    price: '$32.41',
    oldPrice: '$35.00',
    images: [
      'img/cap/Frontier Classic Cowboy Hat-₱1,895.00.png',
      'img/cap/cowboy r.jpg',
      'img/cap/cowboy y.jpg',
      'img/cap/cowboy g.jpg'
    ],
    description: 'A stylish cowboy hat with a classic design for a rugged look.',
    details: [
      { label: 'Color', value: 'Red, Yellow, Green' },
      { label: 'Available', value: 'In stock' },
      { label: 'Category', value: 'Caps' },
      { label: 'Shipping Area', value: 'Worldwide' },
      { label: 'Shipping Fee', value: 'Free' }
    ]
  },
  'skyline-crop-tee': {
    productId: 'skyline-crop-tee',
    title: 'Skyline Graphic Crop Tee',
    price: '$11.88',
    oldPrice: '$15.00',
    images: [
      'img/shirt/Skyline Graphic Crop Tee-₱695.00.png',
      'img/shirt/crop r.jpg',
      'img/shirt/crop y.jpg',
      'img/shirt/crop g.jpg'
    ],
    description: 'A trendy crop tee with a stylish skyline graphic.',
    details: [
      { label: 'Color', value: 'Red, Yellow, Green' },
      { label: 'Available', value: 'In stock' },
      { label: 'Category', value: 'Shirts' },
      { label: 'Shipping Area', value: 'Worldwide' },
      { label: 'Shipping Fee', value: 'Free' }
    ]
  },
  'aeroclassic-aviator': {
    productId: 'aeroclassic-aviator',
    title: 'AeroClassic Aviator',
    price: '$132.56',
    oldPrice: '$150.00',
    images: [
      'img/watch/AeroClassic Aviator 1945-₱7,750.00.png',
      'img/watch/class r.jpg',
      'img/watch/class y.jpg',
      'img/watch/class g.jpg'
    ],
    description: 'A timeless aviator watch with a modern twist.',
    details: [
      { label: 'Color', value: 'Red, Yellow, Green' },
      { label: 'Available', value: 'In stock' },
      { label: 'Category', value: 'Watches' },
      { label: 'Shipping Area', value: 'Worldwide' },
      { label: 'Shipping Fee', value: 'Free' }
    ]
  },
  'heritage-denim-jacket': {
    productId: 'heritage-denim-jacket',
    title: 'Heritage Distressed Denim',
    price: '$55.59',
    oldPrice: '$60.00',
    images: [
      'img/jacket/Heritage Distressed Denim Jacket fir Women-₱3,250.00.png',
      'img/jacket/denim r.jpg',
      'img/jacket/denim y.jpg',
      'img/jacket/denim g.jpg'
    ],
    description: 'A classic distressed denim jacket for a timeless look.',
    details: [
      { label: 'Color', value: 'Red, Yellow, Green' },
      { label: 'Available', value: 'In stock' },
      { label: 'Category', value: 'Jackets' },
      { label: 'Shipping Area', value: 'Worldwide' },
      { label: 'Shipping Fee', value: 'Free' }
    ]
  },
  'breezy-linen-pants': {
    productId: 'breezy-linen-pants',
    title: 'Breezy Linen Relaxed Pants',
    price: '$22.15',
    oldPrice: '$25.00',
    images: [
      'img/trouser/Breezy Linen Relaxed Pants-₱1,295.00.png',
      'img/trouser/pants r.jpg',
      'img/trouser/pant y.jpg',
      'img/trouser/pant g.jpg'
    ],
    description: 'Comfortable and stylish linen pants for any occasion.',
    details: [
      { label: 'Color', value: 'Red, Yellow, Green' },
      { label: 'Available', value: 'In stock' },
      { label: 'Category', value: 'Trousers' },
      { label: 'Shipping Area', value: 'Worldwide' },
      { label: 'Shipping Fee', value: 'Free' }
    ]
  },
  'aqua-diver-watch': {
    productId: 'aquamaster-diver',
    title: 'AquaMaster Diver',
    price: '$221.50',
    oldPrice: '$250.00',
    images: [
      'img/watch/AquaMaster Diver 300-₱12,950.00.png',
      'img/watch/aqua r.jpg',
      'img/watch/aqua y.jpg',
      'img/watch/aqua g.jpg'
    ],
    description: 'An advanced diver’s watch with exceptional durability.',
    details: [
      { label: 'Color', value: 'Red, Yellow, Green' },
      { label: 'Available', value: 'In stock' },
      { label: 'Category', value: 'Watches' },
      { label: 'Shipping Area', value: 'Worldwide' },
      { label: 'Shipping Fee', value: 'Free' }
    ]
  },
  'urban-aviator-bomber': {
    productId: 'urban-aviator-jacket',
    title: 'Urban Aviator Bomber Jacket',
    price: '$68.40',
    oldPrice: '$75.00',
    images: [
      'img/jacket/Urban Aviator Bomber Jacket-₱3,999.00.png',
      'img/jacket/bomber r.jpg',
      'img/jacket/bomber y.jpg',
      'img/jacket/bomber g.jpg'
    ],
    description: 'A modern bomber jacket for an urban aviator style.',
    details: [
      { label: 'Color', value: 'Red, Yellow, Green' },
      { label: 'Available', value: 'In stock' },
      { label: 'Category', value: 'Jackets' },
      { label: 'Shipping Area', value: 'Worldwide' },
      { label: 'Shipping Fee', value: 'Free' }
    ]
  },
  'durablepro-utility-pants': {
    productId: 'durablepro-utility-pants',
    title: 'DurablePro Utility Work Pants',
    price: '$32.41',
    oldPrice: '$35.00',
    images: [
      'img/trouser/DurablePro Utility Work Pants-₱1,895.00.png',
      'img/trouser/utility r.jpg',
      'img/trouser/utility y.jpg',
      'img/trouser/utility g.jpg'
    ],
    description: 'Heavy-duty work pants built for rugged use.',
    details: [
      { label: 'Color', value: 'Red, Yellow, Green' },
      { label: 'Available', value: 'In stock' },
      { label: 'Category', value: 'Trousers' },
      { label: 'Shipping Area', value: 'Worldwide' },
      { label: 'Shipping Fee', value: 'Free' }
    ]
  },
  'heritage-curve-cap': {
    productId: 'heritage-curve-cap',
    title: 'Heritage Curve Baseball Cap',
    price: '$11.03',
    oldPrice: '$12.50',
    images: [
      'img/cap/Heritage Curve Baseball Cap-₱645.00.png',
      'img/cap/baseball r.jpg',
      'img/cap/baseball y.jpg',
      'img/cap/baseball g.jpg'
    ],
    description: 'Classic baseball cap with a vintage curve.',
    details: [
      { label: 'Color', value: 'Red, Yellow, Green' },
      { label: 'Available', value: 'In stock' },
      { label: 'Category', value: 'Caps' },
      { label: 'Shipping Area', value: 'Worldwide' },
      { label: 'Shipping Fee', value: 'Free' }
    ]
  },
  'tropicana-hawaiian-shirt': {
    productId: 'tropicana-resort-shirt',
    title: 'Tropicana Resort Hawaiian Shirt',
    price: '$22.15',
    oldPrice: '$25.00',
    images: [
      'img/shirt/Tropicana Resort Hawaiian Shirt-₱1,295.00.png',
      'img/shirt/hawaiian  r.jpg',
      'img/shirt/hawaiian  y.jpg',
      'img/shirt/hawaiian  g.jpg'
    ],
    description: 'Relaxed fit Hawaiian shirt for tropical vacations.',
    details: [
      { label: 'Color', value: 'Red, Yellow, Green' },
      { label: 'Available', value: 'In stock' },
      { label: 'Category', value: 'Shirts' },
      { label: 'Shipping Area', value: 'Worldwide' },
      { label: 'Shipping Fee', value: 'Free' }
    ]
  },
  'skyline-aviator-chrono': {
    productId: 'skyline-aviator-chrono',
    title: 'Skyline Aviator Chrono',
    price: '$270.23',
    oldPrice: '$300.00',
    images: [
      'img/watch/Skyline Aviator Chrono Watch- ₱15,799.00.png',
      'img/watch/skyline r.jpg',
      'img/watch/skyline y.jpg',
      'img/watch/skyline g.jpg'
    ],
    description: 'A sophisticated aviator chronograph watch.',
    details: [
      { label: 'Color', value: 'Red, Yellow, Green' },
      { label: 'Available', value: 'In stock' },
      { label: 'Category', value: 'Watches' },
      { label: 'Shipping Area', value: 'Worldwide' },
      { label: 'Shipping Fee', value: 'Free' }
    ]
  },
'victory-varsity-jacket': {
    productId: 'victory-varsity-jacket',
    title: 'Victory Collegiate Varsity Jacket',
    price: '$76.95',
    oldPrice: '$85.00',
    images: [
      'img/jacket/Victory Collegiate Varsity Jacket-₱4,499.00.png',
      'img/jacket/varsity r.jpg',
      'img/jacket/varsity y.jpg',
      'img/jacket/varsity g.jpg'
    ],
    description: 'A stylish collegiate varsity jacket for a sporty look.',
    details: [
      { label: 'Color', value: 'Red, Yellow, Green' },
      { label: 'Available', value: 'In stock' },
      { label: 'Category', value: 'Jackets' },
      { label: 'Shipping Area', value: 'Worldwide' },
      { label: 'Shipping Fee', value: 'Free' }
    ]
  },
  'vintage-pleat-trousers': {
    productId: 'vintage-pleat-pants',
    title: 'Vintage Pleat Tapered Trousers',
    price: '$31.55',
    oldPrice: '$35.00',
    images: [
      'img/trouser/Vintage Pleat Tapered Trousers-₱1,845.00.png',
      'img/trouser/vintage r.jpg',
      'img/trouser/vintage y.jpg',
      'img/trouser/vintage g.jpg'
    ],
    description: 'A vintage pleated tapered trouser perfect for a sharp look.',
    details: [
      { label: 'Color', value: 'Red, Yellow, Green' },
      { label: 'Available', value: 'In stock' },
      { label: 'Category', value: 'Trousers' },
      { label: 'Shipping Area', value: 'Worldwide' },
      { label: 'Shipping Fee', value: 'Free' }
    ]
  },
  'nordic-knit-beanie': {
    productId: 'nordic-knit-beanie',
    title: 'Nordic Knit Beanie',
    price: '$8.46',
    oldPrice: '$10.00',
    images: [
      'img/cap/Nordic Knit Beanie-₱495.00.png',
      'img/cap/beanie r.jpg',
      'img/cap/beanie y.jpg',
      'img/cap/beanie g.jpg'
    ],
    description: 'A cozy knit beanie with a Nordic-inspired design.',
    details: [
      { label: 'Color', value: 'Red, Yellow, Green' },
      { label: 'Available', value: 'In stock' },
      { label: 'Category', value: 'Caps' },
      { label: 'Shipping Area', value: 'Worldwide' },
      { label: 'Shipping Fee', value: 'Free' }
    ]
  }
};

// Function to update the product details on the page
function updateProductDetails(productId) {
  const product = productsData[productId];
  if (product) {
    // Update the product images
    const imgShowcase = document.querySelector('.img-showcase');
    imgShowcase.innerHTML = `<img src="${product.images[0]}" alt="main product image" class="current-image">`;
    
    // Update the image thumbnails
    const imgSelect = document.querySelector('.img-select');
    imgSelect.innerHTML = product.images.map((image, index) => `
      <div class="img-item">
        <a href="#" data-id="${index + 1}">
          <img src="${image}" alt="product image thumbnail">
        </a>
      </div>
    `).join('');

    // Image thumbnail click event to update main image
    const imgItems = document.querySelectorAll('.img-item a');
    imgItems.forEach((item, index) => {
      item.addEventListener('click', function(e) {
        e.preventDefault();
        const newImage = product.images[index];
        const currentImage = imgShowcase.querySelector('.current-image');
        
        // Apply smooth slide transition
        currentImage.style.transform = 'translateX(-100%)'; // Slide out current image
        
        setTimeout(() => {
          // After transition, change the image and reset the transform property
          imgShowcase.innerHTML = `<img src="${newImage}" alt="main product image" class="current-image">`;
          const newImg = imgShowcase.querySelector('.current-image');
          newImg.style.transform = 'translateX(100%)'; // Slide in new image

          setTimeout(() => {
            newImg.style.transition = 'all 0.5s ease'; // Apply transition effect
            newImg.style.transform = 'translateX(0)'; // Slide image to center
          }, 10);
        }, 500); // Time must match the transition duration (500ms)
      });
    });

    // Update the product title
    const productTitle = document.querySelector('.product-title');
    productTitle.textContent = product.title;

    // Update the product link
    const productLink = document.querySelector('.product-link');
    productLink.textContent = `Visit Vincent Triluxe store`;
    productLink.href = `#`; // Update with the actual link if available

    // Update the product rating
    const productRating = document.querySelector('.product-rating');
    productRating.innerHTML = `
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="fas fa-star-half-alt"></i>
      <span>4.7(21)</span>
    `;

    // Update the product price
    const oldPrice = document.querySelector('.last-price .old-price');
    oldPrice.textContent = product.oldPrice;
    const newPrice = document.querySelector('.new-price .new-price');
    newPrice.textContent = product.price;

    // Update the product description
    const productDescription = document.querySelector('.product-description');
    productDescription.textContent = product.description;

    // Update the product details (e.g., color, available, etc.)
    const productDetailsList = document.querySelector('.product-details-list');
    productDetailsList.innerHTML = product.details.map(detail => `<li>${detail.label}: <span>${detail.value}</span></li>`).join('');
  } else {
    console.error('Product not found!');
  }
}

// Once the page is loaded, update the product details based on the URL
window.addEventListener('load', () => {
  if (productId) {
    updateProductDetails(productId);
  }
});


document.addEventListener("DOMContentLoaded", function () {
    // Select all review cards
    const reviewCards = document.querySelectorAll('.card');

    // Add click event listener to each review card
    reviewCards.forEach(card => {
        card.addEventListener('click', function () {
            // Toggle the active class on the clicked card
            card.classList.toggle('active');
        });
    });
});

