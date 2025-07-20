//Start the app after the page is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  new PaymentPage(); // create and run the PaymentPage class
});

class PaymentPage {
  constructor() {
    // Get the table body where we will show each item
    this.cartTable = document.getElementById("paymentTableBody");

    // Get the place to show final total
    this.totalAmountBox = document.getElementById("grandTotal");

    // Get cart items from localStorage
    this.cartItems = JSON.parse(localStorage.getItem("cart") || "[]");

    // Show the cart items on screen
    this.showCartItems();

    // Make the "Pay" button work
    this.enablePayButton();
  }

  // This function shows each item in the cart as a row in the table
  showCartItems() {
    let totalPrice = 0; // final total to be calculated

    // clear old data
    this.cartTable.innerHTML = "";

    // loop through all cart items
    this.cartItems.forEach((product) => {
      // convert price and discount to numbers
      const price = parseFloat(product.price);
      const discount = parseFloat(product.discount);
      const finalPrice = price - discount;

      // add to the total
      totalPrice += finalPrice;

      // create one row for this product
      const row = document.createElement("tr");
      row.innerHTML = `
        <td><img src="${product.image}" width="60" /></td>
        <td>${product.name}</td>
        <td>₹${price}</td>
        <td>₹${discount}</td>
        <td><strong style="color: orange;">₹${finalPrice}</strong></td>
      `;

      // add this row to the table
      this.cartTable.appendChild(row);
    });

    // show total payable amount
    this.totalAmountBox.textContent = `Total Payable: ₹${totalPrice}`;
  }

  // This function runs when Pay button is clicked
  enablePayButton() {
    const payBtn = document.getElementById("payBtn");

    payBtn.addEventListener("click", () => {
      alert("Proceeding to payment...");
    });
  }
}
