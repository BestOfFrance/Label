import './CreateAccount.css'
import {useState} from 'react';
import {  Checkbox, FormControlLabel, FormGroup, Alert } from '@mui/material';
import Amplify from '@aws-amplify/core'
import Api from '@aws-amplify/api-rest'
import awsconfig from '../aws-exports';
import { Auth } from 'aws-amplify'
import ConfirmAccount from './confirmAccount'
import {loadStripe} from '@stripe/stripe-js';
import { API } from "aws-amplify"
import {Helmet} from "react-helmet";
import { Link } from "react-router-dom";

import '@stripe/stripe-js'

const stripePromise = loadStripe('pk_test_51HBN9DHYehZq7RpT4E5XQTTg1ZjqS28tFvIlSGq8FYAHmU8g9EncHv2YjDmnJEmJzwPke81SWL65hCi87OxVQ0in00eS54FcZx')

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

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
  const [error, setError] = useState("")
  const [showError, setShowError] = useState(false)
  const [business, setBusiness] = useState("Business")
  const [show, setShow] = useState("hide")
  const [firstname,setfirstname]=useState("")
  
  const [lastname,setlastname]=useState("")
  
  // const [username,setusername]=useState("")
  // function changeusername(event){
  //   const val=event.target.value
  //   setusername(val)
  // }
  const [password,setpassword]=useState("")
  
  const [confirmPassword, setpasswordconfirm]=useState("")
 
  const [email,setemail]=useState("")
  
  
  
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
        // console.log(user)
        saveUser();
        setShow("show")
    } catch (error) {
        console.log('error signing up:', error);
        
      setError("There was an error signing up. Please try again. (hint: did you use a valid email format?)")
      setShowError(true)
        
    }
}

  const onCart = function() {
    if (state.monthly) {
      const priceId = 'price_1KYx2lHYehZq7RpTMCyoyOpk' ;
    } else if (state.yearly) {
      const priceId = 'price_1KYx2lHYehZq7RpTFEXxebG2'
    }
    const redirectToCheckout = async (userId) => {
      const fetchSession = async () => {
        const apiName = "stripeAPI"
        const apiEndpoint = "/checkout"
        const data = {
          body: {
          quantity: 1,
          client_reference_id: userId,
          priceId: "price_1KZLQSHYehZq7RpTPbt6aMad"
          }
        }
        const session = await API.post(apiName, apiEndpoint, data)
        .catch((err) => {
          console.log(err)
        })
        // console.log(session)
        return session
      }
      const session = await fetchSession()
            // console.log(fetchSession())
            const sessionId = session.id
            const stripe = await stripePromise
            stripe.redirectToCheckout({ sessionId })
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
      async function fetchUser() {
        const userData = await Api.get('usersApi', `/users/${email}`)
        return userData
      }
      // fetchUser().then((out)=> {
        
          
      //     saveUser()
      //     .then((data) => {
      //       console.log(data.id)
      //       redirectToCheckout(data.id)
      //     })
      //     .catch((err) => {
      //       console.log(err)
      //     })
          
        
            
          
          
          
        
        
      // })
      // .catch((err) => {
      //   console.log(err)
      // })
      // saveUser()
      //     .then((data) => {
      //       console.log(data.id)
      //       redirectToCheckout(data.id)
      //     })
      //     .catch((err) => {
      //       console.log(err)
      //     })
          
      // saveUser();
    }
    
  }
  const onSubmit = function() {
    
    async function fetchUser() {
      const userData = await Api.get('usersApi', `/users/${email}`)
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
      // fetchUser().then((out)=> {
      //   if (out.data.Item) {
      //     setemail("This email has already been used")
      //   } else {

          
      //     signUp()
          
          
        
      //   }
      // })
      signUp()
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
   setBusiness("monthly-unverified")
  }
}
const onChangeYearly = function() {
  if (state.yearly === true) {
   setState((prev) => ({ ...prev, freemium: false, monthly: false, yearly: false }))
  } else {
   setState((prev) => ({ ...prev, freemium: false, monthly: false, yearly: true }))
   setBusiness("yearly-unverified")
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
    const apiData = await Api.post('usersApi', '/users', data);
    // console.log(apiData);
    setfirstname("")
    setlastname("")
    
    setpassword("")
    setemail("")
    setpasswordconfirm("")
   return apiData
  }

  return (
    <div className="main-body">
      <Helmet
  title={`Register Business | Best of France`}
  meta={[
    {
      name: 'description',
      property: 'og:description',
      content: "Register for a business account.",
    },
    { property: 'og:title', content: `Register Business | Best of France` },
    // { property: 'og:url', content: "" },
    
  ]}
/>
    
  <div className="register-container">
  

    {show === "hide" &&
    <div className="create-account">
      <h2>Step 3</h2>
     <p>Choose Account Type</p>
     
     {showError && 
    <Alert severity="error">{error}</Alert>
  }
     
             <FormGroup>
  <FormControlLabel control={<Checkbox checked={state.freemium} onChange={onChangeFreemium} />} label="Freemium" />
  
 
  <FormControlLabel control={<Checkbox checked={state.monthly} onChange={onChangeMonthly}/>} label="Monthly Premium ($30USD/Month)" />
  

  <FormControlLabel control={<Checkbox checked={state.yearly} onChange={onChangeYearly}/>} label="Yearly Premium ($300USD/Year)" />
  
</FormGroup>


             
     
       
          
     <div class="text-center">
       {state.monthly && 
       <button onClick={onCart}>Continue to payment</button>
       }
       {state.yearly &&
       <button onClick={onCart}>Continue to payment</button>
       }
       {state.freemium &&
       <Link to="/login"><button >Register</button></Link>
       }
       
       
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
</div>
  )
}