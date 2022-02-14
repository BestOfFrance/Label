import React, { Component, useEffect, useState } from 'react';
import Maps from './components/Map'
import BusinessList from "./components/BusinessList"
import ShopDisplay from "./components/ShopDisplay";
import Marker from './components/Marker';
import Header from './components/Header';
import CMSCard from './components/CMSCard'
import axios from 'axios'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ListGroup from 'react-bootstrap/ListGroup';
import './components/list.css'
import DropDown from './components/DropDown'


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
    selected: null, 
    categories: ["Restaurant", "Pastry Shop", "Bakery", "Grocery"],
    topThree: []
  })

  // set state for marker selection
const [selectedCenter, setSelectedCenter] = useState(null);



// create pins for each shop
const pin = state.shops.map((center, index) => {
  if (state.categories.includes(center.category)) {
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
      show2={state.shops}
      image={center.image}
      phone={center.phone}
      address={center.address}
      onClicking={() => {
        setSelectedCenter(false)
      }}
      hours={center.hours}
      rating={center.rating}
      category={center.category}
      />
    )
  }
  
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
const topThreeShops = markersByDistance.slice(0,3)
setState((prev) => ({ ...prev, topThree: topThreeShops}))
}

// set function to get the disatnce every time the map scrolls
const onChange = function({center, zoom}) {
  
  getDistance(state.topThree, center)
}

//set show mode to show shop information
const openShopWindow = function(shop) {
  setState((prev) => ({ ...prev, mode: "DISPLAY", selected: shop }))
}



// set up the list of shops on the side
const items = state.topThree.map((shop, index) => {
  if (state.categories.includes(shop.category)) {
    return(
      <BusinessList key={index} name={shop.name} id={shop.id} selectedCenter={selectedCenter} image={shop.image} distance={shop.distance} onClick={openShopWindow} shop={shop} state={state.shops}/>
    )
  }
    
  


})

const cms = state.shops.map((shop, index) => {
  if (state.categories.includes(shop.category)) {
    return(
      <CMSCard className="cms" key={index} name={shop.name} id={shop.id} selectedCenter={selectedCenter} image={shop.image} distance={shop.distance} onClick={openShopWindow} shop={shop} state={state.shops} latitude={shop.latitude} longitude={shop.longitude}/>
    )
  }
    
  


})

// console.log('shops state', state.shops)

const closeShopWindow = function() {
  setState((prev) => ({ ...prev, mode: mode }))
}

const onFilter = function(data) {
  setState((prev) => ({ ...prev, categories: [...data] }))
}



// initial call to the api to get shop datas
useEffect( () => {
  axios.get("http://localhost:3001/")
.then((res) => {
  // console.log(res)
  getDistance(res.data, state.location)
  setState((prev) => ({ ...prev, shops: res.data}))
  
})
.catch((err) => {
  console.log(err)
})
}, [state.location]);
//  console.log(state.category)

  return(
    <div>
      
      
      <Header/>
      {state.mode === mode && 
      <div>
      <div className="main-container">
        <div className="premium-map">
        <div className="premium-list">
        <h3>Premium Card</h3>
        
          <div className="cms">
          
        <ListGroup as="ul" id="premium">
          {items}
       </ListGroup>
       </div>
          </div>
        <Maps location={state.location} zoomLevel={17} shops={state.shops} marker={pin} onChange={onChange} onFilter={onFilter}>
        
        </Maps>
        </div>
        <div className="list">
        
        <ListGroup as="ul" >
          {cms}
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
  
 
  
  
