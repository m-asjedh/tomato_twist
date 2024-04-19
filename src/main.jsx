import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import LandingPage from "./frontend/Routes/LandingPage.jsx";
import Login from "./frontend/Routes/Login.jsx";
import Register from "./frontend/Routes/Register.jsx";
import WelcomePage from "./frontend/Routes/WelcomePage.jsx";
import HomePage from "./frontend/Routes/HomePage.jsx";
import ProfilePage from "./frontend/Routes/ProfilePage.jsx";
import LeadboardPage from "./frontend/Routes/LeadboardPage.jsx";
import Logout from "./frontend/Routes/Logout.jsx";
import { AuthContext, AuthProvider } from "./context/Auth.context.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import GuestPage from "./frontend/Routes/GuestPage.jsx";

const PrivateRoute = ({ element }) => {
  const { user } = useContext(AuthContext);
  return user ? element : <Navigate to="/login" />;
};

const routes = (
  <Routes>
    <Route path="/" element={<App />}>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/start" element={<WelcomePage />} />
      <Route path="/home" element={<PrivateRoute element={<HomePage />} />} />
      <Route
        path="/profile"
        element={<PrivateRoute element={<ProfilePage />} />}
      />
      <Route
        path="/leaderboard"
        element={<PrivateRoute element={<LeadboardPage />} />}
      />
      <Route path="/logout" element={<PrivateRoute element={<Logout />} />} />
      <Route path="/guest" element={<GuestPage />} />
    </Route>
  </Routes>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <Router>{routes}</Router>
    </AuthProvider>
  </React.StrictMode>
);
