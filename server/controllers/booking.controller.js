const BookingModel = require("../models/booking.model")
const CarModel = require("../models/car.model")

// function to check availability of car for a given date
const checkAvailability = async (car, pickupDate, returnDate) => {
    const bookings = await BookingModel.find(
        {
            car,
            pickupDate: { $lte: returnDate },
            returnDate: { $gte: pickupDate }
        }
    )
    return bookings.length === 0
}

// api to check availability of cars for the given date & location
const checkAvailabilityOfCar = async (req, res) => {
    try {
        const { location, pickupDate, returnDate } = req.body;

        // fetch all available cars for the given location
        const cars = await CarModel.find({ location, isAvailable: true });

        // check car availability for the given date range using promise
        const availableCarPromises = cars.map(async (car) => {
            const isAvailable = await checkAvailability(car._id, pickupDate, returnDate);
            return { ...car._doc, isAvailable: isAvailable }
        })
        let availableCars = await Promise.all(availableCarPromises);
        availableCars = availableCars.filter((car => car.isAvailable === true));
        res.json({ success: true, availableCars })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// create booking
const createBooking = async (req, res) => {
    try {
        const { _id } = req.user;
        const { car, pickupDate, returnDate } = req.body;

        const isAvailable = await checkAvailability(car, pickupDate, returnDate);
        if (!isAvailable) {
            return res.json({ success: false, message: 'Car is not available' })
        }
        const carData = await CarModel.findById(car);

        // calculate price based on pickup date & return date
        const picked = new Date(pickupDate);
        const returned = new Date(returnDate);
        const noOfDays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24))
        const price = carData.pricePerDay * noOfDays;
        await BookingModel.create({ car, owner: carData.owner, user: _id, pickupDate, returnDate, price });
        res.json({ success: true, message: 'Booking Created' })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// api to list user bookings
const getUserBookings = async (req, res) => {
    try {
        const { _id } = req.user;
        const bookings = await BookingModel.find({ user: _id }).populate('car').sort({ createdAt: -1 })
        res.json({ success: true, bookings });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// api to get owner bookings
const getOwnerBookings = async (req, res) => {
    try {
        if (req.user.role !== 'owner') {
            return res.json({ success: false, message: 'Unauthorized' })
        }
        const bookings = await BookingModel.find({ owner: req.user._id }).populate('car user')
            .select('-user.password').sort({ createdAt: -1 });
        res.json({ success: true, bookings });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// api to change the booking status
const changeBookingStatus = async (req, res) => {
    try {
        const { _id } = req.user;
        const { bookingId, status } = req.body;
        const booking = await BookingModel.findById(bookingId)
        // console.log('booking >> ',booking)
        if (booking.owner.toString() !== _id.toString()) {
            return res.json({ success: false, message: 'Unauthorized' })
        }
        booking.status = status;
        await booking.save();
        // console.log('changeBookingStatus >> booking >> ',booking)
        res.json({ success: true, message: 'Status updated' });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

module.exports = { checkAvailabilityOfCar, createBooking, getUserBookings, getOwnerBookings, changeBookingStatus }