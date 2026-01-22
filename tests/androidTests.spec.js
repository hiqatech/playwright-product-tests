import { _android as android } from "@playwright/test";

const { test, expect } = require("@playwright/test");

test("Run Chrome Test on Android", async ()=> {

    const [device] = await android.devices();
    console.log(`Model: ${device.model()}`);
    console.log(`Serial: ${device.serial()}`);
    await device.screenshot({path: 'device.png'})

    await device.shell('pm clear com.android.chrome');
    
    await device.shell('am set-debug-app --persistent com.android.chrome');
    const context = await device.launchBrowser();
    const page = await context.newPage();
    await page.goto('https://youtube.com');
    console.log(await page.evaluate(()=> window.location.href));
    await device.screenshot({path: 'page.png'})

});