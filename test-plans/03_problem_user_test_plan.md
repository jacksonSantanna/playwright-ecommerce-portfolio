# Swag Labs - Problem User Test Plan

## Overview

This test plan covers all test cases for the **Problem User** (`problem_user`) on the Swag Labs e-commerce platform. The problem user represents a critical scenario where the application appears to function correctly through most of the user journey, but silently fails during the final order completion step. This user type validates the application's error handling and edge case management, where visual confirmation of success misleads the user into believing an order was placed when it was not.

**User Scope:** Login succeeds, checkout appears successful, but order is not created (silent failure)
**Test Environment:** https://www.saucedemo.com/
**Browser:** Chrome (Latest)
**Test Framework:** Playwright + TypeScript

---

## Credentials

| Field | Value |
|-------|-------|
| **Username** | `problem_user` |
| **Password** | `secret_sauce` |
| **Login Status** | ✅ Success |
| **Expected Issue** | Silent failure during order completion (no error message) |
| **Expected Redirect** | Confirmation page (but order not actually created) |

---

## Login Test Cases

### Test Case: SC-PRB-L01 - Login with Problem User Credentials

| Attribute | Details |
|-----------|---------|
| **Test ID** | SC-PRB-L01 |
| **Scenario** | Login with Problem User Credentials (succeeds) |
| **Priority** | High |
| **Test Type** | Functional |

#### Pre-conditions
- Application is loaded at `https://www.saucedemo.com/`
- User is on the login page
- Browser cache is cleared
- Network connectivity is stable

#### Steps to Reproduce
1. Navigate to `https://www.saucedemo.com/`
2. Enter username: `problem_user`
3. Enter password: `secret_sauce`
4. Click the "Login" button
5. Wait for page redirect

#### Expected Result
- Login form is submitted successfully
- No error messages appear
- User is redirected to the Products/Inventory page (`/inventory`)
- Products grid displays with all items visible
- Cart icon appears in the header
- At this point, the user experience is identical to standard_user

#### Test Data Required
- Username: `problem_user`
- Password: `secret_sauce`

---

## Test Execution Summary

### Entry Criteria
- Saucedemo application is deployed and accessible
- `problem_user` account is active
- Browser cookies are cleared
- Network connectivity is stable
- Backend order processing system is available
- API endpoints for order verification are accessible

### Exit Criteria
- All test scenarios are executed successfully
- Silent failure is detected and documented
- Order backend confirmation is verified
- Test report documents the silent failure issue
- All assertions pass and validate the bug

### Test Environment
- **Browser:** Chrome (Latest)
- **OS:** Windows/Mac/Linux
- **Test Framework:** Playwright
- **Test Runner:** npm test
- **API Testing:** Required for backend order verification

### Execution Steps
1. Install dependencies: `npm install`
2. Run tests: `npm test -- problem_user`
3. Generate report: `npm run test:report`
4. Verify backend via API: Check order database
5. Document findings in report
6. Review test artifacts in `./playwright-report/`

---

## Detailed Test Scenarios

### Scenario 1: SC-PRB-001 - Silent Failure on Order Completion

#### Scenario ID and Name
**SC-PRB-001:** Problem User Checkout Silent Failure (Order Not Created)

#### Pre-conditions
- User is logged in as `problem_user`
- Products page is fully loaded
- Cart is empty
- All products are visible

#### Steps to Reproduce

1. **Add Products to Cart**
   - Click "Add to cart" on Sauce Labs Backpack ($29.99)
   - Verify cart badge shows "1"
   - Click "Add to cart" on Sauce Labs Bike Light ($9.99)
   - Verify cart badge shows "2"

2. **Navigate to Cart**
   - Click shopping cart icon
   - Verify cart page loads with 2 items
   - Verify items display correctly (visually appears normal)

3. **Proceed to Checkout**
   - Click "Checkout" button
   - Verify "Checkout: Your Information" page loads

4. **Enter Shipping Information**
   - Enter First Name: "Test"
   - Enter Last Name: "User"
   - Enter Postal Code: "99999"
   - Click "Continue" button

5. **Review Order (Visually Appears Normal)**
   - Verify "Checkout: Overview" page loads
   - Verify order shows 2 items
   - Verify prices display: $29.99, $9.99
   - Verify subtotal: $39.98
   - Verify tax calculation appears correct
   - Verify total displays (e.g., $45.97)
   - **Note:** Everything appears visually correct at this point

6. **Complete Order (This is where silent failure occurs)**
   - Click "Finish" button
   - Page displays confirmation message: "Thank you for your order!"
   - Redirects to `/checkout-complete`
   - Order confirmation appears to complete successfully

