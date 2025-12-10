import { Page, Locator, expect } from '@playwright/test';

/**
 * Navbar Component
 * Represents the top navigation bar available across multiple pages.
 * Handles navigation to Home, Products, and Cart.
 */
export class Navbar {
    readonly page: Page;
    readonly homeLink: Locator;
    readonly productsLink: Locator;
    readonly cartLink: Locator;

    constructor(page: Page) {
        this.page = page;

        // Locators for the navigation links
        // Using specific href attributes ensures we target the correct buttons
        this.homeLink = page.locator('a[href="/"]');
        this.productsLink = page.locator('a[href="/products"]');
        this.cartLink = page.locator('ul.nav a[href="/view_cart"]');
    }

    /**
     * Navigates to the Home page and asserts the title.
     */
    async navigateToHome() {
        await this.homeLink.click();
        await expect(this.page).toHaveTitle(/Automation Exercise/);
    }

    /**
     * Navigates to the All Products page and asserts the title.
     */
    async navigateToProducts() {
        await this.productsLink.click();
        await expect(this.page).toHaveTitle(/All Products/);
    }

    /**
     * Navigates to the Cart page and asserts the URL.
     */
    async navigateToCart() {
        await this.cartLink.click();
        await expect(this.page).toHaveURL(/.*view_cart/);
    }
}