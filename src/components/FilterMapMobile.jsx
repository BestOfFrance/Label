import react from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import './DropDown.css'

export default function FilterMapMobile(props) {
  const categories = props.categories
  return(
   
  <div id="filter-map-mobile-container">
    <div className="filter-mobile-button">
    <img className="filter-map-mobile-image" src="shop.svg" onClick={() => {props.onClick(["Grocery", "Cheese shop", "Chocolate shop", "Convenience Store", "Grocery store"])}}/>
    Grocery
    </div>
    <div className="filter-mobile-button">
    <img className="filter-map-mobile-image" src="cutlery.svg" onClick={() => {props.onClick(["Restaurant", "Bistro", "Breakfast Restaurant", "Charcuterie", "Diner", "Family restaurant", "Fine dining restaurant", "French restaurant"])}}/>
    Restaurant
    </div>
    
    <div className="filter-mobile-button-all">
    <img className="filter-map-mobile-image" src="BOFLogo.svg" onClick={() => {props.onClick(props.categories)}}/>
    All Categories
    </div>
    <div className="filter-mobile-button">
    <img  className="filter-map-mobile-image" src="croissant-2.svg" onClick={() => {props.onClick(["Bakery", "Cafe"])}}/>
    Bakery
    </div>
    <div className="filter-mobile-button">
    <img className="filter-map-mobile-image" src="cupcake.svg" onClick={() => {props.onClick(["Pastry Shop", "Cake shop", "Dessert shop"])}}/>
    Pastry Shop
    </div>
    
    
  </div>

  )
}