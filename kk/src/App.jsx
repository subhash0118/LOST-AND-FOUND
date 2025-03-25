import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Navbar1 from "./components/Navbar1";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import LostItems from "./pages/LostItems";
import FoundItems from "./pages/FoundItems";
import Dashboard from "./pages/Dashboard";
import AddItems from "./pages/AddItems";
import AddItemsF from "./pages/AddItemsF";
import { ItemsProvider } from "./pages/ItemsContext";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <Router>
      <MainApp />
    </Router>
  );
};

const MainApp = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <>
      {/* Show Navbar only on Login and Signup pages */}
      {pathname === "/login" || pathname === "/signup" ? <Navbar /> : null}

      {/* Show Navbar1 on all other pages except Home */}
      {pathname !== "/home" && pathname !== "/login" && pathname !== "/signup" ? <Navbar1 /> : null}

      <ItemsProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/lostitems" element={<LostItems />} />
          <Route path="/founditems" element={<FoundItems />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/additems" element={<AddItems />} />
          <Route path="/additemsf" element={<AddItemsF />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </ItemsProvider>
    </>
  );
};

export default App;
