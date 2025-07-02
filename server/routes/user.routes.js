// server\routes\user.routes.js
const express=require('express');
const { registerUser, loginUser, getUserData, getCars } = require('../controllers/user.controller');
const protect = require('../middleware/auth');

const UserRouter=express.Router();

UserRouter.post('/register',registerUser);
UserRouter.post('/login',loginUser);
UserRouter.get('/data',protect,getUserData)
UserRouter.get('/cars',getCars);

module.exports=UserRouter