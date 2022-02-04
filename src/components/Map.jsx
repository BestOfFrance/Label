import React, {useEffect, useState} from 'react'
import GoogleMapReact from 'google-map-react'
import InfoWindow from 'google-map-react'
import axios from 'axios'
import LocationPin from './LocationPin'
import Marker from './Marker'

import './map.css'

export default function Maps(props) {
// set state for marker selection
const [selectedCenter, setSelectedCenter] = useState(null);
  

const pin = props.shops.map((center, index) => {
  return (
    <Marker
    key={index}
    text={center.name}
    lat={center.latitude}
    lng={center.longitude}
    onClick={() => {
      setSelectedCenter(center);
   }}
    show={selectedCenter}
    />
  )
})
console.log(selectedCenter)

  return (
    <div className="map">
    

    <div className="google-map">
      <GoogleMapReact
        bootstrapURLKeys={{key: 'AIzaSyCRlsvlSFmfPOb-oAZlmfYSMkcycNNHzm4' }}
        defaultCenter={props.location}
        defaultZoom={props.zoomLevel}
      >
        {pin}
      </GoogleMapReact>
      
     
      
    </div>
  </div>
  );
}


