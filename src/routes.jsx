import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RequestForm from './pages/RequestForm';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/request" element={<RequestForm />} />

      {/* Add these later when built */}
      {/* <Route path="/about" element={<About />} /> */}
      {/* <Route path="/contact" element={<Contact />} /> */}
      {/* <Route path="/booking" element={<Booking />} /> */}
    </Routes>
  );
};

export default AppRoutes;
