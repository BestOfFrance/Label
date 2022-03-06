import './LoginOrSign.css'
import { Routes, Route, Link } from "react-router-dom";

export default function LoginOrSign(props) {

  return (
    <div className="register-container">
      <div>
      You're not signed in. Please select an option below. 
      </div>

      <div >
        <nav>
          <Link to='/login'>
        <button className="login-button-button" >Login</button>
        </Link>
        </nav>
        
      </div>
      <div className="choose-account-type">
      
        <div className="foodie-panel">
          
          <img className="foodie-business-image" src="person-shopping-online.png"/>
          <b>Foodie</b>
          
          <div className="login-information"><ul>
            <li>Access more information about shops</li>
            <li>More features to come</li>
            </ul></div>
            <div >
            <nav>
                <Link to="/registerfoodie">
                <button className="foodie-button" >Register</button>
              </Link>
              </nav>
              </div>
        </div>
        
        <div className="business-panel">
         
         <img className="foodie-business-image" src="person-studying-online-2.png"/>
         <b>Business Owner</b>
          
          <div className="login-information"><ul>
            <li>Choose between Freemium and Premium</li>
            <li>With Premium, access and edit information about your store </li>
            <li>Access more information about shops</li>
            <li>More features to come</li>
            </ul></div>
            <div >
              <nav>
                <Link to="/registerbusiness">
              <button className="business-button" >Register</button>
              </Link>
              </nav>
              </div>
             
        </div>
      </div>
      
    </div>
  )
}