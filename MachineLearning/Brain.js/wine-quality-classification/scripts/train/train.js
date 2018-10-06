const net = require("./brain");
const data = require("./data");
const fs = require("fs");

async function train() {
	let stuffs = await data.convertData();
	for (i = 0; i < stuffs.length; i++) {
		await net.train(stuffs[i], {
			iterations: 5000,
			log: true
		});
	}
}

train()
	.then(async data => {
		fs.writeFile("model.json", JSON.stringify(net.toJSON()), function(err) {
			if (err) return console.log(err);
			console.log("The trained model is saved as model.json");
		});
	})
	.catch(err => console.log(err));
