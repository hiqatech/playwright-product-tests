const { test: base } = require('@playwright/test');

const fixtures = base.extend({

    beforeEach: [async ({ page }, use) => {
        await use();
    }, { auto: true }],

    afterEach: [async ({ page }, use, testInfo) => {
        await use();
        if (testInfo.status === 'failed') {
            await page.context().tracing.stop({ path: `${testInfo.outputDir}/trace.zip` });
            await page.screenshot({ path: `${testInfo.outputDir}/screenshot.png` });
            await testInfo.attach('screenshot', { path: `${testInfo.outputDir}/screenshot.png`, contentType: 'image/png' });
            await testInfo.attach('trace', { path: `${testInfo.outputDir}/trace.zip`, contentType: 'application/zip' });
        }
        await page.close();
    }, { auto: true }],
});

module.exports = { fixtures }; 