import react, {useState} from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import './FilterCms.css'

export default function FilterCms(props) {
  const [state, setState] = useState({
    
    categories: props.categories,
    activeAll: true,
    activePastry: false,
    activeRestaurant: false,
    activeGrocery: false,
    activeBakery: false

  }
  )
  
  const pastry = ["Pastry Shop", "Cake shop", "Dessert shop", "Pastry shop"]
  const restaurant = ["Restaurant", "Bistro", "Breakfast Restaurant", "Charcuterie", "Diner", "Family restaurant", "Fine dining restaurant", "French restaurant"]
  const grocery = ["Grocery", "Cheese shop", "Chocolate shop", "Convenience Store", "Grocery store"]
  const bakery = ["Bakery", "Cafe"]
  const onClickPastry = function() {
    const categories = []
    if (state.activePastry) {
    
    setState((prev) => ({ ...prev, activePastry: false, activeAll: true }))
    props.onFilterCms(categories)
    } else {
      
      setState((prev) => ({ ...prev, activeBakery: false, activeAll: false, activeGrocery: false, activePastry: true, activeRestaurant: false}))
      props.onFilterCms(pastry)
    }
  }

  const onClickRestaurant = function() {
    const categories = []
    if (state.activeRestaurant) {
    
    setState((prev) => ({ ...prev, activeRestaurant: false, activeAll: true }))
    props.onFilterCms(props.categories)
    } else {
      
      setState((prev) => ({ ...prev, activeBakery: false, activeAll: false, activeGrocery: false, activePastry: false, activeRestaurant: true }))
    props.onFilterCms(restaurant)
    }
  }

  const onClickGrocery = function() {
    const categories = []
    if (state.activeGrocery) {
    
    setState((prev) => ({ ...prev, activeGrocery: false, activeAll: true }))
    props.onFilterCms(props.categories)
    } else {
      
      setState((prev) => ({ ...prev, activeBakery: false, activeAll: false, activeGrocery: true, activePastry: false, activeRestaurant: false }))
    props.onFilterCms(grocery)
    }
  }

  const onClickBakery = function() {
    const categories = []
    if (state.activeBakery) {
    
    setState((prev) => ({ ...prev, activeBakery: false, activeAll: true }))
    props.onFilterCms(props.categories)
    } else {
      
      setState((prev) => ({ ...prev, activeBakery: true, activeAll: false, activeGrocery: false, activePastry: false, activeRestaurant: false }))
      props.onFilterCms(bakery)
    }
  }
  const onClickAll = function() {
    const categories = []
    if (!state.activeAll) {
    
      setState((prev) => ({ ...prev, activeAll: true, activeBakery: false, activeGrocery: false, activePastry: false, activeRestaurant: false  }))
    props.onFilterCms(props.categories)
    } 
  }

  return (
    <RadioGroup variant="contained" aria-label="outlined primary button group" className="radio-group-buttons">
      {/* <Button onClick={() => {props.onFilterCms(["Pastry Shop", "Cake shop", "Dessert shop"])}}>Pastry Shop</Button> */}
      Pastry Shop
      <Radio className="cms-filter-button" onClick={onClickPastry} checked={state.activePastry}></Radio>
      Restaurant

      <Radio className="cms-filter-button" onClick={onClickRestaurant} checked={state.activeRestaurant}></Radio>
      Grocery
      <Radio className="cms-filter-button"  onClick={onClickGrocery} checked={state.activeGrocery}></Radio>
      Bakery
      <Radio className="cms-filter-button"  onClick={onClickBakery} checked={state.activeBakery}></Radio>
      All Categories
      <Radio className="cms-filter-button"  onClick={onClickAll} checked={state.activeAll}></Radio>
      
    </RadioGroup>
  )
}