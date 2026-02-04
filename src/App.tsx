import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import Aboutpage from "./pages/Aboutpage";
import Reservationpage from "./pages/Reservationpage";
import Menupage from "./pages/Menupage";
import Fooddetailpage from "./pages/Fooddetailpage";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Blogpage from "./pages/Blogpage";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";


const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<Aboutpage />} />
        <Route path="/reservation" element={<Reservationpage />} />
        <Route path="/menu" element={<Menupage />} />
        
        <Route path="/admin/menu" element={<AdminDashboard />} />


        <Route path="/blog" element={<Blogpage />} />
        <Route path="/food/:id" element={<Fooddetailpage />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;