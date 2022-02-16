// const express = require('express')
// const app = express()
// const port = 3001
// const db = require('./routes');



// app.listen(port, () => {
//   console.log(`App running on port ${port}.`)
// })

// //const category_model = require('./categories_model')

// app.use(express.json())
// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
//   next();
// });

// app.get('/', db.getAllShops)

exports.handler = async (event) => {
  const body = {
      message: "Hello from Lambda"
  }
  const response = {
      statusCode: 200,
      body: JSON.stringify(body),
      headers: {
          "Access-Control-Allow-Origin": "*",
      }
  };
  return response;
};



