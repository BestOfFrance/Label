import './LoginOrSign.css'

export default function LoginOrSign(props) {

  return (
    <div className="register-container">
      <div>
      You're not signed in. Please select an option below. 
      </div>
      <div className="choose-account-type">
      
        <div className="foodie-panel">
          <button onClick={props.getRegisterFoodie}>Foodie</button> 
          <div>More information here.</div>
        </div>
      
        <div className="business-panel">
          <button onClick={props.getRegister}>Business Owner</button>
          <div>More information here.</div>
        </div>
      </div>
    </div>
  )
}