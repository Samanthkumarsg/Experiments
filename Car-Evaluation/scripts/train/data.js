const fs = require("fs");
const path = require("path");

let file = fs.readFileSync(path.resolve("./data/car-data.csv"), "utf8");
let sliced = file.split("\n");
console.log(sliced);

module.exports = [];
