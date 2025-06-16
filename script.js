// --- Product Data ---
// Ensure your image paths match the actual filenames in your 'images/' folder
const products = [
    { id: 1, name: 'Jogoo Maize Flour (2kg)', price: 190, category: 'grains', image: 'images/maize_flour_2kg.jpg' },
    { id: 2, name: 'Exe Wheat Flour (2kg)', price: 210, category: 'grains', image: 'images/wheat_flour_2kg.jpg' },
    { id: 3, name: 'Pishori Rice (2kg)', price: 450, category: 'grains', image: 'images/rice_2kg.jpg' },

    { id: 4, name: 'Sukuma Wiki (Bunch)', price: 50, category: 'produce', image: 'images/sukuma_wiki.jpg' },
    { id: 5, name: 'Cabbage (per kg)', price: 80, category: 'produce', image: 'images/cabbage.jpg' },
    { id: 6, name: 'Tomatoes (1kg)', price: 120, category: 'produce', image: 'images/tomatoes.jpg' },
    { id: 7, name: 'Red Onions (1kg)', price: 90, category: 'produce', image: 'images/onions.jpg' },
    { id: 8, name: 'Potatoes (1kg)', price: 70, category: 'produce', image: 'images/potatoes.jpg' },
    { id: 9, name: 'Oranges (1 pc)', price: 20, category: 'produce', image: 'images/oranges.jpg' },
    { id: 10, name: 'Bananas (1 pc)', price: 15, category: 'produce', image: 'images/bananas.jpg' },

    { id: 11, name: 'Brookside Milk (500ml)', price: 65, category: 'dairy', image: 'images/milk_500ml.jpg' },
    { id: 12, name: 'Tray of Eggs (6 pcs)', price: 150, category: 'dairy', image: 'images/eggs_tray.jpg' },
    { id: 13, name: 'Delamere Yoghurt (Cup)', price: 80, category: 'dairy', image: 'images/yoghurt_cup.jpg' },

    { id: 14, name: 'Kabras Sugar (1kg)', price: 200, category: 'pantry', image: 'images/sugar_1kg.jpg' },
    { id: 15, name: 'Top Fry Cooking Oil (1L)', price: 350, category: 'pantry', image: 'images/cooking_oil_1l.jpg' },
    { id: 16, name: 'Kericho Gold Tea (250g)', price: 280, category: 'pantry', image: 'images/tea_leaves_250g.jpg' },
    { id: 17, name: 'Nescafe Coffee (50g)', price: 180, category: 'pantry', image: 'images/coffee_50g.jpg' },
    { id: 18, name: 'Festive Bread (Sandwich)', price: 65, category: 'pantry', image: 'images/bread.jpg' },
    { id: 19, name: 'Rich Tea Biscuits (Pack)', price: 70, category: 'pantry', image: 'images/biscuits.jpg' },
    { id: 20, name: 'Coca-Cola (500ml)', price: 70, category: 'pantry', image: 'images/soda_500ml.jpg' },
    { id: 21, name: 'Bottled Water (1L)', price: 50, category: 'pantry', image: 'images/water_1l.jpg' },

    { id: 22, name: 'Menengai Bar Soap (1kg)', price: 250, category: 'household', image: 'images/bar_soap.jpg' },
    { id: 23, name: 'Omo Detergent (1kg)', price: 300, category: 'household', image: 'images/detergent_1kg.jpg' },
    { id: 24, name: 'Rosy Toilet Paper (10 rolls)', price: 400, category: 'household', image: 'images/toilet_paper.jpg' },
];

// --- Global Variables ---
let cart = []; // Stores items currently in the cart

const productListDiv = document.querySelector('.products-grid');
const cartItemsDiv = document.getElementById('cart-items');
const cartCountSpan = document.getElementById('cart-count');
const cartTotalSpan = document.getElementById('cart-total');
const shoppingCartAside = document.getElementById('shopping-cart');
const checkoutBtn = document.getElementById('checkout-btn');
const checkoutForm = document.getElementById('checkout-form');
const mPesaNumberInput = document.getElementById('mPesaNumber');
const payBtn = document.getElementById('pay-btn');
const paymentStatusDiv = document.getElementById('payment-status');
const emptyCartMessage = document.querySelector('.empty-cart-message');

// --- Functions ---

// Function to render products
function renderProducts(filteredProducts = products) {
    productListDiv.innerHTML = ''; // Clear existing products
    if (filteredProducts.length === 0) {
        productListDiv.innerHTML = '<p style="text-align: center; grid-column: 1 / -1; color: #555;">No products found in this category.</p>';
        return;
    }

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>KSh ${product.price.toFixed(2)}</p>
                <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        productListDiv.appendChild(productCard);
    });

    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            const productToAdd = products.find(p => p.id === productId);
            addToCart(productToAdd);
        });
    });
}

// Function to add a product to the cart
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartUI();
    toggleCart(true); // Open cart automatically when item is added
}

