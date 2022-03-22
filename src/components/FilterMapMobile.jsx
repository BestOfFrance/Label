import react, {useState} from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import './DropDown.css'

export default function FilterMapMobile(props) {
  const [state, setState] = useState({
    restaurant: false,
    grocery: false,
    pastry: false,
    bakery: false
  })
    
  const categories = props.categories

  const onClickAll = function() {
    props.onClick(props.categories)
    setState((prev) => ({pastry: false, grocery: false, restaurant: false, bakery: false}))
  }

  const onClickGrocery = function (){
    props.onClick(["Grocery", "Cheese shop", "Chocolate shop", "Convenience Store", "Grocery store"])
    if (!state.grocery) {
      setState((prev) => ({pastry: false, grocery: true, restaurant: false, bakery: false}))
    } 
  
  }

  const onClickRestaurant = function (){
    props.onClick(["Restaurant", "Bistro", "Breakfast Restaurant", "Charcuterie", "Diner", "Family restaurant", "Fine dining restaurant", "French restaurant"])
  
    if (!state.restaurant) {
      setState((prev) => ({pastry: false, grocery: false, restaurant: true, bakery: false}))
    } 
  }

  const onClickBakery = function (){
    props.onClick(["Bakery", "Cafe"])
    if (!state.bakery) {
      setState((prev) => ({pastry: false, grocery: false, restaurant: false, bakery: true}))
    } 
  }

  const onClickPastry = function (){
    props.onClick(["Pastry Shop", "Cake shop", "Dessert shop"])
    if (!state.pastry) {
      setState((prev) => ({pastry: true, grocery: false, restaurant: false, bakery: false}))
    } 
  }
  return(
   
  <div id="filter-map-mobile-container">
    <div className="filter-mobile-button" style={state.grocery ? {'color': 'black', 'backgroundColor': '#ABB9D1'} : {'color': 'white', 'backgroundColor': 'black'}}>
    <img className="filter-map-mobile-image" src={state.grocery ? 'shopBlack.svg' : `shopMobile.svg`} onClick={onClickGrocery}/>
    Grocery
    </div>
    <div className="filter-mobile-button" style={state.restaurant ? {'color': 'black', 'backgroundColor': '#ABB9D1'} : {'color': 'white', 'backgroundColor': 'black'}}>
    <img className="filter-map-mobile-image" src={state.restaurant ? 'forkBlack.svg' : `forkMobile.svg`} onClick={onClickRestaurant}/>
    Restaurant
    </div>
    
    <div className="filter-mobile-button-all" >
    <img className="filter-map-mobile-image-all" src="home.svg" onClick={onClickAll}/>
    
    </div>
    <div className="filter-mobile-button" style={state.bakery ? {'color': 'black', 'backgroundColor': '#ABB9D1'} : {'color': 'white', 'backgroundColor': 'black'}}>
    <img  className="filter-map-mobile-image-croissant" src={state.bakery ? 'croissant-2Black.svg' : `croissantMobile.svg`} onClick={onClickBakery}/>
    Bakery
    </div>
    <div className="filter-mobile-button" style={state.pastry ? {'color': 'black', 'backgroundColor': '#ABB9D1'} : {'color': 'white', 'backgroundColor': 'black'}}>
    <img className="filter-map-mobile-image" src={state.pastry ? 'madeleineBlack.svg' : `madeleine.svg`} onClick={onClickPastry}/>
    Pastries
    </div>
    
    
  </div>

  )
}