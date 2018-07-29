var canvas = document.querySelector("#canvas");
var context = canvas.getContext("2d");

canvas.height = 500; // Height of the graph
canvas.width = 700; // Width of the graph

var xpoints = new Array(); // Array holds x values
var ypoints = new Array(); // Array holds corresponding y values

var graphStart = -1;
var graphEnd = 1;

var m = tf.variable(tf.scalar(Math.random())); // Slope
var c = tf.variable(tf.scalar(Math.random())); // Y intercept

var learningRate = 0.2; // Higher the learning rate, faster the algorithm works
var optimizer = tf.train.adam(learningRate); // Optimizer is a function that is used to minimize the loss

var steps = 0.1;
/*
  Steps are the steps you take from 0 to 1.
  For eg : 0.1 will give you 10 horizontal and vertical lines. 0.5 will give you two.
*/
var pointSize = 5; // Size of the point
var graphTextColor = "rgb(21, 22, 26)"; //Graph Text Color
var graphFontProp = "10px Arial"; //Graph font size
var graphLineColor = "rgb(213, 217, 224)"; //Line color
var graphColor = "rgb(255, 255, 255)"; //Graph Background color
var pointColor = "rgb(87, 133, 214)"; // Color of the point

// This function takes the x value and calculates the result and gives out a y value
function predict(xs) {
	let xpred = tf.tensor1d(xs);
	let ypred = xpred.mul(m).add(c);
	return ypred;
	xpred.dispose(); // Deleting the tensor to cleanup the memory
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

	// Optimizer function
	if (xpoints.length > 1) {
		let ys = tf.tensor1d(ypoints);
		optimizer.minimize(function(data) {
			return loss(predict(xpoints), ys);
		});
		ys.dispose(); // Deleting the tensor
	}

	// Plotting the points
	for (i = 0; i < xpoints.length; i++) {
		let x = denormalize(xpoints[i], 1);
		let y = denormalize(ypoints[i], 0);
		context.beginPath();
		context.arc(x, y, pointSize, 0, Math.PI * 2);
		context.fillStyle = pointColor;
		context.fill();
		context.closePath();
	}

	// Start and end positions of the required line
	let xline = [graphStart, graphEnd];

	// This function takes x1 and x2 values and then predicts a y-values
	// that best fits the given data points
	// Then we use (x1,y1) and (x2,y2) to draw the line between xline array values
	tf.tidy(function() {
		let ypred = predict(xline);
		let x1 = denormalize(xline[0], 1);
		let x2 = denormalize(xline[1], 1);
		let yline = ypred.dataSync();
		ypred.dispose(); // Deleting the tensor
		let y1 = denormalize(yline[0], 0);
		let y2 = denormalize(yline[1], 0);
		// Drawing
		drawLine(x1, y1, x2, y2);
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

// This function draws the line
function drawLine(x1, y1, x2, y2) {
	context.beginPath();
	context.moveTo(x1, y1);
	context.lineTo(x2, y2);
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
function normalize(value, coordinate) {
	if (coordinate) {
		return mapRange(value, 0, canvas.width, graphStart, graphEnd);
	} else {
		return mapRange(value, 0, canvas.height, graphEnd, graphStart);
	}
}
function mapRange(n, initpos, endpos, initmap, endmap) {
	return ((n - initpos) / (endpos - initpos)) * (endmap - initmap) + initmap;
}
function denormalize(value, coordinate) {
	if (coordinate) {
		return mapRange(value, graphStart, graphEnd, 0, canvas.width);
	} else {
		return mapRange(value, graphEnd, graphStart, 0, canvas.height);
	}
}

// This function visualizes the given data
draw();