7. **Verify via Backend (CRITICAL STEP - Reveals the Bug)**
   - Query order database/API for `problem_user` orders
   - Check if order actually exists in backend
   - Verify order was NOT created despite UI confirmation

#### Expected Result (Frontend - Misleading)
- User sees confirmation page
- Success message displays
- No error messages appear
- User believes order was successful

#### Expected Result (Backend - Reality)
- Order is NOT created in database
- Order is NOT in user's order history
- Backend logs may show processing failure
- No payment was processed
- Inventory was not updated

#### Test Data Required
- User: `problem_user` / `secret_sauce`
- First Name: `Test`
- Last Name: `User`
- Postal Code: `99999`
- Items: 2 products ($29.99 + $9.99 = $39.98)

---

### Scenario 2: SC-PRB-002 - Incomplete Backend Order Processing

#### Scenario ID and Name
**SC-PRB-002:** Order Processing Halts Backend Without Frontend Notification

#### Pre-conditions
- User has completed full checkout flow and sees confirmation page
- Backend order creation has silently failed

#### Steps to Reproduce

1. **Complete Checkout Flow**
   - Login as `problem_user`
   - Add items to cart
   - Fill checkout information
   - Click "Finish" on overview page

2. **Observe Frontend Response**
   - Note the confirmation page displayed
   - No error messages appear
   - UI suggests success

3. **Query Backend Order System**
   - Access order database or API endpoint
   - Search for orders by `problem_user`
   - Check order timestamps
   - Search for orders from today

4. **Verify Order Non-Existence**
   - Confirm no orders found for `problem_user` from this session
   - Verify order ID is not in system
   - Check payment processor records (if applicable)

5. **Check Inventory**
   - Verify products are still in inventory
   - Inventory should not be decremented
   - Stock quantities should remain unchanged

#### Expected Result
- Frontend: User sees success/confirmation
- Backend: Order does not exist
- Backend: No error logs indicating user-facing failure
- Backend: Payment was not processed
- Backend: Inventory was not modified
- **This is a critical UX bug:** User believes transaction succeeded when it failed

---

### Scenario 3: SC-PRB-003 - Repeated Order Attempts with Problem User

#### Scenario ID and Name
**SC-PRB-003:** Multiple Checkout Attempts - Consistent Silent Failure

#### Pre-conditions
- User has attempted checkout once and failed silently
- User is on confirmation page

#### Steps to Reproduce

1. **First Attempt - Already Documented**
   - Completion page shows success
   - Backend order does not exist

2. **Return to Shopping**
   - Navigate back to products page (manually or via link)
   - Add items to cart again (same or different items)

3. **Second Checkout Attempt**
   - Proceed through checkout form
   - Enter different shipping info (e.g., different postal code)
   - Complete checkout again

4. **Verify Consistency**
   - Again see confirmation page
   - Again check backend

5. **Query Backend Again**
   - Search for any orders from `problem_user`
   - Verify no new orders were created from second attempt

#### Expected Result
- Pattern is consistent: every checkout silently fails
- User will become increasingly frustrated
- No orders appear in backend despite multiple attempts
- User may believe credit card was charged multiple times (if payment processing logs show attempts)
- This is a critical UX failure

---

### Scenario 4: SC-PRB-004 - Frontend UI Appears Correct (No Visual Bugs)

#### Scenario ID and Name
**SC-PRB-004:** Validate Problem User Does Not Have Visual Issues

#### Pre-conditions
- User is logged in as `problem_user`
- User is browsing products and cart

#### Steps to Reproduce

1. **Verify Products Display Correctly**
   - Browse inventory page
   - Check product images render
   - Check product names are visible
   - Check prices display correctly
   - Check buttons are styled properly
   - Verify layout is aligned

2. **Verify Cart Page Displays Correctly**
   - Navigate to cart
   - Verify cart items display
   - Verify prices show
   - Verify remove buttons work
   - Verify checkout button is accessible

3. **Verify Checkout Pages Display Correctly**
   - Check form fields are visible
   - Check form labels display
   - Check buttons are clickable
   - Check overview page shows all items
   - Check prices and totals display correctly

#### Expected Result
- All UI elements display correctly
- No visual glitches or misalignments
- All buttons and forms are functional for user interaction
- User cannot visually detect the problem
- This is why it's so dangerous - silent failure with correct visual feedback

---

## Assertions

