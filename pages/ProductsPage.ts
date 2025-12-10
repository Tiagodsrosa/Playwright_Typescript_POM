import { Page, Locator, expect } from '@playwright/test';

/**
 * ProductsPage
 * Represents the 'All Products' page and the 'Product Details' page.
 * Handles product listing interactions, adding items to cart, and details view.
 */
export class ProductsPage {
    readonly page: Page;

    // Navigation & Modals
    readonly productsLink: Locator;
    readonly continueShoppingBtn: Locator;
    readonly viewCartLink: Locator;

    // Product Details Elements
    readonly quantityInput: Locator;
    readonly addToCartDetailsBtn: Locator;

    constructor(page: Page) {
        this.page = page;

        // Navigation Locators
        this.productsLink = page.locator('a[href="/products"]');
        this.continueShoppingBtn = page.locator('.modal-footer button.btn-success');
        this.viewCartLink = page.locator('.modal-body a[href="/view_cart"]');

        // Detail View Locators
        this.quantityInput = page.locator('#quantity');
        this.addToCartDetailsBtn = page.locator('button.cart');
    }

    /**
     * Navigates to the Products page via the main menu link.
     */
    async navigateToProducts() {
        await this.productsLink.click();
        await expect(this.page).toHaveTitle(/All Products/);
    }

    /**
     * Adds a product to the cart from the list view.
     * Requires hovering over the product card to reveal the 'Add to cart' button.
     * @param index - The index of the product in the list (0-based)
     */
    async addProductToCartByIndex(index: number) {
        // Locate the specific product card container
        const productContainer = this.page.locator('.features_items .col-sm-4').nth(index);

        // 1. Hover to trigger the overlay animation
        await productContainer.hover();

        // 2. Click the 'Add to cart' button inside the overlay
        // We target the overlay specifically to ensure we are clicking the visible button
        await productContainer.locator('.product-overlay .add-to-cart').click();
    }

    /**
     * Clicks the 'Continue Shopping' button in the success modal.
     */
    async clickContinueShopping() {
        await this.continueShoppingBtn.click();
    }

    /**
     * Clicks the 'View Cart' link in the success modal.
     */
    async clickViewCart() {
        await this.viewCartLink.click();
    }

    // --- Product Detail View Methods ---

    /**
     * Clicks on 'View Product' for a specific item to open its details page.
     * @param index - The index of the product in the list
     */
    async viewProduct(index: number) {
        // The 'View Product' link is usually located inside a '.choose' div
        await this.page.locator('.choose a').nth(index).click();
    }

    /**
     * Sets the quantity in the input field on the Product Details page.
     * @param quantity - The number of items to add
     */
    async setProductQuantity(quantity: number) {
        await this.quantityInput.clear(); // Clear default value (usually 1)
        await this.quantityInput.fill(quantity.toString());
    }

    /**
     * Clicks the 'Add to cart' button located on the Product Details page.
     */
    async addToCartFromDetails() {
        await this.addToCartDetailsBtn.click();
    }
}