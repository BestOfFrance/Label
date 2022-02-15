const openNow = function(hours) {
  const date = new Date()
    const dayNow = date.getDay()
    let hour = date.getHours() - 1;
    let minute = date.getMinutes();
    // console.log(hour, minute)
    if (hour.toString().length < 2) {
      hour = `0${hour}`
    }
    // console.log(minute.toString().length < 2)
    if (minute.toString().length < 2) {
      minute = `0${minute}`
    }
    const currentTime = Number(`${hour}${minute}`)
    // console.log('current time', currentTime)

    const hoursArray = hours.split('},')
    //  console.log(hoursArray)
     const nextHours = [];
     for (const day of hoursArray) {
       if (day[day.length - 1] !== '}') {
        nextHours.push(`${day}}`)
       } else {
         nextHours.push(day)
       }
       
     }
     const dayArray = [];
     for (const day of nextHours) {
       const dayObj = JSON.parse(day)
       dayArray.push(dayObj)
     }
     const dayOfArray = []
     for (const object of dayArray) {
       
      if (object.day === dayNow) {
        let newDayObject = {open: Number(object.open), close: Number(object.close)}
        dayOfArray.push(newDayObject)
      } 
     }
     console.log('newDya', dayOfArray)
     
     for (const day of dayOfArray) {
       if (day.open < currentTime && day.close > currentTime) {
         
         return true;
       } else {
         return false;
       }
     }
}

export default openNow;