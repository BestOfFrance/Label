import './CreateAccount.css'
import {useState} from 'react';
import { FormControl, Input, FormLabel, Alert } from '@mui/material';
import Amplify from '@aws-amplify/core'
import Api from '@aws-amplify/api-rest'
import awsconfig from '../aws-exports';
import { Auth } from 'aws-amplify'
import ConfirmAccount from './confirmAccount'
import { Routes, Route, Link, Navigate } from "react-router-dom";

Amplify.configure(awsconfig);



Amplify.configure(awsconfig);
Api.configure(awsconfig);

export default function CreateAccount(props) {
  const account = "Foodie";
  const [state, setState] = useState({
    
    placeholderEmail: "Email",
    placeholderPassword: "Password",
    
  })
  const [show, setShow] = useState("hide")
  const [error, setError] = useState("none")
  
  // const [username,setusername]=useState("")
  // function changeusername(event){
  //   const val=event.target.value
  //   setusername(val)
  // }
  const [password,setpassword]=useState("")
  function changepassword(event){
    const val=event.target.value
    setpassword(val)
  }
  
  const [email,setemail]=useState("")
  function changeemail(event){
    const val=event.target.value
    setemail(val)
  }
  const [redirect, setRedirect] = useState(false)
 
  
  async function fetchUser() {
    const userData = await Api.get('userapi', `/users/${email}`)
    return userData
  }
  const onSubmit = function() {
    let signedin = false;
    

    Auth.signIn(email, password)
    .then((user) => {
      console.log(user)
      props.setLoggedIn()
      props.setMap()
      fetchUser()
      setRedirect(true)

    .then((out) => {
      console.log(out.data.Item.accountType)
      if (out.data.Item.accountType === "Business") {
        props.setBusiness()
      }
    })
      
    })
    .catch((err) => {
      
      setShow("show")
      if(err.code === 'UserNotFoundException') {
        setError("Email not found, please register or try another email address")
      }
      if(err.code === 'NotAuthorizedException') {
        setError("Incorrect email or password")
      }
      console.log(err)
    })
    
  }

 

  return (
    
  <div className="register-container">
  
  
  
    <div className="create-account">
     <p>Sign In</p>
    
     {show === "show" && 
    <Alert severity="error">{error}</Alert>
  }
 
            
             <FormControl mt={4}>
               <FormLabel>Email</FormLabel>
               <Input type="email" placeholder={state.placeholderEmail} value={email} onChange={changeemail} required={true}/>
             </FormControl>
 
             <FormControl mt={4}>
               <FormLabel>Password</FormLabel>
               <Input type='password' placeholder={state.placeholderPassword} value={password} onChange={changepassword} required={true}/>
             </FormControl>
            
             
     
       
          
     <div class="text-center">
       
       <button onClick={onSubmit}>Log In</button>
       
     </div>
     {redirect === true &&
     <Navigate to='/'/>
     }
       
 
    </div>
    
    
      
    
</div>
  )
}