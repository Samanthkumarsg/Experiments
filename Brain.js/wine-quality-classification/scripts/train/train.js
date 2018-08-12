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

train()
	.then(async data => {
		fs.writeFile("model.json", JSON.stringify(net.toJSON()), function(err) {
			if (err) return console.log(err);
			console.log("The trained model is saved as model.json");
		});
	})
	.catch(err => console.log(err));
