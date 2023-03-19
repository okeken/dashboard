import { faker } from '@faker-js/faker';


export const totaRecords = 10
export default async  function fetchData  (){
    let data=[]
    for (let index = 0; index < totaRecords; index++) {
    const type = ["CAO", "EDF", "SFO"]
const description = faker.commerce.productDescription()
const category = faker.commerce.department()
const orderNumber = faker.phone.number().split("-").join("") 
const productNumber = faker.phone.number('501-###-###').split("-").join("") 
const randomNum = Math.floor(Math.random() * 2);

data.push({
    id:String(index),
    SN:index + 1,
    type:type[randomNum],
    description :description.slice(0,100),
    category,
    orderNumber,
    productNumber
})

        
    }
   
    return data
}