/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { Context } from '../main';
import axios from 'axios';
import { toast } from 'react-toastify';
import { GiHamburgerMenu } from "react-icons/gi";

export default function Navbar() {
    const [show, setShow] = useState(false);
    const { isAuthenticated, setIsAuthenticated } = useContext(Context)
    const navigateTo = useNavigate();

    const handleLogout = async () => {
        await axios
            .get("https://localhost:3000/api/v1/user/patient/logout", {
                withCredentials: true,
            })
            .then((res) => {
                console.log(res);
                toast.success(res.data.message);
                setIsAuthenticated(false);
            })
            .catch((err) => {
                console.log(err);
                toast.error(err.response.data.message);
            });
    };

    const gotoLogin = async () => {
        navigateTo("/login")
    }

    return (
        <>
      <nav className={"container"}>
        <div className="logo">
          <img src="/logo.png" alt="logo" className="logo-img" />
        </div>
        <div className={show ? "navLinks showmenu" : "navLinks"}>
          <div className="links">
            <Link to={"/"} onClick={() => setShow(!show)}>
              Home
            </Link>
            <Link to={"/appointment"} onClick={() => setShow(!show)}>
              Appointment
            </Link>
            <Link to={"/about"} onClick={() => setShow(!show)}>
              About Us
            </Link>
          </div>
          {isAuthenticated ? (
            <button className="logoutBtn btn" onClick={handleLogout}>
              LOGOUT
            </button>
          ) : (
            <button className="loginBtn btn" onClick={gotoLogin}>
              LOGIN
            </button>
          )}
        </div>
        <div className="hamburger" onClick={() => setShow(!show)}>
          <GiHamburgerMenu />
        </div>
      </nav>
    </>
    )
}
