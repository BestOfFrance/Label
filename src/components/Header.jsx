import react from 'react'
import './Header.css'



export default function Header(props) {

  return (
    <div className="header">
      <div>
        <img id='logo' src='BOFLogo.svg'></img>
      </div>
      <div id="title">
        <div>
        Label
        </div>
      </div>
      <div>
      
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