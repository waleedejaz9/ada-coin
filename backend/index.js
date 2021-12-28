import task from "./cron-jobs/scheduler.js";
import { listen } from "./server.js";
import { establishSocket } from "./utils/socket.js";
establishSocket();
task();
listen();
