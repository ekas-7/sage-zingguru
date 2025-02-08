import "./App.css";
import LoginButton from "./components/LoginButton.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Navbar from "./components/Navbar";

const App = () => {
  const { isAuthenticated } = useAuth0();
  console.log(isAuthenticated);

  return (
    <Router>
      <div>
        {/* <Navbar /> */}
        {isAuthenticated ? (
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        ) : (
          <LoginButton />
        )}
      </div>
    </Router>
  );
};

export default App;