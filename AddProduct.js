// Start the app when page fully loads
document.addEventListener("DOMContentLoaded", () => {
  new AddProduct();
});

class AddProduct {
  constructor() {
    // Get popup buttons
    this.openAddProductButton = document.getElementById("addProductBtn");
    this.addProductPopup = document.getElementById("productModal");
    this.closeAddProductButton = document.getElementById("closeProductBtn");

    // Get all form input fields
    this.nameField = document.getElementById("productName");
    this.priceField = document.getElementById("productPrice");
    this.discountField = document.getElementById("productDiscount");
    this.imageField = document.getElementById("productImage");
    this.categoryDropdown = document.getElementById("productCategory");
    this.brandDropdown = document.getElementById("productBrand");
    this.submitButton = document.getElementById("submitProductBtn");

    // Get sections where products and sidebars will show
    this.productListBox = document.getElementById("featureItems");
    this.categorySidebar = document.getElementById("categoryList");
    this.brandSidebar = document.getElementById("brandList");

    // Get product detail popup items
    this.detailPopup = document.getElementById("productDetailModal");
    this.detailContent = document.getElementById("productDetailContent");
    this.closeDetailPopupButton = document.getElementById("closeProductDetailBtn");

    // Start all functions
    this.setupOpenPopup();
    this.setupClosePopup();
    this.fillCategoryAndBrandDropdowns();
    this.showSavedSidebarItems();
    this.setupSaveProduct();
    this.showSavedProductsOnPage();
    this.setupCategoryClickFilter();
    this.setupCloseDetailPopup();
  }

  setupOpenPopup() {
    this.openAddProductButton.addEventListener("click", (event) => {
      event.preventDefault();
      this.fillCategoryAndBrandDropdowns();
      this.addProductPopup.style.display = "flex";
    });
  }

  setupClosePopup() {
    this.closeAddProductButton.addEventListener("click", () => {
      this.addProductPopup.style.display = "none";
    });

    window.addEventListener("click", (event) => {
      if (event.target === this.addProductPopup) {
        this.addProductPopup.style.display = "none";
      }
    });
  }

  fillCategoryAndBrandDropdowns() {
    const savedCategories = JSON.parse(localStorage.getItem("categories") || "[]");
    const savedBrands = JSON.parse(localStorage.getItem("brands") || "[]");

    this.categoryDropdown.innerHTML = `<option>Please Select Category</option>`;
    this.brandDropdown.innerHTML = `<option>Please Select Brand</option>`;

    savedCategories.forEach((cat) => {
      const option = document.createElement("option");
      option.textContent = cat;
      this.categoryDropdown.appendChild(option);
    });

    savedBrands.forEach((brand) => {
      const option = document.createElement("option");
      option.textContent = brand;
      this.brandDropdown.appendChild(option);
    });
  }

  showSavedSidebarItems() {
    const savedCategories = JSON.parse(localStorage.getItem("shownCategories") || "[]");
    const savedBrands = JSON.parse(localStorage.getItem("shownBrands") || "[]");

    this.categorySidebar.innerHTML = "";
    this.brandSidebar.innerHTML = "";

    savedCategories.forEach((cat) => {
      const item = document.createElement("li");
      item.textContent = cat;
      this.categorySidebar.appendChild(item);
    });

    savedBrands.forEach((brand) => {
      const item = document.createElement("li");
      item.textContent = brand;
      this.brandSidebar.appendChild(item);
    });
  }

  setupSaveProduct() {
    this.submitButton.addEventListener("click", () => {
      const file = this.imageField.files[0];
      if (!file) {
        alert("Please select an image.");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const newProduct = {
          name: this.nameField.value.trim(),
          price: this.priceField.value.trim(),
          discount: this.discountField.value.trim(),
          image: reader.result,
          category: this.categoryDropdown.value,
          brand: this.brandDropdown.value,
        };

        const allProducts = JSON.parse(localStorage.getItem("products") || "[]");
        allProducts.push(newProduct);
        localStorage.setItem("products", JSON.stringify(allProducts));

        this.showProductCard(newProduct);
        this.saveToSidebar("shownCategories", newProduct.category, this.categorySidebar);
        this.saveToSidebar("shownBrands", newProduct.brand, this.brandSidebar);

        // Clear form
        this.nameField.value = "";
        this.priceField.value = "";
        this.discountField.value = "";
        this.imageField.value = "";
        this.addProductPopup.style.display = "none";

        alert("Product saved successfully!");
      };

      reader.readAsDataURL(file);
    });
  }

  showProductCard(product) {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <div class="price-info">
        <p><strong>Price:</strong> ₹${product.price}</p>
        <p><strong>Discount:</strong> ₹${product.discount}</p>
      </div>
      <p><strong class="product-name">${product.name}</strong></p>
      <p class="product-category">${product.category}</p>
      <button class="cart-btn">Add to cart</button>
    `;

    // Button to add product to cart
    const addButton = card.querySelector(".cart-btn");
    addButton.addEventListener("click", (event) => {
      event.stopPropagation(); // Don't open product detail modal
      this.addToCart(product);
    });

    // Clicking the card opens product detail modal
    card.addEventListener("click", () => this.showDetailPopup(product));

    this.productListBox.appendChild(card);
  }

  showSavedProductsOnPage() {
    const allProducts = JSON.parse(localStorage.getItem("products") || "[]");
    allProducts.forEach((product) => this.showProductCard(product));
  }

  setupCategoryClickFilter() {
    this.categorySidebar.addEventListener("click", (event) => {
      if (event.target.tagName === "LI") {
        const clickedCategory = event.target.textContent;
        const allProducts = JSON.parse(localStorage.getItem("products") || "[]");

        const matchingProducts = allProducts.filter((p) => p.category === clickedCategory);
        this.productListBox.innerHTML = "";
        matchingProducts.forEach((product) => this.showProductCard(product));
      }
    });
  }

  saveToSidebar(key, value, sidebarList) {
    let list = JSON.parse(localStorage.getItem(key) || "[]");

    if (!list.includes(value)) {
      list.push(value);
      localStorage.setItem(key, JSON.stringify(list));

      const li = document.createElement("li");
      li.textContent = value;
      sidebarList.appendChild(li);
    }
  }

  // New: show product detail popup
  showDetailPopup(product) {
    this.detailContent.innerHTML = `
      <div class="product-detail-content">
        <img src="${product.image}" alt="${product.name}" />
        <div class="info">
          <h2>${product.name}</h2>
          <p><strong>Price:</strong> ₹${product.price}</p>
          <p><strong>Discount:</strong> ${product.discount}%</p>
          <p><strong>Brand:</strong> ${product.brand}</p>
          <p><strong>Category:</strong> ${product.category}</p>
          <p><strong>Description:</strong> This is a detailed view of the product.</p>
          <button id="popupAddToCartBtn">Add to Cart</button>
        </div>
      </div>
    `;

    document.getElementById("popupAddToCartBtn").addEventListener("click", () => {
      this.addToCart(product);
    });

    this.detailPopup.style.display = "flex";
  }

  //  New: close the popup
  setupCloseDetailPopup() {
    this.closeDetailPopupButton.addEventListener("click", () => {
      this.detailPopup.style.display = "none";
    });

    window.addEventListener("click", (event) => {
      if (event.target === this.detailPopup) {
        this.detailPopup.style.display = "none";
      }
    });
  }

  addToCart(product) {
    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
    currentCart.push(product);
    localStorage.setItem("cart", JSON.stringify(currentCart));

    alert("Added to cart!");

    setTimeout(() => {
      window.location.href = "Cart.html";
    }, 0);
  }
}
