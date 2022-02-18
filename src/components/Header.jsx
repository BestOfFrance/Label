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
      <div class="dropdown">
        <img src="icons8-user-64.png" className="user-icon"></img>
        <div class="dropdown-content">
          <a href="#">Link 1</a>
          <a href="#">Link 2</a>
          <a href="#">Link 3</a>
        </div>
      </div>
    </div>
  )
}