import { chromium, FullConfig } from '@playwright/test';

/**
 * Global Setup Script
 * Executed once before all tests.
 * Responsible for authenticating the user and saving the session state (cookies/storage).
 */
async function globalSetup(config: FullConfig) {
  console.log('🔒 Executing Global Setup (Login)...');

  // 1. Retrieve credentials from Environment Variables
  // These are loaded via dotenv in playwright.config.ts
  const email = process.env.USER_EMAIL;
  const password = process.env.USER_PASSWORD;

  // Security Check: Fail fast if credentials are missing
  if (!email || !password) {
    throw new Error('❌ Critical Error: USER_EMAIL or USER_PASSWORD not found in .env file.');
  }

  // 2. Launch Browser
  // We use a persistent context size (1920x1080) to ensure consistent rendering during login
  const browser = await chromium.launch({
    headless: false,
    args: ['--window-size=1920,1080'] // Visual window size
  });

  // Create a new context with explicit viewport to match the config
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });

  const page = await context.newPage();

  try {
    // 3. Navigate to Login Page
    await page.goto('http://automationexercise.com/login');

    console.log(`📧 Logging in with: ${email}`);

    // 4. Perform Login Actions
    // Using data-qa selectors for stability
    await page.locator('[data-qa="login-email"]').fill(email);
    await page.locator('[data-qa="login-password"]').fill(password);
    await page.locator('[data-qa="login-button"]').click();

    // 5. Verify Login Success
    // Wait for a specific element that only appears when logged in (Essential step)
    // Increased timeout to 15s to handle slower network conditions
    await page.locator('li:has-text("Logged in as")').waitFor({ state: 'visible', timeout: 15000 });

    // 6. Save Storage State
    // This JSON file will be used by all tests to skip the login step
    // Ensure the 'playwright/.auth' directory exists or Playwright will create it
    await page.context().storageState({ path: 'playwright/.auth/auth.json' });

    console.log('✅ Session successfully saved to playwright/.auth/auth.json');

  } catch (error) {
    console.error('❌ Global Login Failed:', error);
    // Exit process with failure code to stop test execution immediately
    process.exit(1);
  } finally {
    // Always close the browser to free up resources
    await browser.close();
  }
}

// REQUIRED: Export as default so Playwright can consume it in playwright.config.ts
export default globalSetup;