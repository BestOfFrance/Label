import react from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import './DropDown.css'

export default function DropDown(props) {
  const categories = props.categories
  return(
    <Dropdown>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
    Filter Category
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item onClick={() => {props.onClick(["Grocery", "Cheese shop", "Chocolate shop", "Convenience Store", "Grocery store"])}}>Grocery</Dropdown.Item>
    <Dropdown.Item onClick={() => {props.onClick(["Bakery", "Cafe"])}}>Bakery</Dropdown.Item>
    <Dropdown.Item onClick={() => {props.onClick(["Pastry Shop", "Cake shop", "Dessert shop"])}}>Pastry Shop</Dropdown.Item>
    <Dropdown.Item onClick={() => {props.onClick(["Restaurant", "Bistro", "Breakfast Restaurant", "Charcuterie", "Diner", "Family restaurant", "Fine dining restaurant", "French restaurant"])}}>Restaurant</Dropdown.Item>
    <Dropdown.Item onClick={() => {props.onClick(["Restaurant", "Bistro", "Breakfast Restaurant", "Pastry Shop", "Bakery", "Cafe", "Grocery", "Cake shop", "Charcuterie", "Cheese shop", "Chocolate shop", "Convenience Store", "Dessert shop", "Diner", "Family restaurant", "Fine dining restaurant", "French restaurant", "Grocery store"])}}>All Categories</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
  )
}