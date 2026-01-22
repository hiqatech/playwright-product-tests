Feature: Deposit Functionality

    Background:
        Given User navigates to the Deposit Homepage
        Given User logs in with given username

    Scenario: Verify Deposit Web
        When User clicks on Deposit Menu
        When User makes a deposit
        Then The balance should be
        When User clicks on Transactions Menu
        Then The transaction should be

#npx cucumber-js test