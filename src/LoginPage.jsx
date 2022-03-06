import Login  from './components/Login'

export default function LoginPage(props) {
  return (
    <div className="main-body">
        <Login
        logout={props.logout}
        setMap={props.setMap}
        setLoggedIn={props.setLoggedIn}
        setBusiness={props.setBusiness}
        />
     </div>
  )
}