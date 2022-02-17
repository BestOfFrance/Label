import React, { Component, useEffect, useState } from 'react';
import Maps from './components/Map'
import BusinessList from "./components/BusinessList"
import ShopDisplay from "./components/ShopDisplay";
import Marker from './components/Marker';
import Header from './components/Header';
import CMSCard from './components/CMSCard'
import SearchBar from './components/SearchBar'
import axios from 'axios'
import DataButton from './components/DataButton'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ListGroup from 'react-bootstrap/ListGroup';
import './components/list.css'
import DropDown from './components/DropDown'
import Amplify, { API } from 'aws-amplify';
import awsconfig from './aws-exports';
import details from '../api/src/details.js';

Amplify.configure(awsconfig);


const locationDefault = {
  
  lat: 49.2827,
  lng: -123.1207
} 
const mode = "MAP"

// const details = array.details

const detailsArray = [];
for (const detail of details) {
  const detailsObject = {};
  detailsObject.name = detail.name;
  detailsObject.latitude = detail.coordinates.latitude;
  detailsObject.longitude = detail.coordinates.longitude;
  detailsObject.address = detail.location.address1
  detailsObject.phone = detail.display_phone
  detailsObject.image = detail.image_url
  detailsObject.rating = detail.rating
  detailsObject.price = detail.price
  detailsObject.category = detail.category
  detailsObject.hours = [];
  detailsObject.images = [];

  for (const image of detail.photos) {
    detailsObject.images.push(image)
  }
  
  for (const day of detail.hours[0].open) {
    
    const hours = {open: day.start, close: day.end, day: day.day}
    
    const stringHours = JSON.stringify(hours)
    
    detailsObject.hours.push(stringHours)
    
  }
  detailsArray.push(detailsObject)
}





export default function Application(props) {
  const [state, setState] = useState({
    shops: [],
    location: locationDefault,
    mode: mode,
    shopID: 0,
    selected: null, 
    categories: ["Restaurant", "Pastry Shop", "Bakery", "Grocery"],
    topThree: [],
    searchSelected: "",
    searchList: []
    
  })


  //aws data
  

const getData = function() {
  for (const detail of detailsArray) {
    const saveShop = async () => {
      const data = {
        body: {
          name: detail.name,
          latitude: detail.latitude,
          longitude: detail.longitude,
          address: detail.address,
          phone: detail.phone,
          image: detail.image,
          rating: detail.rating,
          price: detail.price,
          hours: detail.hours,
          images: detail.images,
          category: detail.category
  
        }
      }
      const apiData = await API.post('shopsapi', '/shops', data);
      console.log({apiData})
    }
    saveShop()
  
  }
}


  
  // set state for marker selection
const [selectedCenter, setSelectedCenter] = useState(null);




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


const updateSearch = (e, value) => {
  //set selection to the value selected
  if (!value) {
    e.preventDefault();
    return;
  }
  console.log(value, 'value')
  setState((prev) => ({ ...prev, searchSelected: value, location: {lat: value.latitude, lng: value.longitude} }));
  setSelectedCenter(value)
};

const goToMap = function (latitude, longitude, selectedCenter) {
  setState((prev) => ({ ...prev, location: {lat: latitude, lng: longitude} }))
  setSelectedCenter(selectedCenter)
}
// set up the list of shops on the side
const items = state.topThree.map((shop, index) => {
  if (state.categories.includes(shop.category)) {
    return(
      <BusinessList 
      key={index} 
      name={shop.name} 
      id={shop.id} 
      selectedCenter={selectedCenter} 
      image={shop.image} 
      distance={shop.distance} 
      onClick={goToMap} 
      shop={shop} 
      hours={shop.hours}
      state={state.shops}
      rating={shop.rating}
      price={shop.price}
      latitude={shop.latitude} 
      longitude={shop.longitude}/>
    )
  }
    
  


})



const cms = state.shops.map((shop, index) => {
  if (state.categories.includes(shop.category)) {
    return(
      <CMSCard className="cms" key={index} name={shop.name} id={shop.id} selectedCenter={selectedCenter} image={shop.image} distance={shop.distance} onClick={goToMap} shop={shop} state={state.shops} latitude={shop.latitude} longitude={shop.longitude} />
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
  const searchList = []
  for (const shop of res.data) {
    const newShop = {name: shop.name, id: shop.id, latitude: shop.latitude, longitude: shop.longitude}
    searchList.push(newShop)
  }
  setState((prev) => ({ ...prev, shops: res.data, searchList: searchList}))
  
})
.catch((err) => {
  console.log(err)
})
}, [state.location]);
//  console.log(state.category)
// create pins for each shop
// console.log('state location', state.location)
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
      image={center.image}
      onClickShop={openShopWindow}
      shop={center}
      />
    )
  }
  
  
})

  return(
    <div>
      
      
      <Header/>
      <DataButton onClick={getData}></DataButton>
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
        <SearchBar
        
        searchSelected={state.searchSelected}
        updateSearch={updateSearch}
        searchList={state.searchList}
        />
        <div className="list">
        
        <ListGroup as="ul" className="cms-cards">
          {cms}
       </ListGroup>
        </div>
      </div>
      </div>
      }
      <div>
      {state.mode === "DISPLAY" &&
        <ShopDisplay shops={state.selected} onClick={closeShopWindow} rating={state.selected.rating}
        price={state.selected.price}/>
      }
      </div>
    </div>
  )
}
  
 
  
  
