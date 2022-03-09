import React from 'react'
import CloseButton from 'react-bootstrap/CloseButton'
import hours from '../helpers/convertHours'
import './ShopDisplay.css'
import {Rating} from 'react-simple-star-rating';
import { Carousel } from 'react-carousel-minimal';
import { Routes, Route, Link, useParams } from "react-router-dom";
import { API } from 'aws-amplify';


export default function ShopDisplay(props) {
console.log('display props', props)
  const data = [];
  const  id  = useParams();

  console.log(id)

  // API.get('shops', `/shops/${id}`, {}).then((result) => {
  //   const shop = JSON.parse(result.body);
  // }).catch(err => {
  //   console.log(err);
  // })

  let shopArray = []

  for (const shop of props.shops) {
    if (shop.name === id.shop) {
      shopArray.push(shop)
    }
  }

  let shop = shopArray[0]

  if (shop.images !== null) {
    const imageArray = shop.images
    for (const image of imageArray) {
          
          const dataImage = {image: image}
          data.push(dataImage)
        }
        console.log('data images', data)
  }

  
    const hourArray = hours(shop.hours).map((day) => {
      return (
        <div>
          {day}
        </div>
      )
    })
  
  

  
  
  return(
    <div className="main-body-show">
    <div>
      <div className="container">
        <div className="close-display">
          <CloseButton onClick={props.onClick}/>
        </div>
        <div className="title-header">
         <h2>{shop.name}</h2>
        </div>
        <div className='display-image'>
        <Carousel
            data={data}
            time={2000}
            width="850px"
            height="400px"
            
            radius="10px"
            slideNumber={true}
            
            captionPosition="bottom"
            automatic={true}
            dots={true}
            pauseIconColor="white"
            pauseIconSize="40px"
            slideBackgroundColor="darkgrey"
            slideImageFit="cover"
            thumbnails={true}
            thumbnailWidth="100px"
            style={{
              textAlign: "center",
              maxWidth: "850px",
              maxHeight: "500px",
              margin: "40px auto",
            }}
          />
        </div>
        <div className="shop-display-information">
        <div >
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
          {hourArray}
        </div>
        </div>
      </div>
    </div>
    </div>
  )
}