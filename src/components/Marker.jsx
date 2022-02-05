import {React, useState, useEffect} from 'react';
import styled from 'styled-components';
import './marker.css'

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 18px;
  height: 18px;
  background-color: #000;
  border: 2px solid #fff;
  border-radius: 100%;
  user-select: none;
  transform: translate(-50%, -50%);
  cursor: ${(props) => (props.onClick ? 'pointer' : 'default')};
  &:hover {
    z-index: 1;
  }
`;

export default function Marker(props) {
  const [showSelected, setShow] = useState(false)

  useEffect(() => {
    
    
    if (props.show !== null) {
      if (props.id === props.show.id) {
        setShow(true)
      } else {
        setShow(false)
      }
    } else {
      setShow(false)
    }
    

  }, [props.show])
  

  return (
    <div id="marker-div">
      {showSelected && 
      (
        <div id="marker-info" style={{width: 100, height: 100}}>
          <div>
            Hello Marker
          </div>
        </div>
      )}
      <div id="actual-marker">
        <Wrapper
          onClick={props.onClick}
          alt={props.text}
        />
      </div>
    </div>
  )
 
}