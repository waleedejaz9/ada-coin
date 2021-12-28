import cron from "node-cron";
import { sendEmail } from "../controller/email.js";
import { getByPriceOneHour } from "../utils/api-manager/binance.js";
import config from "../config.js";
const task = () => {
  cron.schedule(config.scheduleTime, async () => {
    try {
      console.log("Running job every - second job", new Date());
      let result = await getByPriceOneHour();
      let htmlTemplate = "";
      for (var i = 0; i < result.length; i++) {
        htmlTemplate += `<tr>
        <td>${result[i].openPrice}</td>
        <td>${result[i].highPrice}</td>
        <td>${result[i].lowPrice}</td>
        <td>${result[i].closePrice}</td>
        <td>${result[i].openTime}</td>
        <td>${result[i].closeTime}</td>
        </tr>`;
      }
      let response =
        "<table cellpadding='2px' cellspacing='2px' border='1'><th>open price</th><th>high price</th><th>low price</th><th>close price</th><th>open time</th><th>close time</th>" +
        htmlTemplate +
        "</table > ";
      await sendEmail("From Noe ADA", config.TO, response);
    } catch (e) {
      res.send({
        error: e,
      });
    }
  });
};
export default task;
