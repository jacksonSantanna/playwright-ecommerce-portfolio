# Swag Labs - Performance Glitch User Test Plan

## Overview

This test plan covers all test cases for the **Performance Glitch User** (`performance_glitch_user`) on the Swag Labs e-commerce platform. The performance glitch user represents a scenario where all functionality operates correctly without errors or visual bugs, but experiences significant performance degradation compared to the standard user. This test plan validates the application's performance under adverse conditions and ensures features remain functional despite slow response times.

**User Scope:** All features work correctly, but operations are significantly slower than standard user
**Test Environment:** https://www.saucedemo.com/
**Browser:** Chrome (Latest)
**Test Framework:** Playwright + TypeScript
**Performance Baseline:** Standard user < 2 seconds per operation

---

## Credentials

| Field | Value |
|-------|-------|
| **Username** | `performance_glitch_user` |
| **Password** | `secret_sauce` |
| **Login Status** | ✅ Success |
| **Expected Behavior** | All operations complete successfully with 2-5x slower response times |
| **Expected Redirect** | `/inventory` (same as standard_user) |

---

## Login Test Cases

### Test Case: SC-PG-L01 - Login with Performance Glitch User Credentials

| Attribute | Details |
|-----------|---------|
| **Test ID** | SC-PG-L01 |
| **Scenario** | Login with Performance Glitch User (Succeeds - Slow) |
| **Priority** | Medium |
| **Test Type** | Performance/Functional |

#### Pre-conditions
- Application is loaded at `https://www.saucedemo.com/`
- User is on the login page
- Browser cache is cleared
- Network connectivity is stable
- Performance baseline has been established with standard_user

#### Steps to Reproduce
1. Navigate to `https://www.saucedemo.com/`
2. Enter username: `performance_glitch_user`
3. Enter password: `secret_sauce`
4. Click the "Login" button
5. Measure time until page redirect completes
6. Compare against standard_user baseline

#### Expected Result
- Login form is submitted successfully
- No error messages appear
- User is redirected to the Products/Inventory page (`/inventory`)
- Products grid displays with all items visible
- Cart icon appears in the header
- **Performance Note:** Login takes noticeably longer than standard_user (2-5x slower)
- Functionality is identical to standard_user despite slower speed

#### Test Data Required
- Username: `performance_glitch_user`
- Password: `secret_sauce`
- Baseline: Standard user login < 2 seconds

---

## Test Execution Summary

### Entry Criteria
- Saucedemo application is deployed and accessible
- `performance_glitch_user` account is active
- Browser cookies are cleared
- Network connectivity is stable
- Performance testing tools/utilities are available
- Baseline performance metrics from standard_user are documented

### Exit Criteria
- All performance test cases are executed
- Performance metrics are recorded for all operations
- All assertions pass
- Performance degradation is documented
- Test report includes performance comparisons
- Performance issues do not prevent feature functionality

### Test Environment
- **Browser:** Chrome (Latest)
- **OS:** Windows/Mac/Linux
- **Test Framework:** Playwright
- **Performance Tool:** DevTools or Playwright Inspector
- **Test Runner:** npm test
- **Metrics Collection:** Network timing, page load timing

### Execution Steps
1. Install dependencies: `npm install`
2. Establish baseline with standard_user: `npm test -- standard_user --record-metrics`
3. Run performance tests: `npm test -- performance_glitch_user --record-metrics`
4. Compare metrics: `npm run compare-metrics`
5. Generate performance report: `npm run report:performance`
6. Review test artifacts in `./playwright-report/`

---

## Detailed Test Scenarios

### Scenario 1: SC-PG-001 - Login Performance Measurement

#### Scenario ID and Name
**SC-PG-001:** Measure and Validate Login Performance Degradation

#### Pre-conditions
- Standard_user login time baseline established (e.g., 1.5 seconds)
- `performance_glitch_user` account is ready
- Testing environment is isolated
- Network conditions are consistent

#### Steps to Reproduce

