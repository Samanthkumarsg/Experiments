const mongoose = require('mongoose');
const Order = require('../models/order-model');

module.exports = {
    getAllOrders : (req, res, next) => {
        Order.find({})
        .lean()
        .populate('orderedUser orderedPack')
        .exec()
        .then( docs => {
            if(docs.length == 0){
                res.status(200).json({
                    config : {
                        requestType : "GET",
                        url : req.headers.host+"/orders",
                        statuscode : 200
                    },
                    response : {
                        message : "No Orders found."
                    }
                })    
            }
            else{
                res.status(200).json({
                    config : {
                        requestType : "GET",
                        url : req.headers.host+"/orders",
                        statuscode : 200,
                        count : docs.length
                    },
                    response : docs.map(
                        doc => {
                            return {
                                id : doc._id,
                                orderedUser : doc.orderedUser,
                                orderedPackage : doc.orderedPack,
                                url : req.headers.host+"/orders/"+doc._id
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
                    url : req.headers.host + '/orders',
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
    getOrderByID : (req, res, next) => {
        var orderID = req.params.id;
        Order.find({_id : orderID})
        .populate("orderedUser orderedPack")
        .exec()
        .then( docs => {
            if(docs.length == 0){
                res.status(200).json({
                    config : {
                        requestType : "GET",
                        url : req.headers.host+"/orders/"+orderID,
                        statuscode : 200
                    },
                    response : "There was no matching ID"
                });    
            }
            else{
                res.status(200).json({
                    config : {
                        requestType : "GET",
                        url : req.headers.host+"/orders",
                        statuscode : 200
                    },
                    response : docs.map(
                        doc => {
                            return {
                                id : doc._id,
                                orderedUser : doc.orderedUser,
                                orderedPackage : doc.orderedPack,
                                url : req.headers.host+"/orders/"+doc._id
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
    addOrder : (req, res, next) => {
        var data = {
            _id : new mongoose.Types.ObjectId,
            orderedUser : mongoose.Types.ObjectId(req.body.orderedUser),
            orderedPack : mongoose.Types.ObjectId(req.body.orderedPack)
        }
        var newOrder = new Order(data);
        newOrder.save()
        .then( docs => {
            res.status(200).json({
                config : {
                    requestType : "POST",
                    url : req.headers.host + "/orders",
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
                url : req.headers.host + "/orders",
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
    deleteOrder : (req, res, next) => {
        var orderID = req.params.id;
        Order.remove({ _id : orderID })
        .exec()
        .then( docs => {
            res.status(200).json({
                config : {
                    requestType : "DELETE",
                    url : req.headers.host+"/orders",
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
                    requestType : "DELETE",
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
    updateOrder : (req, res, next) => {
        id = req.params.id;
        let updateInfo = {};
        for( docs of req.body ){
            updateInfo[docs.propName] = mongoose.Types.ObjectId(docs.propValue)
        }
        console.log(updateInfo);
        Order.update({ _id : id }, { $set : updateInfo })
        .exec()
        .then( docs => {
            res.status(200).json({
                config : {
                    requestType : "PATCH",
                    url : req.headers.host+"/orders/"+id,
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
                url : req.headers.host + "/orders",
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