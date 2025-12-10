import { test, expect } from '../fixtures/pom';

test.describe('E-Commerce Product & Cart Interactions', () => {

    /**
     * TC-12: Add Products in Cart
     * Objective: Verify that the user can add multiple products to the cart from the listing page.
     * Validation: Ensures product names, prices, and quantities are correct in the cart.
     */
    test('TC-12: Add Products in Cart', async ({ page, productsPage, cartPage }) => {

        // --- ARRANGE: Setup initial state ---
        // 1. Navigate to the Home Page
        await page.goto('/');

        // 2. Validate landing page
        await expect(page).toHaveTitle(/Automation Exercise/);

        // --- ACT: Perform actions ---
        // 3. Navigate to the 'All Products' page
        await productsPage.navigateToProducts();

        // 4. Add the first product (Index 0) to cart
        // Handles the hover action required to reveal the 'Add to cart' button
        await productsPage.addProductToCartByIndex(0);

        // 5. Click 'Continue Shopping' to stay on page
        await productsPage.clickContinueShopping();

        // 6. Add the second product (Index 1) to cart
        await productsPage.addProductToCartByIndex(1);

        // 7. Proceed to Cart
        await productsPage.clickViewCart();

        // --- ASSERT: Verify results ---
        // 8. Validate details for the first product (Blue Top)
        await cartPage.verifyProductInCart('Blue Top', 'Rs. 500', '1', 'Rs. 500');

        // 9. Validate details for the second product (Men Tshirt)
        await cartPage.verifyProductInCart('Men Tshirt', 'Rs. 400', '1', 'Rs. 400');

        // --- TEARDOWN: Cleanup state ---
        // Remove all items to ensure a clean state for the next test
        await cartPage.removeAllProducts();
    });

    /**
     * TC-13: Verify Product quantity in Cart
     * Objective: Verify that changing the quantity in the Product Details page is reflected in the Cart.
     * Scenario: User views a product, sets quantity to 4, and adds it to cart.
     */
    test('TC-13: Verify Product quantity in Cart', async ({ page, productsPage, cartPage }) => {

        // --- ARRANGE ---
        await page.goto('/');
        await expect(page).toHaveTitle(/Automation Exercise/);

        // --- ACT ---
        // 1. Click 'View Product' for the first item on the home page
        await productsPage.viewProduct(0);

        // 2. Validate transition to Product Details page
        await expect(page).toHaveURL(/.*product_details.*/);
        await expect(page.locator('.product-information')).toBeVisible();

        // 3. Change quantity input to '4'
        await productsPage.setProductQuantity(4);

        // 4. Add to cart from the details view
        await productsPage.addToCartFromDetails();

        // 5. Navigate to Cart to verify
        await productsPage.clickViewCart();

        // --- ASSERT ---
        // 6. Validate the product 'Blue Top' has quantity 4 and total price is calculated (500 * 4 = 2000)
        await cartPage.verifyProductInCart(
            'Blue Top',
            'Rs. 500',
            '4',       // Check exact quantity
            'Rs. 2000' // Check calculated total
        );

        // --- TEARDOWN ---
        await cartPage.removeAllProducts();
    });
});