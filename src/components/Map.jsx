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
        defaultCenter={props.location}
        defaultZoom={props.zoomLevel}
      >
        {props.marker}
      </GoogleMapReact>
      
     
      
    </div>
  </div>
  );
}


