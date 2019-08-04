
var Excel = require('exceljs');
var fs = require('fs');
module.exports = {
    exportExcel : (jsonArray,title) => {

        var filepath = './TempExport/';
     
            try {
                var stat = fs.lstatSync(filepath);
                if (stat.isDirectory());   // Check if Folder Exist or not , Otherwise Add folder 
                else {
                  fs.mkdirSync(filepath);
                }
              } catch (err) {
                fs.mkdirSync(filepath);
              }
    var keys =  Object.keys(jsonArray[0]);        

    var workbook = new Excel.Workbook();
    workbook.creator = 'Arnab';
    var worksheet =  workbook.addWorksheet(title.replace(/_/g,' '), {
      pageSetup:{paperSize: 9, orientation:'landscape'}
    });
  
    

    worksheet.pageSetup.margins = {
      left: 0.7, right: 0.7,
      top: 0.75, bottom: 0.75,
      header: 0.3, footer: 0.3
    };

worksheet.getRow(1).font =  { color: { argb: 'FFFFF000' } }
worksheet.getRow(2).font = { color: { argb: 'FFFFF000' } }
worksheet.getRow(3).font = { color: { argb: 'FFFFF000' } }
worksheet.getRow(4).font = { color: { argb: 'FFFFF000' } }
worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' }
worksheet.getRow(2).alignment = { vertical: 'middle', horizontal: 'center' }
worksheet.getRow(3).alignment = { vertical: 'middle', horizontal: 'center' }
worksheet.getRow(4).alignment = { vertical: 'middle', horizontal: 'center' }

worksheet.mergeCells('A1', 'B4')
worksheet.getCell('B4').border = {
  top: {style:'double', color: {argb:'000000'}},
  left: {style:'double', color: {argb:'000000'}},
  bottom: {style:'double', color: {argb:'000000'}},
  right: {style:'double', color: {argb:'000000'}}
};
var imageId = workbook.addImage({
  filename: './Utility/prem.PNG',
  extension: 'PNG',
});

worksheet.addImage(imageId, 'A1:B4');
let cell = String.fromCharCode(64+keys.length)+'4';
worksheet.mergeCells('C1', cell);


worksheet.getRow(5).values = keys;
worksheet.getRow(5).font = {color: {argb: "000000"}};
worksheet.getRow(5).alignment = { vertical: 'middle', horizontal: 'center' };

var columns = [];
let t=1;
keys.map(ele => {

  worksheet.getRow(5).getCell(t++).fill = {
    type: 'pattern',
    pattern:'solid',
    fgColor:{argb:'00359ECB'},
    border : true
  };

   let obj =  { header: ele, key: ele, width: 15+ele.length , style: { border : {
        top: {style:'thin'},
        left: {style:'thin'},
        bottom: {style:'thin'},
        right: {style:'thin'}
    }, 
    alignment : { vertical: 'middle', horizontal: 'center' }
    , color: {argb: "00359ECB"}
    } 
  }
  columns.push(obj);

});

worksheet.columns = columns

for(let i = 0 ; i < jsonArray.length ; i++){
worksheet.addRow(jsonArray[i]);
}

worksheet.getCell(cell).fill = {
    type: 'pattern',
    pattern:'solid',
    fgColor:{argb:'0F0F0FF'},
    border : true
  };
worksheet.getCell(cell).alignment = { vertical: 'middle', horizontal: 'left'};
worksheet.getCell(cell).font = { bold : true,size:26,color:{argb:'0000FF'}};
worksheet.getCell(cell).border = {
  top: {style:'double', color: {argb:'0000FF'}},
  left: {style:'double', color: {argb:'0000FF'}},
  bottom: {style:'thin', color: {argb:'0000FF'}},
  right: {style:'double', color: {argb:'0000FF'}}
};
worksheet.getCell(cell).value = '    '+title.replace(/_/g,' ');
workbook.xlsx.writeFile(filepath+title+'.xlsx');

 }
   
}