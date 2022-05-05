import './CreateAccount.css'
import {useState} from 'react';
import { FormControl, Input, FormLabel, Alert } from '@mui/material';
import Amplify from '@aws-amplify/core'
import Api from '@aws-amplify/api-rest'
import awsconfig from '../aws-exports';
import { Auth } from 'aws-amplify'
import { Navigate } from "react-router-dom";

Amplify.configure(awsconfig);
Api.configure(awsconfig);

export default function ForgotPassword(props) {
  
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
  
  const [email,setemail]=useState("")
  function changeemail(event){
    const val=event.target.value
    setemail(val)
  }
  const [redirect, setRedirect] = useState(false)
 
 
  const onSubmit = function() {
    let signedin = false;
    

    Auth.forgotPassword(email)
    .then((value)=>{
      // console.log(value)
      setRedirect(true)
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
    <div className="main-body">
    
  <div className="register-container">
  
  
  
    <div className="create-account">
     <p>Reset Password</p>
    
     {show === "show" && 
    <Alert severity="error">{error}</Alert>
  }
 
            
             <FormControl mt={4}>
               <FormLabel>Email</FormLabel>
               <Input type="email" placeholder={state.placeholderEmail} value={email} onChange={changeemail} required={true}/>
             </FormControl>
 
             
             
     
       
          
     <div class="text-center">
       
       <button onClick={onSubmit}>Reset</button>
       
     </div>
     {redirect === true &&
     <Navigate to='/resetpasswordverification'/>
     }
       
 
    </div>
    
    
      
    
</div>
</div>
  )
}