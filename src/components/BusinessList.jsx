import { urlSafeDecode } from '@aws-amplify/core';
import {React, useState, useEffect} from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import {Rating} from 'react-simple-star-rating';
import openNow from '../helpers/openNow'
import './list.css'

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const nine = parseInt('0900', 8)
const nineThirty = parseInt('0930', 8)
const eight = parseInt('0800', 8)
const eightThirty = parseInt('0830', 8)
const seven = parseInt('0700', 8)
const sevenThirty = parseInt('0730', 8)
const hoursObject = {
  nine : '9:00 AM',
  1000: '10:00 AM',
  1030: '10:30 AM',
  1100: '11:00 AM',
  1130: '11:30 AM',
  1200: '12:00 PM',
  1230: '12:30 PM',
  1300: '1:00 PM',
  1330: '1:30 PM',
  1400: '2:00 PM',
  1430: '2:30 PM',
  1500: '3:00 PM',
  1530: '3:30 PM',
  1600: '4:00 PM',
  1630: '4:30 PM',
  1700: '5:00 PM',
  1730: '5:30 PM',
  1800: '6:00 PM',
  1830: '6:30 PM',
  eight: '8:00 AM',
  seven: '7:00 AM',
  nineThirty: '9:30 AM',
  sevenThirty: '7:30 AM',
  eightThirty: '8:30 AM',
  1900: '7:00 PM',
  1930: '7:30 PM',
  2000: '8:00 PM',
  2030: '8:30 PM',
  2100: '9:00 PM',
  2130: '9:30 PM',
  2200: '10:00 PM',
  2230: '10:30 PM',
  2300: '11:00 PM',
  2330: '11:30 PM'

}

