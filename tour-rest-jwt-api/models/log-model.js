const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Log = new Schema({
    _id : { type : mongoose.Schema.Types.ObjectId, required : true },
    requestType : { type : String, required : true },
    requestURL : { type : String, required : true },
    requestBody : { type : Object },
    requestParams : { type : Object },
    token : { type : String, required : true },
    tokenExpiry : { type : String, required : true },
    username : { type : String, required : true }
},
{
    timestamps : {
        createdAt : "requestMade"
    }
});

module.exports = mongoose.model("Log", Log);