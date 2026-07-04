# Swag Labs - Standard User Test Plan

## Overview

This test plan covers all test cases for the **Standard User** (`standard_user`) on the Swag Labs e-commerce platform. The standard user represents the ideal user journey where all features function correctly without errors, performance issues, or visual bugs. This user type validates the happy path and ensures core functionality operates as designed.

**User Scope:** All features work correctly
**Test Environment:** https://www.saucedemo.com/
**Browser:** Chrome (Latest)
**Test Framework:** Playwright + TypeScript

---

## Credentials

| Field | Value |
|-------|-------|
| **Username** | `standard_user` |
| **Password** | `secret_sauce` |
| **Login Status** | ✅ Success |
| **Expected Redirect** | `/inventory` |

---

## Login Test Cases

### Test Case: SC-STD-L01 - Login with Valid Credentials

| Attribute | Details |
|-----------|---------|
| **Test ID** | SC-STD-L01 |
| **Scenario** | Login with Standard User Valid Credentials |
| **Priority** | High |
| **Test Type** | Functional |

#### Pre-conditions
- Application is loaded at `https://www.saucedemo.com/`
- User is on the login page
- Browser cache is cleared
- Network connectivity is stable

#### Steps to Reproduce
1. Navigate to `https://www.saucedemo.com/`
2. Enter username: `standard_user`
3. Enter password: `secret_sauce`
4. Click the "Login" button
5. Wait for page redirect

#### Expected Result
- Login form is submitted successfully
- No error messages appear
- User is redirected to the Products/Inventory page (`/inventory`)
- Products grid displays with all items visible
- Cart icon appears in the header
- Cart badge is empty (shows no count) when starting fresh

#### Test Data Required
- Username: `standard_user`
- Password: `secret_sauce`

---

## Test Execution Summary

### Entry Criteria
- Saucedemo application is deployed and accessible
- `standard_user` account is active
- Browser cookies are cleared
- Network connectivity is stable

### Exit Criteria
- Login test case is executed successfully
- All assertions pass
- User is able to proceed to product browsing
- Test report is generated

### Test Environment
- **Browser:** Chrome (Latest)
- **OS:** Windows/Mac/Linux
- **Test Framework:** Playwright
- **Test Runner:** npm test

### Execution Steps
1. Install dependencies: `npm install`
2. Run tests: `npm test -- standard_user`
3. Generate report: `npm run test:report`
4. Review test artifacts in `./playwright-report/`

---

## Detailed Test Scenarios

### Scenario 1: SC-STD-001 - Complete User Journey

#### Scenario ID and Name
**SC-STD-001:** Complete Purchase Flow for Standard User

#### Pre-conditions
- User is logged in as `standard_user`
- Products page is fully loaded
- Cart is empty
- All products are visible

#### Steps to Reproduce

1. **Navigate to Products Page**
   - Login with standard_user credentials
   - Verify Products page loads at `/inventory`

2. **Browse and Add Products**
   - Click "Add to cart" on first product (Sauce Labs Backpack - $29.99)
   - Verify cart badge updates to "1"
   - Click "Add to cart" on second product (Sauce Labs Bike Light - $9.99)
   - Verify cart badge updates to "2"
   - Click "Add to cart" on third product (Sauce Labs Bolt T-Shirt - $15.99)
   - Verify cart badge updates to "3"

3. **View Cart**
   - Click shopping cart icon
   - Verify Cart page loads at `/cart`
   - Verify all 3 products are displayed in cart
   - Verify product names, prices, and quantities are correct

4. **Proceed to Checkout**
   - Click "Checkout" button
   - Verify Checkout: Your Information page loads at `/checkout-step-one`

5. **Enter Shipping Information**
   - Enter First Name: "John"
   - Enter Last Name: "Doe"
   - Enter Postal Code: "12345"
   - Click "Continue" button

6. **Review Order**
   - Verify Checkout: Overview page loads at `/checkout-step-two`
   - Verify order summary shows all 3 items
   - Verify item prices display correctly
   - Verify subtotal = $29.99 + $9.99 + $15.99 = $55.97
   - Verify tax is calculated correctly (8% = $4.48)
   - Verify total = Subtotal + Tax + Shipping = $60.45

7. **Complete Order**
   - Click "Finish" button
   - Verify Order Confirmation page loads at `/checkout-complete`
   - Verify success message displays: "Thank you for your order!"

#### Expected Result
- User successfully completes entire purchase flow
- All page transitions occur without errors
- All calculated values (subtotal, tax, total) are accurate
- Order confirmation page displays with success message
- No error messages appear at any step

#### Test Data Required
- User: `standard_user` / `secret_sauce`
- First Name: `John`
- Last Name: `Doe`
- Postal Code: `12345`
- Expected Products:
  - Sauce Labs Backpack: $29.99
  - Sauce Labs Bike Light: $9.99
  - Sauce Labs Bolt T-Shirt: $15.99
  - Expected Subtotal: $55.97
  - Expected Tax (8%): $4.48
  - Expected Total: $60.45

---

### Scenario 2: SC-STD-002 - Cart Management

#### Scenario ID and Name
**SC-STD-002:** Add and Remove Items from Cart

#### Pre-conditions
- User is logged in as `standard_user`
- User is on the Products/Inventory page
- Cart is empty

#### Steps to Reproduce

1. **Add Multiple Items**
   - Add 2 items to cart
   - Verify cart badge shows "2"

