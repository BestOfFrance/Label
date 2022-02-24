import {React, useState, useEffect} from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import {Rating} from 'react-simple-star-rating';
import openNow from '../helpers/openNow'
import './list.css'



export default function BusinessList(props) {
  const [active, setActive] = useState(false);
  // console.log('business props', props)
  const [open, setOpen] = useState(false);
  const [openTime, setOpenTime] = useState("");

  useEffect(() => {
   const checkOpen = openNow(props.hours)
   
    if(checkOpen.isOpen === true) {
      setOpen(true);
      // setOpenTime(checkOpen.tomorrow.open)
    } else {
      const checkOpenDay = checkOpen.tomorrow
     
      setOpenTime(checkOpenDay.open)
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
    <ListGroup.Item as="li" className={`list-item ${active ? "active" : ""}`} id={props.id}  onClick={() => {props.onClick(props.latitude, props.longitude, props.shop)}}>
      
          
          <div className='infowrapper-business'>
            <div className='marker-image-div-business'>
              <img className='marker-image-business' src={props.shop.image}></img>
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
          {open ? 'Open Now' : `Closed, opens tomorrow at ${openTime}`}
            
            
            </div>
          </div>
          </div>
          
            
            
          
       
      
    </ListGroup.Item>

  )
}