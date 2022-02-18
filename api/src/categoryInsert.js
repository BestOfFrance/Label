const Pool = require('pg').Pool
const fs = require('fs')
const array = require('../../src/details');

const details = array.details

detailsArray = [];
for (const detail of details) {
  const detailsObject = {};
  detailsObject.name = detail.name;
  detailsObject.latitude = detail.coordinates.latitude;
  detailsObject.longitude = detail.coordinates.longitude;
  detailsObject.address = detail.location.address1
  detailsObject.phone = detail.display_phone
  detailsObject.image = detail.image_url
  detailsObject.rating = detail.rating
  detailsObject.price = detail.price
  detailsObject.category = detail.category
  detailsObject.hours = [];
  detailsObject.images = [];

  for (const image of detail.photos) {
    detailsObject.images.push(image)
  }
  
  for (const day of detail.hours[0].open) {
    
    const hours = {open: day.start, close: day.end, day: day.day}
    
    const stringHours = JSON.stringify(hours)
    
    detailsObject.hours.push(stringHours)
    
  }
  detailsArray.push(detailsObject)
}
console.log(detailsArray)
// ID SERIAL PRIMARY KEY NOT NULL,
//   NAME VARCHAR(255) NOT NULL,
//   TYPE VARCHAR(50) NOT NULL,
//   LATITUDE SMALLINT,
//   LONGITUDE SMALLINT,
//   ADDRESS VARCHAR(100)
// PHONE VARCHAR(30),
//   IMAGE VARCHAR(255),
//   RATING VARCHAR(100),
//   PRICE VARCHAR(30),
//   HOURS VARCHAR(255)

const pool = new Pool({
  user: 'my_user',
  host: 'localhost',
  database: 'my_database',
  password: 'root',
  port: 5432,
});

for (const shop of detailsArray) {
  const text = `INSERT INTO shops(name, latitude, longitude, address, phone, image, rating, price, hours, images, category)VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`
  const values = [`${shop.name}`, shop.latitude, shop.longitude, `${shop.address}`, `${shop.phone}`, `${shop.image}`, `${shop.rating}`, `${shop.price}`, `${shop.hours}`, `${shop.images}`, `${shop.category}` ]
      // for (const shop in detailsArray) {
        pool.query(
          text, values,
          (err, res) => {
            console.log(err, res);
            
          }
        );
  
      // }
      
}
pool.end()
