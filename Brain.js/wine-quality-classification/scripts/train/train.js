const net = require("./brain");
const data = require("./data");

async function train() {
	let stuffs = await data.convertData();
	for (i = 0; i < stuffs.length; i++) {
		console.log(stuffs[i]);
		net.train(stuffs[i], {
			iterations: 500,
			errorThresh: 0.5,
			log: true
		});
	}
}

async function predict() {}

train()
	.then(async data => {
		console.log(data);
		let obj = [7.8, 0.58, 0.02, 2.0, 0.073, 9.0, 18.0, 0.9968, 3.36, 0.57, 9.5];
		let ys = [];
		obj.forEach(val => {
			ys.push(val / 100);
		});
		console.log(ys);
		let prediction = await net.run(ys);
		let el = prediction.indexOf(Math.max.apply(null, prediction));
		console.log(el);
	})
	.catch(err => console.log(err));
