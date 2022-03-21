const data1 = require('./CanadaDetails4000')

const fs = require('fs');
console.log(data1.length)
const detailsArray = []

for (const shop of data1) {
  if (!detailsArray.includes(shop) && shop !== null && !detailsArray.some(person => person.yelpData.coordinates.latitude === shop.yelpData.coordinates.latitude)) {
    
    if (shop.title === "Faubourg") {
      // console.log(detailsArray.indexOf(shop))
    }
    detailsArray.push(shop)
  }
}

for (const shop of detailsArray) {
  if (shop.title === "Faubourg") {
    console.log(shop)
    
  }
 
}

console.log(detailsArray.length)



var file = fs.createWriteStream('CanadaDetailsNoDuplicates4000.json');
  
  file.write(JSON.stringify(detailsArray));
  file.end();

