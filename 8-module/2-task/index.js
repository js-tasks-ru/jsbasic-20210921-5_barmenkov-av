import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.render();
    //this.updateFilter();
  }
  render() {
    this.elem = createElement(`
    <div class="products-grid">
    <div class="products-grid__inner"></div>
  </div>
    `);
    //мое формирование структуры
    /*for (let card of this.products) {
      let newCard = new ProductCard(card);
      this.sub('inner').append(newCard.elem);
    }*/
    this.renderContent();
  }
  sub(ref) {
    return this.elem.querySelector(`.products-grid__${ref}`);
  }
  updateFilter(filters) {
    Object.assign(this.filters, filters);
    this.renderContent();
  }
  renderContent() {
    this.sub('inner').innerHTML = '';

    for (let product of this.products) {
      if (this.filters.noNuts && product.nuts) {
        continue;
      }

      if (this.filters.vegeterianOnly && !product.vegeterian) {
        continue;
      }

      if (this.filters.maxSpiciness !== undefined && product.spiciness > this.filters.maxSpiciness) {
        continue;
      }

      if (this.filters.category && product.category != this.filters.category) {
        continue;
      }

      let newCard = new ProductCard(product);
      this.sub("inner").append(newCard.elem);
    }
  }
  /*updateFilter(filters) {
    let cards = this.elem.querySelectorAll('.card');
    for (let item of cards) {
      if (item.spiciness <= this.filters.maxSpiciness) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
      if (item.category == this.filters.category) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    }


  }*/
}
