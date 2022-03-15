import './CreateAccount.css'
import {useState} from 'react';
import { FormControl, Input, FormLabel, Checkbox, Alert } from '@mui/material';
import Amplify from '@aws-amplify/core'
import Api from '@aws-amplify/api-rest'
import awsconfig from '../aws-exports';
import { Auth } from 'aws-amplify'
import ConfirmAccount from './confirmAccount'
import { Routes, Route, Link, Navigate } from "react-router-dom";
import {Helmet} from "react-helmet";

Amplify.configure(awsconfig);



Amplify.configure(awsconfig);
Api.configure(awsconfig);

export default function VerifyBusiness(props) {
  const [redirect, setRedirect] = useState(false)
  const [state, setState] = useState({
    placeholderFN: "First Name",
    placeholderLN: "Last Name",
    placeholderEmail: "Email",
    placeholderPassword: "Password",
    placeholderConfirm: "Confirm Password",
    placeholderUser: "Username"
  })
  const [show, setShow] = useState("hide")
  const [error, setError] = useState("")
  const [showError, setShowError] = useState(false)
  const [firstname,setfirstname]=useState("")
  function changefirstname(event){
    const val=event.target.value
    setfirstname(val)
  }
  const [lastname,setlastname]=useState("")
  function changelastname(event){
    const val=event.target.value
    setlastname(val)
  }
  // const [username,setusername]=useState("")
  // function changeusername(event){
  //   const val=event.target.value
  //   setusername(val)
  // }
  const [businessName,setBusinessName]=useState("")
  function changeBusinessName(event){
    const val=event.target.value
    setBusinessName(val)
  }
  const [role, setRole]=useState("")
  function changeRole(event){
    const val=event.target.value
    setRole(val)
  }
  const [email,setemail]=useState("")
  function changeemail(event){
    const val=event.target.value
    setemail(val)
  }
  const [confirm,setConfirm]=useState("")
  function changeconfirm(event){
    const val=event.target.value
    setConfirm(val)
  }
  
  const onSubmit = function() {
    
    async function fetchUser() {
      const userData = await Api.get('usersApi', `/users/${email}`)
      return userData
    }
  
    

    if (firstname === "") {
      setState((prev) => ({ ...prev, placeholderFN: "please enter your name" }))
    } else if (lastname === "") {
      setState((prev) => ({ ...prev, placeholderLN: "please enter your name" }))
    } else if (email === "") {
      setState((prev) => ({ ...prev, placeholderEmail: "please enter your email" }))
    } else if (businessName) {
      setState((prev) => ({ ...prev, placeholderPassword: "password must be at least 6 characters" }))
    } else {
      
      
      // saveUser();
    }
  }

  const saveUser=async ()=>{
    const data = {
      body: {
        firstname: firstname,
        lastname: lastname,
        
        
        email: email,
        accountType : "Foodie"
      }
    };
    const apiData = await Api.post('usersApi', '/users', data);
    console.log({ apiData });
    
   
  }

  return (
    
  <div className="main-body">
  <div className="register-container">
  <Helmet
  title={`Register Foodie | Best of France`}
  meta={[
    {
      name: 'description',
      property: 'og:description',
      content: "Register for a foodie account.",
    },
    { property: 'og:title', content: `Login | Best of France` },
    // { property: 'og:url', content: "" },
    
  ]}
/>
  

    {show === "hide" &&
    <div className="create-account">
     <p>Verify Ownership of Your Business</p>
     {showError && 
    <Alert severity="error">{error}</Alert>
  }
     <FormControl>
       
               <FormLabel>First name</FormLabel>
               <Input placeholder={state.placeholderFN} value={firstname} onChange={changefirstname} required={true}/>
             </FormControl>
 
             <FormControl mt={4}>
               <FormLabel>Last name</FormLabel>
               <Input placeholder={state.placeholderLN} value={lastname} onChange={changelastname} required={true}/>
             </FormControl>
 
            
             <FormControl mt={4}>
               <FormLabel>Email</FormLabel>
               <Input type="email" placeholder={state.placeholderEmail} value={email} onChange={changeemail} required={true}/>
             </FormControl>
 
             <FormControl mt={4}>
               <FormLabel>Business Name</FormLabel>
               <Input  value={businessName} onChange={changeBusinessName} required={true}/>
             </FormControl>
             <FormControl mt={4}>
               <FormLabel>Your Role at this Business</FormLabel>
               <Input   value={role} onChange={changeRole} required={true}/>
             </FormControl>
             
     
       
          
     <div class="text-center">
       <button onClick={onSubmit}>Verify</button>
       
     </div>
       
 
    </div>
    }
    
      
    {/* {show === "show" &&
      <div className="main-body">
        <ConfirmAccount
        login={props.login}
        password={password}
        checkUser={props.checkUser}
        />
        </div>
      } */}
      {redirect === true &&
      <Navigate to="/confirmaccount"/>
      }
</div>
</div>
  )
}