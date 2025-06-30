const express = require('express');
require('dotenv').config();
const cors=require('cors');
const connectDB = require('./configs/db');
const UserRouter = require('./routes/user.routes');

// Initialize express app
const app=express();

// connect database
connectDB()
// Middleware
app.use(cors());
app.use(express.json());

app.use('/test',(req,res)=>{
    res.status(200).json({msg: 'This is a test route'})
})

app.use('/api',UserRouter)

const PORT = process.env.PORT || 4000

app.listen(PORT,()=>{
    console.log('Server started at port',PORT)
})