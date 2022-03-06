import './CreateAccount.css'
import {useState} from 'react';
import { FormControl, Input, FormLabel, Checkbox, Alert } from '@mui/material';
import Amplify from '@aws-amplify/core'
import Api from '@aws-amplify/api-rest'
import awsconfig from '../aws-exports';
import { Auth } from 'aws-amplify'
import ConfirmAccount from './confirmAccount'

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
  console.log(email)
  async function signUp() {
    try {
        const { user } = await Auth.signUp({
          username: email,
          password: password,
          attributes: {
            email: email
          }
            
        });
        saveUser();
        setfirstname("")
    setlastname("")
    
    setpassword("")
    setemail("")
    setpasswordconfirm("")
    setShow("show")
        console.log(user);
    } catch (error) {
      console.log('error signing up:', error);
      setError("There was an error signing up. Please try again. (hint: did you use a valid email format?)")
      setShowError(true)
        
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
          
          signUp()
          
          
        
        }
      })
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
    const apiData = await Api.post('userapi', '/users', data);
    console.log({ apiData });
    
   
  }

  return (
    
  <div className="main-body">
  <div className="register-container">
  

    {show === "hide" &&
    <div className="create-account">
     <p>Create an Account</p>
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
</div>
  )
}