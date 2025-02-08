import Dashboard from './Pages/Dashboard'
import Landing from './Pages/Landing'
import { Provider } from 'react-redux'
import { store } from './store/store'

import LoginButton from "./components/LoginButton.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  const { isAuthenticated } = useAuth0();
  console.log(isAuthenticated);

  return (
    <Router>
      <div>
        {/* <Navbar /> */}
        {isAuthenticated ? (
          <Provider store={store}>
          <Routes>
            <Route path="/" element={<Landing/>}/>
            <Route path="/dashboard" element={<Dashboard/>} />
          </Routes>
        </Provider>
        ) : (
          <LoginButton />
        )}
      </div>
    </Router>
  );
};

export default App;
