const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const path = require("path");
const brain = require("brain.js");
const app = express();

const net = new brain.NeuralNetwork();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.resolve("./src")));
app.set("views", path.resolve("./src/"));
app.set("view engine", "ejs");

app.get("/", (req, res, next) => {
	res.render("index.ejs");
});

app.post("/predict", async (req, res, next) => {
	let h = await net.run(req.body.color, {
		iterations: 1
	});
	res.status(200).json({
		colors: h
	});
});

app.post("/train", async (req, res, next) => {
	let h = await net.train({
		inputs: req.body.color,
		output: createOneHot(req.body.label)
	});
	res.send(h);
});

function createOneHot(val) {
	let current = [];
	for (i = 0; i < 10; i++) {
		if (i == val) {
			current.push(1);
		} else {
			current.push(0);
		}
	}
	return current;
}

module.exports = app;
