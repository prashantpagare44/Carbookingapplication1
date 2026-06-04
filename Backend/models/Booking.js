import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    email: { type: String, required: true },
    carId: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
    bookingDate: { type: Date, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Naya: Kis user ne book kiya
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' } // Naya: Admin approval ke liye
}, {
    timestamps: true
});

export default mongoose.model('Booking', bookingSchema);
