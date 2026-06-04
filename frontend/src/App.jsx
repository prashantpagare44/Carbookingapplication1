import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CarListing from './pages/CarListing';
import BookCar from './pages/BookCar';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
        <Routes>
          {/* Homepage par saari cars dikhayenge */}
          <Route path="/" element={<CarListing />} />
          
          {/* Book car ka page */}
          <Route path="/book/:id" element={<BookCar />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
