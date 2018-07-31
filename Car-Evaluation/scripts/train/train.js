const model = require("./model").model;
const tf = require("./model").tf;
const convertedData = require("./data");
const data = convertedData.data;
// const labels = convertedData.labels;

const batchSize = 3;
const iterations = 1;
const labelSize = 4;
async function train() {
	for (i = 0; i < iterations; i++) {
		let batch = getBatch(data, i, batchSize);
		let xs = tf.tensor2d(batch.xs, [batchSize, batch.xs[0].length]);
		let ys = tf.tensor1d(batch.ys, "int32");
		xs.print();
		let labels = tf.oneHot(ys, labelSize);
		labels.print();
		let h = await model.fit(xs, ys);
		xs.dispose();
		ys.dispose();
		labels.dispose();
		console.log(h);
	}
	console.log(tf.memory().numTensors);
	console.log(`Tensors remaining : ${tf.memory().numTensors}`);
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

train().catch(err => console.log(err));
