export default function Dashboard(props) {
  return(
    <div>
      My Account

      <button onClick={props.logout}>Logout</button>
      <div>
        {props.business === "business" &&
        <button>Add my business</button>
        }
      </div>
    </div>
  )
}