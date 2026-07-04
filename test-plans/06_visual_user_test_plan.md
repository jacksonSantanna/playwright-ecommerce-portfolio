# Swag Labs - Visual User Test Plan

## Overview

This test plan covers all test cases for the **Visual User** (`visual_user`) on the Swag Labs e-commerce platform. The visual user represents a scenario where the application's functionality operates correctly without errors or performance issues, but displays visual inconsistencies including layout misalignments, incorrect colors, broken image displays, and responsive design issues. This test plan validates both the visual appearance and functional correctness of the application despite aesthetic bugs.

**User Scope:** All features work correctly functionally, but visual/UI bugs are present
**Test Environment:** https://www.saucedemo.com/
**Browser:** Chrome (Latest)
**Test Framework:** Playwright + TypeScript with visual regression testing
**Resolution:** 1920x1080 (Desktop), also test responsive

---

## Credentials

| Field | Value |
|-------|-------|
| **Username** | `visual_user` |
| **Password** | `secret_sauce` |
| **Login Status** | ✅ Success |
| **Expected Behavior** | All functionality works; visual inconsistencies present |
| **Expected Issues** | Layout misalignment, color issues, broken images, button styling |
| **Expected Redirect** | `/inventory` (same as standard_user) |

---

## Login Test Cases

### Test Case: SC-VIS-L01 - Login with Visual User Credentials

| Attribute | Details |
|-----------|---------|
| **Test ID** | SC-VIS-L01 |
| **Scenario** | Login with Visual User Credentials (succeeds, visual issues may be present) |
| **Priority** | Medium |
| **Test Type** | Visual Regression / Functional |

#### Pre-conditions
- Application is loaded at `https://www.saucedemo.com/`
- User is on the login page
- Browser cache is cleared
- Resolution is 1920x1080 (desktop)
- Visual baseline screenshots from standard_user are available

#### Steps to Reproduce
1. Navigate to `https://www.saucedemo.com/`
2. Enter username: `visual_user`
3. Enter password: `secret_sauce`
4. Click the "Login" button
5. Wait for page redirect
6. Capture screenshot of products page
7. Compare against standard_user baseline

#### Expected Result
- Login form is submitted successfully
- No error messages appear (functional correctness)
- User is redirected to the Products/Inventory page (`/inventory`)
- Products grid displays with all items visible
- Cart icon appears in the header
- **Visually:** Layout or styling inconsistencies may be present (misaligned elements, wrong colors, etc.)
- **Functionally:** All elements are interactive and work correctly

#### Test Data Required
- Username: `visual_user`
- Password: `secret_sauce`
- Baseline screenshots from standard_user for comparison

---

## Test Execution Summary

### Entry Criteria
- Saucedemo application is deployed and accessible
- `visual_user` account is active
- Browser is configured to 1920x1080 resolution
- Browser cookies are cleared
- Visual testing/comparison tools are available
- Baseline screenshots from standard_user exist for comparison

### Exit Criteria
- All visual test scenarios are executed
- Screenshots are captured for comparison
- Visual inconsistencies are documented
- Functional tests pass (despite visual issues)
- Test report includes visual regression results
- All assertions pass

### Test Environment
- **Browser:** Chrome (Latest)
- **OS:** Windows/Mac/Linux
- **Resolution:** 1920x1080 (primary), also test mobile
- **Test Framework:** Playwright
- **Visual Tool:** Playwright `toHaveScreenshot()`
- **Test Runner:** npm test

### Execution Steps
1. Install dependencies: `npm install`
2. Generate baseline with standard_user: `npm test -- standard_user --screenshots`
3. Run visual tests: `npm test -- visual_user --compare-screenshots`
4. Generate visual report: `npm run report:visual`
5. Review differences: `./test-artifacts/visual-diffs/`
6. Document issues found

---

## Detailed Test Scenarios

### Scenario 1: SC-VIS-001 - Products Page Visual Regression

#### Scenario ID and Name
**SC-VIS-001:** Identify Visual Issues on Products/Inventory Page

#### Pre-conditions
- User is logged in as `visual_user`
- Products page is fully loaded
- Standard_user baseline screenshot exists
- 1920x1080 resolution

