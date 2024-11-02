document.addEventListener('DOMContentLoaded', function () {
    // Function to load cart items from localStorage
    function loadCart() {
        const cartItemsContainer = document.querySelector('.cart-items');
        const cartData = JSON.parse(localStorage.getItem('cart')) || [];
        cartItemsContainer.innerHTML = ''; // Clear the cart

        if (cartData.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
            document.querySelector('.cart-total').textContent = '₹ 0.00'; // Update total
            return; // Exit if the cart is empty
        }

        cartData.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            cartItemsContainer.innerHTML += `
                <div class="cart-item" data-index="${index}">
                    <div class="item-details">
                        <img src="${item.image}" alt="${item.name}">
                        <div class="item-info">
                            <h3>${item.name}</h3>
                            <p>₹ ${item.price}</p>
                        </div>
                    </div>
                    <div class="item-quantity">
                        <button class="quantity-btn minus" onclick="updateQuantity(${index}, -1)">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn plus" onclick="updateQuantity(${index}, 1)">+</button>
                    </div>
                    <div class="item-total">₹ ${itemTotal.toFixed(2)}</div>
                    <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
                </div>
            `;
        });

        updateCartTotal();
    }

    // Update quantity function
    window.updateQuantity = function (index, change) {
        let cartData = JSON.parse(localStorage.getItem('cart')) || [];
        if (cartData[index]) {
            cartData[index].quantity += change;
            if (cartData[index].quantity < 1) {
                removeFromCart(index); // Remove item if quantity is less than 1
            } else {
                localStorage.setItem('cart', JSON.stringify(cartData));
                loadCart();
            }
        }
    };

    // Remove item from cart
    window.removeFromCart = function (index) {
        let cartData = JSON.parse(localStorage.getItem('cart')) || [];
        cartData.splice(index, 1); // Remove item from cart
        localStorage.setItem('cart', JSON.stringify(cartData));
        loadCart();
    };

    // Calculate and update cart total
    function updateCartTotal() {
        const cartData = JSON.parse(localStorage.getItem('cart')) || [];
        let total = 0;
        cartData.forEach(item => total += item.price * item.quantity);
        document.querySelector('.cart-total').textContent = `₹ ${total.toFixed(2)}`;
    }

    loadCart(); // Call to load cart items when the page is loaded
});
