pragma solidity ^0.6.0;

contract StockOracle {
    
/// quote structure
    struct stock {
        uint price;
        uint volume;
    }
 
 /// quotes by symbol
    mapping( bytes4 => stock) stockQuote;

 /// Contract owner
    address oracleOwner;
    
    /// Set the value of a stock
    function setStock(bytes4 symbol, uint _price, uint _volume) public {
        stock memory newStock;
        newStock.price = _price;
        newStock.volume = _volume;
        stockQuote[symbol] = newStock;
    }

 /// Get the value of a stock
    function getStockPrice(bytes4 symbol) public view returns (uint) {
        return stockQuote[symbol].price;
    }

 /// Get the value of volume traded for a stock
    function getStockVolume(bytes4 symbol) public view returns (uint) {
        return stockQuote[symbol].volume;
    }
    
}