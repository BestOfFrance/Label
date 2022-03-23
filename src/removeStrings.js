const data = require('./ExtractID5000')
const fs = require('fs');



const cleanDataArray = []
const undefindedDataArray = []
for (const piece of data) {
  if (typeof piece === "object")  {
    cleanDataArray.push(piece)
  }
  if (typeof piece === "string")  {
    undefindedDataArray.push(piece)
  }

}
console.log(cleanDataArray.length)
console.log(undefindedDataArray.length)



// console.log(addressArray.length)
var file = fs.createWriteStream('ExtractIDCleaned5000.js');
  
  file.write(JSON.stringify(cleanDataArray));
  file.end();

  var file = fs.createWriteStream('undefinedExtract5000.js');
  
  file.write(JSON.stringify(undefindedDataArray));
  file.end();
// console.log(addressArray.length)