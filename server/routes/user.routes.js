const express=require('express');
const { registerUser, loginUser, getUserData } = require('../controllers/user.controller');
const protect = require('../middleware/auth');

const UserRouter=express.Router();

UserRouter.post('/register',registerUser);
UserRouter.post('/login',loginUser);
UserRouter.get('/data',protect,getUserData)

module.exports=UserRouter