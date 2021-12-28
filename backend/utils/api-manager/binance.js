import { get } from "./RestAPIManager.js";

let getByPrice = () => {
  return new Promise(async (resolve, reject) => {
    let config = {
      method: "get",
      url: "https://api.binance.com/api/v3/ticker/24hr?symbol=ADABTC",
      headers: {},
    };
    try {
      let data = await get(config);
      let askPrice = data.askPrice;
      let bidPrice = data.bidPrice;
      let price = {
        askPrice: askPrice,
        bidPrice: bidPrice,
      };
      resolve(price);
    } catch (error) {
      reject(error);
    }
  });
};
let getByPriceOneHour = () => {
  return new Promise(async (resolve, reject) => {
    let config = {
      method: "get",
      url: "https://api.binance.com/api/v3/klines?symbol=ADABTC&interval=1h",
      headers: {},
    };
    try {
      let data = await get(config);
      let dailyPrices = [];
      let initialValue = data.length - 24;
      let oneHourPrice;

      for (var i = initialValue; i < data.length; i++) {
        oneHourPrice = data[i];
        let adaPrice = {
          openPrice: oneHourPrice[1],
          highPrice: oneHourPrice[2],
          lowPrice: oneHourPrice[3],
          closePrice: oneHourPrice[4],
          openTime: new Date(oneHourPrice[0]).toLocaleString(),
          closeTime: new Date(oneHourPrice[6]).toLocaleString(),
        };
        dailyPrices.push(adaPrice);
      }

      resolve(dailyPrices);
    } catch (error) {
      reject(error);
    }
  });
};
export { getByPrice, getByPriceOneHour };
