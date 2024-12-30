/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect } from 'react'
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from './pages/Register';
import Login from './pages/Login';
import AboutUs from './pages/AboutUs';
import Appointment from './pages/Appointment';
import Home from './pages/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Components/Navbar';
import { Context } from './main';
import axios from 'axios';
import Footer from './Components/Footer';

export default function App() {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/user/patient/me", { withCredentials: true });
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
        setUser({});
      }
    }
    fetchUser();
  }, [isAuthenticated]);


  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/appointment' element={<Appointment />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
        <ToastContainer position="top-center" />
        <Footer />
      </Router>
    </>
  )
}
