import React, {useEffect, useState} from 'react'
import CloseButton from 'react-bootstrap/CloseButton'
import hours from '../helpers/convertHours'
import './ShopDisplay.css'
import {Rating} from 'react-simple-star-rating';
import { Carousel } from 'react-carousel-minimal';
import { Routes, Route, Link, useParams, Navigate } from "react-router-dom";
import { API } from 'aws-amplify';
import {Helmet} from "react-helmet";
import './shopDisplayEdit.css'
import { FormControl, Input, FormLabel, Checkbox, FormControlLabel, FormGroup, Alert } from '@mui/material';
import { Auth } from 'aws-amplify'
import Api from '@aws-amplify/api-rest'
const axios = require('axios');
const dataArray = require('../ExtCAIDFinal')
const dataArray2 = require('../USID2000')
const dataArray3 = require('../USID5000')

const AWS = require('aws-sdk');

const SES_CONFIG = {
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    region: 'us-east-1',
};

const AWS_SES = new AWS.SES(SES_CONFIG);

function wait(ms) {
    return new Promise( (resolve) => {setTimeout(resolve, ms)});
}

const fetchYelp=async function(id) {
  const shopData = await Api.get('yelpApi', `/yelp/${id}`)
  return shopData
}





export default function ShopDisplay(props) {
  const [redirect, setRedirect] = useState(false)
  const [user, setUser] = useState(null)
  const [userApi, setUserApi] = useState(null)
  const [shop, setShop] = useState(null)
  const [alert, setAlert] = useState(null)

  const axiosFunc = async () =>  {
  const newData = []
    for (let i = 0; i < dataArray.length; i++) {
      await  wait(2000)
        console.log('before axios')
fetchYelp(dataArray[i].id)
.then((res) => {
  console.log(res)
dataArray[i].yelpData = res
newData.push(dataArray[i])
setAlert(`Recieved ${[i]} ${dataArray[i].place_name}`)
return dataArray[i]

})
.catch((err) => {
  console.log(err)
  

})
    }
    return newData
};

 const axiosUS1 = async () =>  {
  const newData = []
    for (let i = 0; i < dataArray2.length; i++) {
      await  wait(2000)
        console.log('before axios')
fetchYelp(dataArray2[i].id)
.then((res) => {
  console.log(res)
dataArray2[i].yelpData = res
newData.push(dataArray2[i])
setAlert(`Recieved ${[i]} ${dataArray2[i].place_name}`)
return dataArray2[i]

})
.catch((err) => {
  console.log(err)
  

})
    }
    return newData
};
const axiosUS2 = async () =>  {
  const newData = []
    for (let i = 0; i < dataArray3.length; i++) {
      await  wait(2000)
        console.log('before axios')
fetchYelp(dataArray3[i].id)
.then((res) => {
  console.log(res)
dataArray3[i].yelpData = res
newData.push(dataArray3[i])
setAlert(`Recieved ${[i]} ${dataArray3[i].place_name}`)
return dataArray3[i]

})
.catch((err) => {
  console.log(err)
  

})
    }
    return newData
};
  
  

  const saveShop = async (detailsArray) => {
      for (let i = 0; i < detailsArray.length; i++) {
        wait(2000)
        if (detailsArray[i] !== undefined) {
      const data = {
        body: {
          address: detailsArray[i].address,
          
  
        }
      }
      await Api.post('shopsApi', `/shops/${detailsArray[i].id}`, data);
      const data2 = {
        body: {
          hours: detailsArray[i].hours,
          
  
        }
      }
      await Api.post('shopsApi', `/shops/${detailsArray[i].id}`, data2);
      const data3 = {
        body: {
          description: detailsArray[i].description,
          
  
        }
      }
      await Api.post('shopsApi', `/shops/${detailsArray[i].id}`, data3);
      const data4 = {
        body: {
          image: detailsArray[i].image,
          
  
        }
      }
      await Api.post('shopsApi', `/shops/${detailsArray[i].id}`, data4);
      const data5 = {
        body: {
          serviceAvailable: detailsArray[i].serviceAvailable,
          
  
        }
      }
      await Api.post('shopsApi', `/shops/${detailsArray[i].id}`, data5);
      const data6 = {
        body: {
          numberReviews: detailsArray[i].numberReviews,
          
  
        }
      }
      await Api.post('shopsApi', `/shops/${detailsArray[i].id}`, data);
      
    }
    
    
    setAlert(`Saved ${[i]} ${detailsArray[i].name}`)
    }
    }

  
  async function fetchUser(userId) {
    const userData = await API.get('usersApi', `/users/${userId}`)
    return userData
  }

  useEffect(() => {
  
    Auth.currentAuthenticatedUser()
    .then((user) => {
      console.log(user, 'user')
      setUser(user.username)
      let userInfo = user.username
      console.log(user)
      fetchUser(userInfo)
      .then((userData) => {
        console.log('userData', userData)
        setUserApi(userData.data.Item)
        if (props.signedIn) {
          setRedirect(false)
        } else {
          setRedirect(true)
        }
        
        for (const shop of props.shops) {
          
          if (shop.id === userData.data.Item.shopId) {
            setShop(shop)
          }
        }
        if (userData.data.Item.accountType !== 'admin') {
          setRedirect(true)
        }
        
      })
    
    })
    
  
  
}, [])
  

  const onClickCanada = function() {
    axiosFunc()
    .then((details) => {
      console.log(details)
       const detailsArray = [];
for (const detail of details) {
  if (detail !== undefined && detail !== null) {
  const detailsObject = {};
  detailsObject.name = detail.yelpData.name;
  detailsObject.latitude = detail.yelpData.coordinates.latitude;
  detailsObject.longitude = detail.yelpData.coordinates.longitude;
  detailsObject.address = detail.yelpData.location.display_address
  detailsObject.phone = detail.yelpData.display_phone
  detailsObject.callPhone = detail.yelpData.phone
  detailsObject.image = detail.yelpData.image_url
  detailsObject.rating = detail.yelpData.rating
  detailsObject.price = detail.yelpData.price
  detailsObject.category = detail.categoryNew
  detailsObject.description = detail.description
  detailsObject.mapUrl = detail.place_url
  detailsObject.numberReviews = detail.yelpData.review_count
  detailsObject.servicesAvailable = detail.services_available
  detailsObject.hours = [];
  detailsObject.images = [];
  detailsObject.viewHours = detail.opening_hours
  detailsObject.id = detail.id


  for (const image of detail.yelpData.photos) {
    detailsObject.images.push(image)
  }
  
  if (detail.yelpData.hours) {
  for (const day of detail.yelpData.hours[0].open) {
    
    const hours = {open: day.start, close: day.end, day: day.day}
    
    const stringHours = JSON.stringify(hours)
    
    detailsObject.hours.push(stringHours)
    
  }
}
if (!detailsArray.includes(detailsObject)) {
  detailsArray.push(detailsObject)
}
}
}
saveShop(detailsArray)
.then((res) => {
  console.log(res)
  setAlert("Seeding complete")
})
.catch((err) => {
  console.log(err)
})
    })
  }
const onClickUS1 = function() {
    axiosUS1()
    .then((details) => {
      console.log(details)
       const detailsArray = [];
for (const detail of details) {
  if (detail !== undefined && detail !== null) {
  const detailsObject = {};
  detailsObject.name = detail.yelpData.name;
  detailsObject.latitude = detail.yelpData.coordinates.latitude;
  detailsObject.longitude = detail.yelpData.coordinates.longitude;
  detailsObject.address = detail.yelpData.location.display_address
  detailsObject.phone = detail.yelpData.display_phone
  detailsObject.callPhone = detail.yelpData.phone
  detailsObject.image = detail.yelpData.image_url
  detailsObject.rating = detail.yelpData.rating
  detailsObject.price = detail.yelpData.price
  detailsObject.category = detail.categoryNew
  detailsObject.description = detail.description
  detailsObject.mapUrl = detail.place_url
  detailsObject.numberReviews = detail.yelpData.review_count
  detailsObject.servicesAvailable = detail.services_available
  detailsObject.hours = [];
  detailsObject.images = [];
  detailsObject.viewHours = detail.opening_hours
  detailsObject.id = detail.id


  for (const image of detail.yelpData.photos) {
    detailsObject.images.push(image)
  }
  
  if (detail.yelpData.hours) {
  for (const day of detail.yelpData.hours[0].open) {
    
    const hours = {open: day.start, close: day.end, day: day.day}
    
    const stringHours = JSON.stringify(hours)
    
    detailsObject.hours.push(stringHours)
    
  }
}
if (!detailsArray.includes(detailsObject)) {
  detailsArray.push(detailsObject)
}
}
}
saveShop(detailsArray)
.then((res) => {
  console.log(res)
  setAlert("Seeding complete")
})
.catch((err) => {
  console.log(err)
})
    })
  }
  const onClickUS2 = function() {
    axiosUS2()
    .then((details) => {
      console.log(details)
       const detailsArray = [];
for (const detail of details) {
  if (detail !== undefined && detail !== null) {
  const detailsObject = {};
  detailsObject.name = detail.yelpData.name;
  detailsObject.latitude = detail.yelpData.coordinates.latitude;
  detailsObject.longitude = detail.yelpData.coordinates.longitude;
  detailsObject.address = detail.yelpData.location.display_address
  detailsObject.phone = detail.yelpData.display_phone
  detailsObject.callPhone = detail.yelpData.phone
  detailsObject.image = detail.yelpData.image_url
  detailsObject.rating = detail.yelpData.rating
  detailsObject.price = detail.yelpData.price
  detailsObject.category = detail.categoryNew
  detailsObject.description = detail.description
  detailsObject.mapUrl = detail.place_url
  detailsObject.numberReviews = detail.yelpData.review_count
  detailsObject.servicesAvailable = detail.services_available
  detailsObject.hours = [];
  detailsObject.images = [];
  detailsObject.viewHours = detail.opening_hours
  detailsObject.id = detail.id


  for (const image of detail.yelpData.photos) {
    detailsObject.images.push(image)
  }
  
  if (detail.yelpData.hours) {
  for (const day of detail.yelpData.hours[0].open) {
    
    const hours = {open: day.start, close: day.end, day: day.day}
    
    const stringHours = JSON.stringify(hours)
    
    detailsObject.hours.push(stringHours)
    
  }
}
if (!detailsArray.includes(detailsObject)) {
  detailsArray.push(detailsObject)
}
}
}
saveShop(detailsArray)
.then((res) => {
  console.log(res)
  setAlert("Seeding complete")
})
.catch((err) => {
  console.log(err)
})
    })
  }
  // API.get('shopsApi', `/shops/${id}`, {}).then((result) => {
  //   const shopApiData = JSON.parse(result.body);
  //   console.log(shopApiData, 'shop api data')
  // }).catch(err => {
  //   console.log(err, 'api error');
  // })

  

  
  

  

  const onSubmit = function () {
    // API.put('shopsApi', `/shops`, { 
    //   body: {
    //     id: props.shop.id,
        
    //     name: name
        
    //   }
    // }).then(result => {
    //   //const result = JSON.parse(result.body);
    //   console.log(result)
    //   setEditDescription(false)
    // }).catch(err => {
    //   console.log(err);
    // })
    // API.put('shopsApi', `/shops`, { 
    //   body: {
    //     id: props.shop.id,
    //     description: description,
        
        
    //   }
    // }).then(result => {
    //   //const result = JSON.parse(result.body);
    //   console.log(result)
    //   setEditDescription(false)
    // }).catch(err => {
    //   console.log(err);
    // })
    // API.put('shopsApi', `/shops`, { 
    //   body: {
    //     id: props.shop.id,
    //     hours: hoursArrayNew,
        
        
    //   }
    // }).then(result => {
    //   //const result = JSON.parse(result.body);
    //   console.log(result)
    //   setEditDescription(false)
    // }).catch(err => {
    //   console.log(err);
    // })
    
  }
  
   
  

  
  
  return(
    <div className="main-body">
    <div className="dashboard-container">
     <h4>My Account</h4> 

      <button onClick={props.logout}>Logout</button>
      <div>
      <div className="main-body-show">
      
     
      <div>
        <div className="container">
          <div className="close-display">
            
          </div>
          <div className="title-header">
           ADMIN DASHBOARD
           
          </div>
          <button onClick={onClickCanada}>Reseed Canada</button>
         
        </div>
        <button onClick={onClickUS1}>Reseed USA1</button>
          
          
        <button onClick={onClickUS2}>Reseed USA2</button>
          
          {alert !== null && 
          <Alert>{alert}</Alert>
          }
          
      </div>
          
            
      </div>
      </div>
    </div>
    {redirect === true &&
     <Navigate to='/'/>
     }
    </div>
    
    
          
  )
}