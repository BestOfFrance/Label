import Login  from './components/Login'
import {Helmet} from "react-helmet";

export default function LoginPage(props) {
  return (
    <div className="main-body">
      <Helmet
  title={`Login | Best of France`}
  meta={[
    {
      name: 'description',
      property: 'og:description',
      content: "Login to your account.",
    },
    { property: 'og:title', content: `Login | Best of France` },
    // { property: 'og:url', content: "" },
    
  ]}
/>
        <Login
        logout={props.logout}
        setMap={props.setMap}
        setLoggedIn={props.setLoggedIn}
        setBusiness={props.setBusiness}
        />
     </div>
  )
}