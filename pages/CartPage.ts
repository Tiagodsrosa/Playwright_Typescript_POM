import { Page, Locator, expect } from '@playwright/test';

/**
 * CartPage
 * Represents the Shopping Cart page (/view_cart).
 * Handles verification of items in the table and emptying the cart.
 */
export class CartPage {
    readonly page: Page;
    readonly emptyCartMarker: Locator;

    constructor(page: Page) {
        this.page = page;
        // Locator for the element that indicates the cart is empty
        this.emptyCartMarker = page.locator('#empty_cart');
    }

    /**
     * Verifies if a specific product exists in the cart table with the expected details.
     * @param productName - The exact text name of the product (e.g., 'Blue Top')
     * @param price - Expected price string (e.g., 'Rs. 500')
     * @param quantity - Expected quantity string (e.g., '1')
     * @param total - Expected total price string (e.g., 'Rs. 500')
     */
    async verifyProductInCart(productName: string, price: string, quantity: string, total: string) {
        // Locates the table row (tr) that contains the product name text
        const row = this.page.locator(`tr:has-text("${productName}")`);

        // Assert the row is visible
        await expect(row).toBeVisible();

        // Assert Price column
        await expect(row.locator('.cart_price')).toContainText(price);

        // Assert Quantity (usually inside a disabled button element)
        await expect(row.locator('.cart_quantity button')).toHaveText(quantity);

        // Assert Total Price column
        await expect(row.locator('.cart_total')).toContainText(total);
    }

    /**
     * Removes all products from the cart by clicking the 'X' button for each row.
     * Uses a loop to handle dynamic updates of the DOM.
     */
    async removeAllProducts() {
        const deleteButtons = this.page.locator('.cart_quantity_delete');

        // Loop: While there are delete buttons visible, click the first one.
        // This strategy is safer than clicking all at once because the table refreshes after each deletion.
        while (await deleteButtons.count() > 0) {
            await deleteButtons.first().click();

            // Short pause to allow UI to process the removal and avoid stale element errors
            await this.page.waitForTimeout(500);
        }

        // Optional Validation: Ensure the "Cart is empty" element/message appears
        // Only run this if the element effectively appears in the DOM after clearing
        if (await this.emptyCartMarker.isVisible()) {
            await expect(this.emptyCartMarker).toBeVisible();
        }
    }
}