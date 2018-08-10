const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const path = require("path");
const net = require("./model");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.resolve("./src")));
app.set("views", path.resolve("./src/"));
app.set("view engine", "ejs");

app.get("/", (req, res, next) => {
	res.render("index.ejs");
});

app.post("/predict", async (req, res, next) => {
	console.log(req.body);
});

app.post("/train", async (req, res, next) => {
	console.log(req.body);
});

module.exports = app;
