# Swag Labs - Locked Out User Test Plan

## Overview

This test plan covers all test cases for the **Locked Out User** (`locked_out_user`) on the Swag Labs e-commerce platform. The locked out user represents a security scenario where a user account has been locked and cannot authenticate. This test plan validates that the application properly handles locked accounts with an exclusive error message and prevents access to protected pages.

**User Scope:** Account is locked; login fails with specific error message
**Test Environment:** https://www.saucedemo.com/
**Browser:** Chrome (Latest)
**Test Framework:** Playwright + TypeScript

---

## Credentials

| Field | Value |
|-------|-------|
| **Username** | `locked_out_user` |
| **Password** | `secret_sauce` |
| **Login Status** | 🔒 Blocked |
| **Expected Error Message** | "Epic sadface: Sorry, this user has been locked out." |
| **Expected Redirect** | None (remains on login page) |

---

## Login Test Cases

### Test Case: SC-LOU-L01 - Login Attempt with Locked Out Account

| Attribute | Details |
|-----------|---------|
| **Test ID** | SC-LOU-L01 |
| **Scenario** | Login Attempt with Locked Out User |
| **Priority** | High |
| **Test Type** | Security/Authentication |

#### Pre-conditions
- Application is loaded at `https://www.saucedemo.com/`
- User is on the login page
- Browser cache is cleared
- Network connectivity is stable
- `locked_out_user` account is in locked state

#### Steps to Reproduce
1. Navigate to `https://www.saucedemo.com/`
2. Enter username: `locked_out_user`
3. Enter password: `secret_sauce`
4. Click the "Login" button
5. Observe error message and page state

#### Expected Result
- Login fails immediately
- User remains on login page (URL does not change)
- Error message displays: "Epic sadface: Sorry, this user has been locked out."
- Error message is clearly visible and distinct from other error types
- Login button returns to normal state (not disabled/loading)
- Form fields are cleared (or retain values depending on design)
- No redirect to Products page occurs

#### Test Data Required
- Username: `locked_out_user`
- Password: `secret_sauce`
- Expected Error Message: "Epic sadface: Sorry, this user has been locked out."

---

## Test Execution Summary

### Entry Criteria
- Saucedemo application is deployed and accessible
- `locked_out_user` account is active but locked
- Browser cookies are cleared
- Network connectivity is stable
- Error message system is functioning

### Exit Criteria
- Login test case is executed successfully
- All assertions pass
- User is not able to access product pages
- Test report is generated

### Test Environment
- **Browser:** Chrome (Latest)
- **OS:** Windows/Mac/Linux
- **Test Framework:** Playwright
- **Test Runner:** npm test

### Execution Steps
1. Install dependencies: `npm install`
2. Run tests: `npm test -- locked_out_user`
3. Generate report: `npm run test:report`
4. Review test artifacts in `./playwright-report/`

---

## Detailed Test Scenarios

### Scenario 1: SC-LOU-001 - Login Failure with Exclusive Error Message

#### Scenario ID and Name
**SC-LOU-001:** Locked Out User Cannot Login with Exclusive Error Message

#### Pre-conditions
- Application is loaded at login page
- `locked_out_user` account exists and is locked
- Browser is in clean state

#### Steps to Reproduce

1. **Navigate to Login Page**
   - Go to `https://www.saucedemo.com/`
   - Verify login form is displayed

2. **Enter Locked Out User Credentials**
   - Click on Username field
   - Enter: `locked_out_user`
   - Click on Password field
   - Enter: `secret_sauce`

3. **Attempt Login**
   - Click the "Login" button
   - Observe the response

4. **Verify Error Message**
   - Check that error message container appears
   - Read the error message text
   - Verify it mentions user is locked out

5. **Verify Page State**
   - Confirm URL is still `/` (no redirect)
   - Confirm still on login page
   - Confirm login form is still visible

6. **Attempt to Access Products Page Directly**
   - Try to navigate directly to `https://www.saucedemo.com/inventory`
   - Verify redirect back to login page

#### Expected Result
- Error message displays: "Epic sadface: Sorry, this user has been locked out."
- Error message is specific to locked out accounts (not generic error)
- User cannot proceed to Products page
- URL remains at `/`
- Login form is still visible and usable for retry
- Direct navigation to protected pages redirects to login

#### Test Data Required
- Username: `locked_out_user`
- Password: `secret_sauce`
- Expected Error Message: "Epic sadface: Sorry, this user has been locked out."

---

### Scenario 2: SC-LOU-002 - Multiple Login Attempts with Locked Account

#### Scenario ID and Name
**SC-LOU-002:** Consistent Error Message on Multiple Login Attempts

#### Pre-conditions
- User has attempted login and received locked out message
- User is on login page

#### Steps to Reproduce

1. **First Attempt**
   - Enter username: `locked_out_user`
   - Enter password: `secret_sauce`
   - Click "Login"
   - Note error message

2. **Clear Form and Retry**
   - Close error message (click X or clear button if available)
   - Clear username and password fields
   - Re-enter credentials: `locked_out_user` / `secret_sauce`
   - Click "Login"
   - Note error message again

3. **Verify Consistency**
   - Compare error messages from both attempts
   - Verify message is identical

#### Expected Result
- Each login attempt displays the same error message
- Error message remains: "Epic sadface: Sorry, this user has been locked out."
- No variation in error message between attempts
- User still cannot access Products page after multiple attempts
- No account lockout progression (doesn't become "more locked")

---

### Scenario 3: SC-LOU-003 - Access Control - Direct URL Navigation

#### Scenario ID and Name
**SC-LOU-003:** Locked Out User Cannot Access Protected Pages via Direct URL

#### Pre-conditions
- `locked_out_user` has not logged in successfully
- Browser is on login page

#### Steps to Reproduce

1. **Attempt Direct Navigation to Inventory**
   - Type in address bar: `https://www.saucedemo.com/inventory`
   - Press Enter

2. **Verify Redirect**
   - Observe page behavior
   - Check current URL

3. **Attempt Direct Navigation to Cart**
   - Type in address bar: `https://www.saucedemo.com/cart`
   - Press Enter

4. **Attempt Direct Navigation to Checkout**
   - Type in address bar: `https://www.saucedemo.com/checkout-step-one`
   - Press Enter

#### Expected Result
- All direct navigation attempts redirect to login page
- URL becomes `/` (login page)
- User cannot bypass authentication via direct URL access
- Session/cookies prevent access to protected routes
- No 404 errors; proper redirect to login

---

### Scenario 4: SC-LOU-004 - Error Message UI/UX Validation

#### Scenario ID and Name
**SC-LOU-004:** Validate Error Message Display and User Experience

#### Pre-conditions
- Locked out user login attempt is in progress
- Error message is visible

#### Steps to Reproduce

1. **Trigger Error**
   - Login with locked out credentials
   - Wait for error message to appear

2. **Verify Error Visibility**
   - Check error message is clearly visible
   - Check contrast and readability
   - Check error is not hidden or cut off

3. **Verify Error Content**
   - Read the complete error message
   - Verify no truncation
   - Verify specific mention of "locked out" status

4. **Verify Error Dismissal Options (if applicable)**
   - Look for close button (X)
   - If close button exists, test it
   - Verify error can be dismissed

5. **Verify Form State After Error**
   - Check if username field is still populated
   - Check if password field is still populated (security consideration)
   - Check if form is ready for retry

#### Expected Result
- Error message is prominently displayed
- Error text is fully visible and readable
- Error specifically mentions locked out status
- User can close error if close button exists
- Form is ready for user to retry or try different account
- Error positioning doesn't obscure login form

---

## Assertions

### Login Failure Assertions
```typescript
// Assert login fails and user remains on login page
await expect(page).toHaveURL(/.*\/$|.*\/$/);

// Assert error message is visible
const errorMessage = page.locator('[data-test="error"]');
await expect(errorMessage).toBeVisible();

// Assert error message contains "locked out" text
await expect(errorMessage).toContainText('locked out');

// Assert exact error message text
await expect(errorMessage).toContainText(
  'Epic sadface: Sorry, this user has been locked out.'
);

// Assert error is not generic "user not found" message
await expect(errorMessage).not.toContainText('Username and password do not match');
```

### Access Control Assertions
```typescript
// Assert cannot navigate directly to protected pages
await page.goto('https://www.saucedemo.com/inventory');
await expect(page).toHaveURL(/.*\/$|.*\/$/);

// Assert cannot access cart page directly
await page.goto('https://www.saucedemo.com/cart');
await expect(page).toHaveURL(/.*\/$|.*\/$/);

// Assert cannot access checkout page directly
await page.goto('https://www.saucedemo.com/checkout-step-one');
await expect(page).toHaveURL(/.*\/$|.*\/$/);

// Assert redirects back to login page
const loginForm = page.locator('.login_wrapper');
await expect(loginForm).toBeVisible();
```

### Error Message Consistency Assertions
```typescript
// Assert same error message on multiple attempts
const errorText1 = await page.locator('[data-test="error"]').innerText();
// (attempt login again)
const errorText2 = await page.locator('[data-test="error"]').innerText();
expect(errorText1).toBe(errorText2);

// Assert error contains key identifier
await expect(page.locator('[data-test="error"]')).toContainText('locked out');
```

### Error Message UI Assertions
```typescript
// Assert error message is visible in viewport
const errorMsg = page.locator('[data-test="error"]');
await expect(errorMsg).toBeInViewport();

// Assert error message has sufficient contrast
const errorElement = await page.locator('[data-test="error"]').boundingBox();
expect(errorElement).not.toBeNull();

// Assert error close button exists (if applicable)
const closeButton = page.locator('[data-test="error-button"]');
if (await closeButton.isVisible()) {
  await closeButton.click();
  await expect(errorMsg).not.toBeVisible();
}
```

---

## Notes

### Security Considerations
- This test validates that locked accounts cannot be bypassed
- Test ensures proper session/authentication handling
- Confirms redirect mechanisms prevent unauthorized access
- Validates that error message doesn't leak sensitive info

### Test Execution Guidelines
- Clear all cookies and cache before each test
- Run in isolated test environment (no shared state with other users)
- Do not attempt to unlock the account during testing
- Capture screenshots of error messages for documentation
- Verify error message text exactly matches expected text

### Locators and Page Objects
- Error message: `[data-test="error"]`
- Error close button: `[data-test="error-button"]`
- Username field: `[data-test="username"]`
- Password field: `[data-test="password"]`
- Login button: `[data-test="login-button"]`
- Login form wrapper: `.login_wrapper`

### Expected Behavior Summary
- ❌ Login fails
- 🔒 Account is locked
- ⛔ Access denied to protected pages
- 📢 Clear, exclusive error message displayed
- 🔄 User can retry with different credentials
- 🛡️ Session security is maintained

### Failure Scenarios to Avoid
- **Incorrect:** Generic error message (e.g., "Username and password do not match")
- **Incorrect:** Login succeeds (indicates locked account logic not working)
- **Incorrect:** User can access Products page (indicates bypass vulnerability)
- **Incorrect:** No error message displayed (indicates error handling not working)
- **Incorrect:** Redirect to 404 page (indicates improper error handling)

### Related Test Plans
- See `01_standard_user_test_plan.md` for successful login scenarios
- See `03_problem_user_test_plan.md` for post-login failures
- See `05_error_user_test_plan.md` for different error types

### Performance Expectations
- Error should display within 2 seconds of clicking Login
- Error message should be immediately visible to user
- No performance degradation expected for locked accounts

### Regression Testing
- Run this test with each deployment to ensure security is maintained
- Run after authentication system updates
- Run after error handling updates
- Run after session management changes
