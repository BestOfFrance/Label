import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';



export default function BusinessList(props) {

  const items = props.shops.map((shop) => {
    return(
      <ListGroup.Item as="li" >
        {shop.name}
      </ListGroup.Item>
    )
  })


  return(
    <ListGroup as="ul">
      {items}
    </ListGroup>


  )
}