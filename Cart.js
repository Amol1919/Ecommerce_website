// Run the code after the page loads
document.addEventListener("DOMContentLoaded", () => {
  new ShowCart();
});

class ShowCart {
  constructor() {
    // Get the <tbody> element where products will be shown
    this.cartTableBody = document.querySelector("tbody");

    // Get cart items from localStorage or empty if none
    this.cartData = JSON.parse(localStorage.getItem("cart") || "[]");

    // Show all products in the cart
    this.displayCartItems();
  }

  displayCartItems() {
    // Clear old rows
    this.cartTableBody.innerHTML = "";

    // Show each product in table
    this.cartData.forEach((item, index) => {
      const totalPrice = item.price - item.discount;

      // Create a new table row
      const row = document.createElement("tr");
      row.innerHTML = `
        <td><img src="${item.image}" width="70" height="70" style="object-fit:cover; border-radius:6px;" /></td>
        <td>${item.name}</td>
        <td>₹${item.price}</td>
        <td>₹${item.discount}</td>
        <td style="color: orange;"><strong>₹${totalPrice}</strong></td>
        <td>
          <button class="remove-btn" data-index="${index}">×</button>
        </td>
      `;

      this.cartTableBody.appendChild(row);
    });

    // Add remove functionality to all buttons
    this.setupRemoveButtons();
  }

  setupRemoveButtons() {
    const removeButtons = document.querySelectorAll(".remove-btn");

    removeButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const index = btn.getAttribute("data-index");

        // Remove from cart and update localStorage
        this.cartData.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(this.cartData));

        // Refresh the table
        this.displayCartItems();
      });
    });
  }
}
