const data = require('./shop-data')
const fs = require('fs');


const fullShopData = 5673
const addressArray = []
for (const piece of data) {
  if (piece.title !== "Real Candadian Superstore" && piece.title !== "Tim Hortons" && piece.title !== "Walmart Grocery Pickup" && piece.title !== "Walmart Supercentre Red Deer North" && piece.title !== "Save-On-Foods" && piece.title !== "COBS Bread Bakery" && piece.title !== "Greggs" && piece.title !== "M&M Food Market" && piece.title !== "Walmart Supercenter" && piece.title !== "Food Basics" && piece.title !== "Metro" && piece.title !== "Zehrs" && piece.title !== "Provigo" && piece.title !== "Atlantic Superstore" && piece.title !== "Costco Bakery" && piece.title !== "Maxi" && piece.title !== "Super C" && piece.title !== "Sainsbury's" && piece.title !== "Costco Wholesale" && piece.title !== "McDonald's" && piece.title !== "ALDI" && piece.title !== "Londis" && piece.title !== "Tesco Express" && piece.title !== "Thrifty Foods" && piece.title !== "IGA" && piece.title !== "Loblaws" && piece.title !== "Ben & Florentine" && piece.title !== "Bulk Barn" && piece.title !== "Montana's" && piece.title !== "Earls Kitchen + Bar" && piece.title !== "Sunset Grill" && piece.title !== "Yann Haute Partisserie" && piece.title !== "Original Joe's" && piece.title !== "Panera Bread" && piece.title !== "Tesco Superstore" && piece.title !== "Toujours Mikes" && piece.title !== "Denny's" && piece.title !== "French Bakery | Birthday Cakes | Cake Shop" && piece.title !== "M&S Simply Food" && piece.title !== "Harvey's" && piece.title !== "Swiss Chalet" && piece.title !== "Caniche French Bakery")  {
    addressArray.push(piece)
  }

}

console.log(addressArray.length)
var file = fs.createWriteStream('newShopData.js');
  
  file.write(JSON.stringify(addressArray));
  file.end();

console.log(addressArray.length)