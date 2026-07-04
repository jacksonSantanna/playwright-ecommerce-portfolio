# Swag Labs - Error User Test Plan

## Overview

This test plan covers all test cases for the **Error User** (`error_user`) on the Swag Labs e-commerce platform. The error user represents a scenario where all functionality operates correctly through most of the user journey, but fails when attempting to complete an order, displaying a specific error message to the user. This test plan validates proper error handling, user notification, and recovery mechanisms when order processing fails.

**User Scope:** Login succeeds, checkout proceeds normally, but error displayed when completing order
**Test Environment:** https://www.saucedemo.com/
**Browser:** Chrome (Latest)
**Test Framework:** Playwright + TypeScript

---

## Credentials

| Field | Value |
|-------|-------|
| **Username** | `error_user` |
| **Password** | `secret_sauce` |
| **Login Status** | ✅ Success |
| **Expected Behavior** | Error occurs on order completion with explicit error message |
| **Expected Error Message** | "Error: An error has occurred." |
| **Expected Redirect** | None (remains on overview/checkout page) |

---

## Login Test Cases

### Test Case: SC-ERR-L01 - Login with Error User Credentials

| Attribute | Details |
|-----------|---------|
| **Test ID** | SC-ERR-L01 |
| **Scenario** | Login with Error User Credentials (succeeds) |
| **Priority** | High |
| **Test Type** | Functional |

#### Pre-conditions
- Application is loaded at `https://www.saucedemo.com/`
- User is on the login page
- Browser cache is cleared
- Network connectivity is stable

#### Steps to Reproduce
1. Navigate to `https://www.saucedemo.com/`
2. Enter username: `error_user`
3. Enter password: `secret_sauce`
4. Click the "Login" button
5. Wait for page redirect

#### Expected Result
- Login form is submitted successfully
- No error messages appear
- User is redirected to the Products/Inventory page (`/inventory`)
- Products grid displays with all items visible
- Cart icon appears in the header
- Login experience is identical to standard_user

#### Test Data Required
- Username: `error_user`
- Password: `secret_sauce`

---

## Test Execution Summary

### Entry Criteria
- Saucedemo application is deployed and accessible
- `error_user` account is active
- Browser cookies are cleared
- Network connectivity is stable
- Order processing system is configured to fail for this user
- Error message system is functioning

### Exit Criteria
- All test scenarios are executed successfully
- Error message is displayed as expected
- Error handling mechanisms are validated
- Cart preservation after error is confirmed
- User can recover from error (return to cart, try again)
- Test report documents error behavior
- All assertions pass

### Test Environment
- **Browser:** Chrome (Latest)
- **OS:** Windows/Mac/Linux
- **Test Framework:** Playwright
- **Test Runner:** npm test
- **Error Logging:** Available for analysis

### Execution Steps
1. Install dependencies: `npm install`
2. Run tests: `npm test -- error_user`
3. Generate report: `npm run test:report`
4. Review error message capture: `./test-artifacts/error-user-errors/`
5. Verify error handling logic
6. Review test artifacts in `./playwright-report/`

---

## Detailed Test Scenarios

### Scenario 1: SC-ERR-001 - Error on Order Completion

#### Scenario ID and Name
**SC-ERR-001:** Error User Order Completion Failure with Error Message

#### Pre-conditions
- User is logged in as `error_user`
- Products page is fully loaded
- Cart is empty
- All products are visible

#### Steps to Reproduce

1. **Add Products to Cart**
   - Click "Add to cart" on first product
   - Verify cart badge updates to "1"
   - Click "Add to cart" on second product
   - Verify cart badge updates to "2"

2. **Navigate to Cart**
   - Click shopping cart icon
   - Verify cart page loads at `/cart`
   - Verify both products are displayed

3. **Proceed to Checkout**
   - Click "Checkout" button
   - Verify "Checkout: Your Information" page loads

4. **Enter Shipping Information**
   - Enter First Name: "Error"
   - Enter Last Name: "Test"
   - Enter Postal Code: "12345"
   - Click "Continue" button

5. **Review Order**
   - Verify "Checkout: Overview" page loads
   - Verify order summary shows both items
   - Verify prices and total display correctly
   - Order appears normal and ready to complete

6. **Attempt to Complete Order (ERROR OCCURS HERE)**
   - Click "Finish" button
   - Observe error message

7. **Verify Error Message Display**
   - Error message appears: "Error: An error has occurred."
   - Error is clearly visible to user
   - Error is not blocking page (can be read entirely)

