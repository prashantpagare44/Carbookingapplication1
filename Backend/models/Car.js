import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    image: { type: String, required: true }, // URL to the image
    pricePerDay: { type: Number, required: true },
    available: { type: Boolean, default: true }
}, {
    timestamps: true
});

export default mongoose.model('Car', carSchema);
