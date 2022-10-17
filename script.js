import accountcreationArray from "./accountcreation.js";
import account from "./account.js";

const welcomeTextElem = document.querySelector(".welcome");
const loginUserElem = document.querySelector(".login-input-user");
const loginPinElem = document.querySelector(".login-input-pin");
const loginBtnElem = document.querySelector(".login-btn");

const balanceElem = document.querySelector(".balance-value");

const transferAmtElem = document.querySelector("#transferamount");
const transferToElem = document.querySelector("#transferto");
const transferBtnElem = document.querySelector(".transfer-btn");

const loanAmtElem = document.querySelector("#loanamount");
const loanBtnElem = document.querySelector(".loan-btn");

const summaryValueInElem = document.querySelector(".summaryvaluein");
const summaryValueOutElem = document.querySelector(".summaryvalueout");
const summaryValueInterestElem = document.querySelector(
  ".summaryvalueinterest"
);
const transactionsElem = document.querySelector(".transactions");

class App {
  #accounts = [];
  #currentAccount;
  constructor() {
    this._generateaccounts();
    loginBtnElem.addEventListener("click", this._login.bind(this));
    transferBtnElem.addEventListener("click", this._transfer.bind(this));
    loanBtnElem.addEventListener("click", this._loan.bind(this));
  }
  _login(e) {
    e.preventDefault();
    const username = loginUserElem.value;

    const pin = loginPinElem.value;
    console.log(username, pin);
    this.#currentAccount = this.#accounts.find(
      (acc) => acc.username === username
    );
    console.log(this.#currentAccount);
    if (this.#currentAccount?.pin === Number(pin)) {
      // Display UI and message
      welcomeTextElem.textContent = `Welcome back, ${
        this.#currentAccount.owner.split(" ")[0]
      }`;
    }
    loginUserElem.value = loginPinElem.value = "";
    loginPinElem.blur();
    this._updateUI(this.#currentAccount);
  }

  _transfer(e) {
    e.preventDefault();
    const amount = Number(transferAmtElem.value);
    const to = transferToElem.value;
    console.log(amount, to);
    const toAccount = this.#accounts.find((acc) => acc.username === to);
    console.log(toAccount, this.#currentAccount);
    console.log(
      amount > 0,
      this.#currentAccount.balance,
      this.#currentAccount.balance >= amount,
      toAccount?.username !== this.#currentAccount.username
    );
    if (
      amount > 0 &&
      toAccount &&
      this.#currentAccount.balance >= amount &&
      toAccount?.username !== this.#currentAccount.username
    ) {
      console.log("Transfer valid");
      toAccount.transactions.push(Number(amount));
      this.#currentAccount.transactions.push(-Number(amount));
      this._updateUI(this.#currentAccount);
    }
    transferAmtElem.value = transferToElem.value = "";
  }
  _loan(e) {
    e.preventDefault();
    const amount = Number(loanAmtElem.value);
    console.log(
      this.#currentAccount.transactions.some(
        (transaction) => transaction >= amount * 0.1
      )
    );
    if (
      amount > 0 &&
      this.#currentAccount.transactions.some(
        (transaction) => transaction >= amount * 0.1
      )
    ) {
      this.#currentAccount.transactions.push(amount);
      this._updateUI(this.#currentAccount);
    }
    loanAmtElem.value = "";
  }
  _updateUI(acc) {
    this._displayBalance(acc);
    this._displaysummary(acc);
    this._displayTransactions(acc.transactions);
  }
  _generateaccounts() {
    accountcreationArray.forEach((acc) => {
      this.#accounts.push(
        new account(acc.owner, acc.interestRate, acc.transactions)
      );
    });
  }

  _displayBalance(acc) {
    acc.balance = acc.transactions.reduce((acc, cur) => acc + cur, 0);
    balanceElem.textContent = `${Math.abs(acc.balance).toFixed(2)}$`;
  }
  _displaysummary(acc) {
    acc.in = Math.abs(
      acc.transactions
        .filter((transaction) => transaction > 0)
        .reduce((acc, cur) => acc + cur, 0)
    ).toFixed(2);
    acc.out = Math.abs(
      acc.transactions
        .filter((transaction) => transaction < 0)
        .reduce((acc, cur) => acc + cur, 0)
        .toFixed(2)
    );
    acc.interest = Math.abs(
      acc.transactions
        .filter((transaction) => transaction > 0)
        .map((transaction) => (transaction * acc.interestrate) / 100)
        .reduce((acc, cur) => acc + cur, 0)
        .toFixed(2)
    );
    summaryValueInElem.textContent = `${acc.in}$`;
    summaryValueOutElem.textContent = `${Math.abs(acc.out)}$`;
    summaryValueInterestElem.textContent = `${acc.interest}$`;
  }
  _sortTransactions() {}
  _displayTransactions(transactions) {
    transactionsElem.innerHTML = "";
    transactions.forEach(function (transaction, i) {
      const type = transaction > 0 ? "Deposit" : "Withdrawl";
      const html = `<div class="transactions-row ${type}">
      <div>
        ${i + 1}
      </div>
      <div class="transactions-type transactions-type-${type}">${type}</div>
      <div class="transactions-value">${transaction}$</div>
    </div>`;
      transactionsElem.insertAdjacentHTML("afterbegin", html);
    });
  }
}

let app = new App();

console.log(app);
