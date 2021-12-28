import dotenv from "dotenv";
import path from "path";
var __dirname = path.resolve();
dotenv.config({
  path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`),
});

export default {
  NODE_ENV: process.env.NODE_ENV || "development",
  HOST: process.env.HOST || "localhost",
  PORT: process.env.PORT || 3000,
  user: process.env.user,
  pass: process.env.pass,
  TO: process.env.TO,
  scheduleTime: process.env.scheduleTime,
};
