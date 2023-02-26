const express = require("express");
require("dotenv").config();
const app = express();
var events = require("events");
var eventEmitter = new events.EventEmitter();

var http = require("http").createServer(app);
var io = require("socket.io")(http);
const PORT = process.env.PORT || 9630;

const dataSender = () => {
  this.socket = { emit: () => {} };
  eventEmitter.on("gotLog", (data) => {
    console.log("got data");
    this.socket.emit("gotLog", data);
  });
  return (socket) => {
    this.socket = socket;
  };
};

const main = async () => {
  app.use(express.json({ limit: "1gb" }));
  app.get("/", (req, res) => {
    console.log("hit endpoint");
    res.sendFile(__dirname + "/client/index.html");
  });
  app.post("/log", (req, res) => {
    // invoke some event!
    eventEmitter.emit("gotLog", req.body.message);

    res.sendStatus(200);
  });
  const giveSocket = dataSender();

  io.on("connection", (socket) => {
    // Ran when a socket connected

    console.log("connected to socket");
    socket.emit("connected", socket.id);
    giveSocket(socket);
    // listen to the event emitted here and then emit the event to the socket connection
  });

  http.listen(PORT, () => {
    console.log(
      `open http://localhost:${PORT} on browser to see the console logs`
    );
  });
};
main();
