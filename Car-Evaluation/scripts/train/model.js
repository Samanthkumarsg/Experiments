const tf = require("@tensorflow/tfjs");
require("@tensorflow/tfjs-node");

const model = tf.sequential();
model.add(
	tf.layers.dense({
		inputShape: [6],
		units: 12,
		activation: "relu"
	})
);
model.add(
	tf.layers.dense({
		units: 8,
		// kernelInitializer: "varianceScaling",
		activation: "relu"
	})
);
model.add(
	tf.layers.dense({
		units: 4,
		// kernelInitializer: "varianceScaling",
		activation: "relu"
	})
);

let optimizer = tf.train.sgd(0.15);

model.compile({
	optimizer: optimizer,
	loss: "meanSquaredError"
});

module.exports = {
	model: model,
	tf: tf
};
