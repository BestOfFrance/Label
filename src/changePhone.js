// const data1 = require('./dataMergeFinal')
// const data2 = require('./newShopData')
const data = require('./dataForPhone')
const fs = require('fs');
//data1 = 203

// console.log(data2.length)
// const arrayData1 = []
// const arrayData2 = []

// for (const shop of data1) {
//   arrayData1.push(shop.title)
// }
// for (const shop2 of data2) {
//   if (!arrayData1.includes(shop2.title)) {
//     arrayData2.push(shop2)
//   }
// }
// console.log(arrayData1.length)
// console.log(arrayData2.length)
const arrayAll = []
for (const shop of data) {
  let phone1 = ''
  for (const number of shop.phone) {
    
    if (number !== ' ' && number !== '-') {
      phone1 += number
      
    }
  }
  shop.phone1 = phone1
  arrayAll.push(shop)
}




var file = fs.createWriteStream('shopDataPhone.js');
  
  file.write(JSON.stringify(arrayAll));
  file.end();
