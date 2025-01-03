// Elements
const cartItemsContainer = document.querySelector(".cart-items");
const confirmOrderButton = document.getElementById("confirm-order");
const categorySelect = document.getElementById("category");
const transactionsTable = document.querySelector("#transactions-table tbody"); // Reference to the table body

// Add to cart functionality
document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", (event) => {
    const bookCard = event.target.closest(".book-card");
    const bookTitle = bookCard.querySelector("h3").innerText;
    const bookAuthor = bookCard.querySelector(".author").innerText;
    const bookImage = bookCard.querySelector("img").src;

    // Create a cart item
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
      <img src="${bookImage}" alt="${bookTitle}" class="cart-item-image">
      <div class="cart-item-details">
        <h3>${bookTitle}</h3>
        <p>${bookAuthor}</p>
        <button class="remove-from-cart btn">Remove</button>
      </div>
    `;

    // Append the cart item to the cart container
    cartItemsContainer.appendChild(cartItem);

    // Remove functionality for the cart item
    cartItem.querySelector(".remove-from-cart").addEventListener("click", () => {
      cartItemsContainer.removeChild(cartItem);
    });
  });
});

// Confirm order functionality
confirmOrderButton.addEventListener("click", () => {
  const selectedCategory = categorySelect.value;
  const cartItems = Array.from(cartItemsContainer.querySelectorAll(".cart-item"));

  if (cartItems.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  // Map cart items to an order format
  const confirmedOrder = cartItems.map((item) => {
    const title = item.querySelector("h3").innerText;
    const author = item.querySelector("p").innerText;
    return { title, author, category: selectedCategory };
  });

  // Append orders to the transactions table
  confirmedOrder.forEach((order) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${order.title}</td>
      <td>${order.author}</td>
      <td>${order.category}</td>
    `;
    transactionsTable.appendChild(row);
  });

  // Alert and log the confirmed order
  console.log("Confirmed Order:", confirmedOrder);
  alert("Your order has been confirmed!");

  // Clear the cart after confirmation
  cartItemsContainer.innerHTML = "";
});
