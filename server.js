const express = require("express");
const { connectMongoDB } = require("./config/db");
require("colors");
const path = require("path");
require("./util/redis");

const userRoute = require("./routes/userRoute");

require("dotenv").config({});
connectMongoDB();

const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(userRoute);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, function () {
  const host = (server.address().address = "localhost");
  const port = server.address().port;
  console.log("Server Listening On http://%s:%s", host, port);
});
