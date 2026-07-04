import { Locator, Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly productTitle: Locator;
  readonly addToCartButton: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    // Validador de que estamos na página certa
    this.productTitle = page.locator('.title');
    // Vamos pegar o primeiro botão de "Add to cart" que aparecer na lista
    this.addToCartButton = page.locator('.btn_inventory').first();
    // O ícone do carrinho que mostra a quantidade de itens
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  async addFirstProductToCart() {
    await this.addToCartButton.click();
  }

  async getCartItemsCount() {
    return await this.cartBadge.innerText();
  }
}