### Frontend Assertions (What the UI Shows)
```typescript
// Assert login succeeds
await expect(page).toHaveURL(/.*inventory/);

// Assert cart operations work visually
const cartBadge = page.locator('.shopping_cart_badge');
await expect(cartBadge).toContainText('2');

// Assert checkout navigation works
await expect(page).toHaveURL(/.*checkout-step-two/);

// Assert confirmation page displays
await expect(page).toHaveURL(/.*checkout-complete/);
const confirmationMessage = page.locator('.complete-header');
await expect(confirmationMessage).toBeVisible();

// Assert no error messages
const errorMsg = page.locator('[data-test="error"]');
await expect(errorMsg).not.toBeVisible();
```

### Backend Assertions (Revealing the Bug)
```typescript
// Assert order was NOT created in database
const orders = await api.get('/api/orders?user=problem_user');
expect(orders.data.length).toBe(0); // No orders found!

// OR: If checking for specific order
const orderResponse = await api.post('/api/orders/verify', {
  userId: 'problem_user',
  expectedOrderId: lastOrderId
});
expect(orderResponse.status).toBe(404); // Order not found

// Assert payment was not processed
const payments = await api.get('/api/payments?user=problem_user');
expect(payments.data.length).toBe(0); // No payment records

// Assert inventory was not updated
const inventory = await api.get('/api/inventory/SKU-001');
const initialStock = 100;
expect(inventory.stock).toBe(initialStock); // Stock unchanged
```

### User Experience Assertions (The Gap)
```typescript
// Assert: Frontend says success
const successMsg = await page.locator('.complete-header').innerText();
expect(successMsg).toContain('Thank you for your order!');

// But: Backend says failure
const orders = await api.get('/api/orders?user=problem_user');
expect(orders.data.length).toBe(0); // No orders!

// This gap represents the critical UX bug
console.log('Frontend: Order succeeded');
console.log('Backend: Order failed');
console.log('User Impact: Confusion, potential fraud concerns, lost transaction');
```

---

## Notes

### Critical Bug Documentation
This test plan documents a **critical UX bug**: silent order failure. The application misleads users into believing their orders succeeded when they actually failed. This is a severe business and trust issue.

### Test Execution Guidelines
- **Always include backend verification** - Frontend-only testing would miss this bug
- Clear browser cache between attempts
- Use API testing tools to verify backend state
- Document the exact time of each attempt for correlation
- Capture screenshots of both frontend success and backend failure
- This is NOT a test to ensure passing - it's a test to document a known bug

### Locators and Page Objects
- Confirmation message: `.complete-header`
- Cart badge: `.shopping_cart_badge`
- Error message: `[data-test="error"]`
- Continue button: `[data-test="continue"]`
- Finish button: `[data-test="finish"]`

### Backend Verification Methods
- Query order database directly
- Call order API endpoints
- Check order history endpoint: `GET /api/orders?user=problem_user`
- Verify payment logs
- Check inventory state

### Issue Severity
- **Severity Level:** CRITICAL
- **Type:** Silent Failure / UX Bug
- **Impact:** Complete checkout failure without user notification
- **Business Impact:** Lost transactions, confused users, potential chargebacks
- **Security Concern:** Users may believe they're charged multiple times
- **User Trust:** Severely damaged if discovered

### Why This Matters
This scenario validates the application's ability to handle graceful failure recovery. In production, such issues must be detected and surfaced to users immediately.

### Testing Approach
- This is a **regression test** to ensure the problem has been fixed
- The test documents the expected behavior (should NOT have this bug)
- Use this test to validate fixes
- Expected: After fix, orders SHOULD appear in backend
- Expected: After fix, confirmation page should match actual order creation

### Related Test Plans
- See `01_standard_user_test_plan.md` for comparison (successful orders)
- See `05_error_user_test_plan.md` for explicit error handling
- See `03_problem_user_test_plan.md` for UI validation

### Recommendations for Developers
- Add transaction logging and rollback mechanisms
- Implement comprehensive error handling in order processing
- Add real-time status updates to user (not just confirmation page)
- Validate order creation before displaying confirmation
- Implement retry logic with user notification
- Add audit trails for all transaction attempts
- Monitor for silent failures in production logs

### Performance and Timing
- Frontend response may appear fast (no actual processing)
- Backend processing that fails may not log properly
- Race conditions may cause intermittent failures
- Monitor for correlation between UI confirmation and backend creation

### Recovery Path for Users
- Users affected by this bug may need manual support
- Consider "Order Status Check" feature for users
- Provide email confirmation only after backend verification
- Implement order recovery mechanisms
