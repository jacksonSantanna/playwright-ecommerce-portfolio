import { Locator, Page } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly productLabel: Locator;
  readonly cartIcon: Locator;
  readonly cartBadge: Locator;
  readonly addToCartButtons: Locator;
  readonly removeButtons: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productLabel = page.locator('.title');
    this.cartIcon = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.addToCartButtons = page.locator('[data-test^="add-to-cart"]');
    this.removeButtons = page.locator('[data-test^="remove"]');
  }

  async addProductToCart(index: number = 0) {
    const buttons = await this.addToCartButtons.all();
    if (buttons.length > index) {
      await buttons[index].click();
    }
  }

  async getCartBadgeCount() {
    try {
      return await this.cartBadge.innerText();
    } catch {
      return '0';
    }
  }

  async removeProductFromCart(index: number = 0) {
    const buttons = await this.removeButtons.all();
    if (buttons.length > index) {
      await buttons[index].click();
    }
  }

  async clickCartIcon() {
    await this.cartIcon.click();
  }

  async getAddToCartButtonText(index: number = 0) {
    const buttons = await this.addToCartButtons.all();
    if (buttons.length > index) {
      return await buttons[index].innerText();
    }
    return '';
  }

  async waitForRemoveButtonVisible(index: number = 0) {
    // Wait for the button at this index to change to "Remove"
    const removeButton = this.page.locator('[data-test^="remove"]').nth(index);
    await removeButton.waitFor({ state: 'visible', timeout: 5000 });
  }
}
