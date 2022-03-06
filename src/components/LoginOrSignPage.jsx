import LoginOrSign from './LoginOrSign'

export default function LoginOrSignPage(props) {
  return (
    <div className="main-body">
        <LoginOrSign
          getRegister={props.getRegister}
          getRegisterFoodie={props.getRegisterFoodie}
          login={props.login}
        />
        </div>
  )
}