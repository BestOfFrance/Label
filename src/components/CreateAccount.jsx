import './CreateAccount.css'
import {useState} from 'react';
import { FormControl, Input, FormLabel, Checkbox, FormControlLabel, FormGroup, Alert } from '@mui/material';
import Api from '@aws-amplify/api-rest'
import { Auth } from 'aws-amplify'
import {loadStripe} from '@stripe/stripe-js';
import { API } from "aws-amplify"
import {Helmet} from "react-helmet";
import {  Navigate } from "react-router-dom";
import '@stripe/stripe-js'
import AWS from 'aws-sdk'

import '@stripe/stripe-js'
// const fs = require('fs');


const S3_BUCKET ='businessauth';
const REGION ='us-east-1';


AWS.config.update({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET},
    region: REGION,
})

const stripePromise = loadStripe('pk_live_51HBN9DHYehZq7RpT5G2AQtCNeTrPehX91poDIfiXG9nWpAwC9MoiFOhEwSbvJc2sFitsSX6lyPVzykDYMxrBuJgA00Kgeay5re')

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.






const SES_CONFIG = {
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    region: 'us-east-1',
};

const AWS_SES = new AWS.SES(SES_CONFIG);
// console.log(process.env)



let sendEmail = (businessName, role, email, id, firstname, lastname) => {
    let params = {
      Source: 'lisa.cormier@bestoffrance.ca',
      Destination: {
        ToAddresses: [
          'lisa.cormier@bestoffrance.ca'
        ],
      },
      ReplyToAddresses: [],
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: `BusinessName: ${businessName}, Role: ${role}, First Name: ${firstname}, Last Name: ${lastname}, Email: ${email}, User Id: ${id}`
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: businessName,
        }
      },
    };
    return AWS_SES.sendEmail(params).promise();
};


  
  




export default function CreateAccount(props) {
  const [progress , setProgress] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploaded, setUploaded] = useState(false)
    

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const uploadFile = (file) => {
      // console.log('me')
        const params = {
            ACL: 'public-read',
            Body: file,
            Bucket: S3_BUCKET,
            Key: `${email}/${file.name}`
        };

        myBucket.putObject(params)
            .on('httpUploadProgress', (evt) => {
                setProgress(Math.round((evt.loaded / evt.total) * 100))
                setUploaded(true)
            })
            .send((err) => {
                if (err) console.log(err)
            })
    }
  
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
  const [redirect, setRedirect] = useState(false)
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
async function signUpFreemium() {
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
      setRedirect(true)
  } catch (error) {
      console.log('error signing up:', error);
      
    setError("There was an error signing up. Please try again. (hint: did you use a valid email format?)")
    setShowError(true)
      
  }
}
 const [priceID, setPriceID] = useState('price_1KYx2lHYehZq7RpTMCyoyOpk')
  const onCart = function() {
    
    if (state.monthly) {
      setPriceID('price_1KYx2lHYehZq7RpTMCyoyOpk') ;
    } else if (state.yearly) {
      setPriceID('price_1KYx2lHYehZq7RpTFEXxebG2') 
    }
    const redirectToCheckout = async (userId) => {
      const fetchSession = async () => {
        const apiName = "stripeAPI"
        const apiEndpoint = "/checkout"
        const data = {
          body: {
          quantity: 1,
          client_reference_id: userId,
          priceId: priceID
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
            console.log(fetchSession(), 'fetchSession')
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
    } else if(!uploaded) {
       alert("Please choose a file to upload")
    } else {
      async function fetchUser() {
        const userData = await Api.get('usersApi', `/users/${email}`)
        return userData
      }
      fetchUser()
      .then((out)=> {
         if (out.data.Item) {
          setemail("This email has already been used")
        } else {
           signUp()
          .then(() => {
            saveUser()
          .then((data) => {
            sendEmail(businessName, role, email, data.id, firstname, lastname)
            .then(() => {
              redirectToCheckout(data.id)
            })
             .catch((err) => {
               setError(err.body)
               console.log(err)
             })
          })
          })
          
           .catch((err) => {
            setError(err.body)
           })
        
         
        }
       
        
      })
     
      
          
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
      fetchUser().then((out)=> {
        if (out.data.Item) {
          setemail("This email has already been used")
        } else {

          
          signUpFreemium()
          
          
        
        }
      })
      // signUp()
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
   if (state.monthly) {
     setBusiness('monthly')
  }
   if (state.yearly) {
     setBusiness('yearly')
   }
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
     <p>Create a Business Account</p>
     
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


       {state.monthly &&
       <div>
         <div>Please upload a Incorporation Certificate to verify you are the business owner</div>
         <div>You will recieve an email once your business has been verified and have full access to edit your business</div>
       <div>Native SDK File Upload Progress is {progress}%</div>
       <input type="file" onChange={handleFileInput}/>
       <button onClick={() => uploadFile(selectedFile)}> Upload to S3</button>
   </div>
       }
       {state.yearly &&
       <div>
          <div>Please upload a Incorporation Certificate to verify you are the business owner</div>
         <div>You will recieve an email once your business has been verified and have full access to edit your business</div>
       <div>Native SDK File Upload Progress is {progress}%</div>
       <input type="file" onChange={handleFileInput}/>
       <button onClick={() => uploadFile(selectedFile)}> Upload to S3</button>
   </div>
       }
     
       
          
     <div class="text-center">
     {uploaded &&
       <div>
       {state.monthly && 
       <button onClick={onCart}>Continue to payment</button>
       }
       {state.yearly &&
       <button onClick={onCart}>Continue to payment</button>
       }
       </div>
}
       {state.freemium &&
       <button onClick={onSubmit}>Register</button>
       }
       {redirect === true &&
      <Navigate to="/confirmaccount"/>
      }
       
     </div>
       
 
    </div>
    }
    
      
    
      </div>
</div>
  )
}