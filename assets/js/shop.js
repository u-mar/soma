document.addEventListener('DOMContentLoaded', () => {
    // Fetch products from the JSON file
    fetch('assets/data/products.json')
        .then(response => response.json())
        .then(data => {
            // Update product count dynamically
            document.getElementById('product-count').textContent = data.length;

            // Render products on the page
            renderProducts(data);
        })
        .catch(error => console.error('Error fetching products:', error));
});

// Function to render products dynamically
function renderProducts(products) {
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = ''; // Clear the container first

    // Loop through each product and create HTML dynamically
    products.forEach(product => {
        const productHTML = `
            <div class="product__item">
                <div class="product__banner">
                    <a href="details.html?productId=${product.id}" class="product__images">
                        <img src="${product.img_default}" alt="${product.name}" class="product__img default" />
                        <img src="${product.img_hover}" alt="${product.name}" class="product__img hover" />
                    </a>
                    <div class="product__actions">
                        <a href="#" class="action__btn" aria-label="Quick View">
                            <i class="fi fi-rs-eye"></i>
                        </a>
                        <a href="#" class="action__btn" aria-label="Add to Wishlist">
                            <i class="fi fi-rs-heart"></i>
                        </a>
                        <a href="#" class="action__btn" aria-label="Compare">
                            <i class="fi fi-rs-shuffle"></i>
                        </a>
                    </div>
                    <div class="product__badge light-pink">${product.badge}</div>
                </div>
                <div class="product__content">
                    <span class="product__category">${product.in_stock ? 'In Stock' : 'Out of Stock'}</span>
                    <a href="details.html?productId=${product.id}">
                        <h3 class="product__title">${product.name}</h3>
                    </a>
                    <div class="product__rating">
                        ${renderRating(product.rating)}
                    </div>
                    <div class="product__price flex">
                        <span class="new__price">$${product.price}</span>
                        <span class="old__price">$${product.old_price}</span>
                    </div>
                    <a href="#" class="action__btn cart__btn" aria-label="Add To Cart">
                        <i class="fi fi-rs-shopping-bag-add"></i>
                    </a>
                </div>
            </div>
        `;
        // Append the product HTML to the container
        productsContainer.innerHTML += productHTML;
    });
}

// Helper function to render star rating
function renderRating(rating) {
    let stars = '';
    for (let i = 0; i < rating; i++) {
        stars += '<i class="fi fi-rs-star"></i>';
    }
    return stars;
}