#### Steps to Reproduce

1. **Navigate to Products Page**
   - Login as visual_user
   - Wait for products page to fully load

2. **Capture Full Page Screenshot**
   - Take screenshot of entire products page
   - Save as: `visual_user_products_page.png`

3. **Capture Product Card Details**
   - Take close-up screenshots of individual product cards
   - Document: product name, price, image, add to cart button
   - Check each card's alignment and styling

4. **Capture Header and Navigation**
   - Screenshot header area with logo
   - Screenshot shopping cart icon
   - Screenshot page title ("Products")

5. **Compare Against Baseline**
   - Compare visual_user product page vs. standard_user product page
   - Identify differences:
     - Element positioning
     - Colors and fonts
     - Spacing and alignment
     - Image rendering

6. **Test Interactivity**
   - Click "Add to cart" button despite visual issues
   - Verify button is still functional
   - Verify cart badge updates

#### Expected Result
- **Visual Issues Examples:**
  - Product cards misaligned (some left, some right)
  - Product titles in wrong color or size
  - Product images distorted or broken
  - Add to cart buttons misaligned or wrong color
  - Price text overlapping other elements
  - Page title misaligned
  - Spacing between elements inconsistent
  
- **Functional Correctness:**
  - All buttons are clickable
  - Cart updates when clicking "Add to cart"
  - Product information is all present (just visually inconsistent)
  - Page loads completely and is usable

#### Test Data Required
- User: `visual_user` / `secret_sauce`
- Baseline: standard_user products page screenshot

---

### Scenario 2: SC-VIS-002 - Cart Page Visual Issues

#### Scenario ID and Name
**SC-VIS-002:** Identify Visual Issues on Cart Page

#### Pre-conditions
- User has items in cart
- Cart page is about to be viewed

#### Steps to Reproduce

1. **Add Items to Cart**
   - Add 2-3 items to cart

2. **Navigate to Cart**
   - Click shopping cart icon

3. **Capture Cart Page Full Screenshot**
   - Take screenshot of entire cart page
   - Save as: `visual_user_cart_page.png`

4. **Capture Cart Item Details**
   - Screenshot individual cart items
   - Document: item name, price, quantity, remove button
   - Check alignment and styling

5. **Capture Cart Summary**
   - Screenshot cart summary section
   - Document: subtotal, tax, total
   - Check if numbers align properly

6. **Compare Against Baseline**
   - Compare visual_user cart vs. standard_user cart
   - Identify visual differences:
     - Item row alignment
     - Column alignment (name, price, quantity)
     - Button positioning
     - Summary section layout
     - Color inconsistencies

#### Expected Result
- **Visual Issues Examples:**
  - Cart items stacked incorrectly (rows not aligned)
  - Item names misaligned with quantities
  - Price column out of alignment
  - Remove button in wrong position
  - Summary section misaligned
  - Text colors inconsistent
  - Spacing irregular
  
- **Functional Correctness:**
  - All items display with correct information
  - Remove buttons work
  - Quantities are correct
  - Prices are calculated correctly
  - Summary totals are accurate

---

### Scenario 3: SC-VIS-003 - Checkout Pages Visual Issues

#### Scenario ID and Name
**SC-VIS-003:** Identify Visual Issues on Checkout Pages

#### Pre-conditions
- User is ready to proceed to checkout
- Cart has items

#### Steps to Reproduce

1. **Proceed to Checkout Form**
   - Click "Checkout" from cart
   - Wait for "Checkout: Your Information" page to load

2. **Capture Checkout Form Screenshot**
   - Take full-page screenshot
   - Capture form fields: First Name, Last Name, Postal Code
   - Capture buttons: Cancel, Continue

3. **Identify Form Visual Issues**
   - Check field alignment
   - Check label positioning
   - Check button styling
   - Check spacing between fields
   - Check colors and fonts

4. **Fill Form and Proceed**
   - Fill in form fields (despite visual issues)
   - Click "Continue"

5. **Capture Checkout Overview Page**
   - Take screenshot of overview page
   - Capture: order items, prices, summary, total

