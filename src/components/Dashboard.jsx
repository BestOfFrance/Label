import { useEffect, useState } from 'react'
import './Dashboard.css'
import { Routes, Route, Link, Navigate, useParams } from "react-router-dom";
import { Auth } from 'aws-amplify'
import { API } from 'aws-amplify';
import ShopDisplayEdit from './ShopDisplayEdit'


export default function Dashboard(props) {
  const [redirect, setRedirect] = useState(false)
  const [user, setUser] = useState(null)
  const [userApi, setUserApi] = useState(null)
  const [shop, setShop] = useState(null)
  
  
  async function fetchUser(userId) {
    const userData = await API.get('usersApi', `/users/${userId}`)
    return userData
  }
  

  useEffect(() => {
  
    Auth.currentAuthenticatedUser()
    .then((user) => {
      console.log(user, 'user')
      setUser(user.username)
      let userInfo = user.username
      console.log(user)
      fetchUser(userInfo)
      .then((userData) => {
        console.log('userData', userData)
        setUserApi(userData.data.Item)
        if (props.signedIn) {
          setRedirect(false)
        } else {
          setRedirect(true)
        }
        
        for (const shop of props.shops) {
          
          if (shop.id === userData.data.Item.shopId) {
            setShop(shop)
          }
        }
        
      })
    
    })
    
  
  
}, [])




  return(
    <div className="main-body">
    <div className="dashboard-container">
     <h4>My Account</h4> 

      <button onClick={props.logout}>Logout</button>
      <div>
        {userApi !== null && userApi.isVerified && shop !== null && //(userApi.accountType === "yearly" || userApi.accountTyoe === "monthly") && props.activeSubscription
        <div>
        <button>Add my business</button>
        <ShopDisplayEdit shops={props.shops} shop={shop}/>
        </div>
        }
      </div>
    </div>
    {redirect === true &&
     <Navigate to='/'/>
     }
    </div>
  )
}