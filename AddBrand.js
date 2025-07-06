class AddBrand {
  constructor() {
    this.openButton = document.getElementById("addBrandBtn");
    this.modal = document.getElementById("categoryBrand");
    this.closeButton = document.getElementById("closeBrandBtn");

    this.setupEvents();
  }

  setupEvents() {
    // Show modal when button clicked
    this.openButton.addEventListener("click", (event) => {
      event.preventDefault();
      this.modal.style.display = "flex";
    });

    // Close modal when × clicked
    this.closeButton.addEventListener("click", () => {
      this.modal.style.display = "none";
    });

    // Close modal when clicking outside the box
    window.addEventListener("click", (event) => {
      if (event.target === this.modal) {
        this.modal.style.display = "none";
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new AddBrand();
});
