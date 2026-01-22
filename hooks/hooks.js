import { BeforeAll, AfterAll } from "@cucumber/cucumber";
import { chromium } from "@playwright/test";
import { pageFixture } from "../hooks/pageFixture.js";

let browser, page;

BeforeAll(async function () {
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();
    pageFixture.page = page;
});

AfterAll(async function () {
    await page.close();
    await browser.close();
})