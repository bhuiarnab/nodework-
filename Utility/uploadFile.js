const fs = require('fs');
const path = require('path');
const uuid = require('uuidv4');
module.exports = {

    uploadFile : async (req,res) => {

        var filepath = process.env.UPLOAD_PATH+'/';
        try{
            fs.lstatSync(filepath);
        }catch(err){
            fs.mkdirSync(filepath);
        }

        var bytes = await fs.readFileSync(req.body.filepath);
        req.body.filepath = filepath+uuid()+path.extname(req.body.filename);
        await fs.writeFileSync(req.body.filepath,bytes);

    }

};