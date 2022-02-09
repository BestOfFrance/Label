import react from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import './DropDown.css'

export default function DropDown(props) {
  return(
    <Dropdown>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
    Filter Category
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item onClick={() => {props.onClick(["Grocery"])}}>Grocery</Dropdown.Item>
    <Dropdown.Item onClick={() => {props.onClick(["Bakery"])}}>Bakery</Dropdown.Item>
    <Dropdown.Item onClick={() => {props.onClick(["Pastry Shop"])}}>Pastry Shop</Dropdown.Item>
    <Dropdown.Item onClick={() => {props.onClick(["Restaurant"])}}>Restaurant</Dropdown.Item>
    <Dropdown.Item onClick={() => {props.onClick(["Restaurant", "Pastry Shop", "Bakery", "Grocery"])}}>All Categories</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
  )
}