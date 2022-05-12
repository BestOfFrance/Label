import React, { useEffect, useState } from 'react';
import Maps from './components/Map'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ListGroup from 'react-bootstrap/ListGroup';
import './components/list.css'
// import details from './details.js';
// import getDistance from '../src/helpers/getDistance'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import FilterCms from './components/FilterCms'
import {Helmet} from "react-helmet";
import { Waveform } from '@uiball/loaders'
import { Ring } from '@uiball/loaders'


export default function HomePage(props) {
  const [items, setItems] = useState(props.items)
  // console.log(props.items)
  useEffect(() => {
    
    setItems(props.items)


  }, [props.items])


  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 768;

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handleWindowResize);

    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const seo = {
    title: 'Label',
    description: 'Find authentic French cuisine near you.',
    url: 'https://www.mydomain.com/',
    image: 'https://mydomain.com/images/home/logo.png',
  }

  return(
    <div className="main-body-main-page">
      <Helmet
  title={`${seo.title} | Best of France`}
  meta={[
    {
      name: 'description',
      property: 'og:description',
      content: seo.description,
    },
    { property: 'og:title', content: `${seo.title} | Best of France` },
    { property: 'og:url', content: seo.url },
    { property: 'og:image', content: seo.image },
    { property: 'og:image:type', content: 'image/jpeg' }
    
  ]}
/>
      {props.mode === 'MAP' &&
      <div className="main-container">
        <div className="premium-map">
        
        <div className="premium-list">
        {/* <ReportButton/> */}
        
          <div className="cms">
          
        <ListGroup as="ul" id="premium">
          {items}
       </ListGroup>
       </div>
          </div>
          {props.location === null &&
          <div className="loader">
     <Ring 
     size={40}
     lineWeight={5}
     speed={2} 
     color="black" 
    />
    </div>
    }
        {props.location !== null && 
        <Maps location={props.location} currentZoom={props.currentZoom} zoomLevel={14} zoom={props.zoom} shops={props.shops} marker={props.marker} permanent={props.permanent} onChange={props.onChange} onFilter={props.onFilter} signedIn={props.signedIn} categories={props.categoriesArray}>
        
        </Maps>
        }
        
        
        </div>
        
        <div className="list-bottom">
         <div id="french-food-div">
        <h2 id="cms-title">French Food Near You</h2>
        </div>
        {width > breakpoint &&
        <FilterCms
        onFilterCms={props.onFilterCms}
        categories={props.categories}
        onFilterCMSMobile={props.onFilterCMSMobile}/>
        } 
        {props.sortedShops !== undefined &&
        <div  className="cms-cards">
          
          <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs="auto">
          {props.cmsBakery[0]}
        </Grid>
        <Grid item xs="auto">
          {props.cmsBakery[1]}
        </Grid>
        <Grid item xs="auto">
        {props.cmsBakery[2]}
        </Grid>
      </Grid>
    </Box>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs="auto">
          {props.cmsBakery[3]}
        </Grid>
        <Grid item xs="auto">
          {props.cmsBakery[4]}
        </Grid>
        <Grid item xs="auto">
        {props.cmsBakery[5]}
        </Grid>
      </Grid>
    </Box>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs="auto">
          {props.cmsBakery[6]}
        </Grid>
        <Grid item xs="auto">
          {props.cmsBakery[7]}
        </Grid>
        <Grid item xs="auto">
        {props.cmsBakery[8]}
        </Grid>
      </Grid>
    </Box>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs="auto">
          {props.cmsBakery[9]}
        </Grid>
        <Grid item xs="auto">
          {props.cmsBakery[10]}
        </Grid>
        <Grid item xs="auto">
        {props.cmsBakery[11]}
        </Grid>
      </Grid>
    </Box>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs="auto">
          {props.cmsBakery[12]}
        </Grid>
        <Grid item xs="auto">
          {props.cmsBakery[13]}
        </Grid>
        <Grid item xs="auto">
        {props.cmsBakery[14]}
        </Grid>
      </Grid>
    </Box>

         
          </div>
          }
      


          
        </div>
      </div>
}
      {/* {props.mode === "DISPLAY" &&
      <div className="main-body-show">
        <ShopDisplay shops={props.shops} onClick={props.onClick} rating={props.rating}
        price={props.price} selected={props.selected}/>
        </div>
      } */}
      </div>

         
          
  )
}