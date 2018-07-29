const model = require("./model").model;
const tf = require("./model").tf;

const xs = tf.tensor2d(require("./data").xs);
const ys = tf.tensor2d(require("./data").ys);

async function train() {
	let h;
	for (let i = 0; i < 1000; i++) {
		h = await model.fit(xs, ys, {
			epochs: 5,
			shuffle: true
		});
		console.log(
			"Loss : " + h.history.loss[0],
			"Accuracy : " + h.history.acc[0],
			"Tensors active : " + tf.memory().numTensors
		);
	}
	xs.dispose();
	ys.dispose();
	return h;
}

train()
	.then(async data => {
		let saved = await model.save("file://" + __dirname + "/../../model");
		console.log("------------------------------------------------");
		console.log("Training Done");
		console.log("------------------------------------------------");
		console.log(
			"Trained model is saved in the location file://" +
				__dirname +
				"/../../model/model.json"
		);
		console.log("\n------------------------------------------------");
	})
	.catch(err => {
		console.log(err);
	});
