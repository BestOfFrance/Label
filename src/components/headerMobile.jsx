import {useState, useEffect, useRef} from 'react'
import './Header.css'
import SearchBar from './SearchBar'
import { Routes, Route, Link } from "react-router-dom";
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import MenuIcon from '@mui/icons-material/Menu';


export default function HeaderMobile(props) {
  const [hidden, setHidden] = useState('hidden')
  
  // const showSearch = function() {
  //   if (hidden === 'hidden') {
  //     setHidden('show')
  //   } else {
  //     setHidden('hidden')
  //   }
  // }

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
 

  console.log(props.signedIn, 'signed in header')
  return (
    
    <div className="header-mobile">
      <div className="header-links-mobile">
      
      <div className="logo-container-mobile">
        
       <nav>
         <Link to='/'>
         <button className="logo-button" >
        <img id='logo-mobile' src='BOFLogo.svg'></img>
        </button>
       
        </Link>
       </nav>
        
      </div>
      
      
      
      
{/*         
        
        
        
        <div className="news-deals-container">
          <button className="small-button" onClick={props.getNews}>
            News and Deals
          </button>
          
        </div>
        <div className="go-premium">
         <button className="small-button">Go Premium</button>
      </div>
      <div className="user" >
        {props.signedIn === false && 
        <nav>
          <Link to='/loginorsign' >
        <button className="small-button" >
        <img src="icons8-user-64.png" className="user-icon"></img>
        
        </button>
        </Link>
        </nav>

        }
        {props.signedIn === true &&
          <nav>
          <Link to='/dashboard' >
        <button className="small-button" >
        <img src="icons8-user-64.png" className="user-icon"></img>
        
        </button>
        </Link>
        </nav>
          }
        <div className="myaccount">
          {props.signedIn ? "My Account" : "Sign In"}
        </div>
       
          
        
      </div> */}
      <Stack direction="row" spacing={2}>
      
      <div>
        <img src="menu.svg"
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        />
          
        
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={handleClose} >{props.signedIn === false && 
        <nav>
          <Link to='/loginorsign' >
        <button className="small-button" >
        {props.signedIn ? "My Account" : "Sign In"}
        
        </button>
        </Link>
        </nav>

        }
        {props.signedIn === true &&
          <nav>
          <Link to='/dashboard' >
        <button className="small-button" >
        {props.signedIn ? "My Account" : "Sign In"}
        
        </button>
        </Link>
        </nav>
          }</MenuItem>
                    <MenuItem onClick={handleClose}><div className="go-premium">
         <button className="small-button">Go Premium</button>
      </div></MenuItem>
                    <MenuItem onClick={handleClose}><button className="small-button" onClick={props.getNews}>
            News and Deals
          </button>
          </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </Stack>
  
    </div>
{/* 
    <div id="search-container-mobile">
        <div>
        <SearchBar
        
        searchSelected={props.searchSelected}
        updateSearch={props.updateSearch}
        searchList={props.searchList}
        />
        </div>
      </div> */}


    </div>
        
        
  )
}