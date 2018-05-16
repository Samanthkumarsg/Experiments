const mongoose = require('mongoose');
const Package = require('../models/package-model');

module.exports = {
    getAllPackages : (req, res, next) => {
        Package.find({})
        .select("_id name places duration")
        .lean()
        .exec()
        .then( docs => {
            if(docs.length == 0){
                res.status(200).json({
                    config : {
                        requestType : "GET",
                        url : req.headers.host+"/package",
                        statuscode : 200
                    },
                    response : "No packages found."
                })    
            }
            else{
                res.status(200).json({
                    config : {
                        requestType : "GET",
                        url : req.headers.host+"/package",
                        statuscode : 200,
                        count : docs.length
                    },
                    response : docs.map(
                        doc => {
                            return {
                                id : doc._id,
                                name : doc.name,
                                price : doc.price,
                                duration : doc.duration,
                                places : doc.places,
                                url : req.headers.host+"/package/"+doc._id
                            }
                        }
                    )
                })
            }
        })
        .catch( err => {
            if(err) {
                res.status(500).json({
                    requestType : "GET",
                    url : req.headers.host,
                    statuscode : 500,
                    message : "Internal server error."
                })
            }
        });
    },
    getPackageByID : (req, res, next) => {
        var packageId = req.params.id;
        Package.find({_id : packageId})
        .select("_id name places duration")
        .lean()
        .exec()
        .then( docs => {
            res.status(200).json({
                config : {
                    requestType : "GET",
                    url : req.headers.host+"/package",
                    statuscode : 200
                },
                response : docs.map(
                    doc => {
                        return {
                            id : doc._id,
                            name : doc.name,
                            price : doc.price,
                            duration : doc.duration,
                            places : doc.places,
                            url : req.headers.host+"/package/"+doc._id
                        }
                    }
                )
            })
        })
        .catch( err => {
            if(err) {
                res.status(404).json({
                    requestType : "GET",
                    url : req.headers.host,
                    statuscode : 404,
                    message : "Package not found",
                })
            }
        });
    },
    addPackage : (req, res, next) => {
        var data = {
            _id : new mongoose.Types.ObjectId,
            name : req.body.name,
            price : req.body.price,
            places: req.body.places,
            duration : {
                days : req.body.duration.days,
                nights : req.body.duration.nights
            }
        }
        var newPackage = new Package(data);
        newPackage.save()
        .then( docs => {
            res.status(200).json({
                config : {
                    statuscode : 200,
                    requestType : "POST",
                    url : req.headers.host + "/package",
                },
                response : {
                    createdDocument : docs
                }
            });
        })
        .catch( err => {
            res.status(500).json({
                statuscode : 500,
                message : "There was an error saving your document",
                host : req.headers.host,
                error : {
                    name : err.name,
                    message : err.message
                }
            })
        });
    },
    deletePackage : (req, res, next) => {
        res.status(200).json({
            message : "Got the request"
        });
    }
}