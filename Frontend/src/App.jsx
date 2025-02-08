import Dashboard from './pages/Dashboard.jsx';
import Landing from './pages/Landing';
import { Provider } from 'react-redux';
import { store } from './store/store';
import './index.css';

import LoginButton from "./components/LoginButton.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import MainStudio from './components/studio/MainStudio.jsx';

const App = () => {
  const { isAuthenticated } = useAuth0();
  console.log("iss" + isAuthenticated);

  return (
    <Router>
      <div>
        
          <Provider store={store}>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route 
                path="/dashboard" 
                element={<Dashboard/>} 
              />
            </Routes>
          </Provider>
       
      </div>
    </Router>
  );
};

export default App;
