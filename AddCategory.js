class AddCategory {
  constructor() {
    this.addButton = document.getElementById("addCategoryBtn");
    this.modal = document.getElementById("categoryModal");
    this.closeButton = document.getElementById("closeModalBtn");
    this.inputBox = this.modal.querySelector("input");
    this.submitButton = this.modal.querySelector("button");

    this.showModal();
    this.closeModal();
    this.saveCategory();
  }

  showModal() {
    this.addButton.addEventListener("click", (event) => {
      event.preventDefault();
      this.modal.style.display = "flex";
    });
  }

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

  saveCategory() {
    this.submitButton.addEventListener("click", () => {
      const name = this.inputBox.value.trim();

      if (name === "") {
        alert("Please enter category name");
        return;
      }

      let categories = JSON.parse(localStorage.getItem("categories")) || [];
      categories.push(name);
      localStorage.setItem("categories", JSON.stringify(categories));

      alert("Category saved!");
      this.inputBox.value = "";
      this.modal.style.display = "none";
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new AddCategory();
});
