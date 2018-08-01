const tf = require("@tensorflow/tfjs");
require("@tensorflow/tfjs-node");

const model = tf.sequential();
let hidden = tf.layers.dense({
	inputShape: [6],
	units: 12,
	activation: "sigmoid"
});
model.add(hidden);
let output = tf.layers.dense({
	units: 4,
	activation: "softmax"
});
model.add(output);

let optimizer = tf.train.sgd(0.1);

model.compile({
	loss: "categoricalCrossentropy",
	optimizer: optimizer
});

module.exports = {
	model: model,
	tf: tf
};
