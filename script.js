import INITIAL_ACCOUNTS from "./initialaccounts.js";
import account from "./account.js";

const appElem = document.querySelector(".app");
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
const sortBtnElem = document.querySelector(".btn-sort");

const summaryValueInElem = document.querySelector(".summaryvaluein");
const summaryValueOutElem = document.querySelector(".summaryvalueout");
const summaryValueInterestElem = document.querySelector(
  ".summaryvalueinterest"
);
const transactionsElem = document.querySelector(".transactions");
const appCloseElem = document.querySelector(".appclose");
const appErrorMsgElem = document.querySelector(".apperrormessage");
const loginCloseelem = document.querySelector(".loginclose");
const loginErrorMsgElem = document.querySelector(".loginerrormessage");
let sort = true;

class App {
  #accounts = [];
  #currentAccount;
  constructor() {
    this._getLocalStorage();
    loginBtnElem.addEventListener("click", this._login.bind(this));
    transferBtnElem.addEventListener("click", this._transfer.bind(this));
    loanBtnElem.addEventListener("click", this._loan.bind(this));
    appCloseElem.addEventListener("click", this._closeErrormsg);
    loginCloseelem.addEventListener("click", this._closeErrormsg);
    sortBtnElem.addEventListener("click", this._sortTransactions.bind(this));
  }
  _login(e) {
    e.preventDefault();
    let text = ``;
    const username = loginUserElem.value;
    const pin = Number(loginPinElem.value);
    // console.log(username, pin);
    this.#currentAccount = this.#accounts.find(
      (acc) => acc.username === username && acc.pin === pin
    );
    // console.log(this.#currentAccount);
    if (this.#currentAccount) {
      if (this.#currentAccount?.pin === Number(pin)) {
        welcomeTextElem.textContent = `Welcome back, ${
          this.#currentAccount.name.split(" ")[0]
        }`;
      }
    } else {
      if (!this.#currentAccount) text = `No such account exists`;
      else if (!(this.#currentAccount?.pin === Number(pin)))
        text = `Please enter a correct pin`;
      this._displayErrorMsg(loginErrorMsgElem, text);
    }
    loginUserElem.value = loginPinElem.value = "";
    loginPinElem.blur();
    this._updateUI(this.#currentAccount);

    appElem.style.display = "block";
    // appElem.style.opacity = 100;
  }

  _transfer(e) {
    e.preventDefault();
    const amount = Number(transferAmtElem.value);
    const receiver = transferToElem.value;
    // console.log(amount, receiver);
    const receiverAccount = this.#accounts.find(
      (acc) => acc.username === receiver
    );
    // console.log(receiverAccount, this.#currentAccount);
    // console.log(
    //   amount > 0,
    //   this.#currentAccount.balance,
    //   this.#currentAccount.balance >= amount,
    //   receiverAccount?.username !== this.#currentAccount.username
    // );
    let transferReturn = this.#currentAccount.transfer(amount, receiverAccount);
    if (transferReturn === `success`) {
      // console.log(receiverAccount.transactions);
      // receiverAccount.transactions.push(Number(amount));
      this._updateUI(this.#currentAccount);
    } else {
      this._displayErrorMsg(appErrorMsgElem, transferReturn, "Transfer");
    }
    // if (
    // 	amount > 0 &&
    // 	receiverAccount &&
    // 	this.#currentAccount.balance >= amount &&
    // 	receiverAccount?.username !== this.#currentAccount.username
    // ) {
    // 	console.log("Transfer valid");
    // 	receiverAccount.transactions.push(Number(amount));
    // 	this.#currentAccount.transactions.push(-Number(amount));
    // 	this._updateUI(this.#currentAccount);
    // 	appErrorMsgElem.querySelector("p").textContent = "";
    // } else {
    // 	let text = ``;
    // 	if (!amount > 0) text = `Please enter an amount greater than 0`;
    // 	else if (!receiverAccount) text = `Please enter a valid To account name`;
    // 	else if (!(this.#currentAccount.balance >= amount))
    // 		text = `Please enter an amount less than your current balance`;
    // 	else if (!(receiverAccount?.username !== this.#currentAccount.username))
    // 		text = `Please enter a different To account name that your current account`;
    transferAmtElem.value = transferToElem.value = "";
    this._setLocalStorage();
  }

  _loan(e) {
    // console.log("Loan");
    e.preventDefault();
    const amount = Number(loanAmtElem.value);
    // console.log(
    //   this.#currentAccount.transactions.some(
    //     (transaction) => transaction >= amount * 0.1
    //   )
    // );

    let loanreturn = this.#currentAccount.loan(amount);
    if (loanreturn === `success`) {
      this._updateUI(this.#currentAccount);
    } else {
      this._displayErrorMsg(appErrorMsgElem, loanreturn, "Loan");
    }

    // if (
    // 	amount > 0 &&
    // 	this.#currentAccount.transactions.some(
    // 		(transaction) => transaction >= amount * 0.1
    // 	)
    // ) {
    // 	this.#currentAccount.transactions.push(amount);
    // 	this._updateUI(this.#currentAccount);
    // } else {
    // }
    this._setLocalStorage();
    loanAmtElem.value = "";
  }
  _updateUI(acc) {
    // this._closeerrormsg();
    this._displayBalance(acc);
    this._displaysummary(acc);
    this._displayTransactions(acc.transactions);
  }

  _displayBalance(acc) {
    // acc.balance = acc.transactions.reduce((acc, cur) => acc + cur, 0);
    // console.log(this.#currentAccount.balance);
    let balance = acc.calcBalance();
    // console.log(balance);
    balanceElem.textContent = `${Math.abs(balance).toFixed(2)}$`;
    if (balance < 0) balanceElem.style.color = "red";
    else balanceElem.style.color = "green";
    // console.log(acc);
  }
  _displaysummary(acc) {
    // acc.in = Math.abs(
    // 	acc.transactions
    // 		.filter((transaction) => transaction > 0)
    // 		.reduce((acc, cur) => acc + cur, 0)
    // ).toFixed(2);
    // acc.out = Math.abs(
    // 	acc.transactions
    // 		.filter((transaction) => transaction < 0)
    // 		.reduce((acc, cur) => acc + cur, 0)
    // 		.toFixed(2)
    // );
    // acc.interest = Math.abs(
    // 	acc.transactions
    // 		.filter((transaction) => transaction > 0)
    // 		.map((transaction) => (transaction * acc.interestrate) / 100)
    // 		.reduce((acc, cur) => acc + cur, 0)
    // 		.toFixed(2)
    // );
    let { in: inward, out: outward, interest: interest } = acc.calcSummary();
    summaryValueInElem.textContent = `${inward}$`;
    summaryValueOutElem.textContent = `${Math.abs(outward)}$`;
    summaryValueInterestElem.textContent = `${interest}$`;
  }
  _sortTransactions() {
    // console.log(this.#currentAccount);
    // console.log(sort);
    let sortResult = this.#currentAccount.sortTrans(sort);
    // console.log(sortResult);
    this._displayTransactions(sortResult);
    sort = !sort;
    // console.log(sort);
  }
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
  _displayErrorMsg(elem, msg, type) {
    elem.querySelector("p").textContent = "";
    elem.querySelector("p").textContent = `${type} Error. ${msg}`;
    elem.style.display = "flex";
  }
  _closeErrormsg(e) {
    appErrorMsgElem.style.display = "none";
    loginErrorMsgElem.style.display = "none";
  }
  _setLocalStorage() {
    const accounts = [];
    this.#accounts.forEach((account) => {
      accounts.push({
        owner: account.owner,
        transactions: account.transactions,
        interestRate: account.interestrate,
      });
    });
    localStorage.setItem("accounts", JSON.stringify(accounts));
  }
  _getLocalStorage() {
    const current_accounts = JSON.parse(localStorage.getItem("accounts"));
    // console.log(current_accounts);
    if (current_accounts && current_accounts.length > 0) {
      current_accounts.forEach((acc) => {
        this.#accounts.push(
          new account(acc.name, acc.interestRate, acc.transactions)
        );
      });
    } else {
      INITIAL_ACCOUNTS.forEach((acc) => {
        this.#accounts.push(
          new account(acc.name, acc.interestRate, acc.transactions)
        );
      });
    }
  }
}

let app = new App();
console.log(app);
