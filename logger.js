const { default: axios } = require("axios");
require("dotenv").config();

const onLogs = function () {
  console.defaultLog = console.log.bind(console);
  console.log = function (message) {
    console.defaultLog.apply(console, arguments);
    axios.post(`http://localhost:${process.env.PORT || 9369}/log`, { message });
  };

  console.defaultErr = console.error.bind(console);
  console.error = function (error) {
    console.defaultErr.apply(console, arguments);
    axios.post("http://localhost:9360/log", { message });
  };
};

module.exports = onLogs;
