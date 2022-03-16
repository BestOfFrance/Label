import * as React from 'react';


import './DropDown.css'



export default function DropDownTwo(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [background, setBackground] = React.useState("doubleArrow.svg")
  const [transform, setTransform] = React.useState(`translate(0px, 0px)`)
  const [open, setOpen] = React.useState(false)

  const handleClick = () => {
    if (open) {
      setOpen(false)
      setTransform(`translate(0px, 0px)`)
      setBackground("doubleArrow.svg")
    } else {
      setTransform(`translate(100px, 0px)`)
      setOpen(true)
      setBackground("doubleArrowBackwards.svg")
    }
  }
  
  const handleCloseGrocery = () => {
    props.onClick(["Grocery", "Cheese shop", "Chocolate shop", "Convenience Store", "Grocery store"])
    
  };
  const handleCloseRestaurant = () => {
    props.onClick(["Restaurant", "Bistro", "Breakfast Restaurant", "Charcuterie", "Diner", "Family restaurant", "Fine dining restaurant", "French restaurant"])
    
  };
  const handleCloseAll = () => {
    props.onClick(props.categories)
    
  };
  const handleCloseBakery = () => {
    props.onClick(["Bakery", "Cafe"])
    
  };
  const handleClosePastry = () => {
    props.onClick(["Pastry Shop", "Cake shop", "Dessert shop"])
    
  };
  

  return (
    <div>
      <div id="dropdowntwo-container"
        onClick={handleClick}
        style={{transform: transform}}
      >
        <img src={background}/>
      </div>
      {open &&
      <div id="dropdowntwo-menu">
        <div onClick={handleCloseGrocery} disableRipple>
         
          Grocery
        </div>
        <div onClick={handleCloseBakery} disableRipple>
          
          Bakery
        </div>
        
        <div onClick={handleClosePastry} disableRipple>
         
          Pasrty
        </div>
        <div onClick={handleCloseRestaurant} disableRipple>
          
          Restaurant
        </div>
        <div onClick={handleCloseAll} disableRipple>
          
          All Categories
        </div>
        </div>
}
    </div>
  );
}