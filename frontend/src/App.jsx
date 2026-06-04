import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CarListing from './pages/CarListing';
import BookCar from './pages/BookCar';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
        <Router>
        <Routes>
          <Route path="/" element={<CarListing />} />
          <Route path="/book/:id" element={<BookCar />} />
        </Routes>
        </Router>   
    </div>
  );
}

export default App;
