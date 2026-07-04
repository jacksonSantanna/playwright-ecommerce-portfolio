import { Locator, Page } from '@playwright/test';

export class CartPageAdvanced {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly removeButtons: Locator;
  readonly checkoutButton: Locator;
  readonly emptyCartMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.removeButtons = page.locator('[data-test="remove-"]').first();
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.emptyCartMessage = page.locator('.empty_cart');
  }

  async getCartItemCount() {
    return await this.cartItems.count();
  }

  async removeItemFromCart(index: number = 0) {
    const items = await this.cartItems.all();
    if (items.length > index) {
      const removeButton = items[index].locator('[data-test^="remove"]');
      await removeButton.click();
    }
  }

  async clickCheckout() {
    await this.checkoutButton.click();
  }

  async getCartItemNames() {
    const items = await this.cartItems.all();
    const names = [];
    for (const item of items) {
      const name = await item.locator('.inventory_item_name').innerText();
      names.push(name);
    }
    return names;
  }

  async getCartItemPrices(): Promise<number[]> {
    const items = await this.cartItems.all();
    const prices = [];
    for (const item of items) {
      const priceText = await item.locator('.inventory_item_price').innerText();
      const match = priceText.match(/\$?([\d.]+)/);
      if (match) {
        prices.push(parseFloat(match[1]));
      }
    }
    return prices;
  }

  async getCartSubtotal(): Promise<number> {
    const prices = await this.getCartItemPrices();
    return prices.reduce((sum, price) => sum + price, 0);
  }
}

