import { io } from "../server.js";
import { getByPrice } from "../utils/api-manager/binance.js";
var loop;
const establishSocket = () => {
  io.on("connection", (socket) => {
    console.log("Connection established");
    startStreaming(socket);
    socket.on("disconnect", () => {
      console.log("Disconnected");
      stopStreaming();
    });
  });
};

// The function startStreaming starts streaming data to all the users
function startStreaming(socket) {
  loop = setInterval(() => {
    getApiAndEmit(socket);
  }, 1000);
}

// The function stopStreaming stops streaming data to all the users
function stopStreaming() {
  clearInterval(loop);
}
const getApiAndEmit = async (socket) => {
  getAskAndBidPrice(socket);
};

const getAskAndBidPrice = async (socket) => {
  let res = null;
  try {
    res = await getByPrice();
  } catch (e) {
    console.log(e, "from socket");
  }
  socket.emit("getAskAndBidPrice", res);
};

export { establishSocket };
