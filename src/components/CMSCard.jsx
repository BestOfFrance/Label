import {React, useState, useEffect} from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import './list.css'
import { Link} from "react-router-dom";

export default function CMSCard(props) {
  const [active, setActive] = useState(false);
  const [hidden, setHidden] = useState("visible")
  const [price, setPrice] = useState("")
  const [width, setWidth] = useState(window.innerWidth);
  
  const [background, setBackground] = useState('none')
  const [transform, setTransform] = useState('translateY(-25px)')

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handleWindowResize);

    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  useEffect(() => {
    if (props.shop.price) {
      if (props.shop.price.length === 1) {
        setPrice(1)
      }
      if (props.shop.price.length === 2) {
        setPrice(2)
      }
      if (props.shop.price.length === 3) {
        setPrice(2)
      }
    }
    
    
    if (props.selectedCenter !== null) {
    //   console.log('props.id', props.id)
    // console.log('props.selectedCenter', props.selectedCenter.id)
      if (props.id === props.selectedCenter.id) {
        setActive(true);
      } else {
        setActive(false);
      }
    }
   
  }, [props.state])
  
useEffect(() => {
  // console.log(props.shop.hidden)
  if (props.shop.hidden === true) {
    setHidden("hidden")
  }
}, [])
  useEffect(() => {
    
    if (props.selectedCenter !== null) {
    //   console.log('props.id', props.id)
    // console.log('props.selectedCenter', props.selectedCenter.id)
      if (props.id === props.selectedCenter.id) {
        setActive(true);
      } else {
        setActive(false);
      }
    }
   
  }, [props.selectedCenter])

