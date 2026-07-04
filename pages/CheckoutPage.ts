import { Locator, Page } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly errorMessage: Locator;
  readonly subtotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;
  readonly completionHeader: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // Checkout Step One - Your Information
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.errorMessage = page.locator('[data-test="error"]');

    // Checkout Step Two - Overview
    this.subtotalLabel = page.locator('[data-test="subtotal-label"]');
    this.taxLabel = page.locator('[data-test="tax-label"]');
    this.totalLabel = page.locator('[data-test="total-label"]');
    this.finishButton = page.locator('[data-test="finish"]');

    // Order Confirmation
    this.completionHeader = page.locator('.complete-header');

    // Cart page checkout button
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async fillCheckoutForm(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async clearFirstName() {
    await this.firstNameInput.clear();
  }

  async clearLastName() {
    await this.lastNameInput.clear();
  }

  async clearPostalCode() {
    await this.postalCodeInput.clear();
  }

  async clickContinue() {
    await this.continueButton.click();
  }

  async clickFinish() {
    await this.finishButton.click();
  }

  async getSubtotalText() {
    return await this.subtotalLabel.innerText();
  }

  async getSubtotalValue(): Promise<number> {
    const text = await this.subtotalLabel.innerText();
    const match = text.match(/\$?([\d.]+)/);
    return match ? parseFloat(match[1]) : 0;
  }

  async getTaxText() {
    return await this.taxLabel.innerText();
  }

  async getTaxValue(): Promise<number> {
    const text = await this.taxLabel.innerText();
    const match = text.match(/\$?([\d.]+)/);
    return match ? parseFloat(match[1]) : 0;
  }

  async getTotalText() {
    return await this.totalLabel.innerText();
  }

  async getTotalValue(): Promise<number> {
    const text = await this.totalLabel.innerText();
    const match = text.match(/\$?([\d.]+)/);
    return match ? parseFloat(match[1]) : 0;
  }

  async getCompletionMessage() {
    return await this.completionHeader.innerText();
  }

  async getErrorMessage() {
    return await this.errorMessage.innerText();
  }

  async clickCheckout() {
    await this.checkoutButton.click();
  }
}
