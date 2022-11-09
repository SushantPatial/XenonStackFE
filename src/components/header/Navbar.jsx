import React, { useEffect, useState } from 'react';
import './Navbar.css';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

const Navbar = () => {

  const [loginMsg, setLoginMsg] = useState("");
  const navigate = useNavigate();

  useEffect(function () {
    // Fetching user data
    async function fetchUser() {
      try {
        if (localStorage.getItem("token") === null) {
          navigate("/login");
        } else {

          let authToken = localStorage.getItem("token") ? localStorage.getItem("token") : null;

          const res = await axios.post("https://xenonstack-sp.herokuapp.com/api/getAuthUser", {
            token: authToken
          }, {
            headers: { 
              'Content-Type': 'application/json'
            }
          });

          // console.log(res);

          if (res) {
            const name = res.data.name;
            const fname = name.substring(0, name.indexOf(' '));
            setLoginMsg(fname);
          } else {
            navigate("/login");
          }
        }

      } catch (error) {
        navigate("/login");
      }
    }

    fetchUser();
  }, [])

  // Logout 
  function logout() {
    try {
      localStorage.removeItem('token');

      navigate("/login");

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <header>
      <nav>
        <div className='navbar-left'>
        <div className="logo">
          <NavLink to="/">
            <img src="images/logo.svg" alt="logo" />
          </NavLink>
        </div>

        <div className="navbar-tabs">
          <NavLink to="/">
            Home
          </NavLink>
          <NavLink to="/contact">
            Contact
          </NavLink>
        </div>
        </div>

        <div className="navbar-right">
          <div className='display-name'>
            Hello, {loginMsg}
          </div>

          <div className='logout' onClick={logout}>
            <LogoutOutlinedIcon className='icon' /> <span>Sign Out</span>
          </div>
        </div>

      </nav>
    </header>
  )
}

export default Navbar;