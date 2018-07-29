const tf = require("@tensorflow/tfjs");
require("@tensorflow/tfjs-node");

const model = tf.sequential();

const hidden = tf.layers.dense({
	inputShape: [2],
	units: 3,
	activation: "sigmoid"
});
model.add(hidden);

const output = tf.layers.dense({
	units: 1,
	activation: "sigmoid"
});
model.add(output);

const optimizer = tf.train.sgd(0.5);

model.compile({
	optimizer: optimizer,
	loss: tf.losses.meanSquaredError,
	metrics: ["accuracy"]
});

module.exports = {
	model: model,
	tf: tf
};
