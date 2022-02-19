import react from 'react'
import './Header.css'
import SearchBar from './SearchBar'


export default function Header(props) {

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
        <SearchBar
        searchSelected={props.searchSelected}
        updateSearch={props.updateSearch}
        searchList={props.searchList}
        />
      <div className="user" onClick={props.getAccount}>
        <img src="icons8-user-64.png" className="user-icon"></img>
        <div className="myaccount">
          My Account
        </div>
      </div>
    </div>
  )
}