import './CreateAccount.css'
import {useState} from 'react';
import { FormControl, Input, FormLabel, Checkbox } from '@mui/material';
import Amplify from '@aws-amplify/core'
import Api from '@aws-amplify/api-rest'
import awsconfig from '../aws-exports';



Amplify.configure(awsconfig);
Api.configure(awsconfig);

export default function CreateAccount(props) {
  const [account, setAccount] = useState(null)

  const selectAccount = function (name) {
    if (account !== null) {
      setAccount(name)
    } else {
      setAccount(null)
    }
  }

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
  const [username,setusername]=useState("")
  function changeusername(event){
    const val=event.target.value
    setusername(val)
  }
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

  const saveUser=async ()=>{
    const data = {
      body: {
        firstname: firstname,
        lastname: lastname,
        username: username,
        password: password,
        email: email,
        accountType : account
      }
    };
    const apiData = await Api.post('userapi', '/users', data);
    console.log({ apiData });
    setfirstname("")
    setlastname("")
    setusername("")
    setpassword("")
    setemail("")
    setAccount(null)
   
  }

  return (
    
  <div className="register-container">
  <div className="create-account">

    
    <p>Create an Account</p>
    
    <FormControl>
      
              <FormLabel>First name</FormLabel>
              <Input placeholder="First name" value={firstname} onChange={changefirstname} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input placeholder="Last name" value={lastname} onChange={changelastname} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>UserName</FormLabel>
              <Input placeholder="UserName" value={username} onChange={changeusername} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input placeholder="Email" value={email} onChange={changeemail} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input type='password' placeholder="Password" value={password} onChange={changepassword} />
            </FormControl>
            <FormControl>
    <FormLabel></FormLabel>
      <div className="choose-account">
        Add Premium Monthly
        <Checkbox onChange={()=> {selectAccount('Premium')}}></Checkbox>
      </div>
      </FormControl>
      <FormControl>
    <FormLabel></FormLabel>
      <div className="choose-account">
        Add Premium Yearly
        <Checkbox onChange={()=> {selectAccount('Premium')}}></Checkbox>
      </div>
      </FormControl>
      
         
    <div class="text-center">
      <button onClick={saveUser}>Register</button>
      
    </div>
   </div>
</div>
  )
}