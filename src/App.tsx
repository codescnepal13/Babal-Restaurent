import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import Aboutpage from "./pages/Aboutpage";
import Contactpage from "./pages/Contactpage";
import Menupage from "./pages/Menupage";
import Fooddetailpage from "./pages/Fooddetailpage";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Blogpage from "./pages/Blogpage";



const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<Aboutpage />} />
        <Route path="/contactus" element={<Contactpage />} />
        <Route path="/menu" element={<Menupage />} />
        <Route path="/blog" element={<Blogpage />} />
        <Route path="/food/:id" element={<Fooddetailpage />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
