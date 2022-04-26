import './CreateAccount.css'
import {useState} from 'react';
import { FormControl, Input, FormLabel, Checkbox, FormControlLabel, FormGroup, Alert } from '@mui/material';
import Amplify from '@aws-amplify/core'
import Api from '@aws-amplify/api-rest'
import awsconfig from '../aws-exports';
import { Auth } from 'aws-amplify'
import ConfirmAccount from './confirmAccount'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import {PaymentElement} from '@stripe/react-stripe-js';
import CheckoutElement from './CheckoutElement'
import CheckoutButton from './CheckoutButton'
import { API } from "aws-amplify"
import {Helmet} from "react-helmet";
import { Routes, Route, Link, useParams } from "react-router-dom";
import ReportButton from './ReportButton'



// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

Amplify.configure(awsconfig);



Amplify.configure(awsconfig);
Api.configure(awsconfig);

export default function ReportBusiness(props) {
// console.log(props)
  const data = [];
  const  id  = useParams();

  // console.log(id)

  // API.get('shops', `/shops/${id}`, {}).then((result) => {
  //   const shop = JSON.parse(result.body);
  // }).catch(err => {
  //   console.log(err);
  // })

  let shopArray = []

  for (const shop of props.shops) {
    if (shop.name === id.shop) {
      shopArray.push(shop)
    }
  }

  let shop = shopArray[0]
  
  const [state, setState] = useState({
    placeholderFN: "First Name",
    placeholderLN: "Last Name",
    placeholderEmail: "Email",
    placeholderPassword: "Password",
    placeholderConfirm: "Confirm Password",
    placeholderUser: "Username",
    
  })
  const [error, setError] = useState("")
  const [showError, setShowError] = useState(false)
  
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
  const [why,setWhy]=useState("")
  function changeWhy(event){
    const val=event.target.value
    setWhy(val)
  }
  


  
  
 

 

  return (
    <div className="main-body">
      <Helmet
  title={`Report Business | Best of France`}
  meta={[
    {
      name: 'description',
      property: 'og:description',
      content: "Report a business.",
    },
    { property: 'og:title', content: `Report Business | Best of France` },
    // { property: 'og:url', content: "" },
    
  ]}
/>
    
  <div className="register-container">
  

    
    <div className="create-account">
     <p>Report a Business</p>
     <p>{shop.name}</p>
     
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
               <FormLabel>Please give a brief explanation as to why you wish to report this business.</FormLabel>
               <Input type="email" value={why} onChange={changeWhy} required={true}/>
             </FormControl>
 
             
             <FormGroup>
  
  
</FormGroup>

<Link to="/"><ReportButton message={why} user={firstname}/></Link>
          </div>   
      
</div>
</div>
  )
}