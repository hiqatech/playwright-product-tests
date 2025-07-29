const { Page } = require('playwright-core');
import { expect } from '@playwright/test';

class MobileAppPage {
    /**
     * 
     * @param {import ('@playwright/test').Page} page 
     */
    constructor(page) {
        this.page = page;

        // Elements
        this.searchTextbox = page.locator("(//*[@aria-label='Search YouTube'])[2]");
        this.searchTextboxInput = page.locator("[name='search_query']");
        this.playlistLink = page.getByRole('link', { name: 'Playwright by Testers Talk☑️' });


        this.countryDropDown = page.locator("//android.widget.TextView" +
                "[@resource-id=\"android:id/text1\"]");
        this.nameField =page.locator("//android.widget.EditText" +
                "[@resource-id=\"com.androidsample.generalstore:id/nameField\"]");
        this.letsGoShop = page.locator("//android.widget.Button" +
                "[@resource-id=\"com.androidsample.generalstore:id/btnLetsShop\"]");
        this.radioMale = page.locator("com.androidsample.generalstore:id/radioMale");

    }

    /********************************************************** Elements ********************************************************* */

    async searchWithKeywords(keyword) {
        await this.searchTextbox.click();
        await this.searchTextboxInput.fill(keyword);
        await this.searchTextboxInput.press('Enter');
        await this.page.waitForTimeout(3000);
    }

    async validateTestersTalkLink() {
        await expect(this.playlistLink).toBeVisible();
    }


    async register(country, name, sex) {
        await this.countryDropDown.selectOption(country)
        await this.nameField.fill(name)
        await this.radioMale.click
        await this.letsGoShop.click
        await this.page.waitForTimeout(1000);
    }

}

module.exports = MobileAppPage;