2. **Remove Item from Inventory Page**
   - Click "Remove" button on first item
   - Verify cart badge updates to "1"
   - Verify "Remove" button changes to "Add to cart"

3. **Navigate to Cart**
   - Click shopping cart icon
   - Verify only 1 item remains in cart

4. **Remove Item from Cart Page**
   - Click "Remove" button on the item in cart
   - Verify item is removed from cart display
   - Verify cart displays 0 items

#### Expected Result
- Cart badge increments/decrements correctly
- Items are properly added and removed from cart
- Button states change appropriately ("Add to cart" ↔ "Remove")
- Cart page reflects current items
- Empty cart displays no items

---

### Scenario 3: SC-STD-003 - Form Validation on Checkout

#### Scenario ID and Name
**SC-STD-003:** Validate Checkout Form Field Validation

#### Pre-conditions
- User has 1+ items in cart
- User is on Checkout: Your Information page

#### Steps to Reproduce

1. **Test Missing First Name**
   - Leave First Name empty
   - Fill Last Name: "Doe"
   - Fill Postal Code: "12345"
   - Click "Continue"
   - Verify error message: "Error: First Name is required"

2. **Test Missing Last Name**
   - Clear form and fill First Name: "John"
   - Leave Last Name empty
   - Fill Postal Code: "12345"
   - Click "Continue"
   - Verify error message: "Error: Last Name is required"

3. **Test Missing Postal Code**
   - Clear form and fill First Name: "John"
   - Fill Last Name: "Doe"
   - Leave Postal Code empty
   - Click "Continue"
   - Verify error message: "Error: Postal Code is required"

#### Expected Result
- Form validation prevents submission when fields are missing
- Appropriate error messages display for each empty field
- User remains on checkout form page (no redirect)
- Previously entered fields retain their values

---

## Assertions

### Login Assertions
```typescript
// Assert successful login redirect
await expect(page).toHaveURL(/.*inventory/);

// Assert Products page label is visible
const productLabel = page.locator('.product_label');
await expect(productLabel).toContainText('Products');

// Assert cart icon is visible
const cartIcon = page.locator('.shopping_cart_link');
await expect(cartIcon).toBeVisible();

// Assert no error messages on login
const errorMessage = page.locator('[data-test="error"]');
await expect(errorMessage).not.toBeVisible();
```

### Cart Management Assertions
```typescript
// Assert cart badge updates correctly
let cartBadge = page.locator('.shopping_cart_badge');
await expect(cartBadge).toContainText('1');
await expect(cartBadge).toContainText('2');
await expect(cartBadge).toContainText('3');

// Assert cart item count matches badge
const cartItems = page.locator('.cart_item');
const itemCount = await cartItems.count();
expect(itemCount).toBe(3);

// Assert button state changes
const button = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
await expect(button).toContainText('Remove');
```

### Checkout Assertions
```typescript
// Assert checkout page navigation
await expect(page).toHaveURL(/.*checkout-step-one/);
await expect(page).toHaveURL(/.*checkout-step-two/);
await expect(page).toHaveURL(/.*checkout-complete/);

// Assert order summary
const subtotal = page.locator('[data-test="subtotal-label"]');
await expect(subtotal).toContainText('$55.97');

const total = page.locator('[data-test="total-label"]');
await expect(total).toContainText('$60.45');

// Assert order confirmation
const confirmationMessage = page.locator('.complete-header');
await expect(confirmationMessage).toContainText('Thank you for your order!');
```

### Form Validation Assertions
```typescript
// Assert error message appears for missing field
const errorMsg = page.locator('[data-test="error"]');
await expect(errorMsg).toBeVisible();
await expect(errorMsg).toContainText('First Name is required');

// Assert form does not submit
await expect(page).toHaveURL(/.*checkout-step-one/); // stays on form page

// Assert field values are retained
const lastNameField = page.locator('[data-test="lastName"]');
const value = await lastNameField.inputValue();
expect(value).toBe('Doe');
```

---

## Notes

### Test Execution Guidelines
- Run login tests first to verify user authentication works
- Clear browser cache between test runs to ensure clean state
- Use explicit waits for page loads (`.waitForLoadState('networkidle')`)
- Capture screenshots on assertion failures for debugging

### Locators and Page Objects
- Utilize existing `LoginPage.ts` class for login automation
- Create `CartPage.ts` for cart management operations
- Create `CheckoutPage.ts` for checkout flow automation
- Use `data-test` attributes for reliable element selection

### Performance Expectations
- Login should complete within 2 seconds
- Page transitions should be smooth and under 3 seconds each
- Cart updates should be instantaneous (< 500ms)

### Known Features (Standard User)
- ✅ Login works perfectly
- ✅ All products display correctly
- ✅ Cart management is fully functional
- ✅ Checkout flow is complete and error-free
- ✅ Order confirmation displays correctly
- ✅ No performance degradation
- ✅ No visual inconsistencies

### Risk Assessment
- **Low Risk:** This is the happy path scenario; all features should work
- **Severity if Failed:** Critical - indicates regression in core functionality
- **Frequency:** Run on every build/deployment

### Dependencies
- Playwright >= 1.40.0
- TypeScript >= 4.9.0
- Node.js >= 16.0.0

### Related Test Plans
- See `02_locked_out_user_test_plan.md` for authentication failure scenarios
- See `03_problem_user_test_plan.md` for silent failure scenarios
- See `04_error_user_test_plan.md` for error handling scenarios
