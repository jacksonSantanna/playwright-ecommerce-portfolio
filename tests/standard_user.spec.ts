import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPageAdvanced } from '../pages/CartPageAdvanced';
import { CheckoutPage } from '../pages/CheckoutPage';

const STANDARD_USER = 'standard_user';
const PASSWORD = 'secret_sauce';

test.describe('Swag Labs - Standard User Test Plan', () => {
  
  // ============================================
  // LOGIN TESTS
  // ============================================
  
  test.describe('Login Tests', () => {
    
    test('SC-STD-L01: Login with Valid Credentials', async ({ page }) => {
      const loginPage = new LoginPage(page);
      const productsPage = new ProductsPage(page);
      
      // Pre-conditions: Navigate to login page
      await loginPage.navigate();
      
      // Steps: Enter credentials and login
      await loginPage.login(STANDARD_USER, PASSWORD);
      
      // Expected Results
      await expect(page).toHaveURL(/.*inventory/);
      await expect(productsPage.productLabel).toContainText('Products');
      await expect(productsPage.cartIcon).toBeVisible();
      
      // Verify no error messages appear
      const errorLocator = page.locator('[data-test="error"]');
      await expect(errorLocator).not.toBeVisible();
    });
  });

  // ============================================
  // COMPLETE PURCHASE FLOW TESTS
  // ============================================
  
  test.describe('Complete User Journey - SC-STD-001', () => {
    
    test('Complete Purchase Flow for Standard User', async ({ page }) => {
      const loginPage = new LoginPage(page);
      const productsPage = new ProductsPage(page);
      const cartPageAdvanced = new CartPageAdvanced(page);
      const checkoutPage = new CheckoutPage(page);
      
      // Step 1: Login
      await loginPage.navigate();
      await loginPage.login(STANDARD_USER, PASSWORD);
      await expect(page).toHaveURL(/.*inventory/);
      
      // Step 2: Add Products to Cart
      let previousCount = 0;
      
      for (let i = 0; i < 3; i++) {
        await productsPage.addProductToCart(i);
        const currentCount = parseInt(await productsPage.getCartBadgeCount());
        expect(currentCount).toBe(previousCount + 1);
        previousCount = currentCount;
      }
      
      const cartCount = await productsPage.getCartBadgeCount();
      
      // Step 3: View Cart
      await productsPage.clickCartIcon();
      await expect(page).toHaveURL(/.*cart/);
      
      // Verify products are in cart
      const itemCount = await cartPageAdvanced.getCartItemCount();
      expect(itemCount).toBeGreaterThan(0);
      expect(itemCount).toBe(parseInt(cartCount));
      
      // Step 4: Proceed to Checkout
      await checkoutPage.clickCheckout();
      await expect(page).toHaveURL(/.*checkout-step-one/);
      
      // Step 5: Enter Shipping Information
      await checkoutPage.fillCheckoutForm('John', 'Doe', '12345');
      await checkoutPage.clickContinue();
      
      // Step 6: Review Order
      await expect(page).toHaveURL(/.*checkout-step-two/);
      
      // Verify order summary with dynamic calculation
      const subtotalValue = await checkoutPage.getSubtotalValue();
      const taxValue = await checkoutPage.getTaxValue();
      const totalValue = await checkoutPage.getTotalValue();
      
      // Tax should be approximately 8% of subtotal (with small floating point tolerance)
      const expectedTax = Math.round(subtotalValue * 0.08 * 100) / 100;
      const expectedTotal = Math.round((subtotalValue + expectedTax) * 100) / 100;
      
      expect(subtotalValue).toBeGreaterThan(0);
      expect(taxValue).toBeCloseTo(expectedTax, 2);
      expect(totalValue).toBeCloseTo(expectedTotal, 2);
      
      // Step 7: Complete Order
      await checkoutPage.clickFinish();
      await expect(page).toHaveURL(/.*checkout-complete/);
      
      // Verify success message
      const confirmationMsg = await checkoutPage.getCompletionMessage();
      expect(confirmationMsg).toContain('Thank you for your order');
    });
  });

  // ============================================
  // CART MANAGEMENT TESTS
  // ============================================
  
  test.describe('Cart Management - SC-STD-002', () => {
    
    test('Add and Remove Items from Cart', async ({ page }) => {
      const loginPage = new LoginPage(page);
      const productsPage = new ProductsPage(page);
      const cartPageAdvanced = new CartPageAdvanced(page);
      
      // Pre-conditions: Login and go to products page
      await loginPage.navigate();
      await loginPage.login(STANDARD_USER, PASSWORD);
      await expect(page).toHaveURL(/.*inventory/);
      
      // Step 1: Add Multiple Items
      await productsPage.addProductToCart(0);
      let countAfterFirstAdd = parseInt(await productsPage.getCartBadgeCount());
      expect(countAfterFirstAdd).toBeGreaterThan(0);
      
      await productsPage.addProductToCart(1);
      let countAfterSecondAdd = parseInt(await productsPage.getCartBadgeCount());
      expect(countAfterSecondAdd).toBe(countAfterFirstAdd + 1);
      
      // Step 2: Remove Item from Inventory Page
      await productsPage.removeProductFromCart(0);
      let countAfterRemove = parseInt(await productsPage.getCartBadgeCount());
      expect(countAfterRemove).toBe(countAfterSecondAdd - 1);
      
      // Step 3: Navigate to Cart
      await productsPage.clickCartIcon();
      await expect(page).toHaveURL(/.*cart/);
      
      // Verify item count matches badge
      let itemCount = await cartPageAdvanced.getCartItemCount();
      expect(itemCount).toBe(countAfterRemove);
      
      // Step 4: Remove Item from Cart Page
      await cartPageAdvanced.removeItemFromCart(0);
      
      // Verify cart is now empty
      let itemCountAfterRemoval = await cartPageAdvanced.getCartItemCount();
      expect(itemCountAfterRemoval).toBe(0);
    });

    test('Add Multiple Items and Verify Cart Badge Updates', async ({ page }) => {
      const loginPage = new LoginPage(page);
      const productsPage = new ProductsPage(page);
      
      // Pre-conditions: Login
      await loginPage.navigate();
      await loginPage.login(STANDARD_USER, PASSWORD);
      
      // Add items and verify badge increments
      let previousCount = 0;
      let itemsAdded = 0;
      
      // Keep adding items until no more "Add to cart" buttons are available
      while (true) {
        await productsPage.addProductToCart(itemsAdded);
        const currentCount = parseInt(await productsPage.getCartBadgeCount());
        
        // If count didn't change, no more items available to add
        if (currentCount === previousCount) {
          break;
        }
        
        expect(currentCount).toBe(previousCount + 1);
        previousCount = currentCount;
        itemsAdded++;
      }
      
      // Verify at least 2 items were added
      expect(previousCount).toBeGreaterThanOrEqual(2);
    });
  });

  // ============================================
  // FORM VALIDATION TESTS
  // ============================================
  
  test.describe('Form Validation on Checkout - SC-STD-003', () => {
    
    test('Test Missing First Name Validation', async ({ page }) => {
      const loginPage = new LoginPage(page);
      const productsPage = new ProductsPage(page);
      const cartPageAdvanced = new CartPageAdvanced(page);
      const checkoutPage = new CheckoutPage(page);
      
      // Pre-conditions: Add item and navigate to checkout
      await loginPage.navigate();
      await loginPage.login(STANDARD_USER, PASSWORD);
      await productsPage.addProductToCart(0);
      await productsPage.clickCartIcon();
      await cartPageAdvanced.clickCheckout();
      await expect(page).toHaveURL(/.*checkout-step-one/);
      
      // Fill only Last Name and Postal Code, leave First Name empty
      await checkoutPage.clearFirstName();
      await checkoutPage.fillCheckoutForm('', 'Doe', '12345');
      await checkoutPage.clickContinue();
      
      // Verify error message appears
      const errorMsg = await checkoutPage.getErrorMessage();
      expect(errorMsg).toContain('First Name is required');
      
      // Verify form does not submit (stay on same page)
      await expect(page).toHaveURL(/.*checkout-step-one/);
    });

    test('Test Missing Last Name Validation', async ({ page }) => {
      const loginPage = new LoginPage(page);
      const productsPage = new ProductsPage(page);
      const cartPageAdvanced = new CartPageAdvanced(page);
      const checkoutPage = new CheckoutPage(page);
      
      // Pre-conditions
      await loginPage.navigate();
      await loginPage.login(STANDARD_USER, PASSWORD);
      await productsPage.addProductToCart(0);
      await productsPage.clickCartIcon();
      await cartPageAdvanced.clickCheckout();
      
      // Fill First Name and Postal Code, leave Last Name empty
      await checkoutPage.fillCheckoutForm('John', '', '12345');
      await checkoutPage.clickContinue();
      
      // Verify error message
      const errorMsg = await checkoutPage.getErrorMessage();
      expect(errorMsg).toContain('Last Name is required');
      
      // Verify form does not submit
      await expect(page).toHaveURL(/.*checkout-step-one/);
    });

    test('Test Missing Postal Code Validation', async ({ page }) => {
      const loginPage = new LoginPage(page);
      const productsPage = new ProductsPage(page);
      const cartPageAdvanced = new CartPageAdvanced(page);
      const checkoutPage = new CheckoutPage(page);
      
      // Pre-conditions
      await loginPage.navigate();
      await loginPage.login(STANDARD_USER, PASSWORD);
      await productsPage.addProductToCart(0);
      await productsPage.clickCartIcon();
      await cartPageAdvanced.clickCheckout();
      
      // Fill First Name and Last Name, leave Postal Code empty
      await checkoutPage.fillCheckoutForm('John', 'Doe', '');
      await checkoutPage.clickContinue();
      
      // Verify error message
      const errorMsg = await checkoutPage.getErrorMessage();
      expect(errorMsg).toContain('Postal Code is required');
      
      // Verify form does not submit
      await expect(page).toHaveURL(/.*checkout-step-one/);
    });

    test('Test Form Field Values Retained After Error', async ({ page }) => {
      const loginPage = new LoginPage(page);
      const productsPage = new ProductsPage(page);
      const cartPageAdvanced = new CartPageAdvanced(page);
      const checkoutPage = new CheckoutPage(page);
      
      // Pre-conditions
      await loginPage.navigate();
      await loginPage.login(STANDARD_USER, PASSWORD);
      await productsPage.addProductToCart(0);
      await productsPage.clickCartIcon();
      await cartPageAdvanced.clickCheckout();
      
      // Fill partial form and submit
      await checkoutPage.fillCheckoutForm('John', 'Doe', '');
      await checkoutPage.clickContinue();
      
      // Verify error appears
      const errorMsg = await checkoutPage.getErrorMessage();
      expect(errorMsg).toContain('required');
      
      // Verify field values are retained
      const firstNameValue = await checkoutPage.firstNameInput.inputValue();
      const lastNameValue = await checkoutPage.lastNameInput.inputValue();
      
      expect(firstNameValue).toBe('John');
      expect(lastNameValue).toBe('Doe');
    });
  });

  // ============================================
  // EDGE CASES AND ADDITIONAL TESTS
  // ============================================
  
  test.describe('Additional Scenarios', () => {
    
    test('Verify Products are displayed after login', async ({ page }) => {
      const loginPage = new LoginPage(page);
      const productsPage = new ProductsPage(page);
      
      await loginPage.navigate();
      await loginPage.login(STANDARD_USER, PASSWORD);
      
      // Verify products label is visible
      await expect(productsPage.productLabel).toBeVisible();
      await expect(productsPage.productLabel).toContainText('Products');
    });

    test('Verify Cart Icon is visible after login', async ({ page }) => {
      const loginPage = new LoginPage(page);
      const productsPage = new ProductsPage(page);
      
      await loginPage.navigate();
      await loginPage.login(STANDARD_USER, PASSWORD);
      
      // Verify cart icon is visible
      await expect(productsPage.cartIcon).toBeVisible();
    });

    test('Add product, verify button changes from Add to Remove', async ({ page }) => {
      const loginPage = new LoginPage(page);
      const productsPage = new ProductsPage(page);
      
      await loginPage.navigate();
      await loginPage.login(STANDARD_USER, PASSWORD);
      
      // Check initial button text is "Add to cart"
      const initialText = await productsPage.getAddToCartButtonText(0);
      expect(initialText.toLowerCase()).toContain('add');
      
      // Add product
      await productsPage.addProductToCart(0);
      
      // Wait for the button to change to "Remove"
      await productsPage.waitForRemoveButtonVisible(0);
      
      // Verify by checking that a remove button now exists at that position
      const removeButtons = page.locator('[data-test^="remove"]');
      await expect(removeButtons.first()).toBeVisible();
    });
  });
});
