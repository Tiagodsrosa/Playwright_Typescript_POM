import { test as base } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { Navbar } from '../components/Navbar';

/**
 * Interface defining the custom fixtures available in this project.
 * These act as services that can be requested by any test.
 */
type MyFixtures = {
    navbar: Navbar;
    productsPage: ProductsPage;
    cartPage: CartPage;
};

/**
 * Extends the base Playwright test to automatically instantiate Page Objects.
 * This implements the Dependency Injection pattern, keeping tests clean.
 */
export const test = base.extend<MyFixtures>({

    // Injects the Navbar component ready to use
    navbar: async ({ page }, use) => {
        await use(new Navbar(page));
    },

    // Injects the Products Page Object ready to use
    productsPage: async ({ page }, use) => {
        await use(new ProductsPage(page));
    },

    // Injects the Cart Page Object ready to use
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },
});

// Re-export expect for convenience, so tests only need to import from this file
export { expect } from '@playwright/test';