import React, {useEffect, useState} from 'react'
import hours from '../helpers/convertHours'
import './ShopDisplay.css'
import {Rating} from 'react-simple-star-rating';
import { useParams } from "react-router-dom";
import { API } from 'aws-amplify';
import {Helmet} from "react-helmet";
import './shopDisplayEdit.css'
import AWS from 'aws-sdk'
import { FormControl, Input, FormLabel} from '@mui/material';



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

export default function ShopDisplay(props) {
// console.log('display props', props)
  const data = [];
  const  id  = useParams();
  const [shop, setShop] = useState({})
  const [images, setImages] = useState([])
  const [editDescription, setEditDescription] = useState(false)
  const [description, setDescription] = useState(null)
  const [name, setName] = useState(null)
  const [nameHolder, setNameHolder] = useState(null)
  const [hoursHolder, setHoursHolder] = useState(null)
  const [descriptionHolder, setDescriptionHolder] = useState(null)
  const [mainImage, setMainImage] = useState(null)
  const [monday, setMonday] = useState({})
  const [tuesday, setTuesday] = useState({})
  const [wednesday, setWednesday] = useState({})
  const [thursday, setThursday] = useState({})
  const [friday, setFriday] = useState({})
  const [saturday, setSaturday] = useState({})
  const [sunday, setSunday] = useState({})
  const [tagOne, setTagOne] = useState('')
  const [tagTwo, setTagTwo] = useState('')
  const [tagThree, setTagThree] = useState('')
  const [tagFour, setTagFour] = useState('')
  const [hourArray, setHourArray] = useState([])
  const [seo, setSeo] = useState('')
  
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


  async function fetchShops() {
    const shopData = await API.get('shopsApi', `/shops/${id.id}`, {})
    return shopData
  }
  

  
 useEffect(() => {

  fetchShops()
  .then((result) => {
    // console.log(result, 'result')
    const shopApiData = JSON.parse(result.body);
    setShop(shopApiData)
    // console.log(shopApiData, 'shop api data')
    setNameHolder(shopApiData.name)
    setHoursHolder(shopApiData.hours)
    setDescriptionHolder(shopApiData.description)
    setMainImage(shopApiData.image)
      if (shopApiData.images !== null) {
        const imageArray = shopApiData.images
        for (const image of imageArray) {
              
              const dataImage = {image: image}
              data.push(dataImage.image)
            }
        
            // console.log('data images', data)
            const imagesTwo = data.map((image) => {
              return (<img className="shop-display-edit-images" alt={''} src={image}></img>)
            })
            setImages(imagesTwo)
      }
    
        for (const dayUnparsed of shopApiData.hours) {
          const day = JSON.parse(dayUnparsed)
          if (day.day === 0) {
             setMonday((prev) => ({day: 0, open: day.open, close: day.close}))
            }
   if (day.day === 1) {
    setTuesday((prev) => ({day: 1, open: day.open, close: day.close}))
   }
   if (day.day === 2) {
    setWednesday((prev) => ({day: 2, open: day.open, close: day.close}))
   }
   if (day.day === 3) {
    setThursday((prev) => ({day: 3, open: day.open, close: day.close}))
   }
   if (day.day === 4) {
    setFriday((prev) => ({day: 4, open: day.open, close: day.close}))
   }
   if (day.day === 5) {
   setSaturday((prev) => ({day: 5, open: day.open, close: day.close}))
   }
   if (day.day === 6) {
    setSunday((prev) => ({day: 6, open: day.open, close: day.close}))
   }
        }
        const hoursArray = hours(shopApiData.hours).map((day) => {
          return (
            <div>
              {day}
            </div>
          )
        })
    
        setHourArray(hoursArray)
        const seoText = {
          title: shopApiData.name,
          description: 'Find authentic French cuisine near you.',
          url: `https://www.mydomain.com/shops/${shopApiData.name}`
        }
       setSeo(seoText)
      
  }).catch(err => {
    console.log(err, 'api error');
  })
  

 }, [])
  
 
    
      
  

  const onSubmit = function () {
    if (name !== null) {
    API.put('shopsApi', `/shops`, { 
      body: {
        id: id.id,
        
        name: name
        
      }
    }).then(result => {
      //const result = JSON.parse(result.body);
      // console.log(result)
      setEditDescription(false)
    }).catch(err => {
      console.log(err);
    })
    }
    if (description !== null) {
    API.put('shopsApi', `/shops`, { 
      body: {
        id: id.id,
        description: description,
        
        
      }
    }).then(result => {
      //const result = JSON.parse(result.body);
      // console.log(result)
      setEditDescription(false)
    }).catch(err => {
      console.log(err);
    })
    }
    if (hours !== null) {

    const jsonHours = []
    jsonHours.push(JSON.stringify(monday))
    jsonHours.push(JSON.stringify(tuesday))
    jsonHours.push(JSON.stringify(wednesday))
    jsonHours.push(JSON.stringify(thursday))
    jsonHours.push(JSON.stringify(friday))
    jsonHours.push(JSON.stringify(saturday))
    jsonHours.push(JSON.stringify(sunday))
    API.put('shopsApi', `/shops`, { 
      body: {
        id: id.id,
        hours: jsonHours,
        
        
      }
    }).then(result => {
      //const result = JSON.parse(result.body);
      // console.log(result)
      setEditDescription(false)
    }).catch(err => {
      console.log(err);
    })
    }
    if (tagOne.length > 0 || tagTwo.length > 0 || tagThree.length > 0 || tagFour.length > 0) {

    const tagsArray = []
    tagsArray.push(tagOne)
    tagsArray.push(tagTwo)
    tagsArray.push(tagThree)
    tagsArray.push(tagFour)
    
    API.put('shopsApi', `/shops`, { 
      body: {
        id: id.id,
        tags: tagsArray,
        
        
      }
    }).then(result => {
      //const result = JSON.parse(result.body);
      // console.log(result)
      setEditDescription(false)
    }).catch(err => {
      console.log(err);
    })
    }
    
  }
  
   
  const editDescriptionButton = function() {
    setEditDescription(true)
  }
      
  function changedescription(event){
    const val=event.target.value
    setDescription(val)
  }
 
  function changename(event){
    const val=event.target.value
    setName(val)
  }
 function changeMondayOpen(event){
    const val=event.target.value
    setMonday((prev) => ({ ...prev, open: val, day: 0 }))
  }
  function changeMondayClose(event){
    const val=event.target.value
    setMonday((prev) => ({ ...prev, close: val, day: 0 }))
  }
  function changeTuesdayOpen(event){
    const val=event.target.value
    setTuesday((prev) => ({ ...prev, open: val, day: 1 }))
  }
  function changeTuesdayClose(event){
    const val=event.target.value
    setTuesday((prev) => ({ ...prev, close: val, day: 1 }))
  }
  function changeWednesdayOpen(event){
    const val=event.target.value
    setWednesday((prev) => ({ ...prev, open: val, day: 2 }))
  }
  function changeWednesdayClose(event){
    const val=event.target.value
    setWednesday((prev) => ({ ...prev, close: val, day: 2 }))
  }
  function changeThursdayOpen(event){
    const val=event.target.value
    setThursday((prev) => ({ ...prev, open: val, day: 3}))
  }
  function changeThursdayClose(event){
    const val=event.target.value
    setThursday((prev) => ({ ...prev, close: val, day: 3 }))
  }
  function changeFridayOpen(event){
    const val=event.target.value
    setFriday((prev) => ({ ...prev, open: val, day: 4 }))
  }
  function changeFridayClose(event){
    const val=event.target.value
    setFriday((prev) => ({ ...prev, close: val, day: 4}))
  }
  function changeSaturdayOpen(event){
    const val=event.target.value
    setSaturday((prev) => ({ ...prev, open: val, day: 5 }))
  }
  function changeSaturdayClose(event){
    const val=event.target.value
    setSaturday((prev) => ({ ...prev, close: val, day: 5 }))
  }
  function changeSundayOpen(event){
    const val=event.target.value
    setSunday((prev) => ({ ...prev, open: val, day: 6 }))
  }
  function changeSundayClose(event){
    const val=event.target.value
    setSunday((prev) => ({ ...prev, close: val, day: 6 }))
  }
  function changeTagOne(event){
    const val=event.target.value
    setTagOne(val)
  }

  return(
    
    <div className="main-body-show">
      
       <Helmet
  title={`${seo.title} | Best of France`}
  meta={[
    {
      name: 'description',
      property: 'og:description',
      content: seo.description,
    },
    { property: 'og:title', content: `${seo.title} | Best of France` },
    { property: 'og:url', content: seo.url },
    { property: 'og:image', content: seo.image },
    { property: 'og:image:type', content: 'image/jpeg' }
    
  ]}
/>
     <div className="main-body">
    <div className="dashboard-container">
     <h4 >My Account</h4> 

      <button onClick={props.logout}>Logout</button>
      <div>
      <div className="container">
        <div className="close-display">
          
        </div>
        <div className="title-header">
         <h2 className="shop-edit-title">{shop.name}</h2>
         <button onClick={editDescriptionButton}>Edit your business</button>
        </div>
        <div className='display-image-edit'>
        <div className="main-image-container-edit">
        Main Image
        <img className="shop-display-edit-images" src={mainImage}></img>
        </div>
        <div className="other-image-container-edit">
        Other images
        <div className="edit-image-array-container">
        {images}
        </div>
        </div>
          
        </div>
        {editDescription === false &&
        <div className="shop-display-edit-information">
        <div >
          <div className="description-display-edit-container">
            Description: {shop.description}
            
          </div>
          
        </div>
        <div className="edit-shop-bottom-info">
         <div>
         Upload Images
        <div>Native SDK File Upload Progress is {progress}%</div>
        <input type="file" onChange={handleFileInput}/>
        <button onClick={() => uploadFile(selectedFile)}> Upload to S3</button>
    </div>
        <div className='shop-rating-price'>
            <div className='shop-rating'>
            Rating: {shop.rating}
            <Rating
              
              initialValue={shop.rating}
              size={18}
              label
              fillColor='#ef4236'
              emptyColor='gray'
              className='foo' // Will remove the inline style if applied
            />
            </div>
            <div>
            Price: {shop.price}
            </div>
          </div>
          <div className="edit-hours">
        Hours:
          {hourArray}
          </div>
        </div>
        </div>
}
{editDescription &&
        <div className="shop-display-edit">
         <FormControl>
       
       <FormLabel>Name</FormLabel>
       <Input placeholder={nameHolder} value={name} onChange={changename} required={true}/>
     </FormControl>

     <FormControl mt={4}>
       <FormLabel>Description</FormLabel>
       <Input placeholder={descriptionHolder} value={description} onChange={changedescription} required={true}/>
     </FormControl>
     <div className="hours-edit-form">
     Hours **Note** Please add your hours as a whole number in 24 hour time as seen below.
     <div className="day-edit-form">
     <FormControl mt={4}>

       <FormLabel>Monday Open</FormLabel>
       <Input placeholder={monday.open} value={monday.open} onChange={changeMondayOpen} required={true}/>
     </FormControl>
      <FormControl mt={4}>
       <FormLabel>Monday Close</FormLabel>
       <Input placeholder={monday.close} value={monday.close} onChange={changeMondayClose} required={true}/>
     </FormControl>
     </div>
     <div className="day-edit-form">
      <FormControl mt={4}>
       <FormLabel>Tuesday Open</FormLabel>
       <Input placeholder={tuesday.open} value={tuesday.open} onChange={changeTuesdayOpen} required={true}/>
     </FormControl>
      <FormControl mt={4}>
       <FormLabel>Tuesday Close</FormLabel>
       <Input placeholder={tuesday.close} value={tuesday.close} onChange={changeTuesdayClose} required={true}/>
     </FormControl>
     </div>
     <div className="day-edit-form">
      <FormControl mt={4}>
       <FormLabel>Wednesday Open</FormLabel>
       <Input placeholder={wednesday.open} value={wednesday.open} onChange={changeWednesdayOpen} required={true}/>
     </FormControl>
     
      <FormControl mt={4}>
       <FormLabel>Wednesday Close</FormLabel>
       <Input placeholder={wednesday.close} value={wednesday.close} onChange={changeWednesdayClose} required={true}/>
     </FormControl>
     </div>
     <div className="day-edit-form">
      <FormControl mt={4}>
       <FormLabel>Thursday Open</FormLabel>
       <Input placeholder={thursday.open} value={thursday.open} onChange={changeThursdayOpen} required={true}/>
     </FormControl>
      <FormControl mt={4}>
       <FormLabel>Thursday Close</FormLabel>
       <Input placeholder={thursday.close} value={thursday.close} onChange={changeThursdayClose} required={true}/>
     </FormControl>
     </div>
     <div className="day-edit-form">
      <FormControl mt={4}>
       <FormLabel>Friday Open</FormLabel>
       <Input placeholder={friday.open} value={friday.open} onChange={changeFridayOpen} required={true}/>
     </FormControl>
     
      <FormControl mt={4}>
       <FormLabel>Friday Close</FormLabel>
       <Input placeholder={friday.close} value={friday.close} onChange={changeFridayClose} required={true}/>
     </FormControl>
     </div>
     <div className="day-edit-form">
      <FormControl mt={4}>
       <FormLabel>Saturday Open</FormLabel>
       <Input placeholder={saturday.open} value={saturday.open} onChange={changeSaturdayOpen} required={true}/>
     </FormControl>
     
      <FormControl mt={4}>
       <FormLabel>Saturday Close</FormLabel>
       <Input placeholder={saturday.close} value={saturday.close} onChange={changeSaturdayClose} required={true}/>
     </FormControl>
     </div>
     <div className="day-edit-form">
      <FormControl mt={4}>
       <FormLabel>Sunday Open</FormLabel>
       <Input placeholder={sunday.open} value={sunday.open} onChange={changeSundayOpen} required={true}/>
     </FormControl>
     
      <FormControl mt={4}>
       <FormLabel>Sunday Close</FormLabel>
       <Input placeholder={sunday.close} value={sunday.close} onChange={changeSundayClose} required={true}/>
     </FormControl>
     </div>
     Tags: Choose up to four tags for you business. Suggestions include Keto, Vegan, Local and Traditional
     <FormControl mt={4}>
       <FormLabel>Tag #1</FormLabel>
       <Input placeholder={tagOne} value={tagOne} onChange={changeTagOne} required={true}/>
     </FormControl>
     
      <FormControl mt={4}>
       <FormLabel>Tag #2</FormLabel>
       <Input placeholder={tagTwo} value={tagTwo} onChange={setTagTwo} required={true}/>
     </FormControl>
     <FormControl mt={4}>
       <FormLabel>Tag #3</FormLabel>
       <Input placeholder={tagThree} value={tagThree} onChange={setTagThree} required={true}/>
     </FormControl>
     
      <FormControl mt={4}>
       <FormLabel>Tag #4</FormLabel>
       <Input placeholder={tagFour} value={tagFour} onChange={setTagFour} required={true}/>
     </FormControl>

    </div>
     
     <button onClick={onSubmit}>Save</button>
        </div>
}
      </div>
        
    </div>
        
    </div>
    </div>     
    </div>
          
  )
}