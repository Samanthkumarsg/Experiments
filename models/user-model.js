const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    _id : { type : mongoose.Schema.Types.ObjectId, required : true },
    fname : { type : String, required : true },
    lname : { type : String, required : true },
    username : { unique : true, type : String, required : true, minlength : [8, 'Username Should be minimum 8 Characters long'], maxlength : [16, 'Username can be maximum of 16 characters'] },
    password : { type : String, required : true }
});

module.exports = mongoose.model("User", User);