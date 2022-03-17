import react from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import './DropDown.css'

export default function FilterMapMobile(props) {
  const categories = props.categories
  return(
   
  <div id="filter-map-mobile-container">
    <div className="filter-mobile-button">
    <img className="filter-map-mobile-image" src="shopMobile.svg" onClick={() => {props.onClick(["Grocery", "Cheese shop", "Chocolate shop", "Convenience Store", "Grocery store"])}}/>
    Grocery
    </div>
    <div className="filter-mobile-button">
    <img className="filter-map-mobile-image" src="forkMobile.svg" onClick={() => {props.onClick(["Restaurant", "Bistro", "Breakfast Restaurant", "Charcuterie", "Diner", "Family restaurant", "Fine dining restaurant", "French restaurant"])}}/>
    Restaurant
    </div>
    
    <div className="filter-mobile-button-all">
    <img className="filter-map-mobile-image" src="https://uploads-ssl.webflow.com/5e7ec4cbdc544552e7ea5886/5e9b3e9805bf3a8858130f3c_fts_favicon_256.png" onClick={() => {props.onClick(props.categories)}}/>
    All Categories
    </div>
    <div className="filter-mobile-button">
    <img  className="filter-map-mobile-image" src="croissantMobile.svg" onClick={() => {props.onClick(["Bakery", "Cafe"])}}/>
    Bakery
    </div>
    <div className="filter-mobile-button">
    <img className="filter-map-mobile-image" src="madeleine.svg" onClick={() => {props.onClick(["Pastry Shop", "Cake shop", "Dessert shop"])}}/>
    Pastry Shop
    </div>
    
    
  </div>

  )
}