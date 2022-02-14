import {React, useState, useEffect} from 'react';
import styled from 'styled-components';
import './marker.css'
import CloseButton from 'react-bootstrap/CloseButton'
import hours from '../helpers/convertHours'
import {Rating} from 'react-simple-star-rating';

// const Wrapper = styled.div`
// position: absolute;
// top: 50%;
// left: 50%;
// width: 40px;
// height: 40px;
// background-color: #000;
// border: 2px solid black;
// border-radius: 50%;
// user-select: none;
// transform: translate(-50%, -50%);
// background-image: url("croissant-2.svg");
// background-repeat: no-repeat;
// background-size: 30px;
// background-position: center;
// cursor: ${(props) => (props.onClick ? 'pointer' : 'default')};
// &:hover {
//   z-index: 1;
//   background-color: #1d4383;
//   border: 2px solid #1d4383;
// }
// `;

export default function Marker(props) {
  const [showSelected, setShow] = useState(false)
  const [url, setUrl] = useState('crossaint-2.svg')



let Wrapper = '';
  if (props.category === "Bakery") {
    Wrapper = styled.div`
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
    background-image: url("croissant-2.svg");
    background-repeat: no-repeat;
    background-size: 30px;
    background-position: center;
    cursor: ${(props) => (props.onClick ? 'pointer' : 'default')};
    &:hover {
      z-index: 1;
      background-color: #1d4383;
      border: 2px solid #1d4383;
    }
  `;
  } else if (props.category === "Pastry Shop"){
    Wrapper = styled.div`
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
    background-image: url("cupcake.svg");
    background-repeat: no-repeat;
    background-size: 30px;
    background-position: center;
    cursor: ${(props) => (props.onClick ? 'pointer' : 'default')};
    &:hover {
      z-index: 1;
      background-color: #1d4383;
      border: 2px solid #1d4383;
    }
  `;
  } else if (props.category === "Restaurant") {
    Wrapper = styled.div`
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
    background-image: url("cutlery.svg");
    background-repeat: no-repeat;
    background-size: 30px;
    background-position: center;
    cursor: ${(props) => (props.onClick ? 'pointer' : 'default')};
    &:hover {
      z-index: 1;
      background-color: #1d4383;
      border: 2px solid #1d4383;
    }
  `;
  } else if (props.category === "Grocery") {
    Wrapper = styled.div`
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
    background-image: url("shop.svg");
    background-repeat: no-repeat;
    background-size: 30px;
    background-position: center;
    cursor: ${(props) => (props.onClick ? 'pointer' : 'default')};
    &:hover {
      z-index: 1;
      background-color: #1d4383;
      border: 2px solid #1d4383;
    }
  `;
  }
 

  useEffect(() => {
    
   
    if (props.show !== null) {
      if (props.id === props.show.id) {
        setShow(true)
      } else {
        setShow(false)
      }
    } else {
      setShow(false)
    }
    

  }, [props.show])
  useEffect(() => {
    
    
    if (props.show !== null) {
      if (props.id === props.show.id) {
        setShow(true)
      } else {
        setShow(false)
      }
    } else {
      setShow(false)
    }
    

  }, [props.show2])
  
  const hourArray = hours(props.hours).map((day) => {
    return (
      <div>
        {day}
      </div>
    )
  })

 

  return (
    <div id="marker-div">
      {showSelected && 
      (
        <div id="marker-info" >
          <div className='close'>
            <CloseButton onClick={props.onClicking}></CloseButton>
          </div>
          <div className='title'>
            <b>{props.text}</b>
          </div>
          <div>
            Phone: <a href="tel:5554280940">{props.phone}</a>
            
          </div>
          <div>
            Address: <a href={`maps.google.com/?ll=${props.latitude},${props.longitude}`}>{props.address}, Vancouver, BC</a>
            
          </div>
          <div>
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
            Hours
            {hourArray}
            
            
          </div>
          
            
            
          
        </div>
      )}
      <div id="actual-marker">
        <Wrapper
          onClick={props.onClick}
          alt={props.text}
          
        />
      </div>
    </div>
  )
 
}