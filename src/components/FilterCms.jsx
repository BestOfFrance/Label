import react, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import './FilterCms.css'

export default function FilterCms(props) {
  const [background, setBackground] = useState('none')
  const [transform, setTransform] = useState(null)
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
  useEffect(() => {
    if (props.category === "Bakery" || props.category === "Cafe" ) {
      setBackground('url("croissantMobile.svg")');
      setTransform('rotate(45deg)')
     } else if (props.category === "Pastry Shop" || props.category === "Cake shop" || props.category === "Dessert shop"){
        
        setBackground('url("madeliene.svg")');
      
     } else if (props.category === "Restaurant" || props.category === "Bistro" || props.category === "Breakfast Restaurant" || props.category === "Charcuterie" || props.category === "Diner" || props.category === "Family restaurant" || props.category === "Fine dining restaurant" || props.category === "French restaurant") {
      setBackground('url("forkMobile.svg")');
      
     } else if (props.category === "Grocery" || props.category === "Cheese shop" || props.category === "Chocolate shop" || props.category === "Convenience store" || props.category === "Grocery store") {
      setBackground('url("shopMobile.svg")');
     }
   }, [])

  return (
    <RadioGroup variant="contained" aria-label="outlined primary button group" className="radio-group-buttons">
      <div className="radio-button-container">
      <div className="radio-button-image-container" style={{backgroundImage: 'url("madeleine.svg")'}}>
      
      </div>
      Pastry Shop
      <div className="radio-button">
      <Radio className="cms-filter-button" onClick={onClickPastry} checked={state.activePastry}></Radio>
      </div>
      </div>
      <div className="radio-button-container">
      <div className="radio-button-image-container" style={{backgroundImage: 'url("fork.svg")'}}>
      
      </div>
      Restaurant
      <div className="radio-button">
      <Radio className="cms-filter-button" onClick={onClickRestaurant} checked={state.activeRestaurant}></Radio>
      </div>
      </div>
      <div className="radio-button-container">
        <div className="radio-button-image-container" style={{backgroundImage: 'url("shop.svg")'}}>
      
      </div>
      Grocery
      <div className="radio-button">
      <Radio className="cms-filter-button"  onClick={onClickGrocery} checked={state.activeGrocery}></Radio>
      </div>
      </div>
      <div className="radio-button-container">
      <div className="radio-button-image-container" style={{backgroundImage: 'url("croissant-2.svg")'}}>
     
      </div>
      Bakery
      <div className="radio-button">
      <Radio className="cms-filter-button"  onClick={onClickBakery} checked={state.activeBakery}></Radio>
      </div>
      </div>
      <div className="radio-button-container">
      All Categories
      <div className="radio-button">
      <Radio className="cms-filter-button"  onClick={onClickAll} checked={state.activeAll}></Radio>
      </div>
      </div>
      
    </RadioGroup>
  )
}