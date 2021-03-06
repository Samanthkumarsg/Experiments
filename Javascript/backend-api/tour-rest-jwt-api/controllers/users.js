const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
                            message : 'records saved'
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
                            token : response == true?jwt.sign({data: username}, 'myPrivateKey', { expiresIn: '1h' }):null,
                            docs : doc.map( doc => {
                                return {
                                    id : doc._id,
                                    username : doc.username
                                }
                            })
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
    },
    deleteUser : (req, res, next) => {
        var username = req.params.username;
        User.remove({ username : username })
        .exec()
        .then( docs => {
            res.status(200).json({
                config : {
                    requestType : "DELETE",
                    url : req.headers.host+"/users",
                    statuscode : 200
                },
                response : {
                    status : docs.ok==1?"Query successfully executed":"There was an Error executing the query!",
                    count : docs.n==0?"No matching username to remove":docs.n
                }
            })
        })
        .catch( err => {
            if(err) {
                res.status(404).json({
                    requestType : "DELETE",
                    url : req.headers.host + '/users',
                    statuscode : 404,
                    error : {
                        name : err.name,
                        message : err.message,
                        key : err.path,
                        value : err.value
                    }
                })
            }
        });
    },
    updateUser : (req, res, next) => {
        let username = req.params.username;
        let updateInfo = {};
        if(req.body[0].propName == "password"){
            bcrypt.hash( req.body[0].propValue, 10, (err, hash) => {
                if(err) {
                    console.log("There was an error!")
                }
                updateInfo['password'] = hash;
                User.update({ username : username }, { $set : updateInfo })
                .exec()
                .then( docs => {
                    res.status(200).json({
                        config : {
                            requestType : "PATCH",
                            url : req.headers.host+"/users/"+username,
                            statuscode : 200
                        },
                        response : {
                            status : docs.ok==1?"Query successfully executed":"There was an Error executing the query!",
                            modifiedDocumentCount : docs.n,
                        }
                    })
                })
                .catch( err => {
                    res.status(500).json({
                        requestType : "PATCH",
                        url : req.headers.host + "/users/"+username,
                        statuscode : 200,
                        error : {
                            name : err.name,
                            message : err.message,
                            key : err.path,
                            value : err.value
                        }
                    })
                });
            });
        }
        else{
            for( docs of req.body ){
                updateInfo[docs.propName] = docs.propValue;
                console.log(updateInfo, "Not PW");
            }
            User.update({ username : username }, { $set : updateInfo })
            .exec()
            .then( docs => {
                res.status(200).json({
                    config : {
                        requestType : "PATCH",
                        url : req.headers.host+"/users/"+username,
                        statuscode : 200
                    },
                    response : {
                        status : docs.ok==1?"Query successfully executed":"There was an Error executing the query!",
                        modifiedDocumentCount : docs.n,
                    }
                })
            })
            .catch( err => {
                res.status(500).json({
                    requestType : "PATCH",
                    url : req.headers.host + "/users/"+username,
                    statuscode : 200,
                    error : {
                        name : err.name,
                        message : err.message,
                        key : err.path,
                        value : err.value
                    }
                })
            });
        }
    }
};