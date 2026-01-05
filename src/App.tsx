import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import Aboutpage from "./pages/Aboutpage";
import Contactpage from "./pages/Contactpage";
import Menupage from "./pages/Menupage";
import Fooddetailpage from "./pages/Fooddetailpage";


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<Aboutpage />} />
        <Route path="/contactus" element={<Contactpage />} />
        <Route path="/menu" element={<Menupage />} />
        <Route path="/food/:id" element={<Fooddetailpage />} />
      </Routes>
    </Router>
  );
};

export default App;
