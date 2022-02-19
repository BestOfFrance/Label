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
      <div onClick={props.onHome}>
        <img id='logo' src='BOFLogo.svg'></img>
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
          <img className="search-icon" src="icons8-search-50.png" onClick={showSearch}/>
        
        </div>
        
      <div className="user" onClick={props.getAccount}>
        <img src="icons8-user-64.png" className="user-icon"></img>
        <div className="myaccount">
          My Account
        </div>
      </div>
    </div>
  )
}