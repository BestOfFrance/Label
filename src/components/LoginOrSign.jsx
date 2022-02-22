import './LoginOrSign.css'

export default function LoginOrSign(props) {

  return (
    <div className="register-container">
      <div>
      You're not signed in. Please select an option below. 
      </div>
      <div>
      
        <div>
          <button>Foodie</button> 
        </div>
      
        <div>
          <button onClick={props.getRegister}>Business Owner</button>
        </div>
      </div>
    </div>
  )
}