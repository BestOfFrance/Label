import {React, useState, useEffect} from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import './list.css'



export default function BusinessList(props) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (props.selectedCenter !== null) {
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
        width: '30vw',
        height: '20vh'
    
};

  return(
    <ListGroup.Item as="li" className={`list-item ${active ? "active" : ""}`} id={props.id} style={styles} onClick={() => {props.onClick(props.shop)}}>
      <div className='list-name'>
      {props.name}  Distance: {props.distance}KM

      </div>
      
    </ListGroup.Item>

  )
}