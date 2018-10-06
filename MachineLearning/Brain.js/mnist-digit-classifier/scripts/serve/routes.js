const path = require("path");
const fs = require("fs");
const net = require("../train/brain");
const model = JSON.parse(fs.readFileSync("model.json", "utf8"));

module.exports = {
	home: (req, res, next) => {
		res.render("src/index");
	},
	predict: async (req, res, next) => {
		let loadedData = req.body;
		net.fromJSON(model);
		let result = net.run(loadedData);
		res.status(200).json({
			results: result
		});
	}
};
