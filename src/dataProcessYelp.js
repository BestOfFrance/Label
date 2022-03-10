const data1 = require('./dataMergeUSOne')
const data2 = require('./cleanedDataUS6000')
const fs = require('fs');

const arrayAll = [];

for (const shop of data1) {
  arrayAll.push(shop)
}

for (const shop of data2) {
  if (!arrayAll.includes(shop)) {
    arrayAll.push(shop)
  }
}

var file = fs.createWriteStream('dataMergeUSFinal.js');
  
  file.write(JSON.stringify(arrayAll));
  file.end();

