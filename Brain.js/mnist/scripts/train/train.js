const fs = require("fs");
const path = require("path");
const mnist = require("./mnist");
const net = require("./brain");

let batchSize = 60;
let iterations = 1000;

async function train() {
	for (let i = 0; i < iterations; i++) {
		console.log("Imported batch " + i);
		let batch = mnist.getBatch(mnist.values.trainSet, i, batchSize);
		let res = await net.train(batch, {
			iterations: 10,
			learningRate: 0.01
		});
		console.log(res);
	}
}

function saveModel() {
	fs.writeFile("model.json", JSON.stringify(net.toJSON()), function(err) {
		if (err) return console.log(err);
		console.log("The trained model is saved as model.json");
	});
}

train()
	.then(data => {
		console.log(data);
		saveModel();
	})
	.catch(err => {
		console.log(err);
	});
