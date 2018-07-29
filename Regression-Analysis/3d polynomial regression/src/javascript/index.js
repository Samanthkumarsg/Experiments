var canvas = document.querySelector("#canvas");
var context = canvas.getContext("2d");
canvas.height = 500; // Height of the graph
canvas.width = 700; // Width of the graph

var xpoints = new Array(); // Array holds x values
var ypoints = new Array(); // Array holds corresponding y values

// ax^3 + bx^2 + cx+ c
var a = tf.variable(tf.scalar(Math.random())); // ax^3
var b = tf.variable(tf.scalar(Math.random())); // bx^2
var c = tf.variable(tf.scalar(Math.random())); // cx
var d = tf.variable(tf.scalar(Math.random())); // d

var learningRate = 0.2; // Higher the learning rate, faster the algorithm works
var optimizer = tf.train.adam(learningRate); // Optimizer is a function that is used to minimize the loss

var graphStart = -1; // Starting offset of the graph
var graphEnd = 1; // End offset of the graph

var steps = 0.1; //Steps are the steps you take from 0 to 1. For eg: 0.1 will give you 10 horizontal and vertical lines. 0.5 will give you two.
var pointSize = 5; // Size of the point
var graphTextColor = "rgb(21, 22, 26)"; //Graph Text Color
var graphFontProp = "10px Arial"; //Graph font size
var graphLineColor = "rgb(213, 217, 224)"; //Line color
var graphColor = "rgb(255, 255, 255)"; //Graph Background color
var pointColor = "rgb(87, 133, 214)"; // Color of the point

// This function takes the x value and calculates the result and gives out a y value
function predict(x) {
	let xs = tf.tensor1d(x); // Converting raw value to tensor
	// y = ax^3 + bx^2 + cx + c
	let ypred = xs
		.pow(tf.scalar(3))
		.mul(a)
		.add(xs.square().mul(b))
		.add(xs.mul(c))
		.add(d);
	return ypred;
}

// This function takes the predicted y value and actual y value and calculates the loss
function loss(pred, label) {
	return pred
		.sub(label)
		.square()
		.mean();
}

function draw() {
	context.clearRect(0, 0, canvas.width, canvas.height); // Cleaning up the canas
	drawGraph(); // Drawing the graph

	// Plotting the points
	for (i = 0; i < xpoints.length; i++) {
		let x = denormalize(xpoints[i], 1);
		let y = denormalize(ypoints[i], 0);
		drawPoint(x, y);
	}

	// Optimizer function
	if (xpoints.length > 1) {
		tf.tidy(function() {
			let ys = tf.tensor1d(ypoints);
			optimizer.minimize(function() {
				return loss(predict(xpoints), ys);
			});
		});
	}

	tf.tidy(function() {
		var xpolline = new Array(); // X points of polynomial
		for (i = graphStart; i <= graphEnd + steps; i += steps / 3) {
			xpolline.push(i);
		}
		var ypred = predict(xpolline);
		var ypolline = ypred.dataSync(); // Y points of polynomial
		for (i = graphStart; i < xpolline.length; i++) {
			let x1 = denormalize(xpolline[i], 1);
			let y1 = denormalize(ypolline[i], 0);
			let x2 = denormalize(xpolline[i + 1], 1);
			let y2 = denormalize(ypolline[i + 1], 0);
			drawLine(x1, y1, x2, y2); // X and Y values to draw a line
		}
	});

	// Debugging only -> Prints the number of Tensors currently active
	// console.log(tf.memory().numTensors);
	requestAnimationFrame(draw); // This is where recursion occurs
}

// This function takes mouse coordinates and adds it to the array for computations
canvas.addEventListener("click", function(event) {
	xpoints.push(normalize(event.offsetX, 1));
	ypoints.push(normalize(event.offsetY, 0));
});

// Function that draws a point
function drawPoint(x, y) {
	context.beginPath();
	context.arc(x, y, pointSize, 0, Math.PI * 2);
	context.fillStyle = pointColor;
	context.fill();
	context.closePath();
}

//Function that draws the line
function drawLine(x1, y1, x2, y2) {
	context.beginPath();
	context.moveTo(x1, y1);
	context.quadraticCurveTo(x1, y1, x2, y2);
	context.strokeStyle = "rgb(255,0,0)";
	context.lineWidth = 4;
	context.stroke();
	context.closePath();
}

// This function draws the graph
function drawGraph() {
	canvas.style.background = graphColor;
	for (i = graphStart; i <= graphEnd; i += steps) {
		let xpos = mapRange(i, graphStart, graphEnd, 0, canvas.width);
		let ypos = mapRange(i, graphStart, graphEnd, canvas.height, 0);
		context.font = graphFontProp;
		context.lineWidth = 0.3;
		context.strokeStyle = graphLineColor;
		context.moveTo(xpos, 0);
		context.lineTo(xpos, canvas.height);
		context.fillText(
			Math.round(i * 100) / 100,
			xpos - 15,
			canvas.height - 3
		);
		context.moveTo(0, ypos);
		context.lineTo(canvas.width, ypos);
		context.fillText(Math.round(i * 100) / 100, 5, ypos - 6);
		context.stroke();
	}
}

// Normalizer - takes a value and a coordinate 0 -> y coordinate , 1 -> x coordinate
// and converts the given value.
// Denormalizers returns the actual value which was normalized by normalizer
function normalize(value, coordinate) {
	if (coordinate) {
		return mapRange(value, graphStart, canvas.width, graphStart, graphEnd);
	} else {
		return mapRange(value, graphEnd, canvas.height, graphEnd, graphStart);
	}
}
function mapRange(n, initpos, endpos, initmap, endmap) {
	return ((n - initpos) / (endpos - initpos)) * (endmap - initmap) + initmap;
}
function denormalize(value, coordinate) {
	if (coordinate) {
		return mapRange(value, graphStart, graphEnd, graphStart, canvas.width);
	} else {
		return mapRange(value, graphEnd, graphStart, graphEnd, canvas.height);
	}
}

// This function visualizes the given data
draw();
