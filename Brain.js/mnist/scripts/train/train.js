const brain = require("brain.js");
const mnist = require("./mnist");
let net = new brain.NeuralNetwork();

console.log(mnist.values.testSet[1]);
console.log(mnist.values.trainSet[1]);
