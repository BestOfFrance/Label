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


//will be setting this to geolocation of users API
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
    shopID: 0,
    selected: null
  })

  // set state for marker selection
const [selectedCenter, setSelectedCenter] = useState(null);



// create pins for each shop
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
    image={center.image}
    phone={center.phone}
    address={center.address}
    onClicking={() => {
      setSelectedCenter(false)
    }}
    hours={center.hours}
    />
  )
})
// get distance from center of map to markers and update
var markersByDistance = [];
const getDistance = function(markers, myLatlng) {
  
  // console.log(markers, 'markers')
  // console.log(myLatlng, 'll')
for ( var i = 0; i < markers.length; i++ ) {
    var marker = markers[i];

    // using pythagoras does not take into account curvature, 
    // but will work fine over small distances.
    // you can use more complicated trigonometry to 
    // take curvature into consideration
    var dx = myLatlng.lng - marker.longitude;
    var dy = myLatlng.lat - marker.latitude;
    
    var distance = Math.sqrt( dx * dx + dy * dy );

    markersByDistance[ i ] = marker;
    markersByDistance[ i ].distance = distance;

}

// function to sort your data...
function sorter (a,b) { 
    return a.distance > b.distance ? 1 : -1;
}

// sort the array... now the first 5 elements should be your closest points.
markersByDistance.sort( sorter );
console.log(markersByDistance)
setState((prev) => ({ ...prev, shops: markersByDistance }))
}

// set function to get the disatnce every time the map scrolls
const onChange = function({center, zoom}) {
  
  getDistance(state.shops, center)
}

//set show mode to show shop information
const openShopWindow = function(shop) {
  setState((prev) => ({ ...prev, mode: "DISPLAY", selected: shop }))
}



// set up the list of shops on the side
const items = state.shops.map((shop, index) => {
    
  return(
    <BusinessList key={index + 1} name={shop.name} id={index+1} selectedCenter={selectedCenter} image={shop.image} distance={shop.distance} onClick={openShopWindow} shop={shop}/>
  )


})

console.log('shops state', state.shops)

const closeShopWindow = function() {
  setState((prev) => ({ ...prev, mode: mode }))
}



// initial call to the api to get shop datas
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


  return(
    <div>
      {state.mode === mode && 
      <div>
      <h2 className="map-h2">Label</h2>
      <div class="main-container">
        <Maps location={state.location} zoomLevel={17} shops={state.shops} marker={pin} onChange={onChange}/>
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
        <ShopDisplay shops={state.selected} onClick={closeShopWindow}/>
      }
      </div>
    </div>
  )
}
  
 
  
  
