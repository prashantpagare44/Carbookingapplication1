import React, { useState, useEffect } from 'react';
import api from '../utility/api';
import CarCard from '../component/CarCard';

function CarListing() {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await api.get('/cars');
                setCars(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load cars. Please make sure the backend is running.');
                setLoading(false);
            }
        };

        fetchCars();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 text-red-500 font-semibold text-lg">
                {error}
            </div>
        );
    }

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
