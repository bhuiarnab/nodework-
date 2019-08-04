var mongoose = require('mongoose');

var schema = new mongoose.Schema({

    filepath : {
        type : String,
        required : [true,'filepath required']
    },
    filename :{
        type : String,
        required : [true,'filename required']
    },
    fileext : {
        type : String,
        required:[true,'fileext required']
    },
    filesize : {
        type : Number ,
        required : [true,'filesize required']
    },
    filetype : {
        type : String,
        required : [true,'filetype required']
    },
    description : {
        type : String,
        required : [true,'description required']
    }
},{versionKey:false});

module.exports = mongoose.model('upload',schema,'upload');