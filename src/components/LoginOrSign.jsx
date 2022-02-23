import './LoginOrSign.css'

export default function LoginOrSign(props) {

  return (
    <div className="register-container">
      <div>
      You're not signed in. Please select an option below. 
      </div>
      <div className="choose-account-type">
      
        <div className="foodie-panel">
          <button>Foodie</button> 
          <div><button onClick={props.getRegisterFoodie}>Register</button><button onClick={props.login}>Login</button></div>
          <div>More information here.</div>
        </div>
      
        <div className="business-panel">
          <button >Business Owner</button>
          <div><button onClick={props.getRegister}>Register</button><button onClick={props.login}>Login</button></div>
          <div>More information here.</div>
        </div>
      </div>
    </div>
  )
}