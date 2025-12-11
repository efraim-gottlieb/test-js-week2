import input from "analiza-sync";
import { searchStock, filterStocksByPrice , operateOnStock} from "./utils/stockManagment.js";
const menu =
  "1. Search for a stock by name or id \n2. Show all stocks above or below a given price\n3. Buy or sell a stock\n4. Exit";

console.log(menu);
let choice;
while (choice !== "4") {
  choice = input("Enter yout choice ");
  if (choice == "1") {
    console.log(searchStock(input("Enter stock name or id ")));
  } else if (choice == "2") {
    let above;
    let givenPrice;
    do {
      givenPrice = input("Enter a price ");
      try {
        above = +input(
          "Enter 1 to get above the number or 0 to get under the number "
        );
      } catch {}
    } while (
      typeof givenPrice === "number" &&
      (above == true || above == false)
    );
    console.log(filterStocksByPrice(givenPrice, above));
  } else if (choice == "3") {
    let buyOrSell
    let idOrName
    buyOrSell = +input('Enter your choice\n1. buy\n2. sell ')
    idOrName = input('Enter id or name of stock ')
    if (buyOrSell === 1) {
      operateOnStock('sell', idOrName)
    }
    else if (buyOrSell === 2){
      operateOnStock('sell', idOrName)
    }
  }
}

