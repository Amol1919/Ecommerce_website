class AddProduct {
  constructor() {
    // All important elements
    this.addButton = document.getElementById("addProductBtn");
    this.modal = document.getElementById("productModal");
    this.closeButton = document.getElementById("closeProductBtn");

    this.nameInput = document.getElementById("productName");
    this.priceInput = document.getElementById("productPrice");
    this.discountInput = document.getElementById("productDiscount");
    this.imageInput = document.getElementById("productImage");
    this.categorySelect = document.getElementById("productCategory");
    this.brandSelect = document.getElementById("productBrand");
    this.submitButton = document.getElementById("submitProductBtn");

    this.featureBox = document.getElementById("featureItems");
    this.categoryList = document.getElementById("categoryList");
    this.brandList = document.getElementById("brandList");

    // Call methods
    this.openModal();
    this.closeModal();
    this.loadDropdowns();
    this.handleSubmit();
    this.showSavedProducts();
    this.setupCategoryFilter();
  }

  // Open modal
  openModal() {
    this.addButton.addEventListener("click", (event) => {
      event.preventDefault();
      this.loadDropdowns();
      this.modal.style.display = "flex";
    });
  }

  // Close modal
  closeModal() {
    this.closeButton.addEventListener("click", () => {
      this.modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
      if (event.target === this.modal) {
        this.modal.style.display = "none";
      }
    });
  }

  // Load categories and brands into dropdowns
  loadDropdowns() {
    let categories = JSON.parse(localStorage.getItem("categories") || "[]");
    let brands = JSON.parse(localStorage.getItem("brands") || "[]");

    this.categorySelect.innerHTML = `<option>Please Select Category</option>`;
    this.brandSelect.innerHTML = `<option>Please Select Brand</option>`;

    categories.forEach((cat) => {
      let option = document.createElement("option");
      option.textContent = cat;
      this.categorySelect.appendChild(option);
    });

    brands.forEach((brand) => {
      let option = document.createElement("option");
      option.textContent = brand;
      this.brandSelect.appendChild(option);
    });
  }

  // Save product
  handleSubmit() {
    this.submitButton.addEventListener("click", () => {
      const file = this.imageInput.files[0];

      if (!file) {
        alert("Please select an image.");
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        const product = {
          name: this.nameInput.value.trim(),
          price: this.priceInput.value.trim(),
          discount: this.discountInput.value.trim(),
          image: reader.result,
          category: this.categorySelect.value,
          brand: this.brandSelect.value
        };

        let all = JSON.parse(localStorage.getItem("products") || "[]");
        all.push(product);
        localStorage.setItem("products", JSON.stringify(all));

        // Show in list
        this.showSingleProduct(product);

        // Update side lists
        this.saveAndShow("shownCategories", product.category, this.categoryList);
        this.saveAndShow("shownBrands", product.brand, this.brandList);

        // Clear form + close
        this.nameInput.value = "";
        this.priceInput.value = "";
        this.discountInput.value = "";
        this.imageInput.value = "";
        this.modal.style.display = "none";
        alert("Product saved!");
      };

      reader.readAsDataURL(file);
    });
  }

  // Show one product card
  showSingleProduct(product) {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="product image" />
      <div class="price-info">
        <p><strong>Price:</strong> ₹${product.price}</p>
        <p><strong>Discount:</strong> ₹${product.discount}</p>
      </div>
      <p><strong>${product.name}</strong></p>
      <p>${product.category}</p>
      <button>Add to cart</button>
    `;
    this.featureBox.appendChild(card);
  }

  // Load saved products on page load
  showSavedProducts() {
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    products.forEach((product) => this.showSingleProduct(product));
  }

  // Category click => filter product display
  setupCategoryFilter() {
    this.categoryList.addEventListener("click", (event) => {
      if (event.target.tagName === "LI") {
        const selectedCategory = event.target.textContent;
        const products = JSON.parse(localStorage.getItem("products") || "[]");
        const filtered = products.filter((p) => p.category === selectedCategory);

        this.featureBox.innerHTML = "";
        filtered.forEach((product) => this.showSingleProduct(product));
      }
    });
  }

  // Helper to update sidebar lists without duplicates
  saveAndShow(storageKey, value, targetUl) {
    let list = JSON.parse(localStorage.getItem(storageKey) || "[]");
    if (!list.includes(value)) {
      list.push(value);
      localStorage.setItem(storageKey, JSON.stringify(list));

      const li = document.createElement("li");
      li.textContent = value;
      targetUl.appendChild(li);
    }
  }
}

// When the page loads, start everything
document.addEventListener("DOMContentLoaded", () => {
  new AddProduct();
});
