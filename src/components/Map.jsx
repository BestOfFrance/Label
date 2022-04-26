import React, {useEffect, useState} from 'react'
import GoogleMapReact from 'google-map-react'
import SearchBar from './SearchBar'
import InfoWindow from 'google-map-react'
import axios from 'axios'
import LocationPin from './LocationPin'
import DropDown from './DropDown'
import DropDownTwo from './DropDownTwo'
import Marker from './Marker'


import './map.css'

//will be setting this to geolocation of users API
const locationDefault = {
  
  lat: 49.2827,
  lng: -123.1207
} 


const permanentMapMarkers = [{city: "Calgary", lat: 51.0447, lng: -114.0719 }, {city: "Vancouver", lat: 49.246292, lng: -123.116226 }, {city: "Regina", lat: 50.445210, lng: -104.618896 }, {city: "Toronto", lat: 43.651070, lng: -79.347015 }, {city: "Montreal", lat: 45.508888, lng: -73.561668 }, {city: "Charlottetown", lat: 46.238888, lng: -63.129166 }, {city: "Fredericton", lat: 45.964993, lng: -66.646332 }, {city: "Portland", lat: 45.523064, lng: -122.676483 }, {city: "Dallas", lat: 32.7767, lng: -96.7970 }, {city: "Seattle", lat: 47.6062, lng: -122.3321 }, {city: "Los Angeles", lat: 34.0522, lng: -118.2437 }, {city: "New York", lat: 43.000000, lng: -75.000000 }, {city: "Miami", lat: 25.7617, lng: -80.1918 }]

export default function Maps(props) {
  const [location, setLocation] = useState(props.location);
  const [zoom, setZoom] = useState(props.currentZoom)
  
//   //create your forceUpdate hook
// function useForceUpdate(){
//    // integer state
//   return () => setLocation(props.location); // update the state to force render
// }

const permanent = permanentMapMarkers.map((center, index) => {
  return (
    <Marker
    key={index}
    id={center.id}
    text={center.city}
    lat={center.lat}
    lng={center.lng}
    category={"city"}
    onClick={() => {
      setZoom(14)
      setLocation({lat: center.lat, lng: center.lng})
      console.log('zoom', zoom)
   }}
    
    
    />
  )
})
const [width, setWidth] = useState(window.innerWidth);
const breakpoint = 768;

useEffect(() => {
  const handleWindowResize = () => setWidth(window.innerWidth)
  window.addEventListener("resize", handleWindowResize);

  // Return a function from the effect that removes the event listener
  return () => window.removeEventListener("resize", handleWindowResize);
}, []);

  const permanentMarkers = props.permanent
  useEffect(() => {
    setLocation(props.location)
    
   
   
  }, [props.location])
  
  
  // console.log('maps location', location)
 
  return (
    <div className="map">
    
    
    <div className="google-map">
      {width > breakpoint && 
    <DropDownTwo onClick={props.onFilter} categories={props.categories} />}
    {props.location &&
    
      <GoogleMapReact
        bootstrapURLKeys={{key:  process.env.REACT_APP_GOOGLE_API_KEY }}
        yesIWantToUseGoogleMapApiInternals
        
       
        onChange={({center, zoom}) => {props.onChange({center, zoom})}}
        center={{lat: Number(location.lat), lng: Number(location.lng)}}
        defaultCenter={{lat: locationDefault.lat, lng: locationDefault.lng}}
        zoom={zoom}
        defaultZoom={14}
      >
        {props.marker}
        {props.currentZoom < 11 &&
          permanent
        }
        
        
        
        
        
      </GoogleMapReact>
      }
      
      
      
    </div>
  </div>
  );
}


