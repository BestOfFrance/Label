const axios = require('axios');
const dataArray = require('./ExtractID5000')
const fs = require('fs');


console.log(dataArray.length)

 function wait(ms) {
    return new Promise( (resolve) => {setTimeout(resolve, ms)});
}


const axiosFunc = async () =>  {
  const newData = []
    for (const l of dataArray) {
      await  wait(2000)
        console.log('before axios')
        axios.get(`https://api.yelp.com/v3/businesses/${l.id}`, {
  headers: {
    Authorization: `Bearer H1IcGJB65EqYA4w-_gnt4mR7vSx9zpO1HyiHxQ4_9zGBnQYtRRrcOFFvn-kOAEoEYWptsfL8Bd3T5MV9uGW0MqHe9LqdIFXO25worzkCIb74jOgVJnIsnYnYx`
}
})
.then((res) => {
l.yelpData = res.data
newData.push(l)
return l

})
.catch((err) => {
  console.log(err)
  newData.push(l.name)
return l.name;
})
    }
    return newData
};
axiosFunc()
.then((res) => {
  var file = fs.createWriteStream('ExtCADetails5000.json');
  
  file.write(JSON.stringify(res));
  file.end();
})