/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Dashboard from "./Components/Dashboard"
import Login from "./Components/Login"
import AddNewAdmin from "./Components/AddNewAdmin"
import AddNewDoctor from "./Components/AddNewDoctor"
import Messages from "./Components/Messages"
import Sidebar from "./Components/Sidebar"
import Doctors from "./Components/Doctors"
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useEffect } from "react"
import { Context } from "./main"
import "./App.css";

export default function App() {

  const { isAuthenticated, setIsAuthenticated, admin, setAdmin } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/user/admin/me",
          {
            withCredentials: true,
          }
        );
        setIsAuthenticated(true);
        setAdmin(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setAdmin({});
      }
    };
    fetchUser();
  }, [isAuthenticated]);


  return (
    <>
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/addnew" element={<AddNewAdmin />} />
          <Route path="/doctor/addnew" element={<AddNewDoctor />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/doctors" element={<Doctors />} />
        </Routes>
        <ToastContainer position="top-center" />
      </Router>
    </>
  )
}
