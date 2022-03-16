import { useEffect, useState } from 'react'
import './Dashboard.css'
import { Routes, Route, Link, Navigate, useParams } from "react-router-dom";


export default function Dashboard(props) {
  const [redirect, setRedirect] = useState(false)
  const  id  = useParams();
  useEffect(() => {
    if (props.signedIn) {
      setRedirect(false)
    } else {
      setRedirect(true)
    }
    for (const shop of props.shops) {
      if (shop.id === id) {
        console.log(shop)
      }
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