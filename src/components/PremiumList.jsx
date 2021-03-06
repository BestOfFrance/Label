import {React, useState, useEffect} from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import './list.css'



export default function PremiumList(props) {
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
        width: '400px',
        height: '20vh'
    
};

  return(
    
    <ListGroup.Item as="li" className={`list-item-premium ${active ? "active" : ""}`} id={props.id}  onClick={() => {props.onClick(props.latitude, props.longitude, props.shop)}} >
      <div style={styles} className="list-images">
      

      </div>
      <div>
        
     <b> {props.title} </b>
     
      </div>
      <div>
        
      {props.name} 
      </div>
      
    </ListGroup.Item>
    

  )
}