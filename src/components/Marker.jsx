import React from 'react';
import styled from 'styled-components';

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
  
  return (
    <div>
      {props.show && 
      (
        <div style={{width: 100, height: 100}}>
        <div
          onClick={props.handleClose}
          style={{border: "1px solid black", position: "absolute", top: 5, right: 5}}
        >
          X
        </div>
        <div>
          Hello Marker
        </div>
      </div>
      )}
    <Wrapper
    onClick={props.onClick}
    alt={props.text}
      />
      
    </div>
  )
 
}