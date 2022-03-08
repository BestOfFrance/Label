import {React, useState, useEffect} from 'react';
import styled from 'styled-components';
import './marker.css'
import CloseButton from 'react-bootstrap/CloseButton'
import openNow from '../helpers/openNow'
import {Rating} from 'react-simple-star-rating';
import SeeButton from './SeeButton'
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
  
  const [open, setOpen] = useState(false);
  const [openTime, setOpenTime] = useState("");
  const [openDay, setOpenDay] = useState("")
  const [background, setBackground] = useState('none')
  useEffect(() => {
    
   
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
  if (props.category === "Bakery" || props.category === "Cafe" ) {
    setBackground('url("croissant-2.svg")');
   } else if (props.category === "Pastry Shop" || props.category === "Cake shop" || props.category === "Dessert shop"){
      
      setBackground('url("cupcake.svg")');
    
   } else if (props.category === "Restaurant" || props.category === "Bistro" || props.category === "Breakfast Restaurant" || props.category === "Charcuterie" || props.category === "Diner" || props.category === "Family restaurant" || props.category === "Fine dining restaurant" || props.category === "French restaurant") {
    setBackground('url("cutlery.svg")');
    
   } else if (props.category === "Grocery" || props.category === "Cheese shop" || props.category === "Chocolate shop" || props.category === "Convenience store" || props.category === "Grocery store") {
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

 console.log(props.signedIn)

  return (
    <div id="marker-div">
      {showSelected && 
      (
        <div id="marker-info" >
          <div className='close'>
            <CloseButton onClick={props.onClicking}></CloseButton>
          </div>
          <div className='infowrapper'>
            <div className='marker-image-div'>
              <img className='marker-image' src={props.image}></img>
              </div>
              <div className="marker-information">
          <div className='title'>
            <b>{props.text}</b>
          </div>
          <div>
            Phone: <a href="tel:5554280940">{props.phone}</a>
            
          </div>
          <div>
            Address: <a href={`maps.google.com/?ll=${props.latitude},${props.longitude}`}>{props.address}, Vancouver, BC</a>
            
          </div>
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
            {props.shop.price}
            </div>
            
            
          
          <div>
          {open ? 'Open Now' : `Closed, opens ${openDay} at ${openTime}`}
            
            </div>
            <div>
              {props.signedIn === true ? <SeeButton shop={props.shop} onClickShop={props.onClickShop} text={"see more"}/> : <SeeButton   text={"Sign in to see more information"}/>}
           
            
            </div>
            
          </div>
          </div>
          
            
            
          
        </div>
      )}
      <div id="actual-marker">
        <Wrapper
          onClick={props.onClick}
          alt={props.text}
          style={{backgroundImage: background, zIndex: style}}
        />
      </div>
    </div>
  )
 
}