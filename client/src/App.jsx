import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Project from "./pages/Project";
import Header from "./components/Header";
import FooterComp from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Project />} />
      </Routes>
      <FooterComp />
    </BrowserRouter>
  );
};

export default App;