6. **Identify Overview Visual Issues**
   - Check item table alignment
   - Check price alignment
   - Check button positioning
   - Check total display

#### Expected Result
- **Form Page Visual Issues:**
  - Form fields misaligned
  - Labels positioned incorrectly
  - Input field colors wrong
  - Button styling inconsistent
  - Spacing irregular
  
- **Overview Page Visual Issues:**
  - Item table columns misaligned
  - Prices not right-aligned
  - Total amount misaligned
  - Button positioned awkwardly
  
- **Functional Correctness:**
  - Form fields accept input
  - Form validates correctly
  - All data is captured
  - Overview displays accurate values
  - Order can be completed (if using standard_user) or attempt made (visual_user)

---

### Scenario 4: SC-VIS-004 - Responsive Design Issues

#### Scenario ID and Name
**SC-VIS-004:** Identify Visual Issues at Different Resolutions

#### Pre-conditions
- User can resize browser window
- Screenshots can be captured at different resolutions

#### Steps to Reproduce

1. **Desktop Resolution (1920x1080)**
   - Login as visual_user
   - Capture products page screenshot at 1920x1080

2. **Tablet Resolution (768x1024)**
   - Resize browser to 768x1024
   - Refresh page
   - Capture products page screenshot
   - Check if layout breaks
   - Check if elements are responsive

3. **Mobile Resolution (375x667)**
   - Resize browser to 375x667
   - Refresh page
   - Capture products page screenshot
   - Check if mobile layout is present
   - Check if elements are usable

4. **Compare Across Resolutions**
   - Look for inconsistencies at each resolution
   - Identify if layout breaks
   - Identify if elements become unusable
   - Check if visual issues worsen at smaller resolutions

