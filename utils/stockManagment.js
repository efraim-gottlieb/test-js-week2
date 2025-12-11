import { stockMarket } from "../data/stocks.js";
import input from "analiza-sync";
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
  categoryIndexes.forEach((index) => {
    addToPreviousPrices(index, stocks[index].currentPrice);
    updateStockPrice(index, increment);
  });
};

const saleStock = (stockId, amount) => {
  const stockIndex = getIndexOfStock(stockId);
  stocks[stockIndex].availableStocks -= amount;
  addToPreviousPrices(stockIndex, stocks[stockIndex].currentPrice);
  updateStockPrice(stockIndex, 1.05);
  updateCategoryPrice(stocks[stockIndex].category, 1.01);
};

const buyStock = (stockId, amount) => {
  const stockIndex = getIndexOfStock(stockId);
  stocks[stockIndex].availableStocks += amount;
  addToPreviousPrices(stockIndex, stocks[stockIndex].currentPrice);
  updateStockPrice(stockIndex, 0.95);
  updateCategoryPrice(stocks[stockIndex].category, 0.99);
};

export const searchStock = (identifier) => {
  const find = stocks.find((stock) => {
    if (stock.id == identifier || stock.name == identifier) {
      return stock;
    }
  });
  if (find) {
    return find;
  } else {
    console.log("not found !");
    return [];
  }
};

export const filterStocksByPrice = (givenPrice, above) => {
  if (above) {
    return stocks.filter((stock) => stock.currentPrice >= givenPrice);
  } else {
    return stocks.filter((stock) => stock.currentPrice <= givenPrice);
  }
};

export const operateOnStock = (operation, identifier) => {
  const action = operation === "sell" ? saleStock : buyStock;
  let stockId;
  do {
    stockId = searchStock(identifier).id;
  } while (stockId === undefined);
  let amount;
  do {
    amount = input("Enter amount of stocks you want to buy ");
  } while (
    operation === "sell" &&
    amount > stocks[getIndexOfStock(stockId)].availableStocks
  );
  action(stockId, amount);
  updateLastUpdated();
};

