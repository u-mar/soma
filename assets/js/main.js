// Fetch product data dynamically
async function fetchProductData() {
  try {
    const response = await fetch('./assets/data/products.json'); // Adjust the path as needed
    const products = await response.json();

    // Populate categories and products
    populateCategories(products);
    populateProducts(products, 'featured');
    populateProducts(products, 'popular');
    populateProducts(products, 'new');
    populateAllProducts(products); // Populate all products
  } catch (error) {
    console.error("Error fetching product data:", error);
  }
}

// Populate categories dynamically
function populateCategories(products) {
  const categoryList = document.getElementById('category-list');
  const categories = [...new Set(products.map(product => product.category))]; // Get unique categories

  categoryList.innerHTML = categories.map(category => `
    <a href="shop.html?category=${category}" class="category__item swiper-slide">
      <img src="assets/img/category-${category.toLowerCase()}.jpg" alt="${category}" class="category__img" />
      <h3 class="category__title">${category}</h3>
    </a>
  `).join('');
}

// Populate products dynamically by type (featured, popular, new)
function populateProducts(products, type) {
  let filteredProducts;

  switch (type) {
    case 'featured':
      filteredProducts = products.filter(product => product.isFeatured);
      break;
    case 'popular':
      filteredProducts = products.filter(product => product.isPopular);
      break;
    case 'new':
      filteredProducts = products.filter(product => product.isNew);
      break;
    default:
      filteredProducts = [];
  }

  const productContainer = document.getElementById(`${type}-products`);

  productContainer.innerHTML = filteredProducts.map(product => `
    <div class="product__item">
      <div class="product__banner">
        <a href="details.html?id=${product.id}" class="product__images">
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
        ${product.badge ? `<div class="product__badge">${product.badge}</div>` : ''}
      </div>
      <div class="product__content">
        <span class="product__category">${product.in_stock ? 'In Stock' : 'Out of Stock'}</span>
        <a href="details.html?id=${product.id}">
          <h3 class="product__title">${product.name}</h3>
        </a>
        <div class="product__price flex">
          <span class="new__price">$${product.price}</span>
          ${product.old_price ? `<span class="old__price">$${product.old_price}</span>` : ''}
        </div>
        <a href="#" class="action__btn cart__btn" aria-label="Add To Cart">
          <i class="fi fi-rs-shopping-bag-add"></i>
        </a>
      </div>
    </div>
  `).join('');
}

// Fetch product data dynamically
async function fetchProductData() {
  try {
    const response = await fetch('./assets/data/products.json'); // Adjust the path as needed
    const products = await response.json();

    // Populate all products (dynamic)
    populateAllProducts(products);
  } catch (error) {
    console.error("Error fetching product data:", error);
  }
}

// Populate all products (only showing 5 with a "View All" link)
function populateAllProducts(products) {
  const allProductsContainer = document.getElementById('all-products');
  
  // Limit to 5 products
  const limitedProducts = products.slice(0, 5);

  allProductsContainer.innerHTML = limitedProducts.map(product => `
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
        ${product.badge ? `<div class="product__badge">${product.badge}</div>` : ''}
      </div>
      <div class="product__content">
        <span class="product__category">${product.in_stock ? 'In Stock' : 'Out of Stock'}</span>
        <a href="details.html?id=${product.id}">
          <h3 class="product__title">${product.name}</h3>
        </a>
        <div class="product__price flex">
          <span class="new__price">$${product.price}</span>
          ${product.old_price ? `<span class="old__price">$${product.old_price}</span>` : ''}
        </div>
        <a href="#" class="action__btn cart__btn" aria-label="Add To Cart">
          <i class="fi fi-rs-shopping-bag-add"></i>
        </a>
      </div>
    </div>
  `).join('');
}

// Fetch products when page loads
fetchProductData();





// Add to Cart Functionality
function addToCart(product) {
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || []; // Get existing items or initialize empty array

  // Check if product already exists in the cart
  const existingProductIndex = cartItems.findIndex(item => item.id === product.id);
  if (existingProductIndex > -1) {
    cartItems[existingProductIndex].quantity += 1;
  } else {
    cartItems.push({ ...product, quantity: 1 });
  }

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  alert('Product added to cart');
}

// Handle cart button clicks
document.addEventListener('click', (e) => {
  if (e.target.closest('.cart__btn')) {
    const productElement = e.target.closest('.product__item');
    const product = {
      id: productElement.querySelector('.product__title').textContent.trim(),
      name: productElement.querySelector('.product__title').textContent.trim(),
      price: productElement.querySelector('.new__price').textContent.trim(),
      imgSrc: productElement.querySelector('.product__img.default').src,
    };
    addToCart(product);
  }
});

// Fetch products when page loads
fetchProductData();

// Show Menu functionality (already present in your code)
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/* Swiper configurations */
let swiperCategories = new Swiper(".categories__container", {
  spaceBetween: 24,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    350: { slidesPerView: 2, spaceBetween: 24 },
    768: { slidesPerView: 3, spaceBetween: 24 },
    992: { slidesPerView: 4, spaceBetween: 24 },
    1200: { slidesPerView: 5, spaceBetween: 24 },
    1400: { slidesPerView: 6, spaceBetween: 24 },
  },
});

let swiperProducts = new Swiper(".new__container", {
  spaceBetween: 24,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    768: { slidesPerView: 2, spaceBetween: 24 },
    992: { slidesPerView: 4, spaceBetween: 24 },
    1400: { slidesPerView: 4, spaceBetween: 24 },
  },
});

/* Product Tabs */
const tabs = document.querySelectorAll("[data-target]"),
  tabsContents = document.querySelectorAll("[content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target);

    tabsContents.forEach((tabsContent) => {
      tabsContent.classList.remove("active-tab");
    });

    target.classList.add("active-tab");

    tabs.forEach((tab) => {
      tab.classList.remove("active-tab");
    });

    tab.classList.add("active-tab");
  });
});
