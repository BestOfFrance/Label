import React, {useState, useEffect, componentDidMount} from 'react'
import CloseButton from 'react-bootstrap/CloseButton'
import hours from '../helpers/convertHours'
import './ShopDisplay.css'
import {Rating} from 'react-simple-star-rating';
import { Carousel } from 'react-carousel-minimal';
import { Routes, Route, Link, useParams } from "react-router-dom";
import { API, sectionFooterSecondaryContent } from 'aws-amplify';
import {Helmet} from "react-helmet";



export default function ShopDisplay(props) {
console.log('display props', props)
  const data = [];
  const  id  = useParams();
  console.log('id', id.shop)
  const [shop, setShop] = useState(null)
  const [images, setImages] = useState([])
  const [hourArray, setHourArray] = useState([])
  const [seo, setSeo] = useState('')
  
  
  async function fetchShops() {
    const shopData = await API.get('shopsApi', `/shops/${id.shop}`, {})
    return shopData
  }
  

  
 useEffect(() => {

  fetchShops()
  .then((result) => {
    console.log(result, 'result')
    const shopApiData = JSON.parse(result.body);
    setShop(shopApiData)
    console.log(shopApiData, 'shop api data')
    
      if (shopApiData.images !== null) {
        const imageArray = shopApiData.images
        for (const image of imageArray) {
              
              const dataImage = {image: image}
              data.push(dataImage)
            }
        setImages(data)
            console.log('data images', data)
      }
    
      
        const hoursArray = hours(shopApiData.hours).map((day) => {
          return (
            <div>
              {day}
            </div>
          )
        })
    
        setHourArray(hoursArray)
        const seoText = {
          title: shopApiData.name,
          description: 'Find authentic French cuisine near you.',
          url: `https://www.mydomain.com/shops/${shopApiData.name}`
        }
       setSeo(seoText)
      
  }).catch(err => {
    console.log(err, 'api error');
  })
  

 }, [])
  
 
    
      
  

  
  
  return(
    <div className="main-body-show">
      {shop  &&
      
      <div>
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
  
>

<script type="application/ld+json">{`
      {
        "@context": "OURDOMAIN",
        "@type": "Restaurant",
        "address": {
        "@type": "PostalAddress",
        "addressLocality": "New York",
        "addressRegion": "NY",
        "streetAddress": "740 Park Avenue"
        },
        "description": ${seo.description},
        "name": ${seo.name},
        "telephone": ${seo.phone}
        }
  `}</script>
  <script type="application/ld+json">{`
      {
        "@context": "OURDOMAN",
        "@type": ${seo.category},
        "address": {
        "@type": "PostalAddress",
        "addressLocality": "New York",
        "addressRegion": "NY",
        "postalCode": "12345",
        "streetAddress": "740 Park Avenue"
        },
        "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5",
        "reviewCount": "230"
        },
        "name": "Restaurant Pronto",
        "openingHours": [
        "Mo-Su 13:00-19:00"
        ],
        "priceRange": "$$",
        "servesCuisine": [
        "Italian",
        "Pizza"
        ],
        "telephone": "+12345678900",
        "url": "http://www.pronto-ny.com"
        }
  `}</script>
</Helmet>
    <div>
      <div className="container">
        <div className="close-display">
          <CloseButton onClick={props.onClick}/>
        </div>
        <div className="title-header">
         <h2>{shop.name}</h2>
        </div>
        <div className='display-image'>
          {images.length > 0 &&
        <Carousel
            data={images}
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
}
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
}
    </div>
  )
}