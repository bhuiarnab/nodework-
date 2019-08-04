var testModel = require('../Model/testModel.js');
var formidable = require('formidable');
var uploadFile = require('../Utility/uploadFile.js');
var exportExcel = require('../Utility/exportExcel.js');
var hbsUtility = require('../Utility/hbsUtility.js');
var { User } = require('../Model/userModel.js');
const path = require('path');
const fs = require('fs');
const pdf = require('html-pdf');
const jwt = require('jsonwebtoken');
var filepath = './TempExport/';
module.exports = {


    uploadFile : (req,res,next) => {

        var form = new formidable.IncomingForm();

        form.parse(req,async (err,fields,files) => {

            var file = files.file;
            var filepath = file.path;
            var filename = file.name;
            var filesize = file.size;
            var fileext = path.extname(filename);
            var filetype = file.type;
            var description = fields.description;
            req.body.filepath = filepath;
            req.body.filename = filename;
            await uploadFile.uploadFile(req,res);
          testModel.create({
              filename,filepath,filetype,filesize,fileext,description
          },async (error,doc) => {

            if(error) {
                await fs.unlinkSync(req.body.filepath);
                res.status(500).send({
                 status : 500,
                 success : false,
                 error : error
                });
            }else{
                res.send({
                    status : 200,
                    success : true,
                    message : 'File Uploaded Successfully !!',
                    InsertedId : doc._id
                });
            }

          });
        });
    },

    downloadFile : (req,res,next) => {

        var _id = req.params._id;
        testModel.findById(_id).then(async doc => {

        if(doc){

            var bytes = await fs.readFileSync(doc.filepath);
            res.setHeader('Content-Type', doc.filetype);
            res.setHeader('Content-Disposition', 'attachment; filename=' + doc.filename);
            res.write(bytes, 'binary');
            res.end();
            
        }else{
            res.send({
                status : 404,
                success : false,
                message : 'File Not Found !!'
            });
        }

        },err => {
            res.send({
                status : 500,
                success : false,
                error : err
            });
        });
    },

    exportExcel : async (req,res,next) => {

        var jsonArray = [{
            FirstName : 'Arnab',
            LastName : 'Bhui',
            Age : 26,
            Address : 'silkboard',
            BlooadGroup : 'O+',
        },{
            FirstName : 'Anirban',
            LastName : 'Bhui',
            Age : 25,
            Address : 'silkboard',
            BlooadGroup : 'O+',
        },{
            FirstName : 'Akshay',
            LastName : 'Maity',
            Age : 23,
            Address : 'silkboard',
            BlooadGroup : 'B+',
        }];

     await exportExcel.exportExcel(jsonArray,'Employee_Details');

     try{
        filepath += 'Employee_Details.xlsx';
        fs.lstatSync(filepath);
        setTimeout(async () => {
         let bytes = await fs.readFileSync(filepath);
         await fs.unlinkSync(filepath);
         res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
         res.setHeader('Content-Disposition', 'attachment; filename=' + 'Employee_Details.xlsx');
         res.write(bytes, 'binary');
         res.end();
        },2000);
     }catch(err) {
         next(err);
     }

    },

   exportPDF : async (req,res,next) => {
       await hbsUtility.parse();
        res.render('test.html', {
            GRNNo : 'GRN-10',
            GRNDate : '2019-08-02',
            VendorNo : 'VID-011',
            Remarks : 'GRN Report',
            PlantCode : 'Plant-11',
            Date : new Date().toISOString().replace(/T.*/g,'')
        } ,(err,data) =>{
            if(err) next(err);
            filepath += '/report.pdf';
            pdf.create(data).toFile(filepath,(err,val) =>{
                setTimeout(async () => {
                var bytes = await fs.readFileSync(filepath);
                await fs.unlinkSync(filepath);
                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', 'attachment; filename=' + 'report.pdf');
                res.write(bytes, 'binary');
                res.end();
                },2000);
            });
        })
},

signup : (req,res,next) => {

var user = new User(req.body);

user.save().then(async user => {
    return user.generateAuthToken();
}).then(token => {
res.header('x-auth',token).send(user);
}).catch(err => {
    res.status(500).send(err);
})
},

findByToken : (req,res,next) => {

    var token = req.header('x-auth');
    User.findByToken(token).then(user => {
        if(user)
        res.send(user);
        return Promise.reject();
    }).catch(err => {
        res.status(401).send(err);
    })
}

};
