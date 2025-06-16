let cartItems = [];

function addToCart(product, price) {
  cartItems.push({ product, price });
  renderCart();
}

function renderCart() {
  const list = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");
  list.innerHTML = "";
  let total = 0;
  cartItems.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.product} - ${item.price} KES`;
    list.appendChild(li);
    total += item.price;
  });
  totalEl.textContent = `Total: ${total} KES`;
}

document.getElementById("product-search").addEventListener("input", function() {
  const filter = this.value.toLowerCase();
  document.querySelectorAll(".product").forEach(product => {
    const name = product.dataset.name.toLowerCase();
    product.style.display = name.includes(filter) ? "block" : "none";
  });
});
