import dotenv from "dotenv";
import path from "path";
var __dirname = path.resolve();
dotenv.config({
  path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`),
});
var ApiKey = "c79gpg6ak3rt4c7109b0";
export default {
  apiKey: process.env.ApiKey,
  NODE_ENV: process.env.NODE_ENV || "development",
  HOST: process.env.HOST || "localhost",
  PORT: process.env.PORT || 3000,
  user: process.env.user,
  pass: process.env.pass,
  TO: process.env.TO,
  scheduleTime: process.env.scheduleTime,
  patternTime: process.env.patternTime,
};
