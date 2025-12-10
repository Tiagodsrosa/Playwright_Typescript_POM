import { type Page } from '@playwright/test';

/**
 * Generates the HTML structure for the manual test overlay.
 * @param title - The title of the test case to be displayed.
 * @param stepsHtml - The list of steps formatted as HTML <li> items.
 * @returns The complete HTML string for the overlay.
 */
function getInstructionsHtml(title: string, stepsHtml: string): string {
    return `
        <div id="manual-test-overlay">
            <div id="manual-test-box">
                <h2>Teste Manual: ${title}</h2>
                <p>Execute os seguintes passos manuais:</p>
                <br>
                <ol>${stepsHtml}</ol>
                <br>
                <p><strong>Após a validação, marque o resultado abaixo:</strong></p>
                <div id="manual-test-buttons">
                    <button id="manual-btn-fail" class="manual-test-btn">❌ FALHOU (FAIL)</button>
                    <button id="manual-btn-pass" class="manual-test-btn">✅ PASSOU (PASS)</button>
                </div>
            </div>
        </div>
    `;
}

// CSS Styles to ensure the overlay appears centered, on top of everything, and looks professional
const instructionsCss = `
    #manual-test-overlay {
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0, 0, 0, 0.7); display: flex;
        justify-content: center; align-items: center; z-index: 9998;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    }
    #manual-test-box {
        background: #fff; padding: 25px; border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); max-width: 600px; z-index: 9999;
        line-height: 1.6;
    }
    #manual-test-box h2 { margin-top: 0; color: #333; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px; }
    #manual-test-box ol { padding-left: 20px; }
    #manual-test-box li { margin-bottom: 10px; }
    #manual-test-buttons {
        margin-top: 20px; border-top: 2px solid #f0f0f0; padding-top: 20px;
        display: flex; justify-content: flex-end; gap: 15px;
    }
    .manual-test-btn {
        padding: 10px 20px; border: none; border-radius: 5px;
        font-size: 16px; font-weight: bold; cursor: pointer;
    }
    #manual-btn-pass { background-color: #28a745; color: white; }
    #manual-btn-fail { background-color: #dc3545; color: white; }
`;

/**
 * Injects an interactive HTML overlay into the page to guide manual testing.
 * This function handles the injection of styles, HTML content, and event listeners.
 * * @param page - The Playwright Page instance.
 * @param title - Title of the scenario.
 * @param steps - Array of strings describing the steps (supports HTML tags inside strings).
 */
export async function showManualInstructions(page: Page, title: string, steps: string[]) {
    // 1. Build the list items HTML from the array of steps
    const stepsHtml = steps.map(step => `<li>${step}</li>`).join('');
    const finalHtml = getInstructionsHtml(title, stepsHtml);

    // 2. Inject CSS styles into the page
    await page.addStyleTag({ content: instructionsCss });

    // 3. Inject the Overlay HTML into the body
    await page.evaluate(html => {
        document.body.insertAdjacentHTML('beforeend', html);
    }, finalHtml);

    // 4. Wait for the overlay to be visible in the DOM
    // This ensures the elements exist before we try to attach listeners
    await page.locator('#manual-test-overlay').waitFor({ state: 'visible' });

    // 5. Attach Event Listeners to buttons inside the browser context
    // This allows the browser to communicate the result ('pass' or 'fail') back to the Playwright script via the window object
    await page.evaluate(() => {
        (window as any).manualTestResult = undefined;

        document.getElementById('manual-btn-pass')?.addEventListener('click', () => {
            (window as any).manualTestResult = 'pass';
            document.getElementById('manual-test-overlay')?.remove();
        });

        document.getElementById('manual-btn-fail')?.addEventListener('click', () => {
            (window as any).manualTestResult = 'fail';
            document.getElementById('manual-test-overlay')?.remove();
        });
    });
}