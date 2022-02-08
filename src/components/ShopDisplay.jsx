import React from 'react'
import CloseButton from 'react-bootstrap/CloseButton'
import './ShopDisplay.css'
import { Carousel } from 'react-carousel-minimal';

export default function ShopDisplay(props) {
console.log('display props', props.shops.images)
  const data = [];
  if (props.shops.images !== null) {
    const imageArray = props.shops.images.split(',')
    for (const image of imageArray) {
          
          const dataImage = {image: image}
          data.push(dataImage)
        }
        console.log('data images', data)
  }
  
  
  
  return(
    <div>
      <div className="container">
        <div className="close-display">
          <CloseButton onClick={props.onClick}/>
        </div>
        <div className="title-header">
         <h2>{props.shops.name}</h2>
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
      </div>
    </div>
  )
}