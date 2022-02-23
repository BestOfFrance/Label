export default function Dashboard(props) {
  return(
    <div>
      My Account

      <button onClick={props.logout}>Logout</button>
    </div>
  )
}