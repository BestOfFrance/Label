import './CreateAccount.css'
import {useState} from 'react';
import { FormControl, Input, FormLabel, Checkbox, FormControlLabel, FormGroup, Alert, listItemSecondaryActionClasses } from '@mui/material';
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
import { Routes, Route, Link, Navigate } from "react-router-dom";
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



const stripePromise = loadStripe('pk_test_51HBN9DHYehZq7RpT4E5XQTTg1ZjqS28tFvIlSGq8FYAHmU8g9EncHv2YjDmnJEmJzwPke81SWL65hCi87OxVQ0in00eS54FcZx')

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.




export default function Uploadimage(props) {

  const [progress , setProgress] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const uploadFile = (file) => {

        const params = {
            ACL: 'public-read',
            Body: file,
            Bucket: S3_BUCKET,
            Key: file.name
        };

        myBucket.putObject(params)
            .on('httpUploadProgress', (evt) => {
                setProgress(Math.round((evt.loaded / evt.total) * 100))
            })
            .send((err) => {
                if (err) console.log(err)
            })
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
  

    
    <div className="create-account">
     <p>Create a Business Account</p>
     
    

      
     <div>
        <div>Native SDK File Upload Progress is {progress}%</div>
        <input type="file" onChange={handleFileInput}/>
        <button onClick={() => uploadFile(selectedFile)}> Upload to S3</button>
    </div>
             
     
       
    
 
    </div>
    
    
      
    
      </div>
</div>
  )
}