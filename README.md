# 🛒 E2E Test Automation - E-Commerce (Sauce Demo)

Project developed as a professional portfolio to demonstrate skills in QA Engineering and Test Automation using the modern **Playwright** ecosystem.

## 🚀 Technologies Used
* **Playwright** (Automation framework)
* **TypeScript** (Statically typed language)
* **Page Object Model (POM)** (Code architecture pattern)
* **GitHub Actions** (Continuous Integration - CI/CD)

## 📌 Automated Scenarios
* [x] **Purchase Flow:** Validates login with valid credentials and successfully adds a product to the shopping cart, ensuring the integrity of the main end-to-end flow (E2E).

## 🛠️ Best Practices Applied
* **POM (Page Object Model):** Clear separation between page selectors/actions and test logic for easier maintenance.
* **Robust Assertions:** Use of Playwright's native locators and assertions to avoid flaky tests.
* **GitHub Actions:** Continuous Integration - tests run on every commit.

## 🏃 How to Run the Project

1. Clone the repository: `git clone https://github.com/jacksonSantanna/playwright-ecommerce-portfolio.git`
2. Install dependencies: `npm install`
3. Install Playwright browsers: `npx playwright install`
4. Run the tests: `npx playwright test`
