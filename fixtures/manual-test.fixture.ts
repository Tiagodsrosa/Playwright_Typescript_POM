import { test as base, expect, Page } from '@playwright/test';
import { showManualInstructions } from '../utils/manualTestHelper';

/**
 * Definition of the Manual Test Runner function type.
 * It accepts a title and a list of steps to be displayed to the user.
 */
type ManualTestRunner = (testTitle: string, manualSteps: string[]) => Promise<void>;

/**
 * Extends the base Playwright test to include the 'runManualTest' fixture.
 */
export const test = base.extend<{
    runManualTest: ManualTestRunner;
}>({
    /**
     * Implementation of the runManualTest fixture.
     * Injects the logic to pause the test and show the HTML overlay.
     */
    runManualTest: async ({ page }, use) => {

        const runTest: ManualTestRunner = async (testTitle, manualSteps) => {

            // A. Inject and show the instructions overlay on the browser
            await showManualInstructions(page, testTitle, manualSteps);

            // B. Wait for user interaction (Pass or Fail button click)
            // We use page.waitForFunction to bridge the browser context (window) and the node context.
            const resultHandle = await page.waitForFunction(
                () => {
                    // This property is set by the buttons in manualTestHelper.ts
                    const result = (window as any).manualTestResult;
                    if (result === 'pass' || result === 'fail') {
                        return result;
                    }
                    return false;
                },
                null,
                { timeout: 0 } // IMPORTANT: Infinite timeout is required for human interaction
            );

            // C. Retrieve the result value ('pass' or 'fail')
            const result = await resultHandle.jsonValue();

            // D. Log the result and assert within the Playwright report
            await test.step('Manual Validation Result', async () => {
                if (result === 'pass') {
                    console.log(`✅ [MANUAL] ${testTitle}: PASSED`);
                } else {
                    console.error(`❌ [MANUAL] ${testTitle}: FAILED`);
                    // Fail the test explicitly if the user clicked "Fail"
                    test.fail(true, `Tester marked this scenario as FAILED.`);
                }
            });
        };

        // Provide the function to the test execution
        await use(runTest);
    },
});

// Re-export expect so we don't need to import it from @playwright/test in spec files
export { expect } from '@playwright/test';