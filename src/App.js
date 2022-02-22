import React, { Component, useEffect, useState } from 'react';
import Maps from './components/Map'
import BusinessList from "./components/BusinessList"
import ShopDisplay from "./components/ShopDisplay";
import Marker from './components/Marker';
import Header from './components/Header';
import CMSCard from './components/CMSCard'
import Footer from './components/footer'
import axios from 'axios'
import LoginOrSign from './components/LoginOrSign'
import ConfirmAccount from './components/confirmAccount'
import CreateAccount from './components/CreateAccount'
import CreateAccountFoodie from './components/CreateAccountFoodie'
import NewsDeals from './components/NewsDeals'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ListGroup from 'react-bootstrap/ListGroup';
import './components/list.css'
import DropDown from './components/DropDown'
import Amplify, { urlSafeDecode } from '@aws-amplify/core'
import Api from '@aws-amplify/api-rest'
import awsconfig from './aws-exports';
import details from './details.js';
import getDistance from '../src/helpers/getDistance'
import { Auth } from 'aws-amplify'

function checkUser() {
  Auth.currentAuthenticatedUser()
    .then(
      (user) => {return user}
      
    )
    .catch(err => console.log(err))
}

function signOut() {
  Auth.signOut()
    .then(data => console.log(data))
    .catch(err => console.log(err))
}

Amplify.configure(awsconfig);
Api.configure(awsconfig);

//initial location set to Vancouver, will be set to geographic location of user
const locationDefault = {
  
  lat: 49.2827,
  lng: -123.1207
} 
const mode = "MAP"

//function to manually set the dynamo database, only to be used upon seeding

// const details = array.details

// const detailsArray = [];
// for (const detail of details) {
//   const detailsObject = {};
//   detailsObject.name = detail.name;
//   detailsObject.latitude = detail.coordinates.latitude;
//   detailsObject.longitude = detail.coordinates.longitude;
//   detailsObject.address = detail.location.address1
//   detailsObject.phone = detail.display_phone
//   detailsObject.image = detail.image_url
//   detailsObject.rating = detail.rating
//   detailsObject.price = detail.price
//   detailsObject.category = detail.category
//   detailsObject.hours = [];
//   detailsObject.images = [];

//   for (const image of detail.photos) {
//     detailsObject.images.push(image)
//   }
  
//   for (const day of detail.hours[0].open) {
    
//     const hours = {open: day.start, close: day.end, day: day.day}
    
//     const stringHours = JSON.stringify(hours)
    
//     detailsObject.hours.push(stringHours)
    
//   }
//   detailsArray.push(detailsObject)
// }





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
  //seed the AWS databse


    // const saveShop = async () => {
    //   const data = {
    //     body: {
    //       name: detailsArray[3].name,
    //       latitude: detailsArray[3].latitude,
    //       longitude: detailsArray[3].longitude,
    //       address: detailsArray[3].address,
    //       phone: detailsArray[3].phone,
    //       image: detailsArray[3].image,
    //       rating: detailsArray[3].rating,
    //       price: detailsArray[3].price,
    //       hours: detailsArray[3].hours,
    //       images: detailsArray[3].images,
    //       category: detailsArray[3].category
  
    //     }
    //   }
    //   const apiData = await Api.post('shopsapi', '/shops', data);
    //   console.log({apiData})
    // }


  
 
//set the selected marker
const [selectedCenter, setSelectedCenter] = useState(null);

//section of functions for onClick to change mode
const onHome = function() {
  setState((prev) => ({ ...prev, mode: "MAP" }))
}
const getAccount = function() {
  
    setState((prev) => ({ ...prev, mode: "loginorsign" }))
 
    
  
  

}
const setMap = function() {
  setState((prev) => ({ ...prev, mode: "MAP" }))
}
const setConfirm = function() {
  setState((prev) => ({ ...prev, mode: "confirmAccount" }))
}
const getNews = function() {
  setState((prev) => ({ ...prev, mode: "news" }))

}

