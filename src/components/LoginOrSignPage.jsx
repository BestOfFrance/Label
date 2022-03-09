import LoginOrSign from './LoginOrSign'

export default function LoginOrSignPage(props) {
  return (
    <div className="main-body">
      <Helmet
  title={`Login or Register | Best of France`}
  meta={[
    {
      name: 'description',
      property: 'og:description',
      content: "Login or Register for your new account.",
    },
    { property: 'og:title', content: `Login or Register| Best of France` },
    // { property: 'og:url', content: "" },
    
  ]}
/>
        <LoginOrSign
          getRegister={props.getRegister}
          getRegisterFoodie={props.getRegisterFoodie}
          login={props.login}
        />
        </div>
  )
}