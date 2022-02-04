import React, { Component, useEffect, useState } from 'react';
import Maps from './components/Map'
import BusinessList from "./components/BusinessList"
import ShopDisplay from "./components/ShopDisplay";
import axios from 'axios'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';



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

const markerOnClick = function(id) => {
  
}


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
        <Maps location={state.location} zoomLevel={17} shops={state.shops}/>
        <div class="list">
           <BusinessList shops={state.shops}/>
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
  
 
  
  
