const path = require("path");
const tf = require("@tensorflow/tfjs");
require("@tensorflow/tfjs-node");

let tensor = tf.tensor2d([[0.5, 0.9]]);

async function loadModel() {
	let model = await tf.loadModel(
		"file://" + path.resolve("./model/model.json")
	);
	let stuff = await model.predict(tensor);
	stuff.print();
}

loadModel();
