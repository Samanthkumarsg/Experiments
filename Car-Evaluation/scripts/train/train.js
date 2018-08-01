const model = require("./model").model;
const tf = require("./model").tf;
const convertedData = require("./data");
const data = convertedData.data;
// const labels = convertedData.labels;

const batchSize = 2;
const iterations = 3;
const labelSize = 4;
async function train() {
	for (i = 0; i < iterations; i++) {
		let batch = getBatch(data, i, batchSize);
		let xs = tf.tensor2d(batch.xs, [batchSize, batch.xs[0].length]);
		let y = tf.tensor1d(batch.ys, "int32");
		xs.print();
		let ys = tf.oneHot(y, labelSize);
		ys.print();
		let h = await model.fit(xs, ys, {
			shuffle: true,
			epochs: 5
		});
		console.log(tf.memory().numTensors);
		xs.dispose();
		ys.dispose();
		y.dispose();
		// console.log(h);
	}
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
