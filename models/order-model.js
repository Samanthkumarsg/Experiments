const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = new Schema({
    _id : { type : mongoose.Schema.Types.ObjectId, required : true },
    orderedUser : { type : mongoose.Schema.Types.ObjectId, ref : 'User' },
    orderedPack : { type : mongoose.Schema.Types.ObjectId, ref : 'Package' },
    schemaCreatedDate : { type : Date, default : Date.now()},
},
{
    timestamps : {
        createdAt : "orderCreated",
        updatedAt : "orderLastUpdated"
    }
});

module.exports = mongoose.model("Order", Order);