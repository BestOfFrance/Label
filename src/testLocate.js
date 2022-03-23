const axios = require('axios');


axios.get('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBOfWEiaDgFLeGIJe1pQnfnbY6qLZm4XoE')
.then((response) => {
  console.log(response)
})
.catch((err) => {
  console.log(err)
})