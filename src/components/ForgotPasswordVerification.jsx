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

export default function ForgotPasswordConfirm(props) {
  
  const [state, setState] = useState({
    
    placeholderEmail: "Email",
    placeholderPassword: "Password",
    placeholderConfirm: "Confirm Password",
    placeholderConfirmCode: "Confirmation code from your email"
    
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
  const [password,setpassword]=useState("")
  function changepassword(event){
    const val=event.target.value
    setpassword(val)
  }
  const [confirmPassword, setpasswordconfirm]=useState("")
  function changepasswordconfirm(event){
    const val=event.target.value
    setpasswordconfirm(val)
  }
  const [confirmCode, setconfirm]=useState("")
  function changeconfirm(event){
    const val=event.target.value
    setconfirm(val)
  }
  const [redirect, setRedirect] = useState(false)
 
  
  
  const onSubmit = function() {

    if (password === confirmPassword) {
      Auth.forgotPasswordSubmit(email,confirmCode,password)
      .then((value)=>{
        // console.log(value)
        setRedirect(true)
      })
      .catch((error)=>{console.log(error)})
    }
  
    
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
             <FormControl mt={4}>
               <FormLabel>Password</FormLabel>
               <Input type='password' placeholder={state.placeholderPassword} value={password} onChange={changepassword} required={true}/>
             </FormControl>
             <FormControl mt={4}>
               <FormLabel>Confirm Password</FormLabel>
               <Input type='password' placeholder={state.placeholderConfirm} value={confirmPassword} onChange={changepasswordconfirm} required={true}/>
             </FormControl>
             <FormControl mt={4}>
              <FormLabel>Confirmation Code</FormLabel>
              <Input type='confirm'  placeholder={state.placeholderConfirmCode} value={confirmCode} onChange={changeconfirm} required={true}/>
            </FormControl>
            
             
 
             
             
     
       
          
     <div class="text-center">
       
       <button onClick={onSubmit}>Submit</button>
       
     </div>
     {redirect === true &&
     <Navigate to='/login'/>
     }
       
 
    </div>
    
    
      
    
</div>
</div>
  )
}