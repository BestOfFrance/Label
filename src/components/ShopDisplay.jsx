import React, {useState, useEffect} from 'react'
import CloseButton from 'react-bootstrap/CloseButton'
import hours from '../helpers/convertHours'
import './ShopDisplay.css'
import {Rating} from 'react-simple-star-rating';
import { Carousel } from 'react-carousel-minimal';
import { useParams } from "react-router-dom";
import { API } from 'aws-amplify';
import {Helmet} from "react-helmet";



export default function ShopDisplay(props) {
// console.log('display props', props)
  const data = [];
  const  id  = useParams();
  // console.log('id', id.shop)
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
    // console.log(result, 'result')
    const shopApiData = JSON.parse(result.body);
    setShop(shopApiData)
    // console.log(shopApiData, 'shop api data')
    
    
      if (shopApiData.images !== null) {
        const imageArray = shopApiData.images
        for (const image of imageArray) {
              
              const dataImage = {image: image}
              data.push(dataImage)
            }
        setImages(data)
            // console.log('data images', data)
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
        "@type": ${shop.category},
        "address": {
        "@type": ${shop.address[2]},
        "addressLocality": ${shop.address[3]},
        "addressRegion": ${shop.address[2]},
        "streetAddress": ${shop.address[0]}
        },
        "description": ${shop.description},
        "name": ${shop.name},
        "telephone": ${shop.phone}
        }
  `}</script>
  <script type="application/ld+json">{`
      {
        "@context": "OURDOMAN",
        "@type": ${shop.category},
        "address": {
        "@type": "PostalAddress",
        "addressLocality": "New York",
        "addressRegion": "NY",
        "postalCode": "12345",
        "streetAddress": "740 Park Avenue"
        },
        "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": ${shop.rating},
        "reviewCount": ${shop.numberReviews}
        },
        "name": ${shop.name},
        "openingHours": ${shop.viewHours},
        "priceRange": ${shop.price},
        "servesCuisine": [
        "French"
        ],
        "telephone": ${shop.phone},
        "url": ${shop.website}
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