1. **Record Baseline (if not already done)**
   - Login as standard_user and measure login time
   - Record: average login time, max login time
   - Baseline example: 1.5 seconds ± 0.3 seconds

2. **Measure Performance Glitch User Login**
   - Navigate to login page
   - Clear browser cache
   - Start performance timer
   - Enter username: `performance_glitch_user`
   - Enter password: `secret_sauce`
   - Click Login button
   - Stop timer when page is fully loaded
   - Record time taken

3. **Repeat Multiple Times**
   - Perform login 3-5 times
   - Record each time
   - Calculate average

4. **Analyze Results**
   - Compare performance_glitch_user average vs. standard_user average
   - Calculate performance ratio (2x, 3x, 5x slower?)
   - Document variability/consistency

#### Expected Result
- Login completes successfully (same as standard_user)
- **Performance degradation:** 2-5x slower than standard_user
- If standard_user = 1.5s, performance_glitch_user = 3-7.5s
- Performance is consistent across multiple attempts
- User sees loading/waiting but operation completes
- No error messages or timeouts occur

#### Test Data Required
- Username: `performance_glitch_user`
- Password: `secret_sauce`
- Baseline: standard_user login time
- Acceptable degradation: 2-5x slower

---

### Scenario 2: SC-PG-002 - Cart Operations Performance

#### Scenario ID and Name
**SC-PG-002:** Measure Performance of Add/Remove Cart Operations

#### Pre-conditions
- User is logged in as `performance_glitch_user`
- User is on Products page
- Cart is empty
- Baseline cart operation times established with standard_user

#### Steps to Reproduce

1. **Measure Add to Cart Operation**
   - Clear cache
   - Start timer
   - Click "Add to cart" button
   - Stop timer when cart badge updates
   - Record time

2. **Measure Multiple Additions**
   - Add 5 items to cart
   - Record time for each addition
   - Note if performance degrades with more items

3. **Measure Remove from Cart**
   - Start timer
   - Click "Remove" button on a cart item
   - Stop timer when cart badge updates
   - Record time

4. **Compare Against Baseline**
   - Compare add/remove times vs. standard_user
   - Calculate performance ratio

#### Expected Result
- Add to cart completes successfully
- Remove from cart completes successfully
- Cart badge updates correctly after each operation
- **Performance:** 2-5x slower than standard_user
- If standard_user add = 0.3s, performance_glitch_user = 0.6-1.5s
- Cart operations remain functional despite slowness
- No cart state corruption despite delays

---

### Scenario 3: SC-PG-003 - Page Load and Navigation Performance

#### Scenario ID and Name
**SC-PG-003:** Measure Page Load Times for Each Major Page

#### Pre-conditions
- User is logged in as `performance_glitch_user`
- Baseline page load times established with standard_user
- Network Monitor is available

#### Steps to Reproduce

1. **Measure Products Page Load**
   - From login page, click Login
   - Measure time from form submission to Products page fully loaded
   - Record: page ready time, network idle time

2. **Measure Cart Page Load**
   - From Products page, click shopping cart
   - Measure time to Cart page fully loads
   - Record load time

3. **Measure Checkout Page Loads**
   - Click "Checkout" button
   - Measure time to Your Information page loads
   - Record time
   - Click "Continue"
   - Measure time to Overview page loads
   - Record time

4. **Measure Confirmation Page Load**
   - Click "Finish"
   - Measure time to Confirmation page loads
   - Record time

#### Expected Result
- All pages load completely and render correctly
- **Performance:** Each page takes 2-5x longer than standard_user
- If standard_user = 1.0s, performance_glitch_user = 2-5s per page
- No pages timeout or fail to load
- All content displays correctly (no partial rendering)
- User sees consistent slow behavior (not intermittent)

---

### Scenario 4: SC-PG-004 - Checkout Flow Performance with Timing

#### Scenario ID and Name
**SC-PG-004:** Complete Checkout Flow - Performance Measurement End-to-End

#### Pre-conditions
- User is logged in as `performance_glitch_user`
- Products page is fully loaded
- Baseline checkout time established with standard_user
- Timer/profiling tools are ready

