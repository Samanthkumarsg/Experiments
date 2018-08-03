const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const path = require("path");
const model = require("./model").model;
const tf = require("./model").tf;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.resolve("./src")));
app.set("views", path.resolve("./src/"));
app.set("view engine", "ejs");

app.get("/", (req, res, next) => {
	res.render("index.ejs");
});

app.post("/train", (req, res, next) => {
	let color = [req.body.color];
	let label = req.body.label;
	let xs = tf.tensor2d(color);
	let ys = tf.oneHot(tf.scalar(label, "int32"), 10);
	xs.print();
	ys.print();
	res.send();
});

module.exports = app;
