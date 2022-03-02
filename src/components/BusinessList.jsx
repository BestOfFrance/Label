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
  nine : '9:00AM',
  1000: '10:00AM',
  1030: '10:30AM',
  1100: '11:00AM',
  1130: '11:30AM',
  1200: '12:00PM',
  1230: '12:30PM',
  1300: '1:00PM',
  1330: '1:30PM',
  1400: '2:00PM',
  1430: '2:30PM',
  1500: '3:00PM',
  1530: '3:30PM',
  1600: '4:00PM',
  1630: '4:30PM',
  1700: '5:00PM',
  1730: '5:30PM',
  1800: '6:00PM',
  1830: '6:30PM',
  eight: '8:00AM',
  seven: '7:00AM',
  nineThirty: '9:30AM',
  sevenThirty: '7:30AM',
  eightThirty: '8:30AM'

}

export default function BusinessList(props) {
  const [active, setActive] = useState(false);
  // console.log('business props', props)
  const [open, setOpen] = useState(false);
  const [openTime, setOpenTime] = useState("");
  const [openDay, setOpenDay] = useState("")

  const style = props.image;
  useEffect(() => {
   const checkOpen = openNow(props.hours)
   
   if(checkOpen !== undefined) {
    
    console.log(checkOpen)
  if(checkOpen.isOpen === true) {
    const checkCloseDay = checkOpen.tomorrow
    
    setOpen(true);
    if (checkCloseDay !== undefined) {
      setOpenTime(checkCloseDay.close)
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
    <ListGroup.Item as="li" className={`list-item ${active ? "active" : ""} premium`} id={props.id}  onClick={() => {props.onClick(props.latitude, props.longitude, props.shop)}}>
      
          
          <div className='infowrapper-business'>
            <div className='marker-image-div-business' style={{backgroundImage: `url(${style})`}}>
              {/* <img className='marker-image-business' src={props.shop.image}></img> */}
              </div>
              <div className="marker-information">
          <div className='title'>
            <b>{props.shop.name}</b>
          </div>
          <div>
            Phone: <a href="tel:5554280940">{props.shop.phone}</a>
            
          </div>
          <div>
            Address: <a href={`maps.google.com/?ll=${props.shop.latitude},${props.shop.longitude}`}>{props.shop.address}, Vancouver, BC</a>
            
          </div>
          <div className='rating-business'>
            Rating: {props.shop.rating}
            <Rating
              
              initialValue={props.shop.rating}
              size={20}
              label
              fillColor='#ef4236'
              emptyColor='gray'
              className='foo' // Will remove the inline style if applied
            />
            </div>
            
          
          <div>
          {open ? `Open Now until ${hoursObject[openTime]}` : `Closed, opens ${openDay} at ${hoursObject[openTime]}`}
            
            
            </div>
          </div>
          </div>
          
            
            
          
       
      
    </ListGroup.Item>

  )
}