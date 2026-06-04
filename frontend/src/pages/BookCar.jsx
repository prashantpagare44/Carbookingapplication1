import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../utility/api';

function BookCar() {
    // 1. URL se gaadi ki ID nikalna
    const { id } = useParams(); 
    const navigate = useNavigate();

    // 2. Memory (State) jisme form ka data save hoga
    const [formData, setFormData] = useState({
        customerName: '',
        email: '',
        bookingDate: ''
    });

    // 3. UI states (Loading aur Success/Error message ke liye)
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    // 4. Jab bhi user box me kuch type karega, yeh function chalega
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 5. Submit Button dabane par yeh function chalega
    const handleSubmit = async (e) => {
        e.preventDefault(); // Page ko reload hone se rokna
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            // Backend me data bhejna (customer details + carId)
            const bookingData = {
                ...formData,
                carId: id
            };
            await api.post('/bookings', bookingData);

            // Sheet Requirement: Show Success Message
            setMessage({ type: 'success', text: 'Booking successfully confirmed! Redirecting to home...' });

            // 3 second baad automatically home page par wapas bhej dena
            setTimeout(() => {
                navigate('/');
            }, 3000);
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to book the car. Please try again.' });
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
            <div className="bg-white max-w-md w-full rounded-2xl shadow-sm border border-slate-100 p-8">
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-extrabold text-slate-800">Book Your Car</h2>
                    <p className="text-slate-500 mt-2 font-medium">Please fill in your details to confirm.</p>
                </div>

                {/* Success ya Error Message UI */}
                {message.text && (
                    <div className={`p-4 rounded-xl mb-6 text-sm font-semibold ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                        {message.text}
                    </div>
                )}

                {/* Booking Form UI (Sheet Requirement) */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Full Name</label>
                        <input type="text" name="customerName" value={formData.customerName} onChange={handleChange} required placeholder="John Doe" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition-colors" />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Email Address</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition-colors" />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Booking Date</label>
                        <input type="date" name="bookingDate" value={formData.bookingDate} onChange={handleChange} required className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition-colors" />
                    </div>

                    <div className="flex gap-4 pt-4">
                        <Link to="/" className="w-1/3 flex items-center justify-center py-3 rounded-xl font-bold border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
                            Cancel
                        </Link>
                        <button type="submit" disabled={loading || message.type === 'success'} className="w-2/3 py-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-200 transition-colors disabled:opacity-70 disabled:cursor-not-allowed">
                            {loading ? 'Processing...' : 'Confirm Booking'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default BookCar;
