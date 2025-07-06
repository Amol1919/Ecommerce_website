class AddCategory {
  constructor() {
    this.openButton = document.getElementById("addCategoryBtn");
    this.modal = document.getElementById("categoryModal");
    this.closeButton = document.getElementById("closeModalBtn");

    this.setupEvents();
  }

  setupEvents() {
    // When "Add Category" link is clicked
    this.openButton.addEventListener("click", (event) => {
      event.preventDefault();
      this.modal.style.display = "flex";
    });

    // When "×" is clicked
    this.closeButton.addEventListener("click", () => {
      this.modal.style.display = "none";
    });

    // Close modal when clicked outside
    window.addEventListener("click", (event) => {
      if (event.target === this.modal) {
        this.modal.style.display = "none";
      }
    });
  }
}

// Run after page loads
document.addEventListener("DOMContentLoaded", () => {
  new AddCategory();
});