// Function to update cart UI (display items, total, count)
function updateCartUI() {
    cartItemsDiv.innerHTML = ''; // Clear current cart display
    let total = 0;

    if (cart.length === 0) {
        emptyCartMessage.classList.remove('hidden');
        checkoutBtn.disabled = true;
        checkoutForm.classList.add('hidden'); // Hide checkout form if cart is empty
        paymentStatusDiv.classList.add('hidden'); // Hide payment status too
    } else {
        emptyCartMessage.classList.add('hidden');
        checkoutBtn.disabled = false;
        cart.forEach(item => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');
            cartItemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p>KSh ${item.price.toFixed(2)}</p>
                    <div class="item-quantity-controls">
                        <button data-id="${item.id}" data-action="decrease">-</button>
                        <span>${item.quantity}</span>
                        <button data-id="${item.id}" data-action="increase">+</button>
                    </div>
                </div>
                <button class="remove-item-btn" data-id="${item.id}"><i class="fas fa-trash-alt"></i></button>
            `;
            cartItemsDiv.appendChild(cartItemDiv);
            total += item.price * item.quantity;
        });
    }

    cartCountSpan.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartTotalSpan.textContent = total.toFixed(2);

    // Add event listeners for quantity changes and removal
    document.querySelectorAll('.item-quantity-controls button').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            const action = e.target.dataset.action;
            updateItemQuantity(productId, action);
        });
    });

    document.querySelectorAll('.remove-item-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            removeFromCart(productId);
        });
    });
}

// Function to update item quantity in cart
function updateItemQuantity(productId, action) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        if (action === 'increase') {
            item.quantity++;
        } else if (action === 'decrease') {
            item.quantity--;
            if (item.quantity <= 0) {
                removeFromCart(productId); // Remove if quantity drops to 0 or less
                return;
            }
        }
    }
    updateCartUI();
}

// Function to remove product from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

// Function to toggle cart visibility
function toggleCart(forceShow = false) {
    if (forceShow) {
        shoppingCartAside.classList.add('visible');
        shoppingCartAside.classList.remove('hidden');
    } else {
        shoppingCartAside.classList.toggle('visible');
        shoppingCartAside.classList.toggle('hidden');
    }
}

// --- Event Listeners ---

// Initial render of all products
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartUI(); // Initialize cart UI on load
});

// Category filtering
document.querySelectorAll('.category-item').forEach(item => {
    item.addEventListener('click', (e) => {
        const category = e.currentTarget.dataset.category;
        const filtered = products.filter(p => p.category === category);
        renderProducts(filtered);
        // Scroll to product list section
        document.getElementById('product-list').scrollIntoView({ behavior: 'smooth' });
    });
});

// Checkout button click
checkoutBtn.addEventListener('click', () => {
    if (cart.length > 0) {
        checkoutBtn.classList.add('hidden'); // Hide checkout button
        checkoutForm.classList.remove('hidden'); // Show checkout form
        mPesaNumberInput.focus();
        paymentStatusDiv.classList.add('hidden'); // Hide previous status
        paymentStatusDiv.classList.remove('success', 'error'); // Clear status classes
    }
});

// M-Pesa Pay button click (SIMULATED)
payBtn.addEventListener('click', () => {
    const mPesaNumber = mPesaNumberInput.value.trim();
    const myMpesaNumber = '0758454074'; // Your hardcoded number
    const totalAmount = parseFloat(cartTotalSpan.textContent);

    paymentStatusDiv.classList.remove('hidden', 'success', 'error'); // Show and clear status

    if (!mPesaNumber.match(/^07[0-9]{8}$/)) {
        paymentStatusDiv.textContent = 'Invalid M-Pesa number. Please use format 07XXXXXXXX.';
        paymentStatusDiv.classList.add('error');
        return;
    }

    if (totalAmount <= 0) {
        paymentStatusDiv.textContent = 'Your cart is empty or total is zero. Add items to proceed.';
        paymentStatusDiv.classList.add('error');
        return;
    }

    // --- SIMULATED M-PESA PAYMENT ---
    // In a real application, you would send this to your backend server
    // which would then interact with Safaricom's Daraja API.

    paymentStatusDiv.textContent = `Simulating M-Pesa STK Push to ${mPesaNumber} for KSh ${totalAmount.toFixed(2)}. Please confirm on your phone.`;
    paymentStatusDiv.classList.add('success');

    // Simulate a successful payment after a few seconds
    setTimeout(() => {
        paymentStatusDiv.textContent = `Payment of KSh ${totalAmount.toFixed(2)} confirmed! Please remember to send the money via M-Pesa to Mama John's number: ${myMpesaNumber}. Thank you for shopping!`;
        paymentStatusDiv.classList.add('success');

        // Clear cart after simulated success
        cart = [];
        updateCartUI();
        mPesaNumberInput.value = ''; // Clear the input
        checkoutBtn.classList.remove('hidden'); // Show checkout button again
        checkoutForm.classList.add('hidden'); // Hide checkout form

        // Optionally hide cart after a delay
        setTimeout(() => {
            toggleCart(false);
        }, 3000);

    }, 3000); // Simulate a 3-second delay for transaction
});
