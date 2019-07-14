const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');
const path = require('path');

module.exports = {
	home: (req, res, next) => {
		res.render('src/index');
	},
	predict: async (req, res, next) => {
		let loadedData = req.body;
		const loadedModel = await tf.loadModel(
			'file://' + __dirname + '/../../model.json'
		);
		let max = await tf.tidy(() => {
			loadedTensor = tf.tensor1d(loadedData);
			let prediction = loadedModel
				.predict(loadedTensor.reshape([1, 28, 28, 1]))
				.dataSync();
			let max = tf.argMax(prediction).dataSync();
			loadedTensor.dispose();
			console.log(max);
			return max;
		});
		res.send(max);
		console.log(tf.memory().numTensors);
		console.log('------------------------');
	}
};
