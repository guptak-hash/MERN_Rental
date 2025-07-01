const mongoose=require('mongoose');

const CarSchema=new mongoose.Schema({
owner:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
brand:{type:String,required:true},
model:{type:String,required:true},
image:{type:String,required:true},
year:{type:Number,required:true},
category:{type:String,required:true},
seating_capacity:{type:Number,required:true},
fuel_type:{type:String,required:true},
transmission:{type:String,required:true},
pricePerDay:{type:Number,required:true},
location:{type:String,required:true},
description:{type:String,required:true},
isAvailable:{type:Boolean,default:true},
},{
    timestamps:true
})

const CarModel=mongoose.model('car',CarSchema);

module.exports=CarModel