import { Server } from "socket.io";
import http from "http";
import express from "express";
import router from "../backend/routes/binance-routes.js";
import path from "path";
import config from "./config.js";

const app = express();
const httpServer = http.createServer(app);
var __dirname = path.resolve();

const io = new Server(httpServer, {
  cors: { origin: "*", method: "*" },
  function(req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(index);
  },
});
app.use(express.static("public"));

app.use("/", router);

const listen = () => {
  httpServer.listen(config.PORT, () => {
    console.log(`Listening at ${config.HOST}:${config.PORT}`);
  });
};
export { listen, io };
