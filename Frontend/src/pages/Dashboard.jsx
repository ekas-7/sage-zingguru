import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import MainStudio from '../components/studio/MainStudio';


function Dashboard() {
  const { user, isAuthenticated, isLoading, error } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!isAuthenticated) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <img src={user.picture} alt={user.name} />
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      {/* Add other user details here */}
    </div>
  );
}

export default Dashboard;
