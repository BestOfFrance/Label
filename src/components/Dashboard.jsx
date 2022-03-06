import { useEffect, useState } from 'react'
import './Dashboard.css'
import { Routes, Route, Link, Navigate } from "react-router-dom";

export default function Dashboard(props) {
  const [redirect, setRedirect] = useState(false)
  useEffect(() => {
    if (props.signedIn) {
      setRedirect(false)
    } else {
      setRedirect(true)
    }
  }, [props.signedIn])
  return(
    <div className="main-body">
    <div className="dashboard-container">
     <h4>My Account</h4> 

      <button onClick={props.logout}>Logout</button>
      <div>
        {props.business === "business" &&
        <button>Add my business</button>
        }
      </div>
    </div>
    {redirect === true &&
     <Navigate to='/'/>
     }
    </div>
  )
}