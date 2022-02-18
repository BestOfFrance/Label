export default function LoginOrSign(props) {
  return (
    <div className="register-container">
    <div>
      <div>
        Login
      </div>
      <div>
        or
      </div>
      <div onClick={props.getRegister}>
        Sign Up
      </div>
    </div>
    </div>
  )
}