export default function LoginOrSign(props) {
  return (
    <div className="register-container">
    <div>
      <div>
       <button>Login</button> 
      </div>
      <div>
        or
      </div>
      <div >
        <button onClick={props.getRegister}>Sign Up</button>
      </div>
    </div>
    </div>
  )
}