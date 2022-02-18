import awsconfig from './aws-exports.js';
import Amplify, { API } from 'aws-amplify';

import Api from '@aws-amplify/api-rest'

 Amplify.configure(awsconfig);

import details from './details.js';

// const details = array.details

const detailsArray = [];
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

for (const detail of detailsArray) {
  const saveShop = async () => {
    const data = {
      body: {
        name: detail.name,
        latitude: detail.latitude,
        longitude: detail.longitude,
        address: detail.address,
        phone: detail.phone,
        image: detail.image,
        rating: detail.rating,
        price: detail.price,
        hours: detail.hours,
        images: detail.images,
        category: detail.category

      }
    }
    const apiData = await API.post('shopsapi', '/shops', data);
    console.log({apiData})
  }
  saveShop()

}



