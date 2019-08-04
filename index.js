require('dotenv').config();
require('./connect.js')
var cors = require('cors'); 
var hbs = require('hbs');
var testRouter = require('./Router/testRouter.js');
const express = require('express');
var app = express();
app.use(express.json());
app.use(cors());
app.options('*', cors());
app.set('view engine', 'html');
app.engine('html', hbs.__express);
hbs.registerPartials('./views/');
app.use(process.env.URL,testRouter);
let port = process.env.PORT ? process.env.PORT : 3000;
app.listen( port , () => console.log('Server is up on port ' + port));
/*  ERROR HANDLER */
app.use(function (err, req, res, next) {
    let e = JSON.stringify(err,undefined);

    res.status(err.status || 500)
      .json({
        "status": err.status || 500,
        "success": false,
        "error": JSON.parse(e).name + "  : " + JSON.parse(e).message
      })
      .end();
  });
  
  process.on('unhandledRejection', function (reason, p) {
    console.log("Possibly Unhandled Rejection at: Promise ", p, " reason: ", reason);
  });
