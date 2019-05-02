const express = require("express");
const fs = require("fs");
const route = require("./routes");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

app.use(express.static(path.resolve("src")));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.set("views", path.resolve());
app.set("view engine", "ejs");

app.get("/", route.home);
app.post("/predict", route.predict);

module.exports = app;
