export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    let cartItem = {};
    if (product === null || product === undefined) {
      return;
    }
    if (this.cartItems.find(item => item.product.id === product.id) != undefined) {
      this.cartItems.find(item => item.product.id === product.id).count += 1;
    } else {
      cartItem.product = product;
      cartItem.count = 1;
      this.cartItems.push(cartItem);
    }
    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.find(item => item.product.id === productId);
    if (amount === 1) {
      cartItem.count += 1;
    }
    if (amount === -1) {
      cartItem.count -= 1;
      if (cartItem.count === 0) {
        const index = this.cartItems.findIndex(item => item.product.id === productId);
        if (index !== -1) {
          this.cartItems.splice(index, 1);
        }
      }
    }
    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    return (!this.cartItems.length > 0);
  }

  getTotalCount() {
    let amount = 0;
    for (let item of this.cartItems) {
      amount = amount + item.count;
    }
    return amount;
  }

  getTotalPrice() {
    let total = 0;
    for (let item of this.cartItems) {
      total = total + item.product.price * item.count;
    }
    return total;
    // ваш код
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}
