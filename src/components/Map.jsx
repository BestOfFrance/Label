import React, {useEffect, useState} from 'react'
import GoogleMapReact from 'google-map-react'
import SearchBar from './SearchBar'
import InfoWindow from 'google-map-react'
import axios from 'axios'
import LocationPin from './LocationPin'
import DropDown from './DropDown'


import './map.css'

//will be setting this to geolocation of users API
const locationDefault = {
  
  lat: 49.2827,
  lng: -123.1207
} 




export default function Maps(props) {
  const [location, setLocation] = useState(props.location);

//   //create your forceUpdate hook
// function useForceUpdate(){
//    // integer state
//   return () => setLocation(props.location); // update the state to force render
// }


  
  useEffect(() => {
    setLocation(props.location)
    
   
  }, [props.location])
  
  console.log('maps location', location)
 
  return (
    <div className="map">
    
    
    <div className="google-map">
    <DropDown onClick={props.onFilter} />
    {props.location &&
    
      <GoogleMapReact
        bootstrapURLKeys={{key: 'AIzaSyCRlsvlSFmfPOb-oAZlmfYSMkcycNNHzm4' }}
        yesIWantToUseGoogleMapApiInternals
        
       
        onChange={({center, zoom}) => {props.onChange({center, zoom})}}
        center={{lat: Number(location.lat), lng: Number(location.lng)}}
        defaultCenter={{lat: locationDefault.lat, lng: locationDefault.lng}}
        defaultZoom={props.zoomLevel}
      >
        {props.marker}
        
        
        
        
      </GoogleMapReact>
      }
      
      
      
    </div>
  </div>
  );
}


