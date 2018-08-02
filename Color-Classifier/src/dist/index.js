colorCollection = {};
let canvas = document.querySelector("canvas");
let context = canvas.getContext("2d");
canvas.height = 400;
canvas.width = 350;

let presentColor;
let container = [];

function putColor(color) {
	let r = Math.floor(Math.random() * 255);
	let g = Math.floor(Math.random() * 255);
	let b = Math.floor(Math.random() * 255);
	presentColor = `rgb(${r},${g},${b})`;
	container.push({
		color: [r, g, b],
		label: color
	});
	context.fillStyle = presentColor;
	context.fillRect(0, 0, canvas.width, canvas.height);
}

function addColor(obj) {
	let selectedColor = obj.classList[1];
	console.log(presentColor + " - " + selectedColor);
	putColor(selectedColor);
}

function train() {
	console.log(container);
}
