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
import HeaderMobile from './components/headerMobile'
import CreateAccount from './components/CreateAccount'
import CreateAccountFoodie from './components/CreateAccountFoodie'
import NewsDeals from './components/NewsDeals'
import ReportButton from './components/ReportButton'
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
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import FilterCms from './components/FilterCms'
import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import LoginOrSignPage from './components/LoginOrSignPage'
import ConfirmAccount from './components/confirmAccount'
import HomePage from './HomePage'
import LoginPage from './LoginPage'
import '@stripe/stripe-js'
import FilterMapMobile from './components/FilterMapMobile'
import ForgotPassword from './components/ForgotPasswordPage'
import ForgotPasswordConfirm from './components/ForgotPasswordVerification'
import ReportBusiness from './components/ReportBusiness'
import { toBase64, bytesToSize } from './utils';
import ConfirmAccountBusiness from './components/ConfirmAccountBusiness'
import RegisterBusinessStep1 from './components/RegisterBusinessStep1'
import VerifyBusiness from './components/VerifyBusiness'
import ReportButtonEasy from './components/ReportButtonEasy'
import UploadImage from './components/uploadImage'
import {loadStripe} from '@stripe/stripe-js';
import Admin from './components/AdminPage'

const geohash = require('ngeohash');

 const details = require('./ExtCADetailsFinal')
 console.log(details.length, 'details')
 const stripePromise = loadStripe('pk_test_51HBN9DHYehZq7RpT4E5XQTTg1ZjqS28tFvIlSGq8FYAHmU8g9EncHv2YjDmnJEmJzwPke81SWL65hCi87OxVQ0in00eS54FcZx')


// const dataObj = require('./details4001.js')
// const dataObj1 = require('./details.js')
// const dataObj2 = require('./details3001.js')
// const details1 = dataObj1.details
// const details = dataObj.details
// const details2 = dataObj2.details3001

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

//an aws issue, do not need these variables
const createBook = ''
const bookDetails = ''
const listBooks = ''
Amplify.configure(awsconfig);
Api.configure(awsconfig);
const AWS = require('aws-sdk');
//initial location set to Vancouver, will be set to geographic location of user
const locationDefault = {
  
  lat: 49.2827,
  lng: -123.1207
} 
const mode = "MAP"

//function to manually set the dynamo database, only to be used upon seeding
const fetchSubscription =async function(id) {
  const shopData = await Api.get('stripeCheck', `/check/${id}`)
  return shopData
}







const detailsArray = [];
for (const detail of details) {
  if (detail !== undefined && detail !== null) {
  const detailsObject = {};
  const geoload = geohash.encode(detail.yelpData.coordinates.latitude, detail.yelpData.coordinates.longitude);
  detailsObject.name = detail.yelpData.name;
  detailsObject.latitude = detail.yelpData.coordinates.latitude;
  detailsObject.longitude = detail.yelpData.coordinates.longitude;
  detailsObject.address = detail.yelpData.location.address1
  detailsObject.phone = detail.yelpData.display_phone
  detailsObject.callPhone = detail.yelpData.phone
  detailsObject.image = detail.yelpData.image_url
  detailsObject.rating = detail.yelpData.rating
  detailsObject.price = detail.yelpData.price
  detailsObject.category = detail.categoryNew
  detailsObject.description = detail.description
  detailsObject.mapUrl = detail.place_url
  detailsObject.numberReviews = detail.number_reviews
  detailsObject.servicesAvailable = detail.services_available
  detailsObject.hours = [];
  detailsObject.images = [];
  detailsObject.viewHours = detail.opening_hours
  detailsObject.id = detail.id
  detailsObject.gsi1sk = geoload


  for (const image of detail.yelpData.photos) {
    detailsObject.images.push(image)
  }
  
  if (detail.yelpData.hours) {
  for (const day of detail.yelpData.hours[0].open) {
    
    const hours = {open: day.start, close: day.end, day: day.day}
    
    const stringHours = JSON.stringify(hours)
    
    detailsObject.hours.push(stringHours)
    
  }
}
if (!detailsArray.includes(detailsObject)) {
  detailsArray.push(detailsObject)
}
}
}





