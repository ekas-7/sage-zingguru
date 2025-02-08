import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainStudio from '../components/studio/MainStudio';

function Dashboard() {
  return (
    <Routes>
      <Route path="/studio" element={<MainStudio />} />
    </Routes>
  );
}

export default Dashboard;
