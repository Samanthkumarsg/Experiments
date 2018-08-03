const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const path = require("path");
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
	// let a = [
	// 	{ color: [77, 192, 0], label: "purple" },
	// 	{ color: [79, 3, 23], label: "pink" },
	// 	{ color: [132, 104, 207], label: "blue" },
	// 	{ color: [53, 206, 166], label: "green" },
	// 	{ color: [81, 189, 24], label: "green" },
	// 	{ color: [238, 196, 221], label: "yellow" },
	// 	{ color: [184, 240, 9], label: "orange" }
	// ];
	let a = req.body;
	let labels = [
		"purple",
		"pink",
		"blue",
		"green",
		"yellow",
		"orange",
		"red",
		"grey",
		"brown",
		"white"
	];
	let xs = [],
		ys = [];
	a.forEach(val => {
		let temp = [];
		ys.push(labels.indexOf(val.label));
		val.color.forEach(element => {
			temp.push(element / 255);
		});
		xs.push(temp);
	});
	console.log(xs, ys);
});

module.exports = app;
