import {React, useState, useEffect} from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import './list.css'
import { Routes, Route, Link, Navigate } from "react-router-dom";



export default function CMSCard(props) {
  const [active, setActive] = useState(false);
  const [hidden, setHidden] =useState("visible")

  useEffect(() => {
    if (props.shop.hidden === true) {
      setHidden("hidden")
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
      
      <div className="cms-button-container">
      <div >
        
      <h3 className="cms-card-title-each">{props.name} </h3>
      {props.shop.price}
      </div>
      <div className="locate-container">
        <button onClick={() => {props.onClick(props.latitude, props.longitude, props.shop)}}><img className="cms-button-image" src="place.svg"></img></button>
        
      </div>
      </div>
      <div className="cms-button-container"> 
      <div>
        
      {props.shop.category} 
      </div>
      <button>
      <Link to={`reportbusiness/${props.name}`} ><img className="cms-button-image" src="report.svg"/></Link>
      </button>

      </div>
      
    </ListGroup.Item>
    

  )
}