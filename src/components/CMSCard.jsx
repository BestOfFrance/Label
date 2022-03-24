import {React, useState, useEffect} from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import './list.css'
import { Routes, Route, Link, Navigate } from "react-router-dom";
import {Rating} from 'react-simple-star-rating';



export default function CMSCard(props) {
  const [active, setActive] = useState(false);
  const [hidden, setHidden] = useState("visible")
  const [price, setPrice] = useState("")

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
  console.log(props.shop.hidden)
  if (props.shop.hidden === true) {
    setHidden("hidden")
  }
}, [])
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


  

  
  const styles = {
   
        backgroundImage: `url(${props.image})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        
    
};

  return(
    
    <ListGroup.Item as="li" className={`list-item ${active ? "active" : ""}`} id={props.id}  style={{visibility: hidden}} >
      <div style={styles} className="list-images">
      

      </div>
      
      <div className="cms-button-container-upper">
        <div className="title-rating-cards">
        {props.shop.name}
      <div className="price-rating-cards">
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
            </div>
            {props.shop.category} 
      {/* <div className="locate-container">
        <button className="cms-button" onClick={() => {props.onClick(props.latitude, props.longitude, props.shop)}}><img className="cms-button-image" src="place.svg"></img></button>
        
      
      </div> */}
      </div>
      <div className="cms-button-container"> 
      <div className="cms-button-div">
      
        <button className="cms-button" onClick={() => {props.onClick(props.latitude, props.longitude, props.shop)}}><img className="cms-button-image" src="place.svg"></img></button>
        
      
      
        
      
      </div>
      <div className="cms-button-div">
      <button className="cms-button">
      <Link to={`reportbusiness/${props.name}`} ><img className="cms-button-image" src="report.svg"/></Link>
      </button>
</div>
      </div>
      
    </ListGroup.Item>
    

  )
}