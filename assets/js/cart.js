// Fetch cart items from localStorage
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Render the cart items
function renderCart() {
    const cartTableBody = document.getElementById('cart-items');
    const cartSubtotalElement = document.getElementById('cart-subtotal');
    const totalCostElement = document.getElementById('total-cost');
    const shippingCost = 10; // Hardcoded shipping cost

    // Clear existing cart items in the table
    cartTableBody.innerHTML = '';

    if (cartItems.length === 0) {
        cartTableBody.innerHTML = '<tr><td colspan="6">Your cart is empty.</td></tr>';
        cartSubtotalElement.textContent = `$0.00`;
        totalCostElement.textContent = `$${shippingCost.toFixed(2)}`;
        return;
    }

    let cartSubtotal = 0;

    // Loop through cart items and create rows dynamically
    cartItems.forEach((item, index) => {
        const itemSubtotal = parseFloat(item.price.replace('$', '')) * item.quantity;
        cartSubtotal += itemSubtotal;

        cartTableBody.innerHTML += `
            <tr>
            <td><img src="${item.imgSrc}" alt="${item.name}" class="table__img" /></td>
            <td>
                <h3 class="table__title">${item.name}</h3>
                <p class="table__description">${item.description || ''}</p>
            </td>
            <td><span class="table__price">${item.price}</span></td>
            <td><input type="number" value="${item.quantity}" min="1" class="quantity" data-index="${index}" /></td>
            <td><span class="subtotal">$${itemSubtotal.toFixed(2)}</span></td>
            <td><i class="fi fi-rs-trash table__trash" data-index="${index}"></i></td>
            </tr>
        `;
    });

    // Update cart totals
    cartSubtotalElement.textContent = `$${cartSubtotal.toFixed(2)}`;
    totalCostElement.textContent = `$${(cartSubtotal + shippingCost).toFixed(2)}`;

    // Add event listeners for quantity updates and remove buttons
    addEventListeners();
}

// Update quantity of items in the cart
function updateQuantity(index, newQuantity) {
    cartItems[index].quantity = newQuantity;
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    renderCart();
}

// Remove item from cart
function removeItem(index) {
    cartItems.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    renderCart();
}

// Add event listeners for quantity change and remove buttons
function addEventListeners() {
    // Quantity input change event
    const quantityInputs = document.querySelectorAll('.quantity');
    quantityInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            const index = e.target.getAttribute('data-index');
            const newQuantity = parseInt(e.target.value);
            if (newQuantity > 0) {
                updateQuantity(index, newQuantity);
            } else {
                alert('Quantity must be at least 1');
                e.target.value = cartItems[index].quantity; // Reset to original value
            }
        });
    });

    // Remove button click event
    const removeButtons = document.querySelectorAll('.table__trash');
    removeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            removeItem(index);
        });
    });
}

// WhatsApp redirection after checkout
function redirectToWhatsApp(itemsForWhatsApp) {
    const phoneNumber = "254799982410"; // Replace with the actual WhatsApp number

    // Check if there are any items in the cart
    if (itemsForWhatsApp.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Create the WhatsApp message with cart item details
    let message = "I want to order the following items:\n";
    itemsForWhatsApp.forEach((item, index) => {
        message += `${index + 1}. ${item.name} \n`; // Item name
        message += `   Quantity: ${item.quantity}\n`; // Item quantity
        message += `   Price: ${item.price}\n`; // Item price
        message += `-------------------------\n`;
    });

    // Total and shipping details
    const cartSubtotal = itemsForWhatsApp.reduce((sum, item) => sum + parseFloat(item.price.replace('$', '')) * item.quantity, 0);
    const shippingCost = 10;
    const totalCost = cartSubtotal + shippingCost;
    message += `Subtotal: $${cartSubtotal.toFixed(2)}\n`;
    message += `Shipping: $${shippingCost.toFixed(2)}\n`;
    message += `Total: $${totalCost.toFixed(2)}\n`;

    // Create the WhatsApp message URL
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    // Redirect to the WhatsApp URL
    window.location.href = whatsappURL;
}

// Function to handle checkout and success message
function checkout() {
    if (cartItems.length === 0) {
        Swal.fire({
            title: "Error",
            text: "Your cart is empty!",
            icon: "error",
            confirmButtonText: "OK"
        });
        return;
    }

    // Save cartItems to a temporary variable before clearing
    const itemsForWhatsApp = [...cartItems]; // Clone the cart items

    Swal.fire({
        title: "Checkout Success",
        text: "Your order has been placed successfully!",
        icon: "success",
        confirmButtonText: "OK"
    }).then((result) => {
        if (result.isConfirmed) {
            // Clear cart after successful checkout
            localStorage.removeItem('cartItems');
            cartItems = [];
            renderCart();
            // Redirect to WhatsApp with the saved cart items
            redirectToWhatsApp(itemsForWhatsApp);
        }
    });
}

// Add event listener to checkout button
document.getElementById('checkout-btn').addEventListener('click', checkout);

// Initial render of the cart
renderCart();
