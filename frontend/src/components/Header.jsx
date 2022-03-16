import React from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {FaSignInAlt, FaSignOutAlt, FaUser  } from "react-icons/fa";

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logout=()=>{
        console.log("Logout....");
    }
  return (
    <header className='header'>
        <div className="logo">
            <Link to="/">Desk Helper</Link>
        </div>
        <ul>
            <li>
                <button className='btn' onClick={logout}>
                  <FaSignOutAlt/>Logout
                </button>
            </li>
            <li>
                <Link to="/login">
                    <FaSignInAlt/>SignIn
                </Link>
            </li>
            <li>
                <Link to="/register">
                    <FaUser/>Register
                </Link>
            </li>
        </ul>
    </header>
  )
}

export default Header