const tf = require("@tensorflow/tfjs");
require("@tensorflow/tfjs-node");

const model = tf.sequential();

module.exports = {
	model: model,
	tf: tf
};
