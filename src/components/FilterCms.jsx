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
  
  
  

  return (
    <ButtonGroup variant="contained" aria-label="outlined primary button group">
      <Button onClick={() => {props.onFilterCms(["Pastry Shop", "Cake shop", "Dessert shop"])}}>Pastry Shop</Button>
      <Button onClick={() => {props.onFilterCms(["Restaurant", "Bistro", "Breakfast Restaurant", "Charcuterie", "Diner", "Family restaurant", "Fine dining restaurant", "French restaurant"])}}>Restaurant</Button>
      <Button onClick={() => {props.onFilterCms(["Grocery", "Cheese shop", "Chocolate shop", "Convenience Store", "Grocery store"])}}>Grocery</Button>
      <Button onClick={() => {props.onFilterCms(["Bakery", "Cafe"])}}>Bakery</Button>
      <Button onClick={() => {props.onFilterCms(props.categories)}}>All Categories</Button>
    </ButtonGroup>
  )
}