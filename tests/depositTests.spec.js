import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login'
import { DepositPage } from '../pages/deposit'
import { TransactionsPage } from '../pages/transactions'
import { describe } from 'node:test'

test.describe('Smoke Tests', () => {

    test('DepositTest', async ({ page }) => {

  const loginPage = new LoginPage(page)
  const depositPage = new DepositPage(page)
  const transactionsPage = new TransactionsPage(page)

  await test.step('Login', async () => {
    await loginPage.gotoLoginPage();
    await loginPage.login('Ron Weasly');
  });
  
  await test.step('Make deposits', async () => {
    await depositPage.testDeposit('100');
    await depositPage.verifyBalance('100');
    await depositPage.testDeposit('10');
    await depositPage.verifyBalance('110');
    await depositPage.testDeposit('1');
    await depositPage.verifyBalance('111');
  });

  await test.step('Verify transactions', async () => {
    await transactionsPage.clickTransactions();
    await transactionsPage.verifyTransactionx('1','100')
    await transactionsPage.verifyTransactionx('2','10')
    await transactionsPage.verifyTransactionx('3','1')
    await transactionsPage.clickReset();
    await transactionsPage.clickBack();
  });

    });

});