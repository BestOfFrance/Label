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


const axiosFunc = async () =>  {
  const newData = []
    for (const l of dataArray) {
      await  wait(2000)
        console.log('before axios')
fetchYelp(l.id)
.then((res) => {
  console.log(res)
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

const saveShop = async (detailsArray) => {
      for (let i = 0; i <= 5; i++) {
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
      await Api.post('shopsApi', `/shops/${detailsArray[i].id}`, data);
      
    }
    }
    }

export default function ShopDisplay(props) {
  const [redirect, setRedirect] = useState(false)
  const [user, setUser] = useState(null)
  const [userApi, setUserApi] = useState(null)
  const [shop, setShop] = useState(null)
  
  
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
  detailsObject.address = detail.yelpData.location.address1
  detailsObject.phone = detail.yelpData.display_phone
  detailsObject.callPhone = detail.yelpData.phone
  detailsObject.image = detail.yelpData.image_url
  detailsObject.rating = detail.yelpData.rating
  detailsObject.price = detail.yelpData.price
  detailsObject.category = detail.categoryNew
  detailsObject.description = detail.description
  detailsObject.mapUrl = detail.place_url
  detailsObject.numberReviews = detail.number_reviews
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