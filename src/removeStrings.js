const data = require('./arrayPhone3000.js')
const fs = require('fs');


const fullShopData = 5673
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
var file = fs.createWriteStream('cleanedPhone3000.js');
  
  file.write(JSON.stringify(cleanDataArray));
  file.end();

  var file = fs.createWriteStream('undefinedPhone3000.js');
  
  file.write(JSON.stringify(undefindedDataArray));
  file.end();
// console.log(addressArray.length)