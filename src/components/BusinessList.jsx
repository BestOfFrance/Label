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
  

  


  return(
    <ListGroup.Item as="li" className={`list-item ${active ? "active" : ""}`} id={props.id}>
      {props.name}
    </ListGroup.Item>

  )
}