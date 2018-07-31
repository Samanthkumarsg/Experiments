const convertedData = require("./data");
const data = convertedData.data;
const labels = convertedData.labels;

const batchSize = 3;

function train() {
	tf.tidy(() => {
		for (i = 0; i < iterations; i++) {
			let batch = getBatch(data.xs, i, batchSize);
		}
	});
}

function getBatch(array, start, size) {}
