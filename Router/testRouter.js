var router = require('express').Router();
var testController = require('../Controller/testController.js');
router.post('/upload/file',testController.uploadFile);
router.get('/download/file/:_id',testController.downloadFile);
router.get('/excel/export',testController.exportExcel);
router.get('/export/pdf',testController.exportPDF);
router.post('/signup',testController.signup);
router.get('/user/me',testController.findByToken);
module.exports  = router; 