8. **Verify Error Handling**
   - No page redirect occurs (remains on overview)
   - URL does not change to `/checkout-complete`
   - No confirmation page appears
   - Finish button returns to normal state

#### Expected Result
- Order completion fails as expected
- Error message displays to user explicitly
- Error message text: "Error: An error has occurred."
- **CRITICAL:** Error message is present (unlike problem_user's silent failure)
- User is aware something went wrong
- User remains on checkout flow (can retry or go back)
- Order is NOT created
- Cart contents are preserved

#### Test Data Required
- User: `error_user` / `secret_sauce`
- First Name: `Error`
- Last Name: `Test`
- Postal Code: `12345`
- Items: 2 products

---

### Scenario 2: SC-ERR-002 - Error Prevents Page Redirect

#### Scenario ID and Name
**SC-ERR-002:** Verify Order Error Prevents Redirect to Confirmation Page

#### Pre-conditions
- User has completed checkout flow up to "Finish" button
- Ready to click Finish (which will error)

#### Steps to Reproduce

1. **Record Current URL**
   - Note current URL: should be `/checkout-step-two` or `/checkout-overview`

2. **Click Finish Button**
   - Click "Finish" button
   - Wait for response

3. **Verify URL Does Not Change**
   - Check current URL
   - Should still be checkout page URL
   - Should NOT have changed to `/checkout-complete`

4. **Verify No Confirmation Page**
   - Confirm no "Thank you for your order" message
   - Confirm no order confirmation content
   - Confirm checkout form is still visible

5. **Observe Error Message**
   - Note error message is displayed
   - Error prevents successful completion

#### Expected Result
- URL remains at checkout page (e.g., `/checkout-step-two`)
- Page does NOT redirect to `/checkout-complete`
- Confirmation page does NOT appear
- Error message prevents forward navigation
- User is halted at checkout to address error

#### Test Data Required
- User: `error_user` / `secret_sauce`
- Filled checkout form
- Ready to finish order

---

### Scenario 3: SC-ERR-003 - Cart Contents Preserved After Error

#### Scenario ID and Name
**SC-ERR-003:** Verify Cart Items Remain After Order Error

#### Pre-conditions
- User has attempted order and received error
- User is on checkout page with error message visible

#### Steps to Reproduce

1. **Observe Error (Already Displayed)**
   - Error message is visible on checkout page

2. **Navigate Back to Cart**
   - Click "Continue Shopping" button or cart link
   - Or go back using browser back button

3. **Verify Cart Contents**
   - Navigate to cart page
   - Verify all items are still present
   - Verify item quantities are correct
   - Verify item prices are unchanged

4. **Verify Cart Badge**
   - Check cart badge count
   - Badge should show same count as before error
   - Example: if 2 items were being ordered, badge shows "2"

5. **Verify Inventory**
   - Products should not be reduced (order failed)
   - All products should still be available to purchase
   - Stock levels should not be decremented

#### Expected Result
- All cart items are preserved after error
- Cart contents are not cleared
- Cart badge reflects correct item count
- User can proceed with same items or modify cart
- No data loss due to error
- User can return to checkout and retry

---

### Scenario 4: SC-ERR-004 - Error Message Does Not Appear During Successful Steps

#### Scenario ID and Name
**SC-ERR-004:** Verify Error Only Occurs at Finish Step, Not Earlier

#### Pre-conditions
- User is logged in as `error_user`
- About to proceed through checkout

#### Steps to Reproduce

1. **Login (No Error)**
   - Login as error_user
   - Verify no error messages
   - Verify products page loads

2. **Add to Cart (No Error)**
   - Add items to cart
   - Verify no error messages
   - Verify cart badge updates

3. **Enter Checkout Information (No Error)**
   - Click Checkout
   - Fill in First Name
   - Fill in Last Name
   - Fill in Postal Code
   - Click Continue
   - Verify checkout overview loads with NO error

4. **Verify Overview Loads Successfully (No Error)**
   - Overview page displays
   - Order summary shows
   - Prices and total display
   - No error messages appear at this stage

5. **Error Should ONLY Appear When Clicking Finish**
   - Only when "Finish" button is clicked
   - Error appears

#### Expected Result
- No errors occur during login
- No errors occur when adding to cart
- No errors occur when filling checkout form
- No errors occur on overview page
- Error ONLY appears when attempting to complete order (Finish button)
- This demonstrates error is specific to order processing, not earlier steps

---

### Scenario 5: SC-ERR-005 - Error Message Specificity and Content

#### Scenario ID and Name
**SC-ERR-005:** Validate Error Message Content and Specificity

#### Pre-conditions
- Error user order has just failed
- Error message is displayed on screen

#### Steps to Reproduce

1. **Read Error Message Text**
   - Locate error message on page
   - Read entire message text
   - Note exact wording

2. **Verify Message Specificity**
   - Check if message is generic ("An error has occurred") or specific
   - Check if message provides guidance
   - Check if message suggests next steps

3. **Compare Against Other Error Types**
   - Not the same as locked_out_user message
   - Not the same as invalid credentials message
   - Is distinct and unique

4. **Verify Message Visibility**
   - Message is clearly visible
   - Message is not truncated
   - Message is readable and understandable
   - Message is in readable color/contrast

5. **Check for Error Message Close/Dismiss**
   - If error has a close button, test it
   - Verify error can be dismissed if applicable
   - Verify error reappears on retry

#### Expected Result
- Error message displays: "Error: An error has occurred."
- Message is complete and not truncated
- Message is specific to order processing failure
- Message is distinct from other error types
- Message is clearly visible and readable
- User can close/dismiss error if UI allows
- Error indicates something failed during order completion

---

### Scenario 6: SC-ERR-006 - Recovery and Retry Mechanism

#### Scenario ID and Name
**SC-ERR-006:** User Can Return to Cart and Retry Order

#### Pre-conditions
- User has received error on order completion
- User is on checkout page with error displayed

#### Steps to Reproduce

1. **First Attempt (Error Occurred)**
   - Already completed and saw error

2. **Return to Cart**
   - Look for "Continue Shopping" link
   - Or use navigation to go back to cart
   - Navigate to cart page

3. **Verify Cart Items**
   - Confirm all items are still there

4. **Retry Checkout**
   - Click "Checkout" button again

5. **Fill Form (Identical Information)**
   - Enter same First Name
   - Enter same Last Name
   - Enter same Postal Code
   - Click "Continue"

6. **Review Order Again**
   - Overview page loads again
   - Same items and totals display

7. **Attempt Order Again**
   - Click "Finish" button again
   - Observe result

#### Expected Result
- User can navigate back to cart
- User can retry checkout with same data
- Form can be filled again without errors
- Overview page loads again successfully
- Second attempt also results in error (consistent failure)
- This demonstrates error is recoverable (not fatal to session)
- User can attempt multiple times

---

## Assertions

### Error Message Presence Assertions
```typescript
// Assert error message appears after clicking Finish
const errorMsg = page.locator('[data-test="error"]');
await expect(errorMsg).toBeVisible();

// Assert error message contains specific text
await expect(errorMsg).toContainText('Error: An error has occurred.');

// Assert error message is fully visible (not truncated)
const errorText = await errorMsg.innerText();
expect(errorText).toContain('An error has occurred');
```

### Page Navigation Assertions
```typescript
// Assert page does not redirect to confirmation page
await expect(page).not.toHaveURL(/.*checkout-complete/);

// Assert user remains on checkout overview page
await expect(page).toHaveURL(/.*checkout-step-two|.*checkout-overview/);

// Assert confirmation message does NOT appear
const confirmationMsg = page.locator('.complete-header');
await expect(confirmationMsg).not.toBeVisible();
```

### Cart Preservation Assertions
```typescript
// Assert cart items are preserved
const cartItems = page.locator('.cart_item');
const itemCount = await cartItems.count();
expect(itemCount).toBe(2); // Original count preserved

// Assert cart badge still shows items
const cartBadge = page.locator('.shopping_cart_badge');
await expect(cartBadge).toContainText('2');

// Assert cart can be accessed with items
await page.locator('.shopping_cart_link').click();
const preservedItems = page.locator('.cart_item');
expect(await preservedItems.count()).toBe(2);
```

### Error Timing Assertions
```typescript
// Assert error only appears when clicking Finish, not before

// No error during checkout form submission
await checkoutPage.fillForm('Error', 'Test', '12345');
let error = page.locator('[data-test="error"]');
await expect(error).not.toBeVisible();

// Overview loads without error
await page.waitForURL(/.*checkout-step-two/);
error = page.locator('[data-test="error"]');
await expect(error).not.toBeVisible();

// Error appears after Finish click
await page.locator('[data-test="finish"]').click();
await expect(error).toBeVisible();
```

### Error Consistency Assertions
```typescript
// Assert same error on multiple attempts
const firstError = await page.locator('[data-test="error"]').innerText();

// Retry checkout
await page.locator('.shopping_cart_link').click();
// ... proceed through checkout again ...
await page.locator('[data-test="finish"]').click();

const secondError = await page.locator('[data-test="error"]').innerText();
expect(firstError).toBe(secondError); // Same error message
```

### Error Message Content Assertions
```typescript
// Assert error is not a different error type
const errorMsg = await page.locator('[data-test="error"]').innerText();

expect(errorMsg).not.toContain('locked out'); // Not locked out error
expect(errorMsg).not.toContain('do not match'); // Not invalid credentials
expect(errorMsg).toContain('An error has occurred'); // Correct error
```

---

## Notes

### Error Handling Best Practices Validated
- ✅ Error message is displayed (not silent like problem_user)
- ✅ Error is specific and identifiable
- ✅ Error prevents incorrect state transition (no redirect to confirmation)
- ✅ Cart is preserved for recovery
- ✅ User can identify issue occurred
- ✅ User can attempt recovery

### Test Execution Guidelines
- Clear browser cache before each test
- Run error scenarios in isolated environment
- Capture screenshots of error messages
- Document exact error message text
- Verify error is consistent across attempts
- Test recovery path after error

### Locators and Page Objects
- Error message: `[data-test="error"]`
- Error close button: `[data-test="error-button"]`
- Finish button: `[data-test="finish"]`
- Confirmation message: `.complete-header`
- Cart badge: `.shopping_cart_badge`
- Cart items: `.cart_item`
- Continue Shopping button: `[data-test="continue-shopping"]`

### Difference from Other Users
- **vs. standard_user:** error_user gets error on Finish, standard_user succeeds
- **vs. locked_out_user:** error_user can login, locked_out_user cannot
- **vs. problem_user:** error_user shows error message, problem_user hides it (silent failure)
- **vs. performance_glitch_user:** error_user fails at Finish, performance user just slow
- **vs. visual_user:** error_user fails functionally, visual_user has visual glitches

### Expected Behavior Summary
- ✅ Login works correctly
- ✅ Cart operations work correctly
- ✅ Checkout form operations work correctly
- ❌ Order completion fails (Finish button click)
- 📢 Error message is displayed
- 🛑 User cannot proceed without addressing error
- 🔄 User can recover by returning to cart
- 🔄 User can retry the order

### Failure Scenarios to Identify
- **Incorrect:** No error message (should display error)
- **Incorrect:** Redirect to confirmation page (should stay on checkout)
- **Incorrect:** Cart items are cleared (should be preserved)
- **Incorrect:** Error appears earlier than Finish (should only be at Finish)
- **Incorrect:** Silent failure like problem_user (should show error)
- **Incorrect:** Login fails (should succeed like standard_user)

### Error Message Format
Expected message format: "Error: An error has occurred."
- Starts with "Error:"
- Describes general failure (not specific code)
- Provides context that checkout couldn't complete
- Clear and understandable to user

### Related Test Plans
- See `01_standard_user_test_plan.md` for successful order flow
- See `02_locked_out_user_test_plan.md` for login-time errors
- See `03_problem_user_test_plan.md` for contrast to silent failure
- See `06_visual_user_test_plan.md` for visual issues that don't affect checkout

### Error Recovery Pattern
1. **User encounters error** - User is attempting to complete order
2. **Error message displays** - User is informed of failure (contrast to problem_user)
3. **User remains on checkout page** - Not forced to start over
4. **Cart is preserved** - User can retry with same items
5. **User can retry** - Can attempt order again
6. **Consistent error** - Error occurs again (expected behavior for this user)

### Monitoring and Analysis
- Track error frequency for error_user
- Monitor if errors are isolated to specific user or broader issue
- Analyze error logs for root cause
- Verify error is intentional (test scenario) vs. accidental (bug)
- Consider if error_user should be retried automatically
- Document expected behavior for error_user in production

### Recommendations for Developers
- Ensure all order operations have error handling
- Display meaningful error messages to users
- Preserve user's work (cart) when errors occur
- Allow users to retry after errors
- Log errors with sufficient detail for debugging
- Test error paths as thoroughly as success paths
- Consider exponential backoff for automatic retry
- Provide user support information in error message
