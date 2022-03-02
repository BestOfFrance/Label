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
// console.log(hours)
//     const hoursArray = hours.split('},')
//     //  console.log(hoursArray)
//      const nextHours = [];
//      for (const day of hoursArray) {
//        if (day[day.length - 1] !== '}') {
//         nextHours.push(`${day}}`)
//        } else {
//          nextHours.push(day)
//        }
       
//      }
     const dayArray = [];
     for (const day of hours) {
       const dayObj = JSON.parse(day)
       dayArray.push(dayObj)
     }
    
    // console.log(dayArray)
     const dayOfArray = []
    //  console.log(dayArray)
     for (const object of dayArray) {
      //  console.log(object, "day")
      if (object.day === dayNow) {
        const index = dayArray.indexOf(object) + 1
        let newDayObject = {open: Number(object.open), close: Number(object.close), tomorrow: dayArray[index], day: Number(object.day)}
        dayOfArray.push(newDayObject)
      } 
     }
    // 
    
     for (const day of dayOfArray) {
       if (day.open < currentTime && day.close > currentTime) {
         const openObject = {isOpen: true, day: day.day}
         return openObject;
       } else {
       
        const openObject = {isOpen: false, tomorrow: day.tomorrow, day: day.day}
        return openObject;
         
       }
     }
}

export default openNow;