const axios = require('axios')

axios.get("http://localhost:3001/")
.then((res) => {
  console.log(res)
})
.catch((err) => {
  console.log(err)
})