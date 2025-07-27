import { expect } from '@playwright/test';

export class DepositPage {
    
    constructor(page) {

        this.page = page
        this.deposit_button = page.locator('xpath=//button[@ng-click="deposit()"]');
        this.deposit_textbox = page.locator('xpath=//input[@placeholder="amount"]');
        this.submit_button = page.locator('xpath=//button[@type="submit"]');
        this.deposit_successful = page.locator('xpath=//*[text()="Deposit Successful"]');
        this.balance_amount = page.locator('xpath=//*[@ng-hide="noAccount"]//strong[2]'); 
    }

    async clickDeposit() {
        await this.deposit_button.click();
    }

    async enterDeposit(deposit) {
        await this.deposit_textbox.fill(deposit);
    }

    async clickSubmit() {
        await this.submit_button.click();
    }

    async verifySucessful(page) {
         await expect(this.deposit_successful).toBeVisible();
    }

    async verifyBalance(balance) {
        await expect(this.balance_amount).toHaveText(balance);	
    }

    async testDeposit(deposit) {
        await this.clickDeposit();
        await this.enterDeposit(deposit);
        await this.clickSubmit();
        await new Promise(resolve => setTimeout(resolve, 1000)); 
        await this.verifySucessful();
    }



}