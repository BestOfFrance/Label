import './Dashboard.css'

export default function Dashboard(props) {
  return(
    <div className="dashboard-container">
     <h4>My Account</h4> 

      <button onClick={props.logout}>Logout</button>
      <div>
        {props.business === "business" &&
        <button>Add my business</button>
        }
      </div>
    </div>
  )
}