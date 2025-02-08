import Dashboard from './pages/Dashboard.jsx';
import Landing from './pages/Landing';
import { Provider } from 'react-redux';
import { store } from './store/store';
import './index.css';

import LoginButton from "./components/LoginButton.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useAuth0();
  return isAuthenticated ? element : <Navigate to="/" />;
};

const App = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    <Router>
      <div>
        <Routes>
          {/* Landing page accessible without login */}
          <Route path="/" element={<Landing login={loginWithRedirect} />} />
          
          {/* Dashboard is a private route */}
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        </Routes>

        {/* Show login button if not authenticated */}
        {!isAuthenticated && <LoginButton />}
      </div>
    </Router>
  );
};

export default App;
