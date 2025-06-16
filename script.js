const products = [
  { id: 1, name: "Cake", price: 10, image: "cake.jpg" },
  { id: 2, name: "Bread", price: 75, image: "bread.jpg" },
  { id: 3, name: "Milk 500ml", price: 65, image: "milk500.jpg" },
  { id: 4, name: "Milk 250ml", price: 35, image: "milk250.jpg" },
  { id: 5, name: "Candy", price: 10, image: "candy.jpg" },
  { id: 6, name: "Tomato", price: 5, image: "tomato.jpg" },
];

let cart = [];

function renderProducts() {
  const container = document.getElementById("product-list");
  products.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="images/${product.image}" alt="${product.name}" class="product-image">
      <h3>${product.name}</h3>
      <p>KES ${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    container.appendChild(div);
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const found = cart.find(item => item.id === id);
  if (found) {
    found.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  updateCart();
}

function updateCart() {
  const cartList = document.getElementById("cart-items");
  cartList.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
    const li = document.createElement("li");
    li.textContent = `${item.name} x${item.qty} = KES ${item.price * item.qty}`;
    cartList.appendChild(li);
  });
  document.getElementById("total").textContent = `Total: KES ${total}`;
}

document.getElementById("checkout").addEventListener("click", () => {
  const msg = cart.map(item => `${item.name} x${item.qty}`).join(", ");
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const whatsappMsg = `I would like to order: ${msg}. Total: KES ${total}`;
  const phone = "254758454074";
  const link = `https://wa.me/${phone}?text=${encodeURIComponent(whatsappMsg)}`;
  window.open(link, "_blank");
  cart = [];
  updateCart();
});

renderProducts();
