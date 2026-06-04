import React, { useState, useEffect } from 'react';
import api from '../utility/api';
import CarCard from '../component/CarCard';

function CarListing() {
    // 1. Memory (State): Data, loading status, aur error save karne ke liye
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // 2. Data Fetching: Page load hote hi API call karna
    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await api.get('/cars');
                
                // Agar database me 0 gaadiyan hain, toh yeh dummy data dikhega
                if (response.data.length === 0) {
                    const dummyCars = [
                        { _id: '65f1a2b3c4d5e6f7a8b9c0d1', name: 'Mahindra Thar', brand: 'Mahindra', pricePerDay: 2500, image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80', available: true },
                        { _id: '65f1a2b3c4d5e6f7a8b9c0d2', name: 'Hyundai Creta', brand: 'Hyundai', pricePerDay: 2000, image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=800&q=80', available: true },
                         { _id: '65f1a2b3c4d5e6f7a8b9c0d3', name: 'Tata Safari', brand: 'Tata', pricePerDay: 2200, image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80', available: false },
                        { _id: '65f1a2b3c4d5e6f7a8b9c0d4', name: 'Honda City', brand: 'Honda', pricePerDay: 1800, image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=800&q=80', available: true }
                    ];
                    setCars(dummyCars);
                } else {
                    setCars(response.data);
                }
                setLoading(false);
            } catch (err) {
                setError('Failed to load cars. Please make sure the backend is running.');
                setLoading(false);
            }
        };

        fetchCars();
    }, []);

    // 3. Loading UI: Jab tak data aa raha hai, tab tak spinner dikhana
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    // 4. Error UI: Agar backend band hai ya API fail ho gayi
    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 text-red-500 font-semibold text-lg">
                {error}
            </div>
        );
    }

    // 5. Main UI: Header aur gaadiyon ki grid list
    return (
        <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                        Explore Our Premium Fleet
                    </h1>
                    <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto font-medium">
                        Choose from our wide range of economical and luxury cars. Find the perfect ride for your next journey.
                    </p>
                </div>

                {cars.length === 0 ? (
                    <div className="text-center bg-white p-10 rounded-2xl shadow-sm border border-slate-100">
                        <h3 className="text-2xl font-bold text-slate-700">No cars available right now</h3>
                        <p className="text-slate-500 mt-2">Please add some cars to the database using Postman.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {/* 6. Loop: Har car ke data ke liye ek CarCard component call karna */}
                        {cars.map((car) => (
                            <CarCard key={car._id} car={car} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default CarListing;
