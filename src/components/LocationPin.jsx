import React, {useEffect, useState} from 'react'
import GoogleMapReact from 'google-map-react'
import axios from 'axios'
import { Icon } from '@iconify/react'
import locationIcon from '@iconify/icons-mdi/map-marker'
import './map.css'


const greatPlaceStyle = {
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
  scale: 0.05
}

export default function LocationPin(props) {
  return(
  <div className="pin" >
    <Icon icon={locationIcon} className="pin-icon" style={greatPlaceStyle} />
    <p className="pin-text">Hello</p>
  </div>
  )
  
}