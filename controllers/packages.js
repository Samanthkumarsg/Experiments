const mongoose = require('mongoose');
const Package = require('../models/package-model');

module.exports = {
    getAllPackages : (req, res, next) => {
        Package.find({})
        .select("_id name places description duration price")
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
                                description : doc.description,
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
                    url : req.headers.host + '/packages',
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
    getPackageByID : (req, res, next) => {
        var packageId = req.params.id;
        Package.find({_id : packageId})
        .select("_id name places description duration price")
        .lean()
        .exec()
        .then( docs => {
            if(docs.length == 0){
                res.status(200).json({
                    config : {
                        requestType : "GET",
                        url : req.headers.host+"/package/"+packageId,
                        statuscode : 200
                    },
                    response : "There was no matching ID"
                });    
            }
            else{
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
                                description : doc.description,
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
                res.status(404).json({
                    requestType : "GET",
                    url : req.headers.host,
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
    addPackage : (req, res, next) => {
        var data = {
            _id : new mongoose.Types.ObjectId,
            name : req.body.name,
            description : req.body.description,
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
                    requestType : "POST",
                    url : req.headers.host + "/package",
                    statuscode : 200
                },
                response : {
                    createdDocument : docs
                }
            });
        })
        .catch( err => {
            res.status(500).json({
                requestType : "POST",
                url : req.headers.host + "/package",
                statuscode : 200,
                error : {
                    name : err.name,
                    message : err.message,
                    key : err.path,
                    value : err.value
                }
            })
        });
    },
    deletePackage : (req, res, next) => {
        var packageId = req.params.id;
        Package.remove({ _id : packageId })
        .exec()
        .then( docs => {
            res.status(200).json({
                config : {
                    requestType : "GET",
                    url : req.headers.host+"/package",
                    statuscode : 200
                },
                response : {
                    status : docs.ok==1?"Query successfully executed":"There was an Error executing the query!",
                    count : docs.n==0?"No matching ID to remove":docs.n
                }
            })
        })
        .catch( err => {
            if(err) {
                res.status(404).json({
                    requestType : "GET",
                    url : req.headers.host,
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
    updatePackage : (req, res, next) => {
        id = req.params.id;
        let updateInfo = {};
        for( docs of req.body ){
            updateInfo[docs.propName] = docs.propValue
        }
        Package.update({ _id : id }, { $set : updateInfo })
        .exec()
        .then( docs => {
            res.status(200).json({
                config : {
                    requestType : "PATCH",
                    url : req.headers.host+"/package/"+id,
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
                url : req.headers.host + "/package",
                statuscode : 200,
                error : {
                    name : err.name,
                    message : err.message,
                    key : err.path,
                    value : err.value
                }
            })
        });
    },
    updatePackageMany : (req, res, next) => {
        id = req.params.id;
        let updateInfo = req.body;
        Package.update({ _id : id }, { $set : updateInfo })
        .exec()
        .then( docs => {
            res.status(200).json({
                config : {
                    requestType : "PUT",
                    url : req.headers.host+"/package/"+id,
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
                requestType : "PUT",
                url : req.headers.host + "/package",
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