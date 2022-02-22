import './CreateAccount.css'
import {useState} from 'react';
import { FormControl, Input, FormLabel, Checkbox } from '@mui/material';
import Amplify from '@aws-amplify/core'
import Api from '@aws-amplify/api-rest'
import awsconfig from '../aws-exports';
import { Auth } from 'aws-amplify'

Amplify.configure(awsconfig);



Amplify.configure(awsconfig);
Api.configure(awsconfig);

export default function ConfirmAccount(props) {
  const account = "Foodie";
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
  
  
  const onSubmit = function() {
    
    
    Auth.confirmSignUp(email, password)
    .then(() => {
      Auth.signIn(email, props.password)
      props.setMap()
    })
    .catch((err) => [
      console.log(err)
    ])
    

    
     
    
  }

  

  return (
    
  <div className="register-container">
  <div className="create-account">

    
    <p>Confirm Your Account</p>
    
   
            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder={state.placeholderEmail} value={email} onChange={changeemail} required={true}/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Confirmation Code</FormLabel>
              <Input type='password' placeholder={state.placeholderPassword} value={password} onChange={changepassword} required={true}/>
            </FormControl>
            
            
    
      
         
    <div class="text-center">
      <button onClick={onSubmit}>Confirm</button>
      
    </div>
   </div>
</div>
  )
}