const fs = require("fs");
const path = require("path");
const brain = require("brain.js");
const mnist = require("./mnist");
let net = new brain.NeuralNetwork({
	hiddenLayers: [12],
	activation: "sigmoid"
});

async function train() {
	for (i = 0; i < 1; i++) {
		console.log("Imported batch - " + i);
		let component = await mnist.getBatch(mnist.values.trainSet, i, 1);
		let oneHot = await createOneHot(component.y);
		let data = await [{ input: component.x, output: oneHot }];
		console.log(oneHot);
		// let output = net.train(data, {
		// 	iterations: 10,
		// 	learningRate: 0.01
		// });
		// console.log(output);
		// console.log("-------------------------------------------");
	}
	saveModel();
}

function createOneHot(element) {
	console.log(element);
	let oneHot = new Array();
	for (i = 0; i < 10; i++) {
		if (i != element - 1) oneHot.push(0);
		else oneHot.push(1);
	}
	return oneHot;
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
	})
	.catch(err => {
		console.log(err);
	});
