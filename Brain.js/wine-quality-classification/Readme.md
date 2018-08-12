## Wine Quality (classification)

This datasets is related to red variants of the Portuguese "Vinho Verde" wine. For more details, consult the reference [Cortez et al., 2009]. Due to privacy and logistic issues, only physicochemical (inputs) and sensory (the output) variables are available (e.g. there is no data about grape types, wine brand, wine selling price, etc.) The datasets can be viewed as classification or regression tasks. The classes are ordered and not balanced (e.g. there are much more normal wines than excellent or poor ones).

### Getting the code

First clone or download the repository to your local machine and install all the dependencies by running the following code.

```
git clone https://github.com/velansalis/xp_MachineLearning
cd xp_MachineLearning/brain.js/wine-quality-classification
npm install
```

Download the Dataset from [this webisite](https://www.kaggle.com/uciml/red-wine-quality-cortez-et-al-2009), create a folder in the root named `./data` and then place the downloaded content ( .csv file ) in that directory. Then train the data by running

```
npm run train
```

This will train the model taking the values from the .csv file. You can see the loss and accuracy of the training model in the console. Affter training it will create the folder `model.json` and save the trained model json file.
