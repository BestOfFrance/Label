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
// import details from './details.js';
// import getDistance from '../src/helpers/getDistance'
import { Auth } from 'aws-amplify'
import Dashboard from './components/Dashboard'
import DataButton from './components/DataButton'
import Login from './components/Login'
// const data = require('./shop-data')

const dataObj = require('./details.js')

const details = dataObj.details

// function checkUser() {
//   Auth.currentAuthenticatedUser()
//     .then(
//       (user) => {
//         console.log(user)
//         if (user = "The user is not authenticated") {
//           return false;
//         } else {
//           return true
//         }
//         }
      
//     )
//     .catch(err => {
//       console.log(err)
//     return false;
//     }
//       )
// }



Amplify.configure(awsconfig);
Api.configure(awsconfig);

//initial location set to Vancouver, will be set to geographic location of user
const locationDefault = {
  
  lat: 49.2827,
  lng: -123.1207
} 
const mode = "MAP"

//function to manually set the dynamo database, only to be used upon seeding



// const detailsArray = [];
// for (const detail of details) {
//   if (detail !== undefined) {
//   const detailsObject = {};
//   detailsObject.name = detail.yelpData.name;
//   detailsObject.latitude = detail.yelpData.coordinates.latitude;
//   detailsObject.longitude = detail.yelpData.coordinates.longitude;
//   detailsObject.address = detail.yelpData.location.address1
//   detailsObject.phone = detail.yelpData.display_phone
//   detailsObject.callPhone = detail.yelpData.phone
//   detailsObject.image = detail.yelpData.image_url
//   detailsObject.rating = detail.yelpData.rating
//   detailsObject.price = detail.yelpData.price
//   detailsObject.category = detail.category
//   detailsObject.description = detail.description
//   detailsObject.mapUrl = detail.place_url
//   detailsObject.numberReviews = detail.number_reviews
//   detailsObject.servicesAvailable = detail.services_available
//   detailsObject.hours = [];
//   detailsObject.images = [];

//   for (const image of detail.yelpData.photos) {
//     detailsObject.images.push(image)
//   }
  
//   if (detail.yelpData.hours) {
//   for (const day of detail.yelpData.hours[0].open) {
    
//     const hours = {open: day.start, close: day.end, day: day.day}
    
//     const stringHours = JSON.stringify(hours)
    
//     detailsObject.hours.push(stringHours)
    
//   }
// }
//   detailsArray.push(detailsObject)
// }
// }





