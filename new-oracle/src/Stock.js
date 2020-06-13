import React from "react";
import Web3 from "web3";
import { STOCK_ORACLE_ABI, STOCK_ORACLE_ADDRESS } from "./quotecontract";

class Stock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      symbol: "",
      price: "",
      volume: "",
      getStockPrice: "",
      getStockVolume: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ symbol: event.target.value });
  }

  handleSubmit(event) {
    //alert('A name was submitted: ' + this.state.symbol);
    event.preventDefault();

    try {
      fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${this.state.symbol}&apikey=KEY`
      )
        .then(res => res.json())
        .then(res => {
          console.log(res);
          console.log(res["Global Quote"]);
          console.log(res["Global Quote"]["05. price"]);
          console.log(res["Global Quote"]["06. volume"]);
          this.setState({ price: res["Global Quote"]["05. price"] });
          this.setState({ volume: res["Global Quote"]["06. volume"] });
        })
        .catch(err => {
          console.log(err);
          this.setState({ hasErrors: true });
        });
      console.log(this.state.price, this.state.volume);
      console.log(this.state);

      const web3 = new Web3("http://localhost:7545");
      const accounts = web3.eth.getAccounts();
      console.log("Account 0 = ", accounts[0]);

      const stockQuote = new web3.eth.Contract(
        STOCK_ORACLE_ABI,
        STOCK_ORACLE_ADDRESS
      );
      console.log(stockQuote);
      var retval = stockQuote.methods
        .getStockPrice(web3.utils.fromAscii(this.state.symbol))
        .call();
      console.log(retval);
    } catch (err) {
      console.log("fetch failed", err);
    }
  }

  render() {
    return (
      <div className="input-panel">
        <div>
          <form>
            <label className="field-name">
              Symbol:
              <br />
              <input
                defaultValue={this.state.symbol}
                name="symbol"
                required
                onChange={this.handleChange}
              />
            </label>
          </form>
        </div>
        <div>
          <label className="field-name">
            Price:
            <br />
            <input defaultValue={this.state.price} name="price" />
          </label>
        </div>
        <div>
          <label className="field-name">
            Volume:
            <br />
            <input defaultValue={this.state.volume} name="volume" />
          </label>
          <br />
          <button type="button" onClick={this.handleSubmit}>
            Click Button for API
          </button>
          <button type="button" onClick={this.handleSubmit}>
            Click Button for Get Stock Price
          </button>
          <button type="button" onClick={this.handleSubmit}>
            Click Button for Get Stock Volume
          </button>
        </div>
        <br />
        <h2>Stock API</h2>
        Symbol:
        {this.state.symbol}
        <br />
        Price: {this.state.price}
        <br />
        Volume: {this.state.volume}
        <br />
        <h2>Stock Price - Smart Contract </h2>
        Symbol:
        {this.state.symbol}
        <br />
        Price: {this.state.getStockPrice}
        <br />
        <h2>Stock Volume - Smart Contract</h2>
        Symbol:
        {this.state.symbol}
        <br />
        Volume: {this.state.getStockVolume}
        <br />
      </div>
    );
  }
}

export default Stock;

