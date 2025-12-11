import { stockMarket } from "../data/stocks.js";
const stocks = stockMarket.stocks;

const getIndexOfStock = (stockId) =>
  stocks.findIndex((stock) => stock.id == stockId);

const updateLastUpdated = () => {
  stockMarket.lastUpdated = new Date();
};

const addToPreviousPrices = (stockId, value) => {
  stocks[stockId].previousPrices.push(value);
};

const updateStockPrice = (stockId, increment) => {
  stocks[stockId].currentPrice = stocks[stockId].currentPrice * increment;
};

const saleStock = (stockId) => {
  updateLastUpdated();
  addToPreviousPrices(stockId, stocks[stockId].currentPrice);
  updateStockPrice(stockId, 1.05);
  stocks[stockId].availableStocks--;
};
console.log(stocks[0]);
console.log(stockMarket.lastUpdated);
saleStock(getIndexOfStock("x7l2df9"));
console.log(stockMarket.lastUpdated);
console.log(stocks[0]);
// const  searchStock = (identifier) => {}
// const  filterStocksByPrice =(givenPrice, above) => {}
// const  OperateOnStock = (operation, identifier) => {
//   `operation must be “buy” or “sell`
// }
