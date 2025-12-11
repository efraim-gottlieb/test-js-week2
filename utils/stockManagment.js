import { stockMarket } from "../data/stocks.js";
const stocks = stockMarket.stocks;

const getCategoryIndexes = (category) => {
  const indexes = [];
  for (let i = 0; i < stocks.length - 1; i++) {
    if (stocks[i].category === category) {
      indexes.push(i);
    }
  }
  return indexes;
};
const getIndexOfStock = (stockId) =>
  stocks.findIndex((stock) => stock.id == stockId);

const updateLastUpdated = () => {
  stockMarket.lastUpdated = new Date();
};

const addToPreviousPrices = (stockIndex, value) => {
  stocks[stockIndex].previousPrices.push(value);
};

const updateStockPrice = (stockIndex, increment) => {
  const newPrice = stocks[stockIndex].currentPrice * increment;
  stocks[stockIndex].currentPrice = newPrice;
};

const updateCategoryPrice = (category, increment) => {
  const categoryIndexes = getCategoryIndexes(category);
  categoryIndexes.forEach((index)=>{
    addToPreviousPrices(index, stocks[index].currentPrice)
    updateStockPrice(index, increment)

  })
};

const saleStock = (stockId) => {
  const stockIndex = getIndexOfStock(stockId);
  stocks[stockIndex].availableStocks --
  updateLastUpdated();
  addToPreviousPrices(stockIndex, stocks[stockIndex].currentPrice);
  updateStockPrice(stockIndex, 1.05);
  updateCategoryPrice(stocks[stockIndex].category, 1.01);
};

const buyStock = (stockId) => {
  const stockIndex = getIndexOfStock(stockId);
  stocks[stockIndex].availableStocks ++
  updateLastUpdated();
  addToPreviousPrices(stockIndex, stocks[stockIndex].currentPrice);
  updateStockPrice(stockIndex, 0.95);
  updateCategoryPrice(stocks[stockIndex].category, 0.99);
};



// const  searchStock = (identifier) => {}
// const  filterStocksByPrice =(givenPrice, above) => {}
// const  OperateOnStock = (operation, identifier) => {
//   `operation must be “buy” or “sell`
// }
