const csv = require("csvtojson");
const _ = require("lodash");
const path = require("path");

// Here we take CSV and convert it into JSON object
async function convertData() {
	let convertedArray = [];
	const csvFilePath = path.resolve("./data/wine.csv");
	await csv()
		.fromFile(csvFilePath)
		.then(jsonObj => {
			// Here we take Converted JSON object
			_.map(jsonObj, function(val) {
				// Here we take individual objects of converted JSON
				let i = 0;
				let output = [],
					input = [];
				_.map(val, function(_val) {
					// Here we take individual value from current object
					if (i == _.size(val) - 1) output = createOneHot(_val);
					else input.push(_val / 100);
					i++;
				});
				convertedArray.push({
					input: input,
					output: output
				});
			});
		});
	return convertedArray;
}

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

module.exports = {
	convertData: convertData
};
