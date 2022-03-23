const axios = require('axios');
const data = require('./CleanedExtractCanadaData')
const fs = require('fs');

let promises = [];

const dataArray = []

for (let i = 3001; i < data.length; i++) {
  // console.log(data[i])
  if (data[i].City !== null) {
  const name = (data[i].title).toString()
  const address = (data[i].address1).toString()
  const city = (data[i].city).toString()
  let state = (data[i].state).toString().toUpperCase()
  

  if (state === " Qc" || state === "Qc" || state.replace(/^\s+|\s+$/gm,'') == "Qu") {
    state = "QC"
  }

  console.log(state.replace(/^\s+|\s+$/gm,''))
  
  const dataObject = data[i]
  dataObject.terms = {name: name.replace(/^\s+|\s+$/gm,''), address: address.replace(/^\s+|\s+$/gm,''), city: city.replace(/^\s+|\s+$/gm,''), state: state.replace(/^\s+|\s+$/gm,'')}
  dataArray.push(dataObject)
}
}
console.log(dataArray.length)

 function wait(ms) {
    return new Promise( (resolve) => {setTimeout(resolve, ms)});
}


const axiosFunc = async () =>  {
  const newData = []
    for (const l of dataArray) {
      await  wait(1000)
        console.log('before axios')
        axios.get(`https://api.yelp.com/v3/businesses/matches`, {
  headers: {
    Authorization: `Bearer -GSVXD6Q_ffREboy1bP4Po1S6AdGYXYx`
},
  params: {
    // phone: l.phone1
    name: l.terms.name,
    address1: l.terms.address,
    city: l.terms.city,
    state: l.terms.state,
    country: "CA",
    limit: 1

  }
}).then((res) => {
  l.id = res.data.businesses[0].id
  newData.push(l)
   
})
.catch((err) => {
  newData.push(l.title)
})
    }
    return newData
};
axiosFunc()
.then((res) => {
  var file = fs.createWriteStream('ExtractID5000.json');
  
  file.write(JSON.stringify(res));
  file.end();
})