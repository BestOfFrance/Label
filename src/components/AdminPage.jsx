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


const AWS = require('aws-sdk');

const SES_CONFIG = {
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    region: 'us-east-1',
};

const AWS_SES = new AWS.SES(SES_CONFIG);


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