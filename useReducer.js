const DOM = {
  container: document.querySelector(".container"),
  totalPrice: document.querySelector(".total-price"),
  clearBtn: document.querySelector(".clear-btn"),
};

const cartManager = {
  items: [
    {
      id: 1,
      name: "Samsung Galaxy S8",
      price: 399.99,
      img: "phone-4.png",
      qty: 1,
    },
    {
      id: 2,
      name: "Google Pixel",
      price: 499.99,
      img: "phone-1.png",
      qty: 1,
    },
    {
      id: 3,
      name: "Xiaomi Redmi Note 2",
      price: 699.99,
      img: "phone-2.png",
      qty: 1,
    },
    {
      id: 4,
      name: "Samsung Galaxy S7",
      price: 599.99,
      img: "phone-3.png",
      qty: 1,
    },
  ],

  getTotal() {
    return this.items.reduce((sum, item) => sum + item.price * item.qty, 0);
  },

  increaseQty(id) {
    const item = this.items.find((i) => i.id === id);
    if (!item) return;
    item.qty++;
  },

  decreaseQty(id) {
    const item = this.items.find((i) => i.id === id);
    if (!item) return;
    if (item.qty === 0) return;
    item.qty--;
  },

  removeItem(id) {
    this.items = this.items.filter((i) => i.id !== id);
  },
};

function updatePage() {
  DOM.container.innerHTML = "";
  cartManager.items.forEach((item) => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.dataset.id = item.id;

    div.innerHTML = `
      <div class="item-info">
        <img src="${item.img}" />
        <div class="item-text">
          <h2>${item.name}</h2>
          <p class="price">$${item.price.toFixed(2)}</p>
          <button class="remove-btn">remove</button>
        </div>
      </div>

      <div class="qty-controls">
        <button class="arrow-btn increase">▲</button>
        <span class="qty">${item.qty}</span>
        <button class="arrow-btn decrease">▼</button>
      </div>
    `;

    DOM.container.appendChild(div);
  });

  DOM.totalPrice.textContent = "$" + cartManager.getTotal().toFixed(2);
}

DOM.container.addEventListener("click", function (e) {
  const parent = e.target.closest(".cart-item");
  if (!parent) return;

  const id = Number(parent.dataset.id);

  if (e.target.classList.contains("increase")) {
    cartManager.increaseQty(id);
  }

  if (e.target.classList.contains("decrease")) {
    cartManager.decreaseQty(id);
  }

  if (e.target.classList.contains("remove-btn")) {
    cartManager.removeItem(id);
  }

  updatePage();
});

DOM.clearBtn.addEventListener("click", () => {
  cartManager.items = [];
  updatePage();
});
