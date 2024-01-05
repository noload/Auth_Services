const express = require("express");
const app = express();
const { PORT } = require("./config/serverConfig");

const bodyParser = require("body-parser");

const apiRoute = require("./routes/index");

const prepareAuthServer = () => {
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use("/api", apiRoute);

  app.listen(PORT, async () => {
    console.log(`server started at ${PORT}`);
  });
};

prepareAuthServer();
