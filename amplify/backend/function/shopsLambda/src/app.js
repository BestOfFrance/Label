/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient()


const id = function() {
  return Math.random().toString(36).substring(2)
}

const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
// const cors = require('cors')
// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods


  app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header('Access-Control-Allow-Methods', '*');
  res.header("Access-Control-Allow-Headers", "*")
  res.header("Access-Control-Allow-Credentials", true)
  next()
})


// app.use(cors(corsOptions))
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*")
//   res.header("Access-Control-Allow-Headers", "*")
  
//   next()
// });


/**********************
 * Example get method *
 **********************/

app.get('/shops', function(req, res) {
  var params = {
    TableName: 'shops-dev'
  }
  docClient.scan(params, function(err, data) {
    if (err) res.json({err})
    else res.json({data})
  })
  
});

app.get('/shops/:id', function(req, res) {
  console.log(req.params.id)
  let params = {
    TableName: "shops-dev",
    Key: {
      id: req.params.id
    }
  }
  docClient.get(params, (error, result) => {
    if (error) {
      res.json({ statusCode: 500, error: error.message, headers: {
        "access-control-allow-origin": "http://localhost:3000"
      } });
    } else {
      res.json({ statusCode: 200, body: JSON.stringify(result.Item), headers: {
        "access-control-allow-origin": "http://localhost:3000"
      } })
    }
  });
});

/****************************
* Example post method *
****************************/

app.post('/shops', function(req, res) {
  
  var params = {
    TableName: "shops-dev",
    Item: {
      id: id(),
      name: req.body.name,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      address: req.body.address,
      phone: req.body.phone,
      image: req.body.image,
      rating: req.body.rating, 
      price: req.body.price,
      hours: req.body.hours,
      images: req.body.images,
      category: req.body.category,
      description: req.body.description,
      hidden: false,
      mapUrl: req.body.mapUrl,
      numberReviews: req.body.numberReviews,
      servicesAvailable: req.body.servicesAvailable,
      viewHours: req.body.viewHours
      
    }
  }
  docClient.put(params, function(err, data) {
    if (err) res.json({err})
    else res.json({success: 'Table seeded successfully1'})
  })
  
});

app.post('/shops/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example put method *
****************************/

// app.put('/shops', function(req, res) {
//   // Add your code here
//   res.json({success: 'put call succeed!', url: req.url, body: req.body})
// });

app.put("/shops", function (request, response) {
  
  const params = {
    TableName: "shops-dev",
    Key: {
      id: request.body.id,
    },
    ExpressionAttributeNames: { '#hidden': 'hidden', '#name': 'name', '#description': 'description' },
    ExpressionAttributeValues: {},
    ReturnValues: 'UPDATED_NEW',
  };
  params.UpdateExpression = 'SET ';
  if (request.body.hidden) {
    params.ExpressionAttributeValues[':hidden'] = request.body.hidden;
    params.UpdateExpression += '#hidden = :hidden';
  }
  if (request.body.name) {
    params.ExpressionAttributeValues[':name'] = request.body.name;
    params.UpdateExpression += '#name = :name';
  }
  if (request.body.description) {
    params.ExpressionAttributeValues[':description'] = request.body.description;
    params.UpdateExpression += '#description = :description';
  }
  if (request.body.complete) {
    params.ExpressionAttributeValues[':complete'] = request.body.complete;
    params.UpdateExpression += 'complete = :complete, ';
  }
  if (request.body.text || request.body.complete) {
    params.ExpressionAttributeValues[':updatedAt'] = timestamp;
    params.UpdateExpression += 'updatedAt = :updatedAt';
  }
  docClient.update(params, (error, result) => {
    if (error) {
      response.json({ statusCode: 500, error: error.message, url: request.url });
    } else {
      response.json({ statusCode: 200, url: request.url, body: JSON.stringify(result.Attributes) })
    }
  });
});

/****************************
* Example delete method *
****************************/

app.delete('/shops', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/shops/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
