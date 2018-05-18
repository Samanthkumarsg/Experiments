const mongoose = require('mongoose');
const User = require('../models/user-model');

module.exports = {
    registerUser : (req, res, next) => {
        res.send("Touched Register");
    },
    getAllUsers : (req, res, next) => {
        res.send("Touched Getall");
    },
    loginUser : (req, res, next) => {
        var id = req.params.id;
        res.send("Touched Get Single "+id);
    }
}