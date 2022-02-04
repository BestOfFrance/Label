import React, {useEffect, useState} from 'react'
import GoogleMapReact from 'google-map-react'
import axios from 'axios'
import LocationPin from './LocationPin'
import Marker from './Marker'

import './map.css'

export default function Maps(props) {
  

const pin = props.shops.map((shop, index) => {
  return (
    <Marker
    key={index}
    text={shop.name}
    lat={shop.latitude}
    lng={shop.longitude}
    />
  )
})

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


