import {React, useState, useEffect} from 'react';
import styled from 'styled-components';
import './marker.css'
import CloseButton from 'react-bootstrap/CloseButton'

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
//  console.log('marker props', props.hours)

//  const hoursArray = props.hours.split('},')
// //  console.log(hoursArray)
//  const nextHours = [];
//  for (const day of hoursArray) {
//    if (day[day.length - 1] !== '}') {
//     nextHours.push(`${day}}`)
//    } else {
//      nextHours.push(day)
//    }
   
//  }
//  const dayArray = [];
//  for (const day of nextHours) {
//    const dayObj = JSON.parse(day)
//    dayArray.push(dayObj)
//  }
//  const realHours = [];
//  function tConvert (time) {
  
//   const hour = `${time[0]}${time[1]}`
//   const numberHour = parseInt(hour)
//   const newHour = (numberHour % 12) || 12;
//   console.log(newHour)
//   const minute = `${time[2]}${time[3]}`
//   const AmOrPm = hour >= 12 ? 'pm' : 'am';
//   return `${newHour}:${minute}${AmOrPm}`
  
// }

//  for (const day of dayArray) {
//   realHours.push({open: tConvert(day.open), close: tConvert(day.close)})
//  }

//  const realHoursObject = []
//  for (let i = 0; i < realHours.length; i++) {
//    if (i = 0 && realHours[i].open) {
//      realHoursObject.push(`Monday: ${realHours[i].open} - ${realHours[i].close}`)
//    }
   
//  }
//  console.log(realHoursObject)

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
            Hours
            
            
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