// server\routes\owner.routes.js
const express=require('express');
const protect = require('../middleware/auth');

const upload = require('../middleware/multer');
const { changeRoleToOwner, addCar, getOwnerCars, toggleCarAvailability, deleteCar, getDashboardData, updateUserImage } = require('../controllers/owner.controller');


const OwnerRouter=express.Router();

OwnerRouter.post('/change-role',protect,changeRoleToOwner);

OwnerRouter.post('/add-car',upload.single('image'),protect,addCar)

OwnerRouter.get('/owner/cars',protect,getOwnerCars)

OwnerRouter.post('/toggle-car',protect,toggleCarAvailability)

OwnerRouter.post('/delete-car',protect,deleteCar);

OwnerRouter.get('/dashboard',protect,getDashboardData)

OwnerRouter.post('/update-image',upload.single('image'),protect,updateUserImage)

module.exports=OwnerRouter