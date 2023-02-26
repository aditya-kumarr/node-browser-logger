const socketIo = require("socket.io");

const socketConnection = async (http) => {
  try {
    const io = socketIo(http);
    return new Promise((resolve, reject) => {
      io.on("connection", (socket) => {
        resolve(socket);
      });
    });
  } catch (error) {
    console.warn(error);
  }
};
module.exports = socketConnection;
