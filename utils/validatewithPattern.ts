
export default function validateString(str=[]) { 
  return str.every(a=> {   
   const isValidNumber = a.split("").some(b=> Number.isNaN(+b) ) 
   if(isValidNumber) return !isValidNumber
    return a.length ==4
   })
  }