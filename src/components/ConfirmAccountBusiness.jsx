import './CreateAccount.css'
import {useState} from 'react';
import { FormControl, Input, FormLabel, Checkbox } from '@mui/material';
import Amplify from '@aws-amplify/core'
import Api from '@aws-amplify/api-rest'
import awsconfig from '../aws-exports';
import { Auth } from 'aws-amplify'
import { Routes, Route, Link, Navigate } from "react-router-dom";

Amplify.configure(awsconfig);



Amplify.configure(awsconfig);
Api.configure(awsconfig);

export default function ConfirmAccountBusiness(props) {
  const account = "Freemium";
  const [state, setState] = useState({
    
    placeholderEmail: "Email",
    placeholderPassword: "Confirm"
  })

  
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
  
  const onSubmit = function() {
    
    
    Auth.confirmSignUp(email, password)
    .then(() => {
      
     
      setRedirect(true)
    })
    .catch((err) => [
      console.log(err)
    ])
    

    
     
    
  }

  

  return (
    <div className="main-container">
    
  <div className="register-container">
  <div className="create-account">

    <h2>Step 2</h2>
    <p>Confirm Your Business Account</p>
    
   
            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder={state.placeholderEmail} value={email} onChange={changeemail} required={true}/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Confirmation Code</FormLabel>
              <Input type='password' placeholder={state.placeholderPassword} value={password} onChange={changepassword} required={true}/>
            </FormControl>
            
            
    
      
         
    <div class="text-center">
     
        
      <button onClick={onSubmit} >Confirm</button>
     {redirect === true && 
       <Navigate to="/choosesubscriptiontype"/>
     }
      
    </div>
   </div>
</div>
</div>
  )
}