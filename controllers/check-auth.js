const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const Log = require('../models/log-model');

module.exports = {
    checkAuthentication : (req, res, next) => {
        if(req.headers.token){
            var token = req.headers.token.split(" ")[1];
            var decoded = jwt.verify(token, 'myPrivateKey');
            var log = new Log({
                _id : new mongoose.Types.ObjectId,
                requestType : req.method,
                requestURL : req.headers.host + req.baseUrl + "/",
                requestBody : req.body,
                requestParams : req.params,
                token : token
            })
            log.save();
            next();
        }
        else{
            res.status(500).json({
                config : {
                    requestType : "POST",
                    url : req.headers.host,
                    statuscode : 500,
                },
                response : {
                    type : "error",
                    name : "Authentication Error",
                    message : "Token doesn't match"
                }
            })
        }
    }
}