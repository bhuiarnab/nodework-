const hbs = require('hbs');

module.exports = {

   parse : () => {

    hbs.registerPartials('../views/');

    hbs.registerHelper('greeting', function() {
    
      var tableData = [
     {
     header: ['One', 'Two', 'Three','Four','Five'],
     baseData: ['1', '2', '3','4','5'],
     details : {
       header : ['A','B','C'],
       baseData : [[1,2,3],[4,5,6],[7,8,9]]
     }
    },
    {
    header: ['One', 'Two', 'Three','Four','Five'],
    baseData: ['11', '21', '31','41','51'],
    details : {
      header : ['A','B','C'],
      baseData : [[12,22,32],[43,53,63],[74,84,94]]
    }
    }
     ]
    
        return new hbs.SafeString(
    
    
          (tableData.map(item => {
              return (
                "<table>"
                +
                  "<tr>"
                    +
                    item.header.map(childItem => {
                        return(
                          "<th>" + childItem + "</th>"
                        )
                      })
                    +
                  "</tr>" +
    
                        "<tr>"
                        +
                            item.baseData.map(childItem => {
                              return(
                                "<td>" + childItem + "</td>"
                              )
                            })
                            +
                        "</tr>"
                       +
                       "<tr>   <td colspan='5' class='sub-table'> <table><thead><tr>" +
                       item.details.header.map(child =>{
                         return (
                           "<th>"+child+"</th>"
                         )
                       })+
                       "<tbody>"+
                      item.details.baseData.map(base =>{
    
                    return (
                     "<tr>"+
                     base.map(data =>{
    
                    return (
                      "<td>"+data+"</td>"
                    );
                   })
    
                    +"</tr>"
                      );
                      })
    
                       +"</tbody>"
    
                      + "</tr></thead>"
                       +
                       "</table></td>"
                       +
                       "</tr>"
                       +
                "</table>"
              ).replace(/,/g,'');
            })
          )
        );
    
    });
   
   }

}