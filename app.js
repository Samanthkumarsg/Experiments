const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const app = express();

mongoose.connect('mongodb://localhost:27017/toursapp').then(
    () => {
        console.log('Successfully Connected to the Database');
    },
    err => {
        console.log('There was an Error Connecting' + err);
    }
);

const orders = require('./routes/orders');
const packages = require('./routes/packages');
const users = require('./routes/users');;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/order", orders);
app.use("/package", packages);
app.use("/user", users);

module.exports = app;