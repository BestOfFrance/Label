const data = require('./ExtractCanadaCleaned')
const fs = require('fs');
// const ids = require('./cleanedData50')
// console.log(ids.length)
console.log(data.length)
// const fullShopData = 5673

//!!!!!!!FOR USA ADDRESSES
// const addressArray = []
// for (const piece of data) {
//   const newPiece = piece.address[0].split(', ')
//   if (piece.title !== "Real Canadian Superstore" && piece.title !== "Tim Hortons" && piece.title !== "Walmart Grocery Pickup" && piece.title !== "Walmart Supercentre Red Deer North" && piece.title !== "Save-On-Foods" && piece.title !== "COBS Bread Bakery" && piece.title !== "Greggs" && piece.title !== "M&M Food Market" && piece.title !== "Walmart Supercenter" && piece.title !== "Food Basics" && piece.title !== "Metro" && piece.title !== "Zehrs" && piece.title !== "Provigo" && piece.title !== "Atlantic Superstore" && piece.title !== "Costco Bakery" && piece.title !== "Maxi" && piece.title !== "Super C" && piece.title !== "Sainsbury's" && piece.title !== "Costco Wholesale" && piece.title !== "McDonald's" && piece.title !== "ALDI" && piece.title !== "Londis" && piece.title !== "Tesco Express" && piece.title !== "Thrifty Foods" && piece.title !== "IGA" && piece.title !== "Loblaws" && piece.title !== "Ben & Florentine" && piece.title !== "Bulk Barn" && piece.title !== "Montana's" && piece.title !== "Earls Kitchen + Bar" && piece.title !== "Sunset Grill" && piece.title !== "Yann Haute Partisserie" && piece.title !== "Original Joe's" && piece.title !== "Panera Bread" && piece.title !== "Tesco Superstore" && piece.title !== "Toujours Mikes" && piece.title !== "Denny's" && piece.title !== "French Bakery | Birthday Cakes | Cake Shop" && piece.title !== "M&S Simply Food" && piece.title !== "Harvey's" && piece.title !== "Swiss Chalet" && piece.title !== "Caniche French Bakery" && newPiece[2] !== undefined)  {
//     const dataObject = {...piece}
//     let newNumber = '';
//     for (const number of piece.phone) {
//       if (number !== ' ' && number !== '-') {
//         newNumber += number
//       }
//     }
//     dataObject.newNumber = newNumber
//     dataObject.address1 = newPiece[0]
//     dataObject.city = newPiece[1]
//     const stateParsed = newPiece[2].split(' ')
//     const state = stateParsed[0]
//     console.log(state)
//     dataObject.state = state
//     addressArray.push(dataObject)
//     // console.log(dataObject)
//   }

// }
// console.log(addressArray[0])
// console.log(addressArray.length)


//!!!!!! FOR CAD DATA

const addressArray = []
for (const piece of data) {
  
  if (piece.title !== "Real Canadian Superstore" && piece.title !== "Tim Hortons" && piece.title !== "Walmart Grocery Pickup" && piece.title !== "Walmart Supercentre Red Deer North" && piece.title !== "Save-On-Foods" && piece.title !== "COBS Bread Bakery" && piece.title !== "Greggs" && piece.title !== "M&M Food Market" && piece.title !== "Walmart Supercenter" && piece.title !== "Food Basics" && piece.title !== "Metro" && piece.title !== "Zehrs" && piece.title !== "Provigo" && piece.title !== "Atlantic Superstore" && piece.title !== "Costco Bakery" && piece.title !== "Maxi" && piece.title !== "Super C" && piece.title !== "Sainsbury's" && piece.title !== "Costco Wholesale" && piece.title !== "McDonald's" && piece.title !== "ALDI" && piece.title !== "Londis" && piece.title !== "Tesco Express" && piece.title !== "Thrifty Foods" && piece.title !== "IGA" && piece.title !== "Loblaws" && piece.title !== "Ben & Florentine" && piece.title !== "Bulk Barn" && piece.title !== "Montana's" && piece.title !== "Earls Kitchen + Bar" && piece.title !== "Sunset Grill" && piece.title !== "Yann Haute Partisserie" && piece.title !== "Original Joe's" && piece.title !== "Panera Bread" && piece.title !== "Tesco Superstore" && piece.title !== "Toujours Mikes" && piece.title !== "Denny's" && piece.title !== "French Bakery | Birthday Cakes | Cake Shop" && piece.title !== "M&S Simply Food" && piece.title !== "Harvey's" && piece.title !== "Swiss Chalet" && piece.title !== "Caniche French Bakery" && piece.FIELD4 !== undefined)  {
    const dataObject = {...piece}
    let newNumber = '';
    for (const number of piece.phone) {
      if (number !== ' ' && number !== '-') {
        newNumber += number
      }
    }
    dataObject.newNumber = newNumber
    dataObject.address1 = piece.address
    dataObject.city = piece.City
    
    
    
    dataObject.state = piece.FIELD4
    
    
    addressArray.push(dataObject)
    
    // console.log(dataObject)
  }

}
console.log(addressArray)
console.log(addressArray.length)
var file = fs.createWriteStream('CleanedExtractCanadaData.json');
  
  file.write(JSON.stringify(addressArray));
  file.end();

