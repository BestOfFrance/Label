import './CreateAccount.css'
import {useState} from 'react';
import { FormControl, Input, FormLabel, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import Amplify from '@aws-amplify/core'
import Api from '@aws-amplify/api-rest'
import awsconfig from '../aws-exports';
import { Auth } from 'aws-amplify'
import ConfirmAccount from './confirmAccount'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import {PaymentElement} from '@stripe/react-stripe-js';
import CheckoutElement from './CheckoutElement'

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

Amplify.configure(awsconfig);



Amplify.configure(awsconfig);
Api.configure(awsconfig);

export default function CreateAccount(props) {
  
  const [state, setState] = useState({
    placeholderFN: "First Name",
    placeholderLN: "Last Name",
    placeholderEmail: "Email",
    placeholderPassword: "Password",
    placeholderConfirm: "Confirm Password",
    placeholderUser: "Username",
    freemium: true,
    monthly: false,
    yearly: false
  })

  const [business, setBusiness] = useState("Business")
  const [show, setShow] = useState("hide")
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
  // console.log(email)
  async function signUp() {
    try {
        const { user } = await Auth.signUp({
          username: email,
          password: password,
          attributes: {
            email: email
          }
            
        });
        // console.log(user);
    } catch (error) {
        console.log('error signing up:', error);
    }
}
  const onSubmit = function() {
    
    async function fetchUser() {
      const userData = await Api.get('userapi', `/users/${email}`)
      return userData
    }
  
    

    if (password !== confirmPassword) {
      setpasswordconfirm("")
      setState((prev) => ({ ...prev, placeholderConfirm: "your password didn't match, try again" }))
    } else if (firstname === "") {
      setState((prev) => ({ ...prev, placeholderFN: "please enter your name" }))
    } else if (lastname === "") {
      setState((prev) => ({ ...prev, placeholderLN: "please enter your name" }))
    } else if (email === "") {
      setState((prev) => ({ ...prev, placeholderEmail: "please enter your email" }))
    } else if (password.length < 6) {
      setState((prev) => ({ ...prev, placeholderPassword: "password must be at least 6 characters" }))
    } else {
      fetchUser().then((out)=> {
        if (out.data.Item) {
          setemail("This email has already been used")
        } else {

          saveUser();
          signUp()
          .then(() => {
            setShow("show")
          })
          
        
        }
      })
      // saveUser();
    }
  }
 const onChangeFreemium = function() {
   if (state.freemium === true) {
    setState((prev) => ({ ...prev, freemium: false, monthly: false, yearly: false }))
   } else {
    setState((prev) => ({ ...prev, freemium: true, monthly: false, yearly: false }))
    setBusiness("Business")
   }
 }
 const onChangeMonthly = function() {
  if (state.monthly === true) {
   setState((prev) => ({ ...prev, freemium: false, monthly: false, yearly: false }))
  } else {
   setState((prev) => ({ ...prev, freemium: false, monthly: true, yearly: false }))
   setBusiness("monthly")
  }
}
const onChangeYearly = function() {
  if (state.yearly === true) {
   setState((prev) => ({ ...prev, freemium: false, monthly: false, yearly: false }))
  } else {
   setState((prev) => ({ ...prev, freemium: false, monthly: false, yearly: true }))
   setBusiness("yearly")
  }
}
  const saveUser=async ()=>{
    const data = {
      body: {
        firstname: firstname,
        lastname: lastname,
        
        isVerified: false,
        email: email,
        accountType : business
      }
    };
    const apiData = await Api.post('userapi', '/users', data);
    console.log({ apiData });
    setfirstname("")
    setlastname("")
    
    setpassword("")
    setemail("")
    setpasswordconfirm("")
   
  }

  return (
    
  <div className="register-container">
  

    {show === "hide" &&
    <div className="create-account">
     <p>Create a Business Account</p>
    
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
               <FormLabel>Password</FormLabel>
               <Input type='password' placeholder={state.placeholderPassword} value={password} onChange={changepassword} required={true}/>
             </FormControl>
             <FormControl mt={4}>
               <FormLabel>Confirm Password</FormLabel>
               <Input type='password' placeholder={state.placeholderConfirm} value={confirmPassword} onChange={changepasswordconfirm} required={true}/>
             </FormControl>
             <FormGroup>
  <FormControlLabel control={<Checkbox checked={state.freemium} onChange={onChangeFreemium} />} label="Freemium" />
  

  <FormControlLabel control={<Checkbox checked={state.monthly} onChange={onChangeMonthly}/>} label="Monthly Premium ($30USD/Month)" />
  

  <FormControlLabel control={<Checkbox checked={state.yearly} onChange={onChangeYearly}/>} label="Yearly Premium ($300USD/Year)" />
  
</FormGroup>


             
     
       
          
     <div class="text-center">
       <button onClick={onSubmit}>Register</button>
       
     </div>
       
 
    </div>
    }
    
      
    {show === "show" &&
      <div className="main-body">
        <ConfirmAccount
        login={props.login}
        password={password}
        checkUser={props.checkUser}
        />
        </div>
      }
</div>
  )
}