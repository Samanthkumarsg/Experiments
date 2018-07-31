const fs = require("fs");
const path = require("path");
require("pretty-error").start();

const Xclasses = [
	["vhigh", "high", "med", "low"], //buying
	["vhigh", "high", "med", "low"], //maint
	["2", "3", "4", "5more"], //doors
	["2", "4", "more"], //persons
	["small", "med", "big"], //lug_boot
	["low", "med", "high"] //safety
];
const Yclasses = ["unacc", "acc", "good", "vgood"];

// Meta Data
const label = ["buying", "maint", "doors", "persons", "lug_boot", "safety"];

// Reading the Data
let file = fs.readFileSync(path.resolve("./data/car-data.csv"), "utf8");
let xs = [],
	ys = [];

// Index function
function convertVals(val, attr) {
	return attr.indexOf(val);
}

// Converting the data
file.split("\n").forEach(_v1 => {
	let temp = [];
	_v1.split(",").forEach((_v2, index) => {
		if (index == 6) ys.push(convertVals(_v2, Yclasses));
		else temp.push(convertVals(_v2, Xclasses[index]));
	});
	xs.push(temp);
});

module.exports = {
	data: {
		xs: xs,
		ys: ys
	},
	labels: label
};
