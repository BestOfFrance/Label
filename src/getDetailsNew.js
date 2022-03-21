const axios = require('axios');
const dataArray = require('./CanadaID4000')
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
    Authorization: `Bearer nxBY2qRdQtx6tQSmpDNElKsi_aI_4RDjjvqs3lbzGmgMem__btNaNnT2ruHn28UmFZ1W6Z9zrmjpw0rmyyaEuwGGMc-GSVXD6Q_ffREboy1bP4Po1S6AdGYXYx`
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
  var file = fs.createWriteStream('CanadaDetails4000.json');
  
  file.write(JSON.stringify(res));
  file.end();
})