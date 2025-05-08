// Product objects
const orange = {
  name: "orange",
  price: 7,
  quantity: 0,
  productId: 1001,
  image: "orange.jpg"
};

const cherry = {
  name: "cherry",
  price: 10,
  quantity: 0,
  productId: 1002,
  image: "cherry.jpg"
};

const strawberry = {
  name: "strawberry",
  price: 15,
  quantity: 0,
  productId: 1003,
  image: "strawberry.jpg"
};

// List of available products
let products = [orange, cherry, strawberry];

// Cart array to hold selected items
let cart = [];

// Returns a product object by its productId from a given list
function getProductById(list, pId) {
  return list.find(p => p.productId === pId);
}

// Adds a product to the cart by productId; increases quantity if already in cart
function addProductToCart(pId) {
  const product = getProductById(products, pId);
  if (cart.includes(product)) {
    product.quantity++;
  } else {
    product.quantity++;
    cart.push(product);
  }
}

// Increases the quantity of a product in the cart
function increaseQuantity(pId) {
  const product = getProductById(products, pId);
  product.quantity++;
}

// Decreases the quantity of a product in the cart, removes it if quantity is 0
function decreaseQuantity(pId) {
  const product = getProductById(cart, pId);
  if (product) {
    product.quantity--;
    if (product.quantity < 1) {
      const index = cart.findIndex(p => p.productId === pId);
      if (index !== -1) {
        cart.splice(index, 1);
      }
    }
  }
}

// Removes a product completely from the cart
function removeProductFromCart(pId) {
  const product = getProductById(cart, pId);
  if (product) {
    product.quantity = 0;
    const index = cart.findIndex(p => p.productId === pId);
    if (index !== -1) {
      cart.splice(index, 1);
    }
  }
}

// Calculates and returns the total price of items in the cart
function cartTotal() {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Empties the cart and resets product quantities
function emptyCart() {
  cart.forEach(p => (p.quantity = 0));
  cart.length = 0;
}

// Handles payment, returns the remaining balance (positive or negative)
let totalPaid = 0;

function pay(amount) {
  totalPaid += amount;
  const remaining = totalPaid - cartTotal();

  if (remaining >= 0) {
    totalPaid = 0;
    emptyCart();
  }

  return remaining;
}

// Export functions and data for use in other files
module.exports = {
  products,
  cart,
  addProductToCart,
  increaseQuantity,
  decreaseQuantity,
  removeProductFromCart,
  cartTotal,
  pay,
  emptyCart,
};