export default function Application(props) {
  const [state, setState] = useState({
    shops: [],
    location: locationDefault,
    mode: mode,
    shopID: 0,
    selected: null, 
    categories: ["Restaurant", "Bistro", "Breakfast Restaurant", "Pastry Shop", "Bakery", "Cafe", "Grocery", "Cake shop", "Charcuterie", "Cheese shop", "Chocolate shop", "Convenience Store", "Dessert shop", "Diner", "Family restaurant", "Fine dining restaurant", "French restaurant", "Grocery store"],
    topThree: [],
    searchSelected: "",
    searchList: [],
    signedIn: false,
    accountType: "free"
    
  })

  
  function checkUser() {
    let authenticated = false;
    Auth.currentAuthenticatedUser()
      .then(
        (user) => {
          
          console.log(user)
            setState((prev) => ({ ...prev, signedIn: true }))
          
          }
        
      )
      .catch(err => {
        console.log(err)
        authenticated = false;
      }
        )
        return authenticated
  }

  function signOut() {
    Auth.signOut()
      .then((data) => {
        console.log(data)
        setState((prev) => ({ ...prev, mode: "MAP" }))
        setState((prev) => ({ ...prev, signedIn: false }))
      }
        
        )
      .catch(err => console.log(err))
      
  }

  //aws data
  //seed the AWS databse
  // detailsObject.description = detail.description
  // detailsObject.mapUrl = detail.place_url
  // detailsObject.numberReviews = detail.number_reviews
  // detailsObject.servicesAvailable = detail.services_available


    // const saveShop = async () => {
    //   for (let i = 0; i <= detailsArray.length; i++) {
    //   const data = {
    //     body: {
    //       name: detailsArray[i].name,
    //       latitude: detailsArray[i].latitude,
    //       longitude: detailsArray[i].longitude,
    //       address: detailsArray[i].address,
    //       phone: detailsArray[i].phone,
    //       image: detailsArray[i].image,
    //       rating: detailsArray[i].rating,
    //       price: detailsArray[i].price,
    //       hours: detailsArray[i].hours,
    //       images: detailsArray[i].images,
    //       category: detailsArray[i].category,
    //       callPhone: detailsArray[i].callPhone,
    //       description: detailsArray[i].description,
    //       mapUrl: detailsArray[i].mapUrl,
    //       numberReviews: detailsArray[i].numberReviews,
    //       servicesAvailable: detailsArray[i].servicesAvailable
  
    //     }
    //   }
    //   const apiData = await Api.post('shopsapi', '/shops', data);
    //   console.log({apiData})
    // }
    // }

    const getDistance = function(markers, myLatlng) {
      var markersByDistance = [];
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
  
 
//set the selected marker
const [selectedCenter, setSelectedCenter] = useState(null);

//section of functions for onClick to change mode
const onHome = function() {
  setState((prev) => ({ ...prev, mode: "MAP" }))
}
const getAccount = function() {
  
  if (state.signedIn) {
    setState((prev) => ({ ...prev, mode: "dashboard" }))
    
  } else {
    setState((prev) => ({ ...prev, mode: "loginorsign" }))
  }
    
 
    
  
  

}
const setBusiness = function() {
  setState((prev) => ({ ...prev, accountType: "business" }))
}
const setLoggedIn = function() {
  setState((prev) => ({ ...prev, signedIn: true }))
}
const setMap = function() {
  setState((prev) => ({ ...prev, mode: "MAP" }))
}
const login = function() {
  setState((prev) => ({ ...prev, mode: "login"}))
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
  
  getDistance(state.shops, center)
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

console.log(state.accountType)

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
  checkUser();
  fetchShops().then((out)=> {
    console.log(out)
    // console.log(JSON.stringify(data[0]), 'data')
    // console.log(detailsArray.length)
    getDistance(out.data.Items, state.location)
    const searchList = []
    for (const shop of out.data.Items) {
      const newShop = {name: shop.name, id: shop.id, latitude: shop.latitude, longitude: shop.longitude}
      searchList.push(newShop)
    }
    setState((prev) => ({ ...prev, shops: out.data.Items, searchList: searchList}))
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
        signedIn={state.signedIn}
        
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
          
          
        <Maps location={state.location} zoomLevel={17} shops={state.shops} marker={pin} onChange={onChange} onFilter={onFilter} signedIn={state.signedIn}>
        
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
          login={login}
        />
        </div>
      }
      
      
      {state.mode === "register" &&
      <div className="main-body">
        <CreateAccount  setConfirm={setConfirm} login={login} mode={state.mode} checkUser={checkUser}/>
        </div>
      }
      {state.mode === "registerFoodie" &&
      <div className="main-body">
        <CreateAccountFoodie setConfirm={setConfirm} login={login} mode={state.mode} checkUser={checkUser}/>
        </div>
      }
     {state.mode === "news" &&
      <div className="main-body">
        <NewsDeals/>
        </div>
      }
      {state.mode === "dashboard" &&
      <div className="main-body">
        <Dashboard
        logout={signOut}
        business={state.accountType}
        />
        </div>
      }
      {state.mode === "login" &&
      <div className="main-body">
        <Login
        logout={signOut}
        setMap={setMap}
        setLoggedIn={setLoggedIn}
        setBusiness={setBusiness}
        />
        </div>
      }
     
      
      <Footer/>
    </div>
    
  )
}
  
 
  
  
