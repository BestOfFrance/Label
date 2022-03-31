import {useState, useEffect} from 'react'
import './Header.css'
import SearchBar from './SearchBar'
import { Routes, Route, Link } from "react-router-dom";
import { API } from 'aws-amplify';
import { Auth } from 'aws-amplify'


export default function Header(props) {
  const [hidden, setHidden] = useState('hidden')
  const [user, setUser] = useState(null)
  const [userApi, setUserApi] = useState('')
  // const showSearch = function() {
  //   if (hidden === 'hidden') {
  //     setHidden('show')
  //   } else {
  //     setHidden('hidden')
  //   }
  // }
//  if (props.isVerified) {
//    id = props.
//  }
async function fetchUser(email) {
    const userData = await API.get('usersApi', `/users/${email}`)
    return userData
  }
function checkUser() {
    let authenticated = false;
    Auth.currentAuthenticatedUser()
      .then(
        (user) => {
          
          console.log(user)
            
            console.log(user.attributes.email)
          fetchUser(user.attributes.email)
          .then((response) => {
            setUserApi(response.data.Item)
            
          })
          }
        
      )
      .catch(err => {
        console.log(err)
        authenticated = false;
      }
        )
        return authenticated
  }

useEffect(() => {
  checkUser()
}, [])





  
  return (
    
    <div className="header">
      
      <div className="logo-container">
        
       <nav>
         <Link to='/'>
         <button className="logo-button" >
        <img id='logo' src='BOFLogo.svg'></img>
        </button>
       
        </Link>
       </nav>
        
      </div>
      
      <div id="search-container">
        <div>
        <SearchBar
        
        searchSelected={props.searchSelected}
        updateSearch={props.updateSearch}
        searchList={props.searchList}
        />
        </div>
      </div>
      <div className="header-links">
      
        
        
        
     
          <Link to='/newsanddeals' >
        <div className="news-deals-container">
          <button className="small-button" onClick={props.getNews}>
            News and Deals
          </button>
          
        </div>
        </Link>
        
        <div className="go-premium">
         <button className="small-button">Go Premium</button>
      </div>
      <div className="user" >
        {props.signedIn === false && 
        <nav>
          <Link to='/loginorsign' >
        <button className="small-button" >
        <img src="icons8-user-64.png" className="user-icon"></img>
        
        </button>
        </Link>
        </nav>

        }
      
        {(props.signedIn && userApi.isVerified && userApi.accountType !== 'admin') &&
        


          <nav>
          <Link to='/dashboard' >
        <button className="small-button" >
        <img src="icons8-user-64.png" className="user-icon"></img>
        
        </button>
        </Link>
        </nav>
          }
            {(props.signedIn && userApi.isVerified && userApi.accountType === 'admin') &&
        


        <nav>
        <Link to='/admin' >
      <button className="small-button" >
      <img src="icons8-user-64.png" className="user-icon"></img>
      
      </button>
      </Link>
      </nav>
        }
        <div className="myaccount">
          {props.signedIn ? "My Account" : "Sign In"}
        </div>
        
      </div>
    </div>


    </div>
        
        
  )
}