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
    </div>
  )
}