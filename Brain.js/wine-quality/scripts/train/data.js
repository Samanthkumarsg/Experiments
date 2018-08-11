const csv = require("csvtojson");
const _ = require("lodash");
const path = require("path");

const csvFilePath = path.resolve("./data/wine.csv");
let split, training, testing;

csv()
	.fromFile(csvFilePath)
	.then(jsonObj => {
		console.log(jsonObj.length);
	});

module.exports = [];
