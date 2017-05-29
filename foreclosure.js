'use strict';
var steve;
var stevesLoan;
var month = 0;
var monthsUntilEvicted;

function loan() {

  var account = {
    borrowed : 550000,
    balance : 286000,
    monthlyPayment : 1700,
    defaulted : 0,
    defaultsToForeclose : 5,
    foreclosed : false,
  }

  function missPayment() {
    account.defaulted += 1;
    if (account.defaulted >= account.defaultsToForeclose) {
      account.foreclosed = true;
    }
  }

  function _getBalance() {
    return account.balance;
  }

  function _receivePayment(amount) {
    if (amount < account.monthlyPayment) {
      missPayment();
    }
    account.balance -= amount;
  }

  function _getMonthlyPayment() {
    return account.monthlyPayment;
  }

  function _isForclosed() {
    return account.foreclosed;
  }

  return {
    getBalance : _getBalance,
    receivePayment : _receivePayment,
    getMonthlyPayment : _getMonthlyPayment,
    isForeclosed : _isForclosed,
  }
}

stevesLoan = loan();

function borrower(loan) {

  var account = {
    monthlyIncome : 1350,
    funds : 2800,
    loan : loan
  }

  function _getFunds() {
    return account.funds;
  }

  function _makePayment() {
    var monthlyPayment = account.loan.getMonthlyPayment();

    if (account.funds > monthlyPayment) {
      account.funds -= monthlyPayment;
      account.loan.receivePayment(monthlyPayment);
    } else {
      account.loan.receivePayment(account.funds);
      account.funds = 0;
    }
  }

  function _payDay() {
    account.funds += account.monthlyIncome;
  }

  return {
    getFunds : _getFunds,
    makePayment : _makePayment,
    payDay : _payDay
  }
}

steve = borrower(stevesLoan);

while(!stevesLoan.isForeclosed()) {
  steve.payDay();
  steve.makePayment();
  month += 1;
}

monthsUntilEvicted = month;

