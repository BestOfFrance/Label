import './LoginOrSign.css'

export default function LoginOrSign(props) {

  return (
    <div className="register-container">
      <div>
      You're not signed in. Please select an option below. 
      </div>

      
      <div className="choose-account-type">
      
        <div className="foodie-panel">
          <button className="foodie-button"><b>Foodie</b></button> 
          <div className="foodie-button"><button className="foodie-button" onClick={props.getRegisterFoodie}><u>Register</u></button></div>
          <div className="login-information"><ul>
            <li>Access more information about shops</li>
            <li>More features to come</li>
            </ul></div>
        </div>
        <div className="login-button">
        <button onClick={props.login}><u>Login</u></button>
      </div>
        <div className="business-panel">
          <button className="business-button" ><b>Business Owner</b></button>
          <div className="business-button"><button className="business-button" onClick={props.getRegister}><u>Register</u></button></div>
          <div className="login-information"><ul>
            <li>Choose between Freemium and Premium</li>
            <li>With Premium, access and edit information about your store </li>
            <li>Access more information about shops</li>
            <li>More features to come</li>
            </ul></div>
        </div>
      </div>
      
    </div>
  )
}