const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user-model');

module.exports = {
    getAllUsers : (req, res, next) => {
        User.find()
        .select("fname lname username password")
        .exec()
        .then( docs => {
            if(docs.length == 0){
                res.status(200).json({
                    config : {
                        requestType : "GET",
                        statuscode : 200,
                        url : req.headers.host + "/users",
                        count : docs.length
                    },
                    response : {
                        type : 'success',
                        message : 'There were no users found!'
                    }
                })    
            }
            else{
                res.status(200).json({
                    config : {
                        requestType : "GET",
                        statuscode : 200,
                        url : req.headers.host + "/users",
                        count : docs.length
                    },
                    response : {
                        type : 'success',
                        message : 'records Found',
                        docs : docs
                    }
                })
            }
        })
        .catch( err => {
            res.status(500).json({
                config : {
                    requestType : "GET",
                    url : req.headers.host + '/users',
                    statuscode : 500,
                },
                response : {
                    type : "error",
                    name : err.name,
                    message : err.message,
                    key : err.path,
                    value : err.value
                }
            })
        })
    },
    registerUser : (req, res, next) => {
        console.log(req.body);
        var data;
        bcrypt.hash( req.body.password, 10, (err, hash) => {
            if(err) {
                return res.status(500).json({
                    config : {
                        requestType : "POST",
                        statuscode : 500,
                        url : req.headers.host + "/users/register"
                    },
                    response : {
                        type : "error",
                        name : err.name,
                        message : err.message,
                        key : err.path,
                        value : err.value
                    }
                })
            }
            else{
                var userProfile = new User({
                    _id : new mongoose.Types.ObjectId,
                    fname : req.body.fname,
                    lname : req.body.lname,
                    username : req.body.username,
                    password : hash
                });
                console.log(userProfile);
                userProfile.save()
                .then( response => {
                    res.status(200).json({
                        config : {
                            requestType : "GET",
                            statuscode : 200,
                            url : req.headers.host + "/users",
                            count : response.length
                        },
                        response : {
                            type : 'success',
                            message : 'records saved',
                            docs : response
                        }
                    })
                })
                .catch( err => {
                    res.status(500).json({
                        config : {
                            requestType : "POST",
                            statuscode : 500,
                            url : req.headers.host + "/users/register"
                        },
                        response : {
                            type : "error",
                            name : err.name,
                            message : err.message,
                            key : err.path,
                            value : err.value
                        }
                    })
                })
            }
        })
    },
    getSingleUser : (req, res, next) => {
        var username = req.params.username;
        User.find({username : username })
        .select("fname lname username password")
        .exec()
        .then( docs => {
            res.status(200).json({
                config : {
                    requestType : "GET",
                    statuscode : 200,
                    url : req.headers.host + "/users"
                },
                response : {
                    type : 'success',
                    message : 'record Found',
                    docs : docs
                }
            })
        })
        .catch( err => {
            res.status(500).json({
                config : {
                    requestType : "GET",
                    url : req.headers.host + '/users',
                    statuscode : 500,
                },
                response : {
                    type : "error",
                    name : err.name,
                    message : err.message,
                    key : err.path,
                    value : err.value
                }
            })
        })
    },
    loginUser : (req, res, next) => {
        username = req.body.username;
        password = req.body.password;
        User.find({username : username })
        .exec()
        .then( doc => {
            console.log(doc);
            bcrypt.compare(password, doc[0].password, function(err, response) {
                if(err) {
                    return res.status(500).json({
                        config : {
                            requestType : "POST",
                            url : req.headers.host + '/users/login',
                            statuscode : 500,
                        },
                        response : {
                            type : "error",
                            name : err.name,
                            message : err.message,
                            key : err.path,
                            value : err.value
                        }
                    })
                }
                else{
                    res.status(200).json({
                        config : {
                            requestType : "GET",
                            statuscode : 200,
                            url : req.headers.host + "/users"
                        },
                        response : {
                            type : 'success',
                            message : response == true?'Login Success':'Passwords do not match',
                            docs : doc
                        }
                    })
                }
            });
        })
        .catch( err => {
            res.status(500).json({
                config : {
                    requestType : "POST",
                    url : req.headers.host + '/users/login',
                    statuscode : 500,
                },
                response : {
                    type : "error",
                    name : err.name,
                    message : "There is no username registered with this account",
                    key : err.path,
                    value : err.value
                }
            })
        })
    }
}