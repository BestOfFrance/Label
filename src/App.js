import React, { Component, useEffect, useState } from 'react';
import Maps from './components/Map'
import BusinessList from "./components/BusinessList"
import ShopDisplay from "./components/ShopDisplay";
import Marker from './components/Marker'
import axios from 'axios'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ListGroup from 'react-bootstrap/ListGroup';
import './components/list.css'



const location = {
  
  lat: 49.2827,
  lng: -123.1207,
} // our location object from earlier
const mode = "MAP"
export default function Application(props) {
  const [state, setState] = useState({
    shops: [],
    location: location,
    mode: mode,
    shopID: 0
  })

  // set state for marker selection
const [selectedCenter, setSelectedCenter] = useState(null);


const items = state.shops.map((shop, index) => {
    
  return(
    <BusinessList name={shop.name} id={index+1} selectedCenter={selectedCenter}/>
  )


})

const pin = state.shops.map((center, index) => {
  return (
    <Marker
    key={index}
    id={center.id}
    text={center.name}
    lat={center.latitude}
    lng={center.longitude}
    onClick={() => {
      setSelectedCenter(center);
   }}
    show={selectedCenter}
    />
  )
})




useEffect( () => {
  axios.get("http://localhost:3001/")
.then((res) => {
  console.log(res)
  setState((prev) => ({ ...prev, shops: res.data }));
  
})
.catch((err) => {
  console.log(err)
})
}, [state.location]);
console.log(state)

  return(
    <div>
      {state.mode === mode && 
      <div>
      <h2 className="map-h2">Label</h2>
      <div class="main-container">
        <Maps location={state.location} zoomLevel={17} shops={state.shops} marker={pin}/>
        <div class="list">
        <ListGroup as="ul">
          {items}
       </ListGroup>
        </div>
      </div>
      </div>
      }
      <div>
      {state.mode === "DISPLAY" &&
        <ShopDisplay shops={state.shops}/>
      }
      </div>
    </div>
  )
}
  
 
  
  
