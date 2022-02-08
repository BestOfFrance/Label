import React, {useEffect, useState} from 'react'
import GoogleMapReact from 'google-map-react'
import InfoWindow from 'google-map-react'
import axios from 'axios'
import LocationPin from './LocationPin'


import './map.css'

export default function Maps(props) {
  
  
 
 
  return (
    <div className="map">
    

    <div className="google-map">
      <GoogleMapReact
        bootstrapURLKeys={{key: 'AIzaSyCRlsvlSFmfPOb-oAZlmfYSMkcycNNHzm4' }}
        yesIWantToUseGoogleMapApiInternals
        
       
        onChange={({center, zoom}) => {props.onChange({center, zoom})}}
        center={props.location}
        defaultZoom={props.zoomLevel}
      >
        {props.marker}
      </GoogleMapReact>
      
     
      
    </div>
  </div>
  );
}


