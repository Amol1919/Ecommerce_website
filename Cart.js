// When the page is fully loaded, start the cart
document.addEventListener("DOMContentLoaded", () => {
  new ShowCart();
});

// Cart page logic
class ShowCart {
  constructor() {
    // Get the area where products will be shown
    this.cartTableBody = document.querySelector("tbody");

    // Get data from localStorage (or empty if nothing)
    this.cartData = JSON.parse(localStorage.getItem("cart") || "[]");

    // Show the products
    this.displayCartItems();
  }

  // Show all products in table
  displayCartItems() {
    // First, remove old rows
    this.cartTableBody.innerHTML = "";

    let total = 0; // Total price starts from 0

    // Loop through each item in cart
    this.cartData.forEach((item, index) => {
      const price = Number(item.price);
      const discount = Number(item.discount);
      const finalPrice = price - discount;

      // Add this item's final price to total
      total += finalPrice;

      // Create table row for this item
      const row = document.createElement("tr");
      row.innerHTML = `
        <td><img src="${item.image}" width="70" height="70" style="object-fit:cover; border-radius:6px;" /></td>
        <td>${item.name}</td>
        <td>₹${price}</td>
        <td>${discount}%</td>
        <td style="color: orange;"><strong>₹${finalPrice}</strong></td>
        <td><button class="remove-btn" data-index="${index}">×</button></td>
      `;
      this.cartTableBody.appendChild(row);
    });

    // Show total price on screen
    const totalBox = document.getElementById("cartTotal");
    if (totalBox) {
      totalBox.textContent = `Total Payable: ₹${total}`;
    }

    // Add remove button functionality
    this.setupRemoveButtons();
  }

  // What happens when user clicks X to remove item
  setupRemoveButtons() {
    const removeButtons = document.querySelectorAll(".remove-btn");

    removeButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const index = btn.getAttribute("data-index");

        // Remove from cart and update storage
        this.cartData.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(this.cartData));

        // Show updated table again
        this.displayCartItems();
      });
    });
  }
}

// When user clicks "Proceed to Payment"
function goToPaymentPage() {
  window.location.href = "Payment.html";
}