#### Expected Result
- **Desktop (1920x1080):** Visual inconsistencies present but usable
- **Tablet (768x1024):** May have additional layout issues at this resolution
- **Mobile (375x667):** May have significant layout issues or unusable elements
- **Examples of responsive issues:**
  - Text too small to read
  - Elements overflow screen
  - Buttons unclickable at small resolution
  - Images distorted at different resolutions
  - Layout not responsive (doesn't adapt)
  - Hamburger menu not present on mobile
  
- **Functional Correctness:**
  - Despite responsive issues, basic functionality remains
  - Users can still interact with elements (if visible)
  - Data is still presented (just not well formatted)

---

### Scenario 5: SC-VIS-005 - Element-Specific Visual Analysis

#### Scenario ID and Name
**SC-VIS-005:** Detailed Visual Analysis of Specific UI Elements

#### Pre-conditions
- User is on products page as visual_user
- Baseline screenshots available

#### Steps to Reproduce

1. **Analyze Product Card Elements**
   - Use DevTools Inspector to check:
     - Element positioning (x, y coordinates)
     - Width and height of elements
     - Computed colors (RGB/Hex)
     - Font family and size
   - Compare against standard_user inspected values

2. **Analyze Header Elements**
   - Inspect logo positioning
   - Inspect cart icon color
   - Inspect page title alignment
   - Inspect hamburger menu (if present)

3. **Analyze Button Styling**
   - Inspect "Add to cart" button:
     - Background color
     - Text color
     - Border styling
     - Hover states
   - Compare against baseline

4. **Analyze Form Fields (on checkout)**
   - Inspect input field borders
   - Inspect label positioning
   - Inspect form layout/grid
   - Check if labels are inside or outside fields

5. **Document Findings**
   - List specific elements with visual issues
   - Document expected vs. actual values
   - Screenshot specific misalignments

#### Expected Result
- **Color Issues Examples:**
  - Text color wrong (e.g., white text on white background)
  - Button color inverted or inconsistent
  - Icon colors incorrect
  
- **Positioning Issues Examples:**
  - Elements shifted by specific pixels
  - Elements overlapping
  - Elements out of vertical alignment
  
- **Typography Issues Examples:**
  - Font size too large or small
  - Font weight incorrect
  - Line height incorrect (text too compressed or spaced)
  
- **Spacing Issues Examples:**
  - Padding incorrect
  - Margin incorrect
  - Gap between items inconsistent

---

### Scenario 6: SC-VIS-006 - Functional Correctness Despite Visual Issues

#### Scenario ID and Name
**SC-VIS-006:** Verify All Functionality Works Despite Visual Bugs

#### Pre-conditions
- User has observed visual issues
- User wants to verify everything still works

#### Steps to Reproduce

1. **Test Product Addition**
   - Despite visual misalignment, try to add products
   - Verify cart badge updates
   - Verify cart count is correct

2. **Test Cart Operations**
   - Navigate to cart (despite visual issues)
   - Verify items display with correct prices
   - Remove an item
   - Verify cart updates correctly

3. **Test Checkout Navigation**
   - Proceed through checkout form
   - Enter information correctly (even if form is misaligned)
   - Fill in all fields
   - Click Continue
   - Verify form validation works

4. **Test Checkout Overview**
   - Verify items are listed
   - Verify prices are correct
   - Verify totals are calculated correctly
   - Verify all information is present

5. **Test Order Completion (if appropriate)**
   - Click Finish (if using this to test)
   - Verify appropriate outcome (error, success, etc.)

#### Expected Result
- **All Functional Tests Pass:**
  - ✅ Products add to cart
  - ✅ Cart updates correctly
  - ✅ Items remove from cart
  - ✅ Checkout form accepts input
  - ✅ Form validation works
  - ✅ Prices calculated correctly
  - ✅ Order attempts complete (with expected outcome)
  
- **Conclusion:**
  - Visual bugs do NOT affect functionality
  - User can complete purchase despite UX issues
  - All backend logic works correctly
  - Issue is UI presentation only

---

## Assertions

### Visual Regression Assertions
```typescript
// Capture and compare screenshots
await expect(page).toHaveScreenshot('products-page-visual_user.png', {
  maxDiffPixels: 200, // Allow some differences (visual bugs)
  threshold: 0.2, // 20% difference threshold
});

// Compare against baseline
const visualDiff = await compareScreenshots(
  'visual_user_products.png',
  'standard_user_products.png' // baseline
);
expect(visualDiff.differences).toBeGreaterThan(0); // Should have differences
```

### Element Positioning Assertions
```typescript
// Check if elements are visually misaligned
const productCard = page.locator('.inventory_item').first();
const bbox = await productCard.boundingBox();
const expectedX = 10; // Expected left position
const actualX = bbox.x;

// Assert misalignment (visual bug exists)
expect(Math.abs(actualX - expectedX)).toBeGreaterThan(5); // Misaligned

// Check element color
const computedStyle = await productCard.evaluate(el => 
  window.getComputedStyle(el)
);
const backgroundColor = computedStyle.backgroundColor;
expect(backgroundColor).not.toBe('rgb(255, 255, 255)'); // Wrong color
```

### Functional Correctness Assertions (Despite Visual Issues)
```typescript
// Assert cart operations work despite visual issues
await page.locator('.btn_inventory').first().click();
await expect(page.locator('.shopping_cart_badge')).toContainText('1');

// Assert prices are still calculated correctly
const total = await page.locator('[data-test="total-label"]').innerText();
expect(total).toContain('$'); // Price present and valid

// Assert form validation still works
await checkoutPage.fillForm('', 'Doe', '12345'); // Missing first name
await checkoutPage.clickContinue();
const error = page.locator('[data-test="error"]');
await expect(error).toBeVisible(); // Validation still works
```

### Visual Element Assertions
```typescript
// Assert specific visual issues exist
const productTitle = page.locator('.inventory_item_name').first();
const titleBox = await productTitle.boundingBox();

// Check if text is too small to read
expect(titleBox.height).toBeLessThan(10); // Title too small (visual bug)

// Check if button is wrong color
const button = page.locator('.btn_inventory').first();
const buttonColor = await button.evaluate(el => 
  window.getComputedStyle(el).backgroundColor
);
expect(buttonColor).toBe('rgb(0, 0, 0)'); // Inverted colors (visual bug)
```

### Responsive Design Assertions
```typescript
// Test at mobile resolution
await page.setViewportSize({ width: 375, height: 667 });
await page.reload();

// Check if layout adapts
const productList = page.locator('.inventory_container');
const bbox = await productList.boundingBox();
expect(bbox.width).toBeLessThan(400); // Should fit mobile width

// If not responsive, this might fail (visual issue)
// Assert that elements are at least present (functional)
const items = page.locator('.inventory_item');
expect(await items.count()).toBeGreaterThan(0); // Items still present
```

---

## Notes

### Visual Testing Guidelines
- Establish baseline screenshots with standard_user first
- Compare visual_user against baseline systematically
- Use pixel-level comparison with acceptable threshold
- Capture screenshots at multiple resolutions
- Document specific visual differences found
- Separate visual bugs from functional issues

### Locators and Page Objects
- Product cards: `.inventory_item`
- Product name: `.inventory_item_name`
- Product price: `.inventory_item_price`
- Add to cart button: `.btn_inventory`
- Cart icon: `.shopping_cart_link`
- Cart badge: `.shopping_cart_badge`
- Header: `.header_secondary_container`
- Form fields: `[data-test="firstName"]`, etc.

### Visual Testing Tools
- Playwright `toHaveScreenshot()` for pixel comparison
- Browser DevTools Inspector for element analysis
- Chrome Lighthouse for visual metrics
- Percy or similar for CI/CD visual testing
- ImageMagick for image comparison (if needed)

### Types of Visual Bugs to Identify
- **Layout Issues:** Misaligned elements, overlapping content
- **Color Issues:** Wrong text/background colors, low contrast
- **Typography Issues:** Wrong font size, weight, line-height
- **Image Issues:** Broken images, distorted images, wrong aspect ratio
- **Spacing Issues:** Incorrect padding/margin between elements
- **Responsive Issues:** Layout breaks at different resolutions
- **State Issues:** Hover/focus states styled incorrectly

### Expected Behavior Summary
- ✅ All features work correctly (functional)
- 🎨 Visual inconsistencies are present (aesthetic)
- ✅ Elements are all clickable/interactive
- ✅ Data is correct (prices, totals, etc.)
- ❌ Visual appearance is inconsistent
- ❌ UI is not polished or professional-looking
- 🎭 User experience is poor despite functionality

### Failure Scenarios to Identify
- **Incorrect:** No visual differences (wrong user or not visual_user)
- **Incorrect:** Functionality broken (should all work)
- **Incorrect:** Elements are unclickable due to positioning
- **Incorrect:** Text is unreadable due to color/sizing
- **Incorrect:** Data is incorrect (should be correct)

### Visual Bug Categories
- **Critical:** Elements unclickable, text unreadable, functionality blocked
- **Major:** Significant misalignment, wrong colors, broken images
- **Minor:** Slight spacing issues, font inconsistencies
- **Low:** Pixel-level differences, hover state styling

### Related Test Plans
- See `01_standard_user_test_plan.md` for baseline visual reference
- See `03_problem_user_test_plan.md` for functional issues
- See `05_error_user_test_plan.md` for error handling

### Difference from Other Users
- **vs. standard_user:** visual_user has visual bugs, standard_user does not
- **vs. problem_user:** visual_user has UI issues, problem_user has silent failure
- **vs. error_user:** visual_user has cosmetic issues, error_user has functional errors
- **vs. performance_glitch_user:** visual_user has appearance issues, performance_user is slow

### Screenshots Organization
- Store baseline (standard_user) in: `./test-artifacts/baseline/`
- Store visual_user screenshots in: `./test-artifacts/visual_user/`
- Store diffs in: `./test-artifacts/visual-diffs/`
- Store analysis in: `./test-artifacts/visual-analysis/`

### Accessibility Impact
- Visual bugs may impact accessibility
- Low contrast issues affect readability
- Misaligned elements may confuse screen readers
- Responsive issues break mobile usability
- Document accessibility implications

### Recommendations for Designers/Developers
- Use CSS Grid or Flexbox for consistent alignment
- Define color palette and enforce contrast standards
- Implement responsive design with media queries
- Test at multiple resolutions during development
- Use design system or component library
- Validate colors for accessibility (contrast checker)
- Test visual design with actual user feedback
- Implement visual regression testing in CI/CD
