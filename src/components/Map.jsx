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


const permanentMarkers = []

export default function Maps(props) {
  const [location, setLocation] = useState(props.location);
  const [zoom, setZoom] = useState(props.currentZoom)
  console.log(props.zoom, 'zoom problem')
  console.log(props.location, 'zoom problem locale')
  console.log(props, 'map props')
  console.log(zoom, 'map level zoom')
//   //create your forceUpdate hook
// function useForceUpdate(){
//    // integer state
//   return () => setLocation(props.location); // update the state to force render
// }
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
    setZoom(14)
    console.log('use effect working')
   
  }, [props.location])
  useEffect(() => {
    
    setZoom(14)
    console.log('use effect working')
   
  }, [props.currentZoom])
  
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
        // defaultZoom={14}
        zoom={zoom}
      >
        {props.marker}
        {props.currentZoom < 11 &&
          props.permanent
        }
        
        
        
        
        
      </GoogleMapReact>
      }
      
      
      
    </div>
  </div>
  );
}


