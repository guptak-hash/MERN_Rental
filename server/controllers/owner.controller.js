const imagekit = require("../configs/imagekit");
const BookingModel = require("../models/booking.model");
const CarModel = require("../models/car.model");
const UserModel = require("../models/user.model");
const fs = require('fs');

// api to change role of user
const changeRoleToOwner = async (req, res) => {
    try {
        const { _id } = req.user;
        await UserModel.findByIdAndUpdate(_id, { role: 'owner' });
        res.json({ success: true, message: 'Now you can list cars' })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// api to list car
const addCar = async (req, res) => {
    try {
        const { _id } = req.user;
        let car = JSON.parse(req.body.carData);
        const imageFile = req.file;

        // upload image to image kit
        const fileBuffer = fs.readFileSync(imageFile.path)
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/cars'
        })

        // optimization through imagekit URL transformation
        // For URL Generation, works for both images and videos
        var optimizedImageURL = imagekit.url({
            path: response.filePath,
            transformation: [
                { width: '1280' },  // width resizing
                { quality: 'auto' }, // auto compression
                { format: 'webp' }  // convert to modern format
            ]
        });

        const image = optimizedImageURL;
        await CarModel.create({ ...car, owner: _id, image })

        res.json({ success: true, message: 'Car added' })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// api to list owner cars
const getOwnerCars = async (req, res) => {
    try {
        const { _id } = req.user;
        const cars = await CarModel.find({ owner: _id });
         console.log('cars >> ',cars)
        res.json({ success: true, cars })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// api to toggle car availability
const toggleCarAvailability = async (req, res) => {
    try {
        const { _id } = req.user;
        const { carId } = req.body;
        const car = await CarModel.findById(carId);
        // check if car belonging to user
        if (car.owner.toString() !== _id.toString()) {
            return res.json({ success: false, message: 'Unauthorized' })
        }
        car.isAvailable = !car.isAvailable;
        await car.save();
        res.json({ success: true, message: 'Availability Toggled' })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// api to delete a car
const deleteCar = async (req, res) => {
    try {
        const { _id } = req.user;
        const { carId } = req.body;
        const car = await CarModel.findById(carId);
        // check if car belonging to user
        if (car.owner.toString() !== _id.toString()) {
            return res.json({ success: false, message: 'Unauthorized' })
        }
        car.owner = null;
        car.isAvailable = false;
        await car.save();
        res.json({ success: true, message: 'Car Removed' })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// api to get dahboard data
const getDashboardData = async (req, res) => {
    try {
        const { _id, role } = req.user;
        if (role !== 'owner') {
            return res.json({ success: false, message: 'Unauthorized' })
        }
        const cars = await CarModel.find({ owner: _id });
        const bookings = await BookingModel.find({ owner: _id }).populate('car').
            sort({ createdAt: -1 });
        const pendingBookings = await BookingModel.find({ owner: _id, status: 'pending' });
        const completedBookings = await BookingModel.find({ owner: _id, status: 'confirmed' });

        // calculate monthly revenue from bookings where status is confirmed
        const monthlyRevenue = bookings.slice().filter(booking => booking.
            status === 'confirmed').reduce((acc, booking) => acc + booking.price, 0);

        const dashboardData = {
            totalCars: cars.length,
            totalBookings: bookings.length,
            pendingBookings: pendingBookings.length,
            recentBookings: bookings.slice(0, 3),
            completedBookings: completedBookings.length,
            monthlyRevenue
        }

        res.json({ success: true, dashboardData })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// api to update profile image
const updateUserImage = async (req, res) => {
    try {
        const { _id } = req.user;
        const imageFile = req.file;
        console.log("imageFile >> ",imageFile)
        // upload image to image kit
        const fileBuffer = fs.readFileSync(imageFile.path)
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/users'
        })

        // optimization through imagekit URL transformation
        // For URL Generation, works for both images and videos
        var optimizedImageURL = imagekit.url({
            path: response.filePath,
            transformation: [
                { width: '400' },  // width resizing
                { quality: 'auto' }, // auto compression
                { format: 'webp' }  // convert to modern format
            ]
        });

        const image = optimizedImageURL;
        await UserModel.findByIdAndUpdate(_id, { image })
        res.json({ success: true, message: 'Image Updated' });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}
module.exports = { changeRoleToOwner, addCar, getOwnerCars, toggleCarAvailability, deleteCar, getDashboardData, updateUserImage }