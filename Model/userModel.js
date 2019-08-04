var mongoose = require('mongoose');
var validator = require('validator');
const jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
email :{
    type : String,
    required : [true,'email required'],
    trim : true,
    unique : true,
    validate : {
        validator : validator.isEmail,
        message : `{VALUE} is not a valid email`
    }
},
password : {
    type : String,
    required : [true,'password required'],
    minlength : 6
},
tokens : [{
access :{
    type : String,
    required : true
},
token : {
    type : String,
    required : true
}
}]
},{versionKey:false});

userSchema.methods.generateAuthToken = function() {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id : user._id.toHexString(),access},process.env.jwt_key).toString();
    user.tokens.push({access,token});
    return user.save().then(() =>{
    return token;
    });
    }

userSchema.methods.toJSON = function() {

var user = this;
var userObject = user.toObject();
return {
    _id : userObject._id,
    email : userObject.email
};
}

userSchema.statics.findByToken = function(token) {

    var decode ;
    try{
     decode = jwt.verify(token,process.env.jwt_key);
    }catch(e){

    }
    return this.findOne({
    '_id' : decode._id,
    'tokens.token' : token,
    'tokens.access' : 'auth'
    });

}

var User = mongoose.model('user',userSchema,'user');
module.exports = {
    User
}