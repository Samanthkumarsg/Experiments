const net = require("./brain");
const data = require("./data");

async function train() {
	let stuffs = await data.convertData();
	for (i = 0; i < stuffs.length; i++) {
		let h = net.train(stuffs[i]);
		console.log(h);
	}
}

async function predict() {}

train()
	.then(data => console.log(data))
	.catch(err => console.log(err));
