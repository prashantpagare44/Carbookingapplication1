import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    // Check if user is logged in by looking for token
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <span className="text-2xl font-extrabold text-blue-600 tracking-tight">Drive<span className="text-slate-800">Ease</span></span>
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link to="/" className="text-slate-600 hover:text-blue-600 px-3 py-2 rounded-md font-medium transition-colors">
                            Home
                        </Link>
                        
                        {token ? (
                            <>
                                <span className="text-sm font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                                    Hi, {user?.name}
                                </span>
                                <button onClick={handleLogout} className="text-red-500 hover:text-red-700 px-3 py-2 font-medium transition-colors">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-slate-600 hover:text-blue-600 px-3 py-2 font-medium transition-colors">
                                    Login
                                </Link>
                                <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm shadow-blue-200">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