export default function Application(props) {
  const [state, setState] = useState({
    shops: [],
    location: locationDefault,
    mode: mode,
    shopID: 0,
    selected: null, 
    categories: ["Bakery", "Shop", "Restaurant", "Café"],
    topThree: [],
    searchSelected: "",
    searchList: [],
    signedIn: false,
    accountType: "free",
    isVerified: false,
    placesNearYou: [],
    premiumShops: [],
    sortedShops: [],
    cmsCategories: ["Bakery", "Shop", "Restaurant", "Café"]
  })

  const navigate = useNavigate()
  async function fetchUser(email) {
    const userData = await Api.get('usersApi', `/users/${email}`)
    return userData
  }
//   console.log(process.env)
// console.log(process.env.REACT_APP_STRIPE_SECRET_KEY_DEVELOPMENT)
  const [index, setIndex] = useState(0)
  function checkUser() {
    let authenticated = false;
    Auth.currentAuthenticatedUser()
      .then(
        (user) => {
          
          console.log(user)
            setState((prev) => ({ ...prev, signedIn: true }))
            console.log(user.attributes.email)
          fetchUser(user.attributes.email)
          .then((response) => {
            console.log(response, 'fetchuser')
            console.log(response.data.Item.id)

            fetchSubscription(`sub_${response.data.Item.id}`)
            .then((response) => {
              console.log('subb response', response)
            })
            .catch((err) => {
              console.log(err)
            })
          })
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
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 768;

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handleWindowResize);

    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);
  //aws data
  //seed the AWS databse
  


    const saveShop = async () => {
      for (let i = 0; i <= 1000; i++) {
        if (detailsArray[i] !== undefined) {
      const data = {
        body: {
          name: detailsArray[i].name,
          latitude: detailsArray[i].latitude,
          longitude: detailsArray[i].longitude,
          address: detailsArray[i].address,
          phone: detailsArray[i].phone,
          image: detailsArray[i].image,
          rating: detailsArray[i].rating,
          price: detailsArray[i].price,
          hours: detailsArray[i].hours,
          images: detailsArray[i].images,
          category: detailsArray[i].category,
          callPhone: detailsArray[i].callPhone,
          description: detailsArray[i].description,
          mapUrl: detailsArray[i].mapUrl,
          numberReviews: detailsArray[i].numberReviews,
          servicesAvailable: detailsArray[i].servicesAvailable,
          viewHours: detailsArray[i].viewHours,
          id: detailsArray[i].id,
          gsi1sk: detailsArray[i].gsi1sk
          
          
  
        }
      }
      const apiData = await Api.post('shopsApi', '/shops', data);
      console.log({apiData})
    }
    }
    }

    const getDistance = function(myLatlng) {
      async function fetchShops() {
    const shopData = await Api.get('shopsApi', '/shops')
    return shopData
  }
     
      var markersByDistance = [];
      // console.log(markers, 'markers')
      // console.log(myLatlng, 'll')
        const latmin = myLatlng.lat - 0.03
    const latmax = myLatlng.lat + 0.03
    const lngmin = myLatlng.lng - 0.03
    const lngmax = myLatlng.lng + 0.03
    const hashes = geohash.bboxes(latmin, lngmin, latmax, lngmax, 5);
    fetchShops().then((markers)=> {
    console.log(markers.data.Items)
    // console.log(JSON.stringify(data[0]), 'data')
    // console.log(detailsArray.length)
   
    const searchList = []
    const premiumShops = []
    for (const shop of markers.data.Items) {
     if (shop.isPremium) {
       premiumShops.push(shop)
     }
      const newShop = {name: shop.name, id: shop.id, latitude: shop.latitude, longitude: shop.longitude}
      searchList.push(newShop)
    
    }
    setState((prev) => ({ ...prev, shops: markers.data.Items, searchList: searchList, premiumShops: premiumShops}))
  
     for ( var i = 0; i < markers.data.Items.length; i++ ) {
      
        var marker = markers.data.Items[i];
    
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
    console.log(markersByDistance[0])
    const placeClosestToYou = markersByDistance[0]
    const allShops = [];
    const allCMSShops = [];
    const closestBakery = [];
    const closestRestaurant = [];
    const closestPastryShop = [];
    const closestGrocery = [];
    for (const marker of markersByDistance) {
      if (state.categories.includes(marker.category) && marker.hidden === false) {
        allShops.push(marker)
      }
      if (state.cmsCategories.includes(marker.category) && marker.hidden === false) {
        allCMSShops.push(marker)
      }
      //"Pastry Shop", "Cake shop", "Dessert shop"
      
      if ((marker.category === "Bakery") && allShops[0] !== marker) {
        closestBakery.push(marker)
      }
      //"Restaurant", "Bistro", "Breakfast Restaurant", "Charcuterie", "Diner", "Family restaurant", "Fine dining restaurant", "French restaurant"
      if ((marker.category === "Restaurant" || marker.category === "Bistro" || marker.category === "Charcuterie" || marker.category === "Diner") && allShops[0] !== marker && closestBakery[0] !== marker) {
        closestRestaurant.push(marker)
      }
      if ((marker.category === "Café" || marker.category === "Cake shop" || marker.category === "Dessert shop" )  && allShops[0] !== marker && closestBakery[0] !== marker && closestRestaurant[0] !== marker) {
        closestPastryShop.push(marker)
      }
      if ((marker.category === "Shop" || marker.category === "Cake shop" || marker.category === "Dessert shop" )  && allShops[0] !== marker && closestBakery[0] !== marker && closestRestaurant[0] !== marker) {
        closestGrocery.push(marker)
      }
    }
    const topThreeShops = allShops.slice(0,3)

    setState((prev) => ({ ...prev, topThree: topThreeShops, placesNearYou: [closestPastryShop[0], closestBakery[0], closestRestaurant[0], closestGrocery[0]], sortedShops: allCMSShops}))
    
    
  })

   }
  
 console.log(state.placesNearYou[0])
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
  navigate(`shops/${shop}`)
}


// set function to get the disatnce every time the map scrolls
const onChange = function({center, zoom}) {
  
  getDistance(center)
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
  window.scrollTo({
    top: 0, 
    behavior: 'smooth'
    /* you can also use 'auto' behaviour
       in place of 'smooth' */
  });
}
const goToMapCms = function (latitude, longitude, selectedCenter) {
  setState((prev) => ({ ...prev, location: {lat: latitude, lng: longitude} }))
  
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

const premium = state.premiumShops.map((shop, index) => {
  
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
    
    

})

// cms cards
console.log('sorted shops', state.sortedShops)
const cmsBakery = state.sortedShops.map((shop, index) => {
    
    return(
      <CMSCard className="cms" key={index} name={shop.name} id={shop.id} selectedCenter={selectedCenter} image={shop.image} distance={shop.distance} onClick={goToMap} shop={shop} state={state.shops} latitude={shop.latitude} longitude={shop.longitude} categories={state.categories} category={shop.category} sortedShops={state.sortedShops}/>
    )
    

})


// console.log('shops state', state.shops)

// console.log(state.accountType)

//function for filter button
const onFilter = function(data) {
  setState((prev) => ({ ...prev, categories: [...data] }))
  
}
// const [pastry, setPastry] = useState(true)
// const []
const onFilterCMS = function(data) {
  setState((prev) => ({ ...prev, cmsCategories: [...data] }))
  
}

const onFilterCMSMobile = function (data) {
  setState((prev) => ({ ...prev, cmsCategories: [...data] }))
  setState((prev) => ({ ...prev, categories: [...data] }))
 

  
}


useEffect(() => {
  // getDistance(state.location)
}, [state.categories])
useEffect(() => {
  // getDistance(state.location)
}, [state.cmsCategories])
console.log('places', state.placesNearYou)

//inital call to get database information for amazon database
useEffect(() => {
  

  navigator.geolocation.getCurrentPosition(
    function(position) {
      console.log(position);
      const locationGeo = {
  
        lat: position.coords.latitude,
        lng: position.coords.longitude
      } 
      setState((prev) => ({ ...prev, location: locationGeo}))
       getDistance(locationGeo)
     
    },
    function(error) {
      console.error("Error Code = " + error.code + " - " + error.message);
    }
  )
  checkUser();
  
   
  
}, [])

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
      signedIn={state.signedIn}
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

console.log(state.signedIn, "state")
//render all
  return(
    <div className="main-container-all">
      
      {width > breakpoint ?
      
      <Header
        getAccount={getAccount}
        onHome={onHome}
        searchSelected={state.searchSelected}
        updateSearch={updateSearch}
        searchList={state.searchList}
        getNews={getNews}
        signedIn={state.signedIn}
        
      /> : <HeaderMobile  getAccount={getAccount}
      onHome={onHome}
      searchSelected={state.searchSelected}
      updateSearch={updateSearch}
      searchList={state.searchList}
      getNews={getNews}
      signedIn={state.signedIn}/>}
      <Routes>
        <Route path='/' element={<HomePage  items={items} premium={premium} location={state.location} shops={state.shops} marker={pin} onChange={onChange} onFilter={onFilter} signedIn={state.signedIn} categories={["Bakery", "Shop", "Restaurant", "Café"]} onFilterCms={onFilterCMS} 
        categories={["Bakery", "Shop", "Restaurant", "Café"]} sortedShops={state.sortedShops} cmsBakery={cmsBakery} onClick={closeShopWindow} 
         selected={state.selected} mode={state.mode}/>} />
        <Route path="loginorsign" element={<LoginOrSignPage  getRegister={getRegister}
          getRegisterFoodie={getRegisterFoodie}
          login={login}
          />} />
        <Route path="login" element={<LoginPage  logout={signOut}
        setMap={setMap}
        setLoggedIn={setLoggedIn}
        setBusiness={setBusiness}/>}/>
        <Route path="dashboard" element = {<Dashboard shops={state.shops} logout={signOut}
        business={state.accountType}
        signedIn={state.signedIn}/>} />
        <Route path="admin" element = {<Admin shops={state.shops} logout={signOut}
        business={state.accountType}
        signedIn={state.signedIn}/>} />
        <Route path="registerbusiness" element = {<CreateAccount setConfirm={setConfirm} login={login} mode={state.mode} checkUser={checkUser}/>} />
        {/* <Route path="registerbusiness" element = {<UploadImage setConfirm={setConfirm} login={login} mode={state.mode} checkUser={checkUser}/>} /> */}
        <Route path="registerfoodie" element={<CreateAccountFoodie setConfirm={setConfirm} login={login} mode={state.mode} checkUser={checkUser}/>}/>
        <Route path="confirmaccount" element={<ConfirmAccount login={login}
        
        checkUser={checkUser}/>}/>
        <Route path="newsanddeals" element={<NewsDeals/>}/>
        <Route path="shops/:shop" element={<ShopDisplay shops={state.shops} logout={signOut}
        business={state.accountType}
        signedIn={state.signedIn} />}/>
        <Route path="dashboard/:id" element={<Dashboard shops={state.shops} logout={signOut}
        business={state.accountType}
        signedIn={state.signedIn}/>}/>
        <Route path="resetpassword" element={<ForgotPassword/>}/>
        <Route path="resetpasswordverification" element={<ForgotPasswordConfirm/>}/>
        {/* <Route path="reportbusiness/:shop" element={<ReportBusiness shops={state.shops}/>}/> */}
        <Route path="reportbusiness/:shop" element={<ReportButtonEasy shops={state.shops}/>}/>
        <Route path="confirmaccountbusiness" element={<ConfirmAccountBusiness/>}/>
        <Route path="choosesubscriptiontype" element={<RegisterBusinessStep1/>}/>
        <Route path="verifybusiness" element={<VerifyBusiness/>}/>
      </Routes>
      
   
        
     
     
     {width < breakpoint &&
     <FilterMapMobile onClick={onFilterCMSMobile} categories={["Bakery", "Shop", "Restaurant", "Café"]}/>
     }
      <DataButton onClick={saveShop}/>
      <Footer/>
    </div>
    
  )
}
  
 