export default function BusinessList(props) {
  const [active, setActive] = useState(false);
  // console.log('business props', props)
  const [open, setOpen] = useState("visible");
  const [openTime, setOpenTime] = useState("");
  const [openDay, setOpenDay] = useState("")
  const [hidden, setHidden] = useState(false)
  const [price, setPrice] = useState("")

  const style = props.image;
  useEffect(() => {
    if (props.shop.price) {
      if (props.shop.price.length === 1) {
        setPrice(1)
      }
      if (props.shop.price.length === 2) {
        setPrice(2)
      }
      if (props.shop.price.length === 3) {
        setPrice(2)
      }
    }
    if (props.shop.hidden === true) {
      setHidden("hidden")
    }
   const checkOpen = openNow(props.hours)
   
   if(checkOpen !== undefined) {
    
    console.log(checkOpen)
  if(checkOpen.isOpen === true) {
    
    
    setOpen(true);
    if (checkOpen.close !== undefined) {
      setOpenTime(checkOpen.close)
      // console.log(checkCloseDay.close)
    }
    // setOpenTime(checkOpen.tomorrow.open)
  } else if (checkOpen.isOpen === false) {
    
    const checkOpenDay = checkOpen.tomorrow
    if (checkOpenDay !== undefined) {
    setOpenDay(days[checkOpenDay.day])
    setOpenTime(checkOpenDay.open)
    }
  }
}
    
    if (props.selectedCenter !== null) {
    //   console.log('props.id', props.id)
    // console.log('props.selectedCenter', props.selectedCenter.id)
      if (props.id === props.selectedCenter.id) {
        setActive(true);
      } else {
        setActive(false);
      }
    }
   
  }, [props.state])
  console.log(price, 'price')
  useEffect(() => {
    
    if (props.selectedCenter !== null) {
    //   console.log('props.id', props.id)
    // console.log('props.selectedCenter', props.selectedCenter.id)
      if (props.id === props.selectedCenter.id) {
        setActive(true);
      } else {
        setActive(false);
      }
    }
   
  }, [props.selectedCenter])

  

  return(
    <ListGroup.Item as="li" className={`list-item ${active ? "active" : ""} premium`} id={props.id} style={{ visibility: hidden }}>


      <div className={`infowrapper-business ${active ? "active" : ""}`} >
        <div className='marker-image-div-business' style={{ backgroundImage: `url(${style})` }}>
          {/* <img className='marker-image-business' src={props.shop.image}></img> */}
        </div>
        
        <div className="marker-information-cms">
        <div className="locate-info-container">
          <div className='title-business'>
            {props.shop.name}
          </div>
          <div className="price-rating-cards">
            <div className='rating-business'>
              Rating: {props.shop.rating}
              {props.shop.rating === 0 &&
            <div>
              <img src="emptyStar.svg" className="rating-star-map"></img><img src="emptyStar.svg" className="rating-star-map"></img><img src="emptyStar.svg" className="rating-star-map"></img><img src="emptyStar.svg" className="rating-star-map"></img><img src="emptyStar.svg" className="rating-star-map"></img>
            </div>
            }
            {props.shop.rating === 0.5 &&
            <div>
              <img src="rating.svg"></img><img src="emptyStar.svg" className="rating-star-map"></img><img src="emptyStar.svg" className="rating-star-map"></img><img src="emptyStar.svg" className="rating-star-map"></img><img src="emptyStar.svg" className="rating-star-map"></img>
            </div>
            }
            {props.shop.rating === 1 &&
            <div>
              <img src="star.svg" className="rating-star-map"></img><img src="emptyStar.svg" className="rating-star-map"></img><img src="emptyStar.svg" className="rating-star-map"></img><img src="emptyStar.svg" className="rating-star-map"></img><img src="emptyStar.svg" className="rating-star-map"></img>
            </div>
            }
            {props.shop.rating === 1.5 &&
            <div>
              <img src="star.svg" className="rating-star-map"></img><img src="rating.svg"></img><img src="emptyStar.svg" className="rating-star-map"></img><img src="emptyStar.svg" className="rating-star-map"></img><img src="emptyStar.svg" className="rating-star-map"></img>
            </div>
            }
            {props.shop.rating === 2 &&
            <div>
              <img src="star.svg" className="rating-star-map"></img><img src="star.svg" className="rating-star-map"></img><img src="emptyStar.svg" className="rating-star-map"></img><img src="emptyStar.svg" className="rating-star-map"></img><img src="emptyStar.svg" className="rating-star-map"></img>
            </div>
            }
            {props.shop.rating === 2.5 &&
            <div>
              <img src="star.svg" className="rating-star-map"></img><img src="star.svg" className="rating-star-map"></img><img src="rating.svg" className="rating-star-map"></img><img src="emptyStar.svg" className="rating-star-map"></img><img src="emptyStar.svg" className="rating-star-map"></img>
            </div>
            }
             {props.shop.rating === 3 &&
            <div>
              <img src="star.svg" className="rating-star-map"></img><img src="star.svg" className="rating-star-map"></img><img src="star.svg" className="rating-star-map"></img><img src="emptyStar.svg" className="rating-star-map"></img><img src="emptyStar.svg" className="rating-star-map"></img>
            </div>
            }
            {props.shop.rating === 3.5 &&
            <div>
              <img src="star.svg" className="rating-star-map"></img><img src="star.svg" className="rating-star-map"></img><img src="star.svg" className="rating-star-map"></img><img src="rating.svg" className="rating-star-map"></img><img src="emptyStar.svg" className="rating-star-map"></img>
            </div>
            }
            {props.shop.rating === 4 &&
            <div>
              <img src="star.svg" className="rating-star-map"></img><img src="star.svg" className="rating-star-map"></img><img src="star.svg" className="rating-star-map"></img><img src="star.svg" className="rating-star-map"></img><img src="emptyStar.svg" className="rating-star-map"></img>
            </div>
            }
            {props.shop.rating === 5 &&
            <div>
              <img src="star.svg" className="rating-star-map"></img><img src="star.svg" className="rating-star-map"></img><img src="star.svg" className="rating-star-map"></img><img src="star.svg" className="rating-star-map"></img><img src="star.svg" className="rating-star-map"></img>
            </div>
            }
            {props.shop.rating === 4.5 &&
            <div>
              <img src="star.svg" className="rating-star-map"></img><img src="star.svg" className="rating-star-map"></img><img src="star.svg" className="rating-star-map"></img><img src="star.svg" className="rating-star-map"></img><img className="rating-star-map" src="rating.svg"></img>
            </div>
            }
            </div>
            <div>
              {price === 1 &&
                <div><img className="price-image" src="dollar.svg"></img></div>
              }
              {price === 2 &&
                <div><img className="price-image" src="dollar.svg"></img><img className="price-image" src="dollar.svg"></img></div>
              }
              {price === 3 &&
                <div><img className="price-image" src="dollar.svg"></img><img className="price-image" src="dollar.svg"></img><img className="price-image" src="dollar.svg"></img></div>
              }

            </div>
          </div>
          <div>
            Phone: <a href="tel:5554280940">{props.shop.phone}</a>

          </div>
          <div>
            Address: <a href={props.shop.mapUrl}>{`${props.shop.address[0]}, ${props.shop.address[1]}, ${props.shop.address[2]}`}</a>

          </div>



          <div>
            {open ? `Open Now until ${hoursObject[openTime]}` : `Closed, opens ${openDay} at ${hoursObject[openTime]}`}


          </div>
          </div>
          <div className="locate-business-container">
            <button className="locate-button-business" onClick={() => { props.onClick(props.latitude, props.longitude, props.shop) }}><img className="business-button-image" src="placeholder.svg"></img></button>
          </div>
        </div>

      </div>






    </ListGroup.Item>

  )
}