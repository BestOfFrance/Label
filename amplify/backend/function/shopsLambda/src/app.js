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
app.get('/shops/location/:geohash', function(req, res) {
  var params = {
    TableName: 'shops-dev',
    IndexName: 'gsi1',
            KeyConditionExpression: '#pk = :pk AND begins_with(#sk, :hash)',
            ExpressionAttributeNames: {
                '#pk': 'gsi1pk',
                '#sk': 'gsi1sk'
            },
            ExpressionAttributeValues: {
                ':pk': 'geohash',
                ':hash': req.params.geohash
            }
  }
  docClient.query(params, function(err, data) {
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
      id: req.body.id,
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
      viewHours: req.body.viewHours,
      userManaged: false,
      website: req.body.website,
      isPremium: false,
      meta: req.body.meta,
      categories: req.body.categories,
      gsi1pk: "geohash",
      gsi1sk: req.body.gsi1sk,
      tags: req.body.tags
      
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
  if (request.body.name) {
  const params = {
    TableName: "shops-dev",
    Key: {
      id: request.body.id,
    },
    ExpressionAttributeNames: {'#name': 'name'},
    ExpressionAttributeValues: {},
    ReturnValues: 'UPDATED_NEW',
  };
  params.UpdateExpression = 'SET';
  
  
    params.ExpressionAttributeValues[':name'] = request.body.name;
    params.UpdateExpression += '#name = :name';
  

  
  
  docClient.update(params, (error, result) => {
    if (error) {
      response.json({ statusCode: 500, error: error.message, url: request.url });
    } else {
      response.json({ statusCode: 200, url: request.url, body: JSON.stringify(result.Attributes) })
    }
  });
} else if (request.body.hidden) {
  const params = {
    TableName: "shops-dev",
    Key: {
      id: request.body.id,
    },
    ExpressionAttributeNames: {'#hidden': 'hidden'},
    ExpressionAttributeValues: {},
    ReturnValues: 'UPDATED_NEW',
  };
  params.UpdateExpression = 'SET';
  
  
    params.ExpressionAttributeValues[':hidden'] = request.body.hidden;
    params.UpdateExpression += '#hidden = :hidden';
  

  
  docClient.update(params, (error, result) => {
    if (error) {
      response.json({ statusCode: 500, error: error.message, url: request.url });
    } else {
      response.json({ statusCode: 200, url: request.url, body: JSON.stringify(result.Attributes) })
    }
  });
} else if (request.body.hours) {
  const params = {
    TableName: "shops-dev",
    Key: {
      id: request.body.id,
    },
    ExpressionAttributeNames: {'#hours': 'hours'},
    ExpressionAttributeValues: {},
    ReturnValues: 'UPDATED_NEW',
  };
  params.UpdateExpression = 'SET';
  
  
    params.ExpressionAttributeValues[':hours'] = request.body.hours;
    params.UpdateExpression += '#hours = :hours';
  


  
  docClient.update(params, (error, result) => {
    if (error) {
      response.json({ statusCode: 500, error: error.message, url: request.url });
    } else {
      response.json({ statusCode: 200, url: request.url, body: JSON.stringify(result.Attributes) })
    }
  });
} else if (request.body.description) {
  const params = {
    TableName: "shops-dev",
    Key: {
      id: request.body.id,
    },
    ExpressionAttributeNames: {'#description': 'description'},
    ExpressionAttributeValues: {},
    ReturnValues: 'UPDATED_NEW',
  };
  params.UpdateExpression = 'SET';
  
  
    params.ExpressionAttributeValues[':description'] = request.body.description;
    params.UpdateExpression += '#description = :description';
  
  
  docClient.update(params, (error, result) => {
    if (error) {
      response.json({ statusCode: 500, error: error.message, url: request.url });
    } else {
      response.json({ statusCode: 200, url: request.url, body: JSON.stringify(result.Attributes) })
    }
  });
} else if (request.body.images) {
  const params = {
    TableName: "shops-dev",
    Key: {
      id: request.body.id,
    },
    ExpressionAttributeNames: {'#images': 'images'},
    ExpressionAttributeValues: {},
    ReturnValues: 'UPDATED_NEW',
  };
  params.UpdateExpression = 'SET';
  
  
    
  
    params.ExpressionAttributeValues[':images'] = request.body.images;
    params.UpdateExpression += '#images = :images';
 
  
  
  docClient.update(params, (error, result) => {
    if (error) {
      response.json({ statusCode: 500, error: error.message, url: request.url });
    } else {
      response.json({ statusCode: 200, url: request.url, body: JSON.stringify(result.Attributes) })
    }
  });
} else if (request.body.isPremium) {
  const params = {
    TableName: "shops-dev",
    Key: {
      id: request.body.id,
    },
    ExpressionAttributeNames: {'#isPremium': 'isPremium'},
    ExpressionAttributeValues: {},
    ReturnValues: 'UPDATED_NEW',
  };
  params.UpdateExpression = 'SET';
  
  
    
  
    params.ExpressionAttributeValues[':isPremium'] = request.body.isPremium;
    params.UpdateExpression += '#isPremium = :isPremium';
 
  
  
  docClient.update(params, (error, result) => {
    if (error) {
      response.json({ statusCode: 500, error: error.message, url: request.url });
    } else {
      response.json({ statusCode: 200, url: request.url, body: JSON.stringify(result.Attributes) })
    }
  });
} else if (request.body.servicesAvailable) {
  const params = {
    TableName: "shops-dev",
    Key: {
      id: request.body.id,
    },
    ExpressionAttributeNames: {'#servicesAvailable': 'servicesAvailable'},
    ExpressionAttributeValues: {},
    ReturnValues: 'UPDATED_NEW',
  };
  params.UpdateExpression = 'SET';
  
  
    
  
    params.ExpressionAttributeValues[':servicesAvailable'] = request.body.servicesAvailable;
    params.UpdateExpression += '#servicesAvailable = :servicesAvailable';
 
  
  
  docClient.update(params, (error, result) => {
    if (error) {
      response.json({ statusCode: 500, error: error.message, url: request.url });
    } else {
      response.json({ statusCode: 200, url: request.url, body: JSON.stringify(result.Attributes) })
    }
  });
} else if (request.body.categories) {
  const params = {
    TableName: "shops-dev",
    Key: {
      id: request.body.id,
    },
    ExpressionAttributeNames: {'#categories': 'categories'},
    ExpressionAttributeValues: {},
    ReturnValues: 'UPDATED_NEW',
  };
  params.UpdateExpression = 'SET';
  
  
    
  
    params.ExpressionAttributeValues[':categories'] = request.body.categories;
    params.UpdateExpression += '#categories = :categories';
 
  
  
  docClient.update(params, (error, result) => {
    if (error) {
      response.json({ statusCode: 500, error: error.message, url: request.url });
    } else {
      response.json({ statusCode: 200, url: request.url, body: JSON.stringify(result.Attributes) })
    }
  });
} else if (request.body.address) {
  const params = {
    TableName: "shops-dev",
    Key: {
      id: request.body.id,
    },
    ExpressionAttributeNames: {'#address': 'address'},
    ExpressionAttributeValues: {},
    ReturnValues: 'UPDATED_NEW',
  };
  params.UpdateExpression = 'SET';
  
  
    
  
    params.ExpressionAttributeValues[':address'] = request.body.address;
    params.UpdateExpression += '#address = :address';
 
  
  
  docClient.update(params, (error, result) => {
    if (error) {
      response.json({ statusCode: 500, error: error.message, url: request.url });
    } else {
      response.json({ statusCode: 200, url: request.url, body: JSON.stringify(result.Attributes) })
    }
  });
} else if (request.body.tags) {
  const params = {
    TableName: "shops-dev",
    Key: {
      id: request.body.id,
    },
    ExpressionAttributeNames: {'#tags': 'tags'},
    ExpressionAttributeValues: {},
    ReturnValues: 'UPDATED_NEW',
  };
  params.UpdateExpression = 'SET';
  
  
    
  
    params.ExpressionAttributeValues[':tags'] = request.body.tags;
    params.UpdateExpression += '#tags = :tags';
 
  
  
  docClient.update(params, (error, result) => {
    if (error) {
      response.json({ statusCode: 500, error: error.message, url: request.url });
    } else {
      response.json({ statusCode: 200, url: request.url, body: JSON.stringify(result.Attributes) })
    }
  });
}
else if (request.body.numberReviews) {
  const params = {
    TableName: "shops-dev",
    Key: {
      id: request.body.id,
    },
    ExpressionAttributeNames: {'#numberReviews': 'numberReviews'},
    ExpressionAttributeValues: {},
    ReturnValues: 'UPDATED_NEW',
  };
  params.UpdateExpression = 'SET';
  
  
    
  
    params.ExpressionAttributeValues[':numberReviews'] = request.body.numberReviews;
    params.UpdateExpression += '#numberReviews = :numberReviews';
 
  
  
  docClient.update(params, (error, result) => {
    if (error) {
      response.json({ statusCode: 500, error: error.message, url: request.url });
    } else {
      response.json({ statusCode: 200, url: request.url, body: JSON.stringify(result.Attributes) })
    }
  });
}
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
