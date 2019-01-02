const mongoose = require('mongoose');
const Logs = require('../models/log-model');

module.exports = {
    getAllLogs : (req, res, next) => {
        Logs.find({})
        .lean()
        .exec()
        .then( docs => {
            if(docs.length == 0){
                res.status(200).json({
                    config : {
                        requestType : "GET",
                        url : req.headers.host+"/logs",
                        statuscode : 200
                    },
                    response : {
                        message : "No Logs found."
                    }
                })    
            }
            else{
                res.status(200).json({
                    config : {
                        requestType : "GET",
                        url : req.headers.host+"/logs",
                        statuscode : 200,
                        count : docs.length
                    },
                    response : docs
                })
            }
        })
        .catch( err => {
            if(err) {
                res.status(500).json({
                    requestType : "GET",
                    url : req.headers.host + '/logs',
                    statuscode : 500,
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
    getLogsByUsername : (req, res, next) => {
        var username = req.params.username;
        Logs.find({ username : username })
        .lean()
        .exec()
        .then( docs => {
            if(docs.length == 0){
                res.status(200).json({
                    config : {
                        requestType : "GET",
                        url : req.headers.host+"/logs",
                        statuscode : 200
                    },
                    response : {
                        message : "No Logs found."
                    }
                })    
            }
            else{
                res.status(200).json({
                    config : {
                        requestType : "GET",
                        url : req.headers.host+"/logs",
                        statuscode : 200,
                        count : docs.length
                    },
                    response : docs
                })
            }
        })
        .catch( err => {
            if(err) {
                res.status(500).json({
                    requestType : "GET",
                    url : req.headers.host + '/logs',
                    statuscode : 500,
                    error : {
                        name : err.name,
                        message : err.message,
                        key : err.path,
                        value : err.value
                    }
                })
            }
        });
    }
}