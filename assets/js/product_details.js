const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get("productId");
const addToCartBtn = document.querySelector('.addToCartBtn');

async function fetchProductDetails() {
  try {
    const response = await fetch("./assets/data/products.json"); // JSON containing product data
    const data = await response.json();
    const product = data.find((item) => item.id == productId); // Find product by ID
    
    if (product) {
      updateProductDetails(product);
    } else {
      document.querySelector("body").innerHTML = `
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="error-template">
                <h1>Oops!</h1>
                <h2>404 Not Found</h2>
                <div class="error-details">
                  Sorry, an error has occurred, requested page not found!
                </div>
                <div class="error-actions">
                  <a href="./index.html" class="btn btn-primary btn-lg">
                    <span class="glyphicon glyphicon-home"></span> Take Me Home
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>`;
    }
  } catch (error) {
    console.error("Error fetching product details:", error);
  }
}

function updateProductDetails(product) {
  document.getElementById("product-main-image").src = product.img_default;
  document.getElementById("product-category").textContent = "Product-Details" || "Category";
  document.getElementById("product-name").textContent = product.name;
  document.getElementById("product-name-breadcrumb").textContent = product.name;
  document.getElementById("product-new-price").textContent = "$" + product.price;
  document.getElementById("product-old-price").textContent = product.old_price ? "$" + product.old_price : '';
  document.getElementById("product-description").textContent = product.description;
  document.getElementById("product-sku").textContent = product.id || "Not Available";
  document.getElementById("product-stock").textContent = product.in_stock ? "In Stock" : "Out of Stock";
  
  // Add Small Images if any
  const smallImagesContainer = document.getElementById("product-small-images");
  const imgDefault = `<img src="${product.img_default}" class="details__small-img" />`;
  const imgHover = `<img src="${product.img_hover}" class="details__small-img" />`;
  smallImagesContainer.innerHTML = imgDefault + imgHover;

  // Setup Add to Cart
  setupAddToCartButton(product);
}

function setupAddToCartButton(product) {
  addToCartBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addToCart(product);
  });
}

function addToCart(productData) {
  // Simulate adding to cart
  let cartProducts = localStorage.getItem("cartProducts");
  
  if (!cartProducts) {
    cartProducts = [];
  } else {
    cartProducts = JSON.parse(cartProducts);
  }

  const isProductInCart = cartProducts.some((item) => item.id === productData.id);

  if (!isProductInCart) {
    cartProducts.push(productData);
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    alert("Product added to cart!");
  } else {
    alert("Product is already in the cart.");
  }
}

// Fetch product details on page load
fetchProductDetails();
