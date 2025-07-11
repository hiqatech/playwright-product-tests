import { expect } from '@playwright/test';

exports.TransactionsPage = class TransactionsPage {

    constructor(page) {

        this.page = page
        this.transactions_button = page.locator('xpath=//button[contains(text(),"Transactions")]');
        this.transaction1_amount = page.locator('xpath =//table//tbody//tr[1]//td[2]');
        this.transaction2_amount = page.locator('xpath =//table//tbody//tr[2]//td[2]');
        this.transaction3_amount = page.locator('xpath =//table//tbody//tr[3]//td[2]');
        this.reset_button = page.locator('xpath=//button[text()="Reset"]');
        this.back_button = page.locator('xpath=//button[text()="Back"]');
    }

    async clickTransactions() {
        await this.transactions_button.click();
    }

    async clickReset() {
        await this.reset_button.click();
    }

    async clickBack() {
        await this.back_button.click();
    }

    async verifyTransactionx(x,amount) {
        if(x=='1') 
            await expect(this.transaction1_amount).toHaveText(amount);	
        else if(x=='2') 
            await expect(this.transaction2_amount).toHaveText(amount);
        else if(x=='3') 
            await expect(this.transaction3_amount).toHaveText(amount);
    }
}
