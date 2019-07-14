const express = require("express");
const fs = require("fs");
const route = require("./routes");
const bodyParser = require("body-parser");
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.set("views", __dirname + "/../../");
app.set("view engine", "ejs");

app.get("/", route.home);
app.post("/predict", route.predict);

module.exports = app;
