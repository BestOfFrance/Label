import {React, useState, useEffect} from 'react';
import styled from 'styled-components';
import './marker.css'
import CloseButton from 'react-bootstrap/CloseButton'
import openNow from '../helpers/openNow'
import {Rating} from 'react-simple-star-rating';
import SeeButton from './SeeButton'
import { Routes, Route, Link, useParams } from "react-router-dom";
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const Wrapper = styled.div`
position: absolute;
top: 50%;
left: 50%;
width: 40px;
height: 40px;
background-color: #000;
border: 2px solid black;
border-radius: 50%;
user-select: none;
transform: translate(-50%, -50%);

background-repeat: no-repeat;
background-size: 30px;
background-position: center;

cursor: ${(props) => (props.onClick ? 'pointer' : 'default')};
&:hover {
  
  background-color: #1d4383;
  border: 2px solid #1d4383;
}
`;

export default function Marker(props) {
  const [showSelected, setShow] = useState(false)
  const [style, setStyle] = useState(0)
  const [hidden, setHidden] = useState("visible")
  const [price, setPrice] = useState("")
  const [open, setOpen] = useState(false);
  const [openTime, setOpenTime] = useState("");
  const [openDay, setOpenDay] = useState("")
  const [background, setBackground] = useState('none')
  const [transform, setTransform] = useState(null)
  const styleImage = props.image;
 
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
   
    if (props.show !== null) {
      if (props.id === props.show.id) {
        setShow(true)
        setStyle(5)
      } else {
        setShow(false)
        setStyle(0)
      }
    } else {
      setShow(false)
    }
    

  }, [props.show])
  useEffect(() => {
    if (props.shop.hidden === true) {
      setHidden("hidden")
    }
    const checkOpen = openNow(props.hours)
   if(checkOpen !== undefined) {
      // console.log(checkOpen)
    if(checkOpen.isOpen === true) {
      setOpen(true);
      setOpenTime(checkOpen.close)
    } else if (checkOpen.isOpen === false) {
      
      const checkOpenDay = checkOpen.tomorrow
      if (checkOpenDay !== undefined) {
      setOpenDay(days[checkOpenDay.day])
      setOpenTime(checkOpenDay.open)
      }
    }
  }
    // console.log('day, hours', day, hour)
    // console.log(dayArray)
    if (props.show !== null) {
      if (props.id === props.show.id) {
        setShow(true)
        setStyle(5)
      } else {
        setShow(false)
        setStyle(0)
      }
    } else {
      setShow(false)
    }
    

  }, [props.show])

  

  //"Restaurant", "Bistro", "Breakfast Restaurant", "Charcuterie", "Diner", "Family restaurant", "Fine dining restaurant"

 useEffect(() => {
  if (props.category === "Bakery") {
    setBackground('url("madeleine.svg")');
   
   } else if (props.category === "Café"){
      
      setBackground('url("coffee-cup-2.svg")');
    
   } else if (props.category === "Restaurant") {
    setBackground('url("fork.svg")');
    
   } else if (props.category === "Shop") {
    setBackground('url("shop.svg")');
   }
 }, [])
  
 

 
  
  // const hourArray = hours(props.hours).map((day) => {
  //   return (
  //     <div>
  //       {day}
  //     </div>
  //   )
  // })

//  console.log(props, 'marker')

  return (
    <div id="marker-div" style={{visibility: hidden}}>
      {showSelected && 
      (
        <div id="marker-info" >
          <div className='close'>
            <CloseButton onClick={props.onClicking}></CloseButton>
          </div>
          <div className='infowrapper'>
          <div className='marker-image-div-marker' style={{ backgroundImage: `url(${styleImage})` }}>
          {/* <img className='marker-image-business' src={props.shop.image}></img> */}
        </div>
              <div className="marker-information">
              <div className='title-business'>
            <b>{props.text}</b>
          </div>
          <div className="price-rating-cards">
          <div className='rating'>
            Rating: {props.rating}
            <Rating
              
              initialValue={props.rating}
              size={20}
              label
              fillColor='#ef4236'
              emptyColor='gray'
              className='foo' // Will remove the inline style if applied
            />
            </div>
            <div >
            {price === 1 &&
            <div><img className="price-image" src="dollar.svg"></img></div>
          }     
          {price === 2 &&
            <div><img className="price-image" src="dollar.svg"></img><img className="price-image" src="dollar.svg"></img></div>
          }      
          {price === 3 &&
            <div><img className="price-image" src="dollar.svg"></img><img className="price-image" src="dollar.svg"></img><img  className="price-image" src="dollar.svg"></img></div>
          }        
            </div>
            </div>
          <div>
            Phone: <a href="tel:5554280940">{props.phone}</a>
            
          </div>
          <div>
            Address: <a href={props.shop.mapUrl}>{`${props.shop.address[0]}, ${props.shop.address[1]}, ${props.shop.address[2]}`}</a>
            
          </div>
          
            
            
          
          <div>
          {open ? 'Open Now' : `Closed, opens ${openDay} at ${openTime}`}
            
            </div>
            <div>
              {props.signedIn === true ? <Link to={`shops/${props.shop.id}`} ><SeeButton shop={props.shop}   text={"see more"}/></Link> : <SeeButton   text={"Sign in to see more information"}/>}
           
            
            </div>
            
          </div>
          </div>
          
            
            
          
        </div>
      )}
      <div id="actual-marker">
        <Wrapper
          onClick={props.onClick}
          alt={props.text}
          style={{backgroundImage: background, zIndex: style, transform: transform}}
        />
      </div>
    </div>
  )
 
}