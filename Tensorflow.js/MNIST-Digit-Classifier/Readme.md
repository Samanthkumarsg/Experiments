## MNIST Digit classification

The **[MNIST database](http://yann.lecun.com/exdb/mnist/)** of handwritten digits, available from this page, has a training set of 60,000 examples, and a test set of 10,000 examples. It is a subset of a larger set available from NIST. The digits have been size-normalized and centered in a fixed-size image. It is a database for people who want to try learning techniques and pattern recognition methods on real-world data while spending minimal efforts on preprocessing and formatting with machine learning. Here, it's my attempt to approach this problem with Tensorflow.js library with simple and minimal and understandable code.<br>

(_The font end UI code is taken from this amazing [pen](https://codepen.io/arguiot/pen/xPYRKZ?editors=1000) from codepen.io by Arthur Guiot. It is basically coded to work with brain.js. so a few optimisations and extra code is written to make it work with tensorflow.js_)

### Getting the code

First clone or download the repository to your local machine and install all the dependencies by running the following code.

```
git clone https://github.com/velansalis/xp_Tensorflow
cd xp_Tensorflow/Tensorflow.js/MNIST-Digit-Classifier
npm install
```

Download the Dataset from [this webisite](http://yann.lecun.com/exdb/mnist/), create a folder in the root named `./data` and then place the downloaded content ( training and testing dataset and labels ) in that directory. Then train the data by running

```
npm run train
```

This will train the model taking the image dimentions from data folder. You can see the loss and accuracy of the training model in the console. Affter training it will create the folder `model` and save the trained model as `.bin` and `.json` file in that folder. And then run the mnist digit recognizer by runnning

```
npm run serve
```

The output will be visible in the port 3000. Go to the browser, hit the address http://localhost:3000 and see this in action.
