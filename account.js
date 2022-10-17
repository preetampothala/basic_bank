class account {
  constructor(owner, interestrate, transactions) {
    this.owner = owner;
    this.transactions = transactions;
    this.interestrate = interestrate;
    this.generateusername();
    this.generatepin();
    this.calcBalance();
    this.caluSUmmary();
  }
  generateusername() {
    const username = this.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0] + name[1])
      .join("");
    this.username = username;
  }
  generatepin() {
    const pin = Math.trunc(Math.random() * 10000);
    this.pin = pin;
  }
  calcBalance() {
    this.balance = this.transactions.reduce((acc, cur) => acc + cur, 0);
  }
  caluSUmmary() {
    this.in = Math.abs(
      this.transactions
        .filter((transaction) => transaction > 0)
        .reduce((acc, cur) => acc + cur, 0)
    ).toFixed(2);
    this.out = Math.abs(
      this.transactions
        .filter((transaction) => transaction < 0)
        .reduce((acc, cur) => acc + cur, 0)
        .toFixed(2)
    );
    this.interest = Math.abs(
      this.transactions
        .filter((transaction) => transaction > 0)
        .map((transaction) => (transaction * this.interestrate) / 100)
        .reduce((acc, cur) => acc + cur, 0)
        .toFixed(2)
    );
  }
}

export default account;
