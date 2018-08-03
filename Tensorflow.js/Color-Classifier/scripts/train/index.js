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
	let color = req.body.color;
	let label = tf.scalar(req.body.label, "int32");
	let xs = [],
		ys = [];
	color.forEach(element => {
		xs.push(element / 255);
	});
	ys = tf.oneHot(label, 10);
	console.log(xs, label);
	res.send();
});

module.exports = app;
