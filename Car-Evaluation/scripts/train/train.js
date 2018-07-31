const model = require("./model").model;
const tf = require("./model").tf;
const convertedData = require("./data");
const data = convertedData.data;
const labels = convertedData.labels;

const batchSize = 3;
const iterations = 1;

function train() {
	tf.tidy(() => {
		for (i = 0; i < iterations; i++) {
			let batch = getBatch(data, i, batchSize);
		}
	});
}

function getBatch(array, i, size) {
	let _xs = array.xs;
	let _ys = array.ys;
	let start = i * size;
	let end = start + size;
	return {
		xs: _xs.slice(start, end),
		ys: _ys.slice(start, end)
	};
}
