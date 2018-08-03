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

app.post("/train", async (req, res, next) => {
	let color = [req.body.color];
	let label = req.body.label;
	let xs = tf.tensor2d(color);
	let ys = tf
		.oneHot(tf.scalar(label, "int32"), 10)
		.cast("float32")
		.reshape([1, 10]);
	xs.print();
	ys.print();
	console.log(xs.shape, ys.shape);
	await model
		.fit(xs, ys, {
			epochs: 1,
			shuffle: true
		})
		.then(res => {
			console.log(res);
		})
		.catch(err => {
			console.log(err);
		});
	res.send();
});

module.exports = app;
