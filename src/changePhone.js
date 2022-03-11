const data1 = require('./dataMergeFinal')
const data2 = require('./newShopData')
const fs = require('fs');

const arrayAll = [];

for (const shop of data2) {
  if (!data1.includes(shop)) {
  arrayAll.push(shop)
  }
}
console.log(arrayAll.length)


// var file = fs.createWriteStream('dataMergeUSFinal.js');
  
//   file.write(JSON.stringify(arrayAll));
//   file.end();
