const accountcreationArray = [
	{
		owner: "John Doe",
		transactions: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
		interestRate: 1.2, // %
	},
	{
		owner: "Rickey Thomas Cooper",
		transactions: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
		interestRate: 1.5, // %
	},
	{
		owner: "Edris Beckford",
		transactions: [200, -200, 340, -300, -20, 50, 400, -460],
		interestRate: 1.4, // %
	},
	{
		owner: "Carol Muriel Mattes",
		transactions: [430, 1000, 700, 50, 90],
		interestRate: 1.6, // %
	},
];
const welcomeTextElement = document.querySelector(".welcome");
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

class account {
	constructor(owner, interestrate, transactions) {
		this.owner = owner;
		this.transactions = transactions;
		this.interestrate = interestrate;
		this.generateusername();
		this.generatepin();
	}
	generateusername() {}
	generatepin() {}
}

class app {
	accounts = [];
	constructor() {
		this.generateaccounts();
		loginBtnElem.addEventListener("click", this.login.bind(this));
		transferBtnElem.addEventListener("click", this.transfer.bind(this));
		loanBtnElem.addEventListener("click", this.loan.bind(this));
	}
	login() {}
	transfer() {}
	loan() {}
	summary() {}
	updateUI() {}
	generateaccounts() {
		accountcreationArray.forEach((acc) => {
			this.accounts.push(
				new account(acc.owner, acc.interestRate, acc.movements)
			);
		});
	}

	calcBalance() {}
	sortTransactions() {}
	displayTransactions() {}
}
new app();
