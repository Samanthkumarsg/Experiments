const fs = require("fs");
const path = require("path");

const trainImages = fs.readFileSync(
	path.resolve("data/train-images.idx3-ubyte")
);
const trainLabels = fs.readFileSync(
	path.resolve("data/train-labels.idx1-ubyte")
);
const testImages = fs.readFileSync(path.resolve("data/t10k-images.idx3-ubyte"));
const testLabels = fs.readFileSync(path.resolve("data/t10k-labels.idx1-ubyte"));
let trainValues = new Array();
let testValues = new Array();

console.log("Converting training data . .");
for (var image = 0; image < 60000; image++) {
	var pixels = new Array();
	for (var y = 0; y < 28; y++) {
		for (var x = 0; x < 28; x++) {
			pixels.push(trainImages[image * 28 * 28 + (x + y * 28) + 16] / 255);
		}
	}
	var imageData = new Object();
	imageData[parseInt(trainLabels[image + 8])] = pixels;
	trainValues.push(imageData);
}
console.log(`Converted training data with ${trainValues.length} records`);
console.log("Converting testing data . .");
for (var image = 0; image < 10000; image++) {
	var pixels = new Array();
	for (var y = 0; y < 28; y++) {
		for (var x = 0; x < 28; x++) {
			pixels.push(testImages[image * 28 * 28 + (x + y * 28) + 16] / 255);
		}
	}
	var imageData = new Object();
	imageData[JSON.stringify(testLabels[image + 8])] = pixels;
	testValues.push(imageData);
}
console.log(`Converted testing data with ${testValues.length} records`);
module.exports = {
	values: {
		trainSet: trainValues,
		testSet: testValues
	},
	getBatch: function(array, i, size) {
		let batched = array.slice(i * size, i * size + size);
		let batchedX = [],
			batchedY = [];
		batched.forEach(element => {
			let current = Object.entries(element)[0];
			batchedY.push(parseInt(current[0]));
			current[1].forEach(value => {
				batchedX.push(parseFloat(value));
			});
		});
		return {
			x: batchedX,
			y: batchedY
		};
	}
};
