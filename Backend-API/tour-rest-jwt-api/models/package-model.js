const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Package = new Schema({
    _id : { type : mongoose.Schema.Types.ObjectId, required : true },
    name : { type : String, required : true },
    description : { type : String, required : true },
    price : { type : Number, required : true },
    places : [{ type : String, required : true }],
    duration : { 
        days : { type : Number, required : true },
        nights : { type : Number, required : true }
    }
});

module.exports = mongoose.model("Package", Package);