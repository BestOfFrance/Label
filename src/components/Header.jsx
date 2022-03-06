import {useState} from 'react'
import './Header.css'
import SearchBar from './SearchBar'
import { Routes, Route, Link } from "react-router-dom";


export default function Header(props) {
  const [hidden, setHidden] = useState('hidden')

  const showSearch = function() {
    if (hidden === 'hidden') {
      setHidden('show')
    } else {
      setHidden('hidden')
    }
  }
  return (
    <div className="header">
      <div className="logo-container">
        
       <nav>
         <Link to='/'>
         <button className="logo-button" >
        <img id='logo' src='BOFLogo.svg'></img>
        </button>
       
        </Link>
       </nav>
        
      </div>
      
      <div id="search-container">
        <div>
        <SearchBar
        
        searchSelected={props.searchSelected}
        updateSearch={props.updateSearch}
        searchList={props.searchList}
        />
        </div>
      </div>
      <div className="header-links">
      
        
        
        
        
        <div className="news-deals-container">
          <button className="small-button" onClick={props.getNews}>
            News and Deals
          </button>
          
        </div>
        <div className="go-premium">
         <button className="small-button">Go Premium</button>
      </div>
      <div className="user" >
        <nav>
          <Link to='/loginorsign' >
        <button className="small-button" onClick={props.getAccount}>
        <img src="icons8-user-64.png" className="user-icon"></img>
        <div className="myaccount">
          {props.signedIn ? "My Account" : "Sign In"}
        </div>
        </button>
        </Link>
        </nav>
      </div>
    </div>
    </div>
  )
}