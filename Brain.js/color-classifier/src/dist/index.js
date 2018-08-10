let canvas = document.querySelector("canvas");
let context = canvas.getContext("2d");
canvas.height = 400;
canvas.width = 350;
let selection = 0;

let presentColor = [];
colorCollection = [
	"purple",
	"pink",
	"blue",
	"green",
	"yellow",
	"orange",
	"red",
	"grey",
	"brown",
	"white"
];

async function trainColor(color, label) {
	let col = [];
	color[0].forEach(element => {
		col.push(element / 255);
	});
	let config = {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			color: col,
			label: colorCollection.indexOf(label)
		})
	};
	fetch("/train", config)
		.then(res => {
			res.json().then(_v => {
				document.querySelector(".loss").innerHTML = `Loss : ${
					_v.history.loss[0]
				}`;
				document.querySelector(".accuracy").innerHTML = `Accuracy : ${
					_v.history.acc[0]
				}`;
			});
			drawRandomColor();
		})
		.catch(err => {
			console.log(err);
		});
}

function predictColor(cols) {
	let col = [];
	cols[0].forEach(element => {
		col.push(element / 255);
	});
	let config = {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			color: col
		})
	};
	fetch("/predict", config)
		.then(res => {
			res.json().then(_v => {
				console.log(_v);
			});
		})
		.catch(err => {
			console.log(err);
		});
}

async function selectColor(obj) {
	let selectedColor = obj.classList[1];
	selection++;
	document.querySelector(
		".selection"
	).innerHTML = `Selections Made - ${selection}`;
	await trainColor(presentColor, selectedColor);
}

function drawRandomColor() {
	let r = Math.ceil(Math.random() * 255);
	let g = Math.ceil(Math.random() * 255);
	let b = Math.ceil(Math.random() * 255);
	presentColor[0] = [r, g, b];
	context.fillStyle = `rgb(${r},${g},${b})`;
	context.fillRect(0, 0, canvas.width, canvas.height);
	predictColor(presentColor);
}

window.onload = drawRandomColor();
