import react, {useState} from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

export default function FilterCms(props) {
  const [state, setState] = useState({
    
    categories: props.categories,
    activeAll: true,
    activePastry: true,
    activeRestaurant: true,
    activeGrocery: true,
    activeBakery: true

  }
  )
  
  const pastry = ["Pastry Shop", "Cake shop", "Dessert shop", "Pastry shop"]
  const restaurant = ["Restaurant", "Bistro", "Breakfast Restaurant", "Charcuterie", "Diner", "Family restaurant", "Fine dining restaurant", "French restaurant"]
  const grocery = ["Grocery", "Cheese shop", "Chocolate shop", "Convenience Store", "Grocery store"]
  const bakery = ["Bakery", "Cafe"]
  const onClickPastry = function() {
    const categories = []
    if (state.activePastry) {
    for (const category of state.categories) {
      if (!pastry.includes(category)) {
        categories.push(category)
      }
    }
    setState((prev) => ({ ...prev, activePastry: false, categories: categories }))
    props.onFilterCms(categories)
    } else {
      const stateCat = state.categories;
      for (const category of pastry) {
        stateCat.push(category)
      }
      setState((prev) => ({ ...prev, activePastry: true, categories: stateCat }))
    props.onFilterCms(stateCat)
    }
  }

  const onClickRestaurant = function() {
    const categories = []
    if (state.activeRestaurant) {
    for (const category of state.categories) {
      if (!restaurant.includes(category)) {
        categories.push(category)
      }
    }
    setState((prev) => ({ ...prev, activeRestaurant: false, categories: categories }))
    props.onFilterCms(categories)
    } else {
      const stateCat = state.categories;
      for (const category of restaurant) {
        stateCat.push(category)
      }
      setState((prev) => ({ ...prev, activeRestaurant: true, categories: stateCat }))
    props.onFilterCms(stateCat)
    }
  }

  const onClickGrocery = function() {
    const categories = []
    if (state.activeGrocery) {
    for (const category of state.categories) {
      if (!grocery.includes(category)) {
        categories.push(category)
      }
    }
    setState((prev) => ({ ...prev, activeGrocery: false, categories: categories }))
    props.onFilterCms(categories)
    } else {
      const stateCat = state.categories;
      for (const category of grocery) {
        stateCat.push(category)
      }
      setState((prev) => ({ ...prev, activeGrocery: true, categories: stateCat }))
    props.onFilterCms(stateCat)
    }
  }

  const onClickBakery = function() {
    const categories = []
    if (state.activeBakery) {
    for (const category of state.categories) {
      if (!bakery.includes(category)) {
        categories.push(category)
      }
    }
    setState((prev) => ({ ...prev, activeBakery: false, categories: categories }))
    props.onFilterCms(categories)
    } else {
      const stateCat = state.categories;
      for (const category of bakery) {
        stateCat.push(category)
      }
      setState((prev) => ({ ...prev, activeBakery: true, categories: stateCat }))
    props.onFilterCms(stateCat)
    }
  }

  return (
    <ButtonGroup variant="contained" aria-label="outlined primary button group">
      {/* <Button onClick={() => {props.onFilterCms(["Pastry Shop", "Cake shop", "Dessert shop"])}}>Pastry Shop</Button> */}
      <Button style={{backgroundColor: state.activePastry ? '#0957a5' : '#818181'}} onClick={onClickPastry}>Pastry Shop</Button>
      <Button style={{backgroundColor: state.activeRestaurant ? '#0957a5' : '#818181'}}onClick={onClickRestaurant}>Restaurant</Button>
      <Button style={{backgroundColor: state.activeGrocery ? '#0957a5' : '#818181'}} onClick={onClickGrocery}>Grocery</Button>
      <Button style={{backgroundColor: state.activeBakery ? '#0957a5' : '#818181'}} onClick={onClickBakery}>Bakery</Button>
      
    </ButtonGroup>
  )
}