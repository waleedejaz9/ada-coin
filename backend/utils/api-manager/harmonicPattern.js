import { get } from "./RestAPIManager.js";
import CONFIG from "../../config.js";

let getPatternDetection = () => {
  return new Promise(async (resolve, reject) => {
    let config = {
      method: "get",
      url: `https://harmonicpattern.com/api/v1/scan/pattern?symbol=BINANCE:ADABTC&resolution=240&token=${CONFIG.apiKey}`,
      headers: {},
    };
    try {
      let data = await get(config);
      resolve(data.points);
    } catch (error) {
      reject(error);
    }
  });
};
export { getPatternDetection };
