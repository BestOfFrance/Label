import React, {useEffect, useState} from 'react'
import CloseButton from 'react-bootstrap/CloseButton'
import hours from '../helpers/convertHours'
import './ShopDisplay.css'
import {Rating} from 'react-simple-star-rating';
import { Carousel } from 'react-carousel-minimal';
import { Routes, Route, Link, useParams } from "react-router-dom";
import { API } from 'aws-amplify';
import {Helmet} from "react-helmet";
import './shopDisplayEdit.css'
import { FormControl, Input, FormLabel, Checkbox, FormControlLabel, FormGroup, Alert } from '@mui/material';


const AWS = require('aws-sdk');

const SES_CONFIG = {
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    region: 'us-east-1',
};

const AWS_SES = new AWS.SES(SES_CONFIG);


export default function ShopDisplay(props) {
console.log('display props', props)
  const data = [];
  const shop = props.shop
  const [images, setImages] = useState([])
  const [editDescription, setEditDescription] = useState(false)
  const [description, setDescription] = useState(null)
  const [hoursArrayNew, setHoursArrayNew] = useState(null)
  const [name, setName] = useState(null)
  const [nameHolder, setNameHolder] = useState(props.shop.name)
  const [hoursHolder, setHoursHolder] = useState(props.shop.hours)
  const [descriptionHolder, setDescriptionHolder] = useState(props.shop.description)

  

  // API.get('shopsApi', `/shops/${id}`, {}).then((result) => {
  //   const shopApiData = JSON.parse(result.body);
  //   console.log(shopApiData, 'shop api data')
  // }).catch(err => {
  //   console.log(err, 'api error');
  // })

  useEffect(() => {
    if (props.shop !== null) {
      
    if (shop.images !== null) {
      const imageArray = shop.images
      for (const image of imageArray) {
            
            const dataImage = {image: image}
            data.push(dataImage)
            
          }
          console.log('data images', data)
    }
    setImages(data)
    
  
  }
  }, [props.shop])

  
  const hourArray = hours(shop.hours).map((day) => {
    return (
      <div>
        {day}
      </div>
    )
  })
  const seo = {
    title: shop.name,
    description: 'Find authentic French cuisine near you.',
    url: `https://www.mydomain.com/shops/${shop.name}`
  }

  const imageArray = images.map((image) => {
    console.log(image.image)

    return(
    <img className="business-edit" src={image.image}></img>
    )
  })

  const onSubmit = function () {
    if (name !== null) {
    API.put('shopsApi', `/shops`, { 
      body: {
        id: props.shop.id,
        
        name: name
        
      }
    }).then(result => {
      //const result = JSON.parse(result.body);
      console.log(result)
      setEditDescription(false)
    }).catch(err => {
      console.log(err);
    })
    }
    if (description !== null) {
    API.put('shopsApi', `/shops`, { 
      body: {
        id: props.shop.id,
        description: description,
        
        
      }
    }).then(result => {
      //const result = JSON.parse(result.body);
      console.log(result)
      setEditDescription(false)
    }).catch(err => {
      console.log(err);
    })
    }
    if (hours !== null) {

    
    API.put('shopsApi', `/shops`, { 
      body: {
        id: props.shop.id,
        hours: hoursArrayNew,
        
        
      }
    }).then(result => {
      //const result = JSON.parse(result.body);
      console.log(result)
      setEditDescription(false)
    }).catch(err => {
      console.log(err);
    })
    }
    
  }
  
   
  const editDescriptionButton = function() {
    setEditDescription(true)
  }
      
  function changedescription(event){
    const val=event.target.value
    setDescription(val)
  }
 
  function changename(event){
    const val=event.target.value
    setName(val)
  }

  
  
  return(
    
    <div className="main-body-show">
      
       <Helmet
  title={`${seo.title} | Best of France`}
  meta={[
    {
      name: 'description',
      property: 'og:description',
      content: seo.description,
    },
    { property: 'og:title', content: `${seo.title} | Best of France` },
    { property: 'og:url', content: seo.url },
    { property: 'og:image', content: seo.image },
    { property: 'og:image:type', content: 'image/jpeg' }
    
  ]}
/>
    <div>
      <div className="container">
        <div className="close-display">
          
        </div>
        <div className="title-header">
         <h2>{shop.name}</h2>
         <button onClick={editDescriptionButton}>Edit your business</button>
        </div>
        <div className='display-image'>
        {imageArray}
          
        </div>
        {editDescription === false &&
        <div className="shop-display-information">
        <div >
          <div>
            Description
            {shop.description}
          </div>
          <div className='shop-rating-price'>
            <div className='shop-rating'>
            Rating: {shop.rating}
            <Rating
              
              initialValue={shop.rating}
              size={18}
              label
              fillColor='#ef4236'
              emptyColor='gray'
              className='foo' // Will remove the inline style if applied
            />
            </div>
            <div>
            Price: {shop.price}
            </div>
          </div>
        </div>
        <div>
        Hours:
          {props.shop.hours}
        </div>
        </div>
}
{editDescription &&
        <div className="shop-display-information">
         <FormControl>
       
       <FormLabel>Name</FormLabel>
       <Input placeholder={nameHolder} value={name} onChange={changename} required={true}/>
     </FormControl>

     <FormControl mt={4}>
       <FormLabel>Description</FormLabel>
       <Input placeholder={descriptionHolder} value={description} onChange={changedescription} required={true}/>
     </FormControl>
     <FormControl mt={4}>
       <FormLabel>Hours</FormLabel>
       <Input placeholder={hoursHolder} value={description} onChange={changedescription} required={true}/>
     </FormControl>

    
     
     <button onClick={onSubmit}>Save</button>
        </div>
}
      </div>
        
    </div>
        
          
    </div>
          
  )
}