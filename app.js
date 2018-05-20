const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const app = express();

//Connecting to the database
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
const users = require('./routes/users');
const logs = require('./routes/logs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes to Controllers
app.use("/orders", orders);
app.use("/packages", packages);
app.use("/users", users);
app.use("/logs", logs);

//Error handling
app.use("/", (req, res, next) => {
    res.status(404).json({
        error : {
            status : 404,
            message : "Route not authorized"
        }
    })
})

module.exports = app;