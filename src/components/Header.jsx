import {useState} from 'react'
import './Header.css'
import SearchBar from './SearchBar'


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
      <div >
        <button onClick={props.onHome}>
        <img id='logo' src='BOFLogo.svg'></img>
        </button>
      </div>
      
      <div id="title">
        <div>
        Label
        </div>
      </div>
      <div>
      
        </div>
        {hidden === 'show' && 
        <SearchBar
        
        searchSelected={props.searchSelected}
        updateSearch={props.updateSearch}
        searchList={props.searchList}
      />
        
        }
        
        
        <div>
         <button className="small-button"><img className="search-icon" src="icons8-search-50.png" onClick={showSearch}/></button> 
        
        </div>
        <div className="news-deals-container">
          <button className="small-button" onClick={props.getNews}>
            News and Deals
          </button>
          
        </div>
        <div className="go-premium">
         <button className="small-button">Go Premium</button>
      </div>
      <div className="user" >
        <button className="small-button" onClick={props.getAccount}>
        <img src="icons8-user-64.png" className="user-icon"></img>
        <div className="myaccount">
          {props.signedIn ? "My Account" : "Sign In"}
        </div>
        </button>
      </div>
    </div>
  )
}