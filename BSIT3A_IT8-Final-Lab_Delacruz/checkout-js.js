document.addEventListener('DOMContentLoaded', () => {
    const backButton = document.getElementById('backButton');
    
    // Event listener for back button
    backButton.addEventListener('click', () => {
        window.location.href = 'shop1-html.html'; // Redirect to shop1 page
    });

    const checkoutProductList = document.querySelector('.checkout-product-list');
    const checkoutTotalPrice = document.querySelector('.checkout-total-price');
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    function updateCheckoutPage() {
        checkoutProductList.innerHTML = '';
        let total = 0;
        cartItems.forEach(item => {
            total += item.price * item.quantity;
            const productRow = document.createElement('div');
            productRow.classList.add('checkout-product');
            productRow.style.display = 'flex';
            productRow.style.alignItems = 'center';
            productRow.style.marginBottom = '10px';

            productRow.innerHTML = `
                <img src="${item.imgSrc}" alt="${item.title}" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px;">
                <div>
                    <div>${item.title} - $${item.price} x ${item.quantity}</div>
                    <div>Total: $${(item.price * item.quantity).toFixed(2)}</div>
                </div>
            `;
            checkoutProductList.appendChild(productRow);
        });
        checkoutTotalPrice.innerText = `$${total.toFixed(2)}`;
    }

    updateCheckoutPage();
});
