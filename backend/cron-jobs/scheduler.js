import cron from "node-cron";
import { sendEmail } from "../controller/email.js";
import { getByPriceOneHour } from "../utils/api-manager/binance.js";
import { getPatternDetection } from "../utils/api-manager/harmonicPattern.js";
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
  cron.schedule(config.patternTime, async () => {
    try {
      console.log("Running job every - second job", new Date());
      let result = await getPatternDetection();
      let htmlTemplate = "";
      for (var i = 0; i < result.length; i++) {
        htmlTemplate += `<tr>
        <td>${Date.now(result[i].start_time)}</td>
        <td>${result[i].patternname}</td>
        <td>${result[i].patterntype}</td>
        <td>${result[i].end_time}</td>
        </tr>`;
      }
      let response =
        "<p>patterns detected are as following:</p>" +
        "<table cellpadding='2px' cellspacing='2px' border='1'><th>start date</th><th>Pattern Detected</th><th>Pattern type</th><th>end date</th>" +
        htmlTemplate +
        "</table > ";
      await sendEmail("From Node ADA", config.TO, response);
    } catch (e) {
      res.send({
        error: e,
      });
    }
  });
};
export default task;
