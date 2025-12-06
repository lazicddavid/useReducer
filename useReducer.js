const DOM = {
  container: document.querySelector(".container"),
  totalPrice: document.querySelector(".total-price"),
  clearBtn: document.querySelector(".clear-btn"),
  cartQtyHeader: document.querySelector(".cart-total-header"),
};



function createPhone {
  return {
    id: crypto.randomUUID(),
    name,
    price,
    img,
    qty1,

    getId() {
    return this.id
  },
  getName() {
  return this.name
}









const cartManager = {
  items: [
    {
      id: crypto.randomUUID(),
      name: "Samsung Galaxy S8",
      price: 399.99,
      img: "phone-4.png",
      qty: 1,

      getId() {
        return this.id;
      },
      getName() {
        return this.name;
      },
      getPrice() {
        return this.price;
      },
      getQty() {
        return this.qty;
      },
    },
    {
      id: crypto.randomUUID(),
      name: "Google Pixel",
      price: 499.99,
      img: "phone-1.png",
      qty: 1,
      getId() {
        return this.id;
      },
      getName() {
        return this.name;
      },
      getPrice() {
        return this.price;
      },
      getQty() {
        return this.qty;
      },
    },
    {
      id: crypto.randomUUID(),
      name: "Xiaomi Redmi Note 2",
      price: 699.99,
      img: "phone-2.png",
      qty: 1,

      getId() {
        return this.id;
      },
      getName() {
        return this.name;
      },
      getPrice() {
        return this.price;
      },
      getQty() {
        return this.qty;
      },
    },
    {
      id: crypto.randomUUID(),
      name: "Samsung Galaxy S7",
      price: 599.99,
      img: "phone-3.png",
      qty: 1,
      getId() {
        return this.id;
      },
      getName() {
        return this.name;
      },
      getPrice() {
        return this.price;
      },
      getQty() {
        return this.qty;
      },
    },
  ],

  getTotal() {
    return this.items.reduce(
      (sum, item) => sum + item.getPrice() * item.getQty(),
      0
    );
  },

  increaseQty(id) {
    const item = this.items.find((i) => i.getId() === id);

    if (!item) return;
    item.qty++;
  },

  decreaseQty(id) {
    const item = this.items.find((i) => i.getId() === id);

    if (!item) return;

    item.qty--;

    if (item.qty === 0) {
      this.removeItem(id);
    }
  },

  getItemCount() {
    return this.items.reduce((sum, item) => sum + item.getQty(), 0);
  },

  removeItem(id) {
    this.items = this.items.filter((i) => i.getId() !== id);
  },
};

function updatePage() {
  DOM.container.innerHTML = "";
  if (cartManager.items.length === 0) {
    DOM.container.innerHTML = `
    <h4 style="text-align:center;  margin-top:40px; color:#555;">...is currently empty
    </h4>
  `;

    DOM.totalPrice.textContent = "$0.00";
    DOM.cartQtyHeader.textContent = 0;
    return;
  }

  cartManager.items.forEach((item) => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.dataset.id = item.getId();

    div.innerHTML = `
      <div class="item-info">
        <img src="${item.img}" />
        <div class="item-text">
          <h2>${item.getName()}</h2>
        <p class="price">$${item.getPrice().toFixed(2)}</p>

          <button class="remove-btn">remove</button>
        </div>
      </div>

      <div class="qty-controls">
        <button class="arrow-btn increase">▲</button>
        <span class="qty">${item.getQty()}</span>
        <button class="arrow-btn decrease">▼</button>
      </div>
    `;

    DOM.container.appendChild(div);
  });

  DOM.totalPrice.textContent = "$" + cartManager.getTotal().toFixed(2);
  DOM.cartQtyHeader.textContent = cartManager.getItemCount();
}

DOM.container.addEventListener("click", function (e) {
  const parent = e.target.closest(".cart-item");
  if (!parent) return;

  const id = parent.dataset.id;

  if (e.target.classList.contains("increase")) {
    cartManager.increaseQty(id);
  }
bxfbfbx kk 
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

updatePage();
