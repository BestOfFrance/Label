import {React, useState, useEffect} from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import './list.css'



export default function CMSCard(props) {
  const [active, setActive] = useState(false);
  

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
    
    <ListGroup.Item as="li" className={`list-item ${active ? "active" : ""}`} id={props.id}  onClick={() => {props.onClick(props.latitude, props.longitude, props.shop)}} >
      <div style={styles} className="list-images">
      

      </div>
      <div>
        
     <b> {props.title} </b>
     
      </div>
      <div>
        
      {props.name} 
      </div>
      <div>
        
      {props.shop.category} 
      </div>
      
    </ListGroup.Item>
    

  )
}