class AddBrand {
  constructor() {
    this.addButton = document.getElementById("addBrandBtn");
    this.modal = document.getElementById("categoryBrand");
    this.closeButton = document.getElementById("closeBrandBtn");
    this.inputBox = this.modal.querySelector("input");
    this.submitButton = this.modal.querySelector("button");

    this.showModal();
    this.closeModal();
    this.saveBrand();
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

  saveBrand() {
    this.submitButton.addEventListener("click", () => {
      const name = this.inputBox.value.trim();

      if (name === "") {
        alert("Please enter brand name");
        return;
      }

      let brands = JSON.parse(localStorage.getItem("brands")) || [];
      brands.push(name);
      localStorage.setItem("brands", JSON.stringify(brands));

      alert("Brand saved!");
      this.inputBox.value = "";
      this.modal.style.display = "none";
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new AddBrand();
});
