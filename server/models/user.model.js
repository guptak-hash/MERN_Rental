const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    name: {type:String,required:true},
    email: {type:String,required:true,unique:true},
    password: {type:String,required:true},
    role: {type:String,enum:['owner','user'],default:'user'},
    image: {type:String,default:''}
},{
    timestamps:true
});

const UserModel=mongoose.model('user',UserSchema);

module.exports=UserModel;