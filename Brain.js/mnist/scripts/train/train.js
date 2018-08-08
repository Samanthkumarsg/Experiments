const fs = require("fs");
const path = require("path");
const brain = require("brain.js");
const mnist = require("./mnist");

let batchSize = 60;
let iterations = 1000;
let net = new brain.NeuralNetwork();

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

train()
	.then(data => console.log(data))
	.catch(err => console.log(err));
