// Importing Model
let model = require("./model").model;
let tf = require("./model").tf;

// Getting the training and testing data
let data = require("./mnist");

let trainingSet = data.values.trainSet;
let testingSet = data.values.testSet;
let trainBatchSize = 60;
let testBatchSize = 100;
let trainIterations = 700;
let testIterations = 50;

const train = async function() {
	let generalMetrics,
		testXtensor,
		testYtensor,
		trainXtensor,
		trainYtensor,
		trainBatch,
		testBatch,
		validator;
	for (let i = 0, j = 0; i < trainIterations; i++) {
		trainBatch = data.getBatch(trainingSet, i, trainBatchSize);
		trainYtensor = tf
			.tensor1d(trainBatch.y)
			.reshape([trainBatchSize, 28, 28, 1]);
		trainXtensor = tf.oneHot(trainBatch.x, 10);
		console.log(`Imported Training Batch - ${i}`);
		if (i % testIterations === 0) {
			if (j > 0) {
				testXtensor.dispose();
				testYtensor.dispose();
			}
			testBatch = data.getBatch(testingSet, j, testBatchSize);
			testXtensor = tf.oneHot(testBatch.x, 10);
			testYtensor = tf
				.tensor1d(testBatch.y)
				.reshape([testBatchSize, 28, 28, 1]);
			console.log(
				`-------------------------------------------------------`
			);
			validator = [testYtensor, testXtensor];
			j++;
		}
		const history = await model.fit(trainYtensor, trainXtensor, {
			batchSize: trainBatchSize,
			validationData: validator,
			epochs: 1
		});
		let metrics = history.history;
		if (i == trainIterations - 1) generalMetrics = metrics;
		console.log(
			`Loss - ${metrics.loss[0] * 100}% , Accuracy - ${metrics.acc[0] *
				100}%, Tensors - ${tf.memory().numTensors}`
		);
		trainXtensor.dispose();
		trainYtensor.dispose();
	}
	return {
		metrics: generalMetrics,
		model: model,
		memory: tf.memory()
	};
};

train()
	.then(async data => {
		let saved = await data.model.save(
			"file://" + __dirname + "/../../model"
		);
		console.log("------------------------------------------------");
		console.log("Training Done");
		console.log("------------------------------------------------");
		console.log(
			`Number of tensors - ${data.memory.numTensors}\nLoss - ${data
				.metrics.loss[0] * 100}\nAccuracy - ${data.metrics.acc[0] *
				100}\nModel Informations - \n`
		);
		console.log(saved.modelArtifactsInfo);
		console.log(
			"Model is saved to the location file://" +
				__dirname +
				"/../../model/"
		);
		console.log("\n------------------------------------------------");
	})
	.catch();
