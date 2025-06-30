require('dotenv').config()
const mongoose = require('mongoose');

const connectDB = () => {
   mongoose.connect(`${process.env.MONGO_URI}/car-rental`).then(()=>{
    console.log('Database Connected')
   }).catch((error)=>{
    console.log(error.message)
   })
}

module.exports=connectDB;