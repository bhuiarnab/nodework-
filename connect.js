const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/TestDb',{useNewUrlParser:true});
var db = mongoose.connection;
db.on('error',console.error.bind(console,'Connection error !!'));
db.once('open',console.log.bind(console,'Database connected !!'));
db.on('disconnected',console.log.bind(console,'Database disconnected !!'));