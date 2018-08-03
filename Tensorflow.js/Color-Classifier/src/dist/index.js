let canvas = document.querySelector("canvas");
let context = canvas.getContext("2d");
canvas.height = 400;
canvas.width = 350;

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
	let config = {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			color: color[0],
			label: colorCollection.indexOf(label)
		})
	};
	fetch("/train", config)
		.then(res => {
			if (res.status == 200) drawRandomColor();
			console.log(res);
		})
		.catch(err => {
			console.log(err);
		});
}

async function selectColor(obj) {
	let selectedColor = obj.classList[1];
	await trainColor(presentColor, selectedColor);
}

function drawRandomColor() {
	let r = Math.ceil(Math.random() * 255);
	let g = Math.ceil(Math.random() * 255);
	let b = Math.ceil(Math.random() * 255);
	presentColor[0] = [r, g, b];
	context.fillStyle = `rgb(${r},${g},${b})`;
	context.fillRect(0, 0, canvas.width, canvas.height);
}

window.onload = drawRandomColor();
