const tf = require("@tensorflow/tfjs");
require("@tensorflow/tfjs-node");

const model = tf.sequential();

const hidden = tf.layers.dense({
	units: 16,
	inputShape: [3],
	activation: "relu"
});
model.add(hidden);
const output = tf.layers.dense({
	units: 10,
	activation: "sigmoid"
});
model.add(output);

const optimizer = tf.train.sgd(0.5);
model.compile({
	optimizer: optimizer,
	loss: "meanSquaredError",
	metrics: ["accuracy"]
});

module.exports = {
	model: model,
	tf: tf
};
