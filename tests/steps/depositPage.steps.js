import { LoginPage } from '../../pages/login.js';
import { DepositPage } from '../../pages/deposit.js';
import { TransactionsPage } from '../../pages/transactions.js';
import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { pageFixture } from "../../hooks/pageFixture.js";

setDefaultTimeout(60 * 1000);
let browser, page, loginPage, depositPage, transactionsPage;

Given("User navigates to the Deposit Homepage", async function () {
  loginPage = new LoginPage(pageFixture.page);
  await loginPage.gotoLogin(); 
});

Given('User logs in with given username', async function () {
    await loginPage.login('Ron Weasly');
});

When('User clicks on Deposit Menu', async function () {
    depositPage  = new DepositPage(pageFixture.page)
    await depositPage.clickDeposit();
});

When('User clicks on Transactions Menu', async function () {
    transactionsPage  = new TransactionsPage(pageFixture.page)
    await transactionsPage.clickTransactions();
});

When('User makes a deposit', async function () {
   await depositPage.testDeposit('100');
});

Then('The balance should be', async function () {
   await depositPage.verifyBalance('100');
});

Then('The transaction should be', async function () {
    await transactionsPage.verifyTransactionx('1', '100')
});