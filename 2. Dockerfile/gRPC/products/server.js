// https://www.freecodecamp.org/news/how-to-write-a-production-ready-node-and-express-app-f214f0b17d8c/
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const { product } = require("./routes");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/product", product);

module.exports = app;
