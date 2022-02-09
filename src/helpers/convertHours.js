const hours = function(hoursProp){
  const hoursArray = hoursProp.split('},')
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
 const realHours = [];
 function tConvert (time) {
  
  const hour = `${time[0]}${time[1]}`
  const numberHour = parseInt(hour)
  const newHour = (numberHour % 12) || 12;
  // console.log(newHour)
  const minute = `${time[2]}${time[3]}`
  const AmOrPm = hour >= 12 ? 'pm' : 'am';
  return `${newHour}:${minute}${AmOrPm}`
  
 }

 for (const day of dayArray) {
   if (day.day == 0) {
    realHours.push(`Monday: ${tConvert(day.open)}-${tConvert(day.close)}`)
   }
   if (day.day == 1) {
    realHours.push(`Tuesday: ${tConvert(day.open)}-${tConvert(day.close)}`)
   }
   if (day.day == 2) {
    realHours.push(`Wednesday: ${tConvert(day.open)}-${tConvert(day.close)}`)
   }
   if (day.day == 3) {
    realHours.push(`Thursday: ${tConvert(day.open)}-${tConvert(day.close)}`)
   }
   if (day.day == 4) {
    realHours.push(`Friday: ${tConvert(day.open)}-${tConvert(day.close)}`)
   }
   if (day.day == 5) {
    realHours.push(`Saturday: ${tConvert(day.open)}-${tConvert(day.close)}`)
   }
   if (day.day == 6) {
    realHours.push(`Sunday: ${tConvert(day.open)}-${tConvert(day.close)}`)
   }
  
 }
  
  

  return realHours;

}

export default hours;
