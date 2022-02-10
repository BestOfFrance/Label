import {React, useState, useEffect} from 'react';
import styled from 'styled-components';
import './marker.css'
import CloseButton from 'react-bootstrap/CloseButton'
import hours from '../helpers/convertHours'
import {Rating} from 'react-simple-star-rating';

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 18px;
  height: 18px;
  background-color: #000;
  border: 2px solid #fff;
  border-radius: 100%;
  user-select: none;
  transform: translate(-50%, -50%);
  cursor: ${(props) => (props.onClick ? 'pointer' : 'default')};
  &:hover {
    z-index: 1;
  }
`;

export default function Marker(props) {
  const [showSelected, setShow] = useState(false)
  

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
            {props.text}
          </div>
          <div>
            Phone: {props.phone}
            
          </div>
          <div>
            Address: {props.address}, Vancouver, BC
            
          </div>
          <div>
            Rating: {props.rating}
            <Rating
              
              initialValue={props.rating}
              size={20}
              label
              fillColor='orange'
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