// console.log(props.shop.category, props.shop.name)
  useEffect(() => {
    if (props.shop.category === "Café" ) {
      setBackground('url("coffee-cup-2.svg")');
      setTransform('translateY(-25px)')
     }  if (props.shop.category === "Bakery" ){
        
        setBackground('url("madeleine.svg")');
        setTransform('translateY(-25px)')
     }  if (props.shop.category === "Restaurant") {
      setBackground('url("fork.svg")');
      setTransform('translateY(-25px)')
      
     } if (props.shop.category === "Shop") {
      setBackground('url("shop.svg")');
      setTransform('translateY(-25px)')
     }
   }, [props.sortedShops])

  
  const styles = {
   
        backgroundImage: `url(${props.image})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        
    
};

  return(
    
    <ListGroup.Item as="li" className={`list-item ${active ? "active" : ""}`} id={props.id}  style={{visibility: hidden}} >
      <div style={styles} className="list-images">
      

      </div>
      
      <div className="cms-button-container-upper">
        <div className="title-rating-cards">
        <p className="cms-card-shop-title">{props.shop.name}</p>
      <div className="price-rating-cards-cms">
          <div className='rating-business'>
            {/* Rating: {props.shop.rating} */}
            {/* Rating: <p className="rating-buffer"></p> */}
            {props.shop.rating === 0 &&
            <div>
              <img alt={''} src="emptyStar.svg" className="rating-star"></img><img alt={''} src="emptyStar.svg" className="rating-star"></img><img alt={''} src="emptyStar.svg" className="rating-star"></img><img alt={''} src="emptyStar.svg" className="rating-star"></img><img alt={''} src="emptyStar.svg" className="rating-star"></img>
            </div>
            }
            {props.shop.rating === 0.5 &&
            <div>
              <img alt={''} src="rating.svg"></img><img alt={''} src="emptyStar.svg" className="rating-star"></img><img alt={''} src="emptyStar.svg" className="rating-star"></img><img alt={''} src="emptyStar.svg" className="rating-star"></img><img alt={''} src="emptyStar.svg" className="rating-star"></img>
            </div>
            }
            {props.shop.rating === 1 &&
            <div>
              <img alt={''} src="star.svg" className="rating-star"></img><img alt={''} src="emptyStar.svg" className="rating-star"></img><img alt={''} src="emptyStar.svg" className="rating-star"></img><img alt={''} src="emptyStar.svg" className="rating-star"></img><img alt={''} src="emptyStar.svg" className="rating-star"></img>
            </div>
            }
            {props.shop.rating === 1.5 &&
            <div>
              <img alt={''} src="star.svg" className="rating-star"></img><img alt={''} src="rating.svg"></img><img alt={''} src="emptyStar.svg" className="rating-star"></img><img alt={''} src="emptyStar.svg" className="rating-star"></img><img alt={''} src="emptyStar.svg" className="rating-star"></img>
            </div>
            }
            {props.shop.rating === 2 &&
            <div>
              <img alt={''} src="star.svg" className="rating-star"></img><img alt={''} src="star.svg" className="rating-star"></img><img alt={''} src="emptyStar.svg" className="rating-star"></img><img alt={''} src="emptyStar.svg" className="rating-star"></img><img alt={''} src="emptyStar.svg" className="rating-star"></img>
            </div>
            }
            {props.shop.rating === 2.5 &&
            <div>
              <img alt={''} src="star.svg" className="rating-star"></img><img alt={''} src="star.svg" className="rating-star"></img><img alt={''} src="rating.svg" className="rating-star"></img><img alt={''} src="emptyStar.svg" className="rating-star"></img><img alt={''} src="emptyStar.svg" className="rating-star"></img>
            </div>
            }
             {props.shop.rating === 3 &&
            <div>
              <img alt={''} src="star.svg" className="rating-star"></img><img alt={''} src="star.svg" className="rating-star"></img><img alt={''} src="star.svg" className="rating-star"></img><img alt={''} src="emptyStar.svg" className="rating-star"></img><img alt={''} src="emptyStar.svg" className="rating-star"></img>
            </div>
            }
            {props.shop.rating === 3.5 &&
            <div>
              <img alt={''} src="star.svg" className="rating-star"></img><img alt={''} src="star.svg" className="rating-star"></img><img alt={''} src="star.svg" className="rating-star"></img><img alt={''} src="rating.svg" className="rating-star"></img><img alt={''} src="emptyStar.svg" className="rating-star"></img>
            </div>
            }
            {props.shop.rating === 4 &&
            <div>
              <img alt={''} src="star.svg" className="rating-star"></img><img alt={''} src="star.svg" className="rating-star"></img><img alt={''} src="star.svg" className="rating-star"></img><img alt={''} src="star.svg" className="rating-star"></img><img alt={''} src="emptyStar.svg" className="rating-star"></img>
            </div>
            }
            {props.shop.rating === 5 &&
            <div>
              <img alt={''} src="star.svg" className="rating-star"></img><img alt={''} src="star.svg" className="rating-star"></img><img alt={''} src="star.svg" className="rating-star"></img><img alt={''} src="star.svg" className="rating-star"></img><img alt={''} src="star.svg" className="rating-star"></img>
            </div>
            }
            {props.shop.rating === 4.5 &&
            <div>
              <img alt={''} src="star.svg" className="rating-star"></img><img alt={''} src="star.svg" className="rating-star"></img><img alt={''} src="star.svg" className="rating-star"></img><img alt={''} src="star.svg" className="rating-star"></img><img alt={''} className="rating-star" src="rating.svg"></img>
            </div>
            }
  
            </div>
            <div>
          {price === 1 &&
            <div><img alt={''} className="price-image" src="dollar.svg"></img></div>
          }     
          {price === 2 &&
            <div><img alt={''} className="price-image" src="dollar.svg"></img><img alt={''} className="price-image" src="dollar.svg"></img></div>
          }      
          {price === 3 &&
            <div><img alt={''} className="price-image" src="dollar.svg"></img><img alt={''} className="price-image" src="dollar.svg"></img><img alt={''}  className="price-image" src="dollar.svg"></img></div>
          }        
            </div>
            </div>
            </div>
            {/* {props.shop.category}  */}
            <div className="cms-marker-image" style={{backgroundImage: background, transform: transform}}>

            </div>
      {/* <div className="locate-container">
        <button className="cms-button" onClick={() => {props.onClick(props.latitude, props.longitude, props.shop)}}><img alt={''} className="cms-button-image" src="place.svg"></img></button>
        
      
      </div> */}
      </div>
      <div className="cms-button-container"> 
      <div className="cms-button-div">
      
        <button className="cms-button-locate" onClick={() => {props.onClick(props.latitude, props.longitude, props.shop)}}>{width > 767 && <div>Locate</div>}<img alt={''} className="cms-button-image" src="place.svg"></img></button>
        
      
      
        
      
      </div>
      <div className="cms-button-div">
      <button className="cms-button">
      <Link to={`reportbusiness/${props.name}`} ><img alt={''} className="cms-button-image" src="report.svg"/></Link>
      </button>
</div>
      </div>
      
    </ListGroup.Item>
    

  )
}