const getRegister = function () {
  setState((prev) => ({ ...prev, mode: "register" }))
}
const getRegisterFoodie = function () {
  setState((prev) => ({ ...prev, mode: "registerFoodie" }))
}
const closeShopWindow = function() {
  setState((prev) => ({ ...prev, mode: mode }))
}
//set show mode to show shop information
const openShopWindow = function(shop) {
  setState((prev) => ({ ...prev, mode: "DISPLAY", selected: shop }))
}


// set function to get the disatnce every time the map scrolls
const onChange = function({center, zoom}) {
  
  setState((prev) => ({ ...prev, topThree: getDistance(state.topThree, center)}))
}



//function for searching shops
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


//function for setting center of map
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


//cms cards
const cms = state.shops.map((shop, index) => {
  if (state.categories.includes(shop.category)) {
    return(
      <CMSCard className="cms" key={index} name={shop.name} id={shop.id} selectedCenter={selectedCenter} image={shop.image} distance={shop.distance} onClick={goToMap} shop={shop} state={state.shops} latitude={shop.latitude} longitude={shop.longitude} />
    )
  }

})

// console.log('shops state', state.shops)



//function for filter button
const onFilter = function(data) {
  setState((prev) => ({ ...prev, categories: [...data] }))
}


//inital call to get database information for amazon database
useEffect(() => {
  async function fetchShops() {
    const shopData = await Api.get('shopsapi', '/shops')
    return shopData
  }
  checkUser()
  fetchShops().then((out)=> {
    console.log(out)
    
    const searchList = []
    for (const shop of out.data.Items) {
      const newShop = {name: shop.name, id: shop.id, latitude: shop.latitude, longitude: shop.longitude}
      searchList.push(newShop)
    }
    setState((prev) => ({ ...prev, shops: out.data.Items, searchList: searchList, topThree: getDistance(out.data.Items, state.location)}))
  })
}, [state.location])

// // initial call to the api to get shop datas for local data
// useEffect( () => {
//   axios.get("http://localhost:3001/")
// .then((res) => {
//   console.log(res)
  
//   const searchList = []
//   for (const shop of res.data) {
//     const newShop = {name: shop.name, id: shop.id, latitude: shop.latitude, longitude: shop.longitude}
//     searchList.push(newShop)
//   }
//   setState((prev) => ({ ...prev, shops: res.data, searchList: searchList, topThree: getDistance(res.data, state.location)}))
  
// })
// .catch((err) => {
//   console.log(err)
// })
// }, [state.location]);
//  console.log(state.category)
// create pins for each shop
// console.log('state location', state.location)

//set the markers ---- will need to change likely with thousands of markers
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


//render all
  return(
    <div className="main-container-all">
      
      
      <Header
        getAccount={getAccount}
        onHome={onHome}
        searchSelected={state.searchSelected}
        updateSearch={updateSearch}
        searchList={state.searchList}
        getNews={getNews}
      />
      
      {state.mode === mode && 
      <div className="main-body">
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
        
        <ListGroup as="ul" className="cms-cards">
          {cms}
       </ListGroup>
        </div>
      </div>
      </div>
      }
      
        
      {state.mode === "DISPLAY" &&
      <div className="main-body-show">
        <ShopDisplay shops={state.selected} onClick={closeShopWindow} rating={state.selected.rating}
        price={state.selected.price}/>
        </div>
      }
      
      
      {state.mode === "loginorsign" &&
      <div className="main-body">
        <LoginOrSign
          getRegister={getRegister}
          getRegisterFoodie={getRegisterFoodie}
        />
        </div>
      }
      
      
      {state.mode === "register" &&
      <div className="main-body">
        <CreateAccount/>
        </div>
      }
      {state.mode === "registerFoodie" &&
      <div className="main-body">
        <CreateAccountFoodie setConfirm={setConfirm} setMap={setMap} mode={state.mode}/>
        </div>
      }
     {state.mode === "news" &&
      <div className="main-body">
        <NewsDeals/>
        </div>
      }
      
      
      <Footer/>
    </div>
    
  )
}
  
 
  
  
