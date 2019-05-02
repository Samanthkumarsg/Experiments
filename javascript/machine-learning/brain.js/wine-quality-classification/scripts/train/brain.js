const brain = require("brain.js");

const net = new brain.NeuralNetwork({
	activation: "sigmoid"
});

module.exports = net;
