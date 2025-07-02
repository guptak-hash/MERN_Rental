// server\routes\booking.routes.js
const express=require('express');
const { checkAvailabilityOfCar, createBooking, getUserBookings, getOwnerBookings, changeBookingStatus } = require('../controllers/booking.controller');
const protect = require('../middleware/auth');


const BookingRouter=express.Router();

BookingRouter.post('/check-availability',checkAvailabilityOfCar);

BookingRouter.post('/create',protect,createBooking);

BookingRouter.get('/user',protect,getUserBookings);

BookingRouter.get('/owner',protect,getOwnerBookings);

BookingRouter.post('/change-status',protect,changeBookingStatus)

module.exports=BookingRouter