import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login'
import { DepositPage } from '../pages/deposit'
import { TransactionsPage } from '../pages/transactions'

test('DepositTest', async ({ page }) => {

  const Login = new LoginPage(page)
  const Deposit = new DepositPage(page)
  const Transactions = new TransactionsPage(page)

  await Login.gotoLoginPage();
  await Login.login('Ron Weasly');
  
  await Deposit.testDeposit('100');
  await Deposit.verifyBalance('100');
  await Deposit.testDeposit('10');
  await Deposit.verifyBalance('110');
  await Deposit.testDeposit('1');
  await Deposit.verifyBalance('111');

  await Transactions.clickTransactions();
  await Transactions.verifyTransactionx('1','100')
  await Transactions.verifyTransactionx('2','10')
  await Transactions.verifyTransactionx('3','1')
  await Transactions.clickReset();
  await Transactions.clickBack();

});