const express = require("express");
const app = express();
const { PORT } = require("./config/serverConfig");

const prepareAuthServer = () => {
  app.listen(PORT, () => {
    console.log("Server started");
  });
};

prepareAuthServer();
