const mongoose=require('mongoose');

const BookingSchema=new mongoose.Schema({
car:{type:mongoose.Schema.Types.ObjectId,ref:'car',required:true},
user:{type:mongoose.Schema.Types.ObjectId,ref:'user',required:true},
owner:{type:mongoose.Schema.Types.ObjectId,ref:'user',required:true},
pickupDate:{type:Date,required:true},
returnDate:{type:Date,required:true},
status:{type:String,enum:['pending','confirmed','cancelled'],default:'pending'},
price:{type:Number,required:true}
},{
    timestamps:true
})

const BookingModel=mongoose.model('booking',BookingSchema);

module.exports=BookingModel