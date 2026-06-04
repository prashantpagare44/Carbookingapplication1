import React from 'react';
import { Link } from 'react-router-dom';

function CarCard({ car }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {/* Car Image with Status Badge */}
            <div className="h-56 overflow-hidden relative bg-slate-100">
                <img 
                    src={car.image} 
                    alt={car.name} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                {car.available ? (
                    <span className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 text-xs font-bold rounded-full shadow-sm">
                        Available
                    </span>
                ) : (
                    <span className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 text-xs font-bold rounded-full shadow-sm">
                        Booked
                    </span>
                )}
            </div>

            {/* Car Details */}
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-xl font-extrabold text-slate-800">{car.name}</h3>
                        <p className="text-sm text-slate-500 font-medium uppercase tracking-wide mt-1">{car.brand}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-black text-blue-600">₹{car.pricePerDay}</p>
                        <p className="text-xs text-slate-500 font-medium uppercase mt-1">per day</p>
                    </div>
                </div>
                
                <div className="mt-6">
                    <Link to={car.available ? `/book/${car._id}` : "#"} className={`block w-full text-center py-3 rounded-xl font-bold transition-colors ${car.available ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-200' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}>
                        {car.available ? 'Book This Car' : 'Currently Unavailable'}
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default CarCard;
