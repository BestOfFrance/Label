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
  
 const categories = props.categories
  const onClickPastry = function() {
    
    if (state.activePastry) {
    
    setState((prev) => ({ ...prev, activePastry: false, activeAll: true }))
    props.onFilterCms(categories)
    } else {
      
      setState((prev) => ({ ...prev, activeBakery: false, activeAll: false, activeGrocery: false, activePastry: true, activeRestaurant: false}))
      props.onFilterCms(["Bakery"])
    }
  }

  const onClickRestaurant = function() {
    
    if (state.activeRestaurant) {
    
    setState((prev) => ({ ...prev, activeRestaurant: false, activeAll: true }))
    props.onFilterCms(props.categories)
    } else {
      
      setState((prev) => ({ ...prev, activeBakery: false, activeAll: false, activeGrocery: false, activePastry: false, activeRestaurant: true }))
    props.onFilterCms(["Restaurant"])
    }
  }

  const onClickGrocery = function() {
    
    if (state.activeGrocery) {
    
    setState((prev) => ({ ...prev, activeGrocery: false, activeAll: true }))
    props.onFilterCms(props.categories)
    } else {
      
      setState((prev) => ({ ...prev, activeBakery: false, activeAll: false, activeGrocery: true, activePastry: false, activeRestaurant: false }))
    props.onFilterCms(["Shop"])
    }
  }

  const onClickBakery = function() {
    
    if (state.activeBakery) {
    
    setState((prev) => ({ ...prev, activeBakery: false, activeAll: true }))
    props.onFilterCms(props.categories)
    } else {
      
      setState((prev) => ({ ...prev, activeBakery: true, activeAll: false, activeGrocery: false, activePastry: false, activeRestaurant: false }))
      props.onFilterCms(["Café"])
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
      <div className="radio-button-container">
      <div className="radio-button-image-container" style={{backgroundImage: 'url("madeleine.svg")'}}>
      
      </div>
      Bakery
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
      Shop
      <div className="radio-button">
      <Radio className="cms-filter-button"  onClick={onClickGrocery} checked={state.activeGrocery}></Radio>
      </div>
      </div>
      <div className="radio-button-container">
      <div className="radio-button-image-container" style={{backgroundImage: 'url("coffee-cup-2.svg")'}}>
     
      </div>
     Café
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