#### Steps to Reproduce

1. **Add Items to Cart (Measure)**
   - Add 3 items, record total time

2. **Navigate to Cart (Measure)**
   - Record time to Cart page load

3. **Proceed to Checkout (Measure)**
   - Record time to Checkout: Your Information page load
   - Enter shipping information
   - Record time to submit form

4. **Review Order (Measure)**
   - Record time to Checkout: Overview page load
   - Review order details (no action)

5. **Complete Order (Measure)**
   - Click "Finish"
   - Record time to Confirmation page load

6. **Analyze Total Time**
   - Sum all measured times
   - Compare vs. standard_user total checkout time

#### Expected Result
- Complete checkout flow succeeds
- **Total performance degradation:** 2-5x slower than standard_user
- If standard_user checkout = 10 seconds, performance_glitch_user = 20-50 seconds
- All steps complete successfully
- No operations timeout
- User confirmation page displays correctly
- Order is created successfully (despite slow timing)

---

### Scenario 5: SC-PG-005 - Performance Under Network Inspection

#### Scenario ID and Name
**SC-PG-005:** Analyze Network Requests and Response Times

#### Pre-conditions
- Browser DevTools Network tab is available
- User can inspect network requests
- Performance_glitch_user account is ready

#### Steps to Reproduce

1. **Open DevTools Network Tab**
   - Open browser Developer Tools
   - Go to Network tab
   - Clear network history

2. **Perform Login**
   - Navigate to login page
   - Login as performance_glitch_user
   - Observe network requests

3. **Analyze Network Requests**
   - Look for API calls duration
   - Look for resource load times (CSS, JS, images)
   - Look for XHR/Fetch request timings
   - Identify slowest requests

4. **Compare Request Patterns**
   - Compare against standard_user network log
   - Identify if specific requests are slow
   - Check if requests are delayed sequentially
   - Check if parallel requests are serialized

#### Expected Result
- Network requests complete successfully
- Response times are noticeably longer than standard_user
- Requests may show:
  - Longer server response time
  - Longer overall load time
  - Possible artificial delays in API responses
  - Consistent pattern of slowness
- All requests eventually complete (no timeouts)
- No failed requests or 5xx errors

---

## Assertions

### Login Performance Assertions
```typescript
// Measure login performance
const startTime = Date.now();
await loginPage.login('performance_glitch_user', 'secret_sauce');
await page.waitForLoadState('networkidle');
const loginTime = Date.now() - startTime;

// Assert login succeeds (functional correctness)
await expect(page).toHaveURL(/.*inventory/);

// Assert performance degradation (2-5x slower than standard_user baseline)
// If baseline = 1500ms, expect 3000-7500ms
expect(loginTime).toBeGreaterThan(3000); // At least 3x slower
expect(loginTime).toBeLessThan(10000); // But completes within reasonable time
expect(loginTime).toBeGreaterThan(standardUserLoginTime * 2); // 2x slower minimum
```

### Cart Operations Performance Assertions
```typescript
// Measure add to cart
const addStartTime = Date.now();
await page.locator('.btn_inventory').first().click();
await page.locator('.shopping_cart_badge').waitFor();
const addTime = Date.now() - addStartTime;

// Assert add succeeds
await expect(page.locator('.shopping_cart_badge')).toContainText('1');

// Assert performance degradation
expect(addTime).toBeGreaterThan(600); // Slower than standard
expect(addTime).toBeLessThan(2000); // But completes
```

### Page Load Performance Assertions
```typescript
// Measure cart page load
const cartStartTime = Date.now();
await page.locator('.shopping_cart_link').click();
await page.locator('.cart_item').first().waitFor(); // Wait for content
const cartLoadTime = Date.now() - cartStartTime;

// Assert page loads correctly
await expect(page).toHaveURL(/.*cart/);

// Assert performance degradation
expect(cartLoadTime).toBeGreaterThan(2000); // Noticeably slower
expect(cartLoadTime).toBeLessThan(8000); // But acceptable
```

### Functional Correctness Assertions (Despite Slowness)
```typescript
// Assert all operations complete successfully
await expect(page).toHaveURL(/.*inventory/); // Login succeeds
await expect(page.locator('.shopping_cart_badge')).toContainText('3'); // Cart updates
await expect(page).toHaveURL(/.*checkout-complete/); // Checkout completes

// Assert no errors despite performance issues
const errorMsg = page.locator('[data-test="error"]');
await expect(errorMsg).not.toBeVisible();

// Assert data integrity (prices, totals calculated correctly)
const total = await page.locator('[data-test="total-label"]').innerText();
expect(total).toContain('$'); // Total is present and valid
```

### Performance Consistency Assertions
```typescript
// Perform operation multiple times and assert consistency
const timings = [];
for (let i = 0; i < 3; i++) {
  const start = Date.now();
  await page.locator('[data-test="continue"]').click();
  await page.waitForLoadState('networkidle');
  timings.push(Date.now() - start);
}

// Assert consistent performance (not intermittent)
const avgTiming = timings.reduce((a, b) => a + b) / timings.length;
const variance = Math.max(...timings) - Math.min(...timings);
expect(variance).toBeLessThan(1000); // Consistent within 1 second
expect(avgTiming).toBeGreaterThan(2000); // Generally slow
```

---

## Notes

### Performance Testing Guidelines
- Establish baseline with standard_user first
- Run tests multiple times to capture average performance
- Account for network variability (use stable test environment)
- Compare relative performance ratios, not absolute times
- Document environment details that affect performance
- Monitor for performance improvement or regression over time

### Locators and Page Objects
- Products page indicator: `.product_label`
- Cart badge: `.shopping_cart_badge`
- Add to cart buttons: `.btn_inventory`
- Cart link: `.shopping_cart_link`
- Checkout button: `[data-test="checkout"]`
- Continue button: `[data-test="continue"]`
- Finish button: `[data-test="finish"]`

### Performance Measurement Tools
- Playwright built-in timing methods
- Browser DevTools Network tab
- Performance API (`performance.now()`)
- Lighthouse for metrics
- WebPageTest for detailed analysis

### Expected Behavior Summary
- ✅ All features work correctly (functional)
- 🐌 All operations are slow (2-5x slower than standard_user)
- ✅ No errors or failures occur
- ✅ Data integrity maintained
- ✅ Visual display is correct
- 🔄 Performance is consistent across operations

### Failure Scenarios to Identify
- **Incorrect:** Operations timeout (> 30 seconds)
- **Incorrect:** Errors/timeouts occur (should complete successfully)
- **Incorrect:** Data corruption due to delays
- **Incorrect:** UI freezes or becomes unresponsive
- **Incorrect:** Performance is not degraded (indicates wrong user)
- **Incorrect:** Performance improves over time (indicates caching, not the issue)

### Performance Thresholds
- **Acceptable Slow:** 2-5x baseline (performance_glitch_user should be here)
- **Too Slow:** > 10x baseline (would be unusable)
- **Timeout:** > 30 seconds (Playwright timeout typically 30s)
- **Fast:** < 1x baseline (would indicate wrong user)

### Root Cause Investigation
Performance degradation may be caused by:
- Artificial delays in API responses
- Database query delays
- Network throttling
- Computational overhead
- Inefficient algorithms
- Memory pressure
- I/O bottlenecks

### Monitoring in Production
- Track response times per user type
- Set alerts for performance degradation
- Monitor for slowness patterns
- Investigate if performance_glitch_user represents real issue
- Consider performance optimization if widespread

### Related Test Plans
- See `01_standard_user_test_plan.md` for baseline (fast) performance
- See `02_locked_out_user_test_plan.md` for security testing
- See `04_error_user_test_plan.md` for error handling despite performance

### Recommendations
- Consider implementing performance monitoring/APM
- Investigate root cause of performance degradation
- Implement caching strategies if applicable
- Optimize slow database queries
- Add performance regression tests to CI/CD
- Set performance budgets for key user interactions
