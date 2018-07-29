## The XOR problem

The XOr, or “exclusive or”, problem is a classic problem in ANN research. It is the problem of using a neural network to predict the outputs of XOr logic gates given two binary inputs. An XOr function should return a true value if the two inputs are not equal and a false value if they are equal. XOr is a classification problem and one for which the expected outputs are known in advance. It is therefore appropriate to use a supervised learning approach.

### Getting the Code

```
git clone https://github.com/velansalis/TensorflowExperiments
cd TensorflowExperiments/XOR-Problem
npm install
```

Train the model by running `npm run train` And this will train the model. You can see the accuracy and loss in the console. After training the model will be saved inside `./model` folder in `.json` and `.bin folder.`
