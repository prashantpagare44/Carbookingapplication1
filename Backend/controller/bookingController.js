import Booking from '../models/Booking.js';

// POST /bookings - Create booking
export const createBooking = async (req, res) => {
    try {
        const { customerName, email, carId, bookingDate } = req.body;
        
        // Company Requirement: Validate booking form data
        if (!customerName || !email || !carId || !bookingDate) {
            return res.status(400).json({ message: "Please fill all the booking details" });
        }
        
        const newBooking = await Booking.create({ customerName, email, carId, bookingDate });
        res.status(201).json({ message: "Booking created successfully", booking: newBooking });
    } catch (error) {
        // Company Requirement: Proper API error handling
        res.status(500).json({ message: "Error creating booking", error: error.message });
    }
};

// GET /bookings - Fetch bookings
export const getBookings = async (req, res) => {
    try {
        // Populate se hume booking ke sath Car ki image, name, aur price bhi mil jayegi 
        const bookings = await Booking.find().populate('carId', 'name brand pricePerDay image available');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Error fetching bookings", error: error.message });
    }
};
