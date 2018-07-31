const tf = require("@tensorflow/tfjs");
require("@tensorflow/tfjs-node");

const model = tf.sequential();
let hidden = tf.layers.dense({
	inputShape: [6],
	units: 6,
	activation: "relu"
});
let output = tf.layers.dense({
	units: 1,
	activation: "relu"
});

model.add(hidden);
model.add(output);

model.compile({
	loss: "meanSquaredError",
	optimizer: tf.train.sgd(0.1)
});

module.exports = {
	model: model,
	tf: tf
};
