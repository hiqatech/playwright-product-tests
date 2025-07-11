import { expect } from '@playwright/test';

exports.LoginPage = class LoginPage {

    constructor(page) {

        this.page = page
        this.customer_login = page.locator('xpath=//button[text()="Customer Login"]');
        this.user_select = page.locator('xpath=//select[@id="userSelect"]');
        this.login_button = page.locator('xpath=//button[text()="Login"]');
    }

    async gotoLoginPage(){
        await this.page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login');
        
    }

    async login(username){
        await this.customer_login.click();
        await this.user_select.selectOption({ label: username });
        await this.login_button.click();
    }

}