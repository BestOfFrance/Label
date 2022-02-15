import {React, useState, useEffect} from 'react';
import styled from 'styled-components';
import './marker.css'
import CloseButton from 'react-bootstrap/CloseButton'
import openNow from '../helpers/openNow'
import {Rating} from 'react-simple-star-rating';
import SeeButton from './SeeButton'

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
    if (openNow(props.hours)) {
      setOpen(true);
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
    

  }, [props.show2])

  

  

 useEffect(() => {
  if (props.category === "Bakery") {
    setBackground('url("croissant-2.svg")');
   } else if (props.category === "Pastry Shop"){
      
      setBackground('url("cupcake.svg")');
    
   } else if (props.category === "Restaurant") {
    setBackground('url("cutlery.svg")');
    
   } else if (props.category === "Grocery") {
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
            
          
          <div>
            {open ? 'Open Now' : 'Closed'}
            
            
            </div>
            <div>
           <SeeButton shop={props.shop} onClickShop={props.onClickShop}/>
            
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