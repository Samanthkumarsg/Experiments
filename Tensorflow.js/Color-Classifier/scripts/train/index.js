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

app.post("/predict", async (req, res, next) => {
	let xs = tf.tensor2d([req.body.color]);
	let predX = model.predict(xs);
	let max = predX.argMax(1).dataSync();
	console.log(max);
	predX.dispose();
	xs.dispose();
	// tf.argMax()
	res.status(200).json({
		colIndex: max
	});
});

app.post("/train", async (req, res, next) => {
	let color = [req.body.color];
	let label = req.body.label;
	let xs = tf.tensor2d(color);
	let ys = tf
		.oneHot(tf.scalar(label, "int32"), 10)
		.cast("float32")
		.reshape([1, 10]);
	await model
		.fit(xs, ys, {
			epochs: 10,
			shuffle: true
		})
		.then(result => {
			xs.dispose();
			ys.dispose();
			res.status(200).send(result);
		})
		.catch(err => {
			xs.dispose();
			ys.dispose();
			res.status(200).send(result);
		});
});

module.exports = app;
