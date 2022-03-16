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
      setTransform(`translate(375px, 0px)`)
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
        <div className="filter-mobile-button" onClick={handleCloseGrocery} >
        <img className="filter-map-mobile-image" src="shopMobile.svg"/>
          Grocery
        </div>
        <div className="filter-mobile-button" onClick={handleCloseBakery} >
        <img  className="filter-map-mobile-image" src="croissantMobile.svg"/>
          Bakery
        </div>
        
        <div className="filter-mobile-button" onClick={handleClosePastry} >
        <img className="filter-map-mobile-image" src="madeleine.svg"/>
          Pasrty
        </div>
        <div className="filter-mobile-button" onClick={handleCloseRestaurant} >
        <img className="filter-map-mobile-image" src="forkMobile.svg"/>
          Restaurant
        </div>
        <div className="filter-mobile-button" onClick={handleCloseAll} >
        <img className="filter-map-mobile-image" src="BOFLogo.svg"/>
          All Categories
        </div>
        </div>
}
    </div>
  );
}