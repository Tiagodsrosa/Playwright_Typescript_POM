import { test, expect } from '../fixtures/pom';

test.describe('Authentication & Session Management', () => {

    /**
     * TC-A01: Logout User
     * Objective: Verify that an authenticated user can successfully log out of the application.
     * Pre-condition: User must be logged in (handled automatically by Global Setup storageState).
     */
    test('TC-A01: Logout User', async ({ page }) => {

        // 1. Navigate to the application Home Page
        // Note: The browser context already contains the auth cookies injected by 'playwright.config.ts'.
        // The site will load in an "Authenticated" state.
        await page.goto('/');

        // Security Check: Verify the session is active before attempting to logout
        // We look for the user info element in the navbar (e.g., "Logged in as...")
        await expect(page.locator('li:has-text("Logged in as")')).toBeVisible();

        // 2. Perform the Logout Action
        // We use the specific href selector to ensure we are clicking the correct link
        await page.locator('a[href="/logout"]').click();

        // 3. Validation: Verify successful logout

        // A. Validate URL Redirection
        // The user should be redirected to the login page
        await expect(page).toHaveURL(/.*login/);

        // B. Validate UI Elements
        // The login form header "Login to your account" must be visible
        const loginHeader = page.locator('.login-form h2');
        await expect(loginHeader).toBeVisible();
        await expect(loginHeader).toHaveText('Login to your account');
    });

});