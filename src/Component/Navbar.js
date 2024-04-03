import React, { useEffect, useState } from "react";
import { Link, Navigate, Route, useNavigate } from "react-router-dom";
import LoginButton from "./LoginButton";
import SignupButton from "./SignupButton";
import { useLocation } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import logo from "../Images/logo.png";
import { useStateContext } from '../Context/ContextProvider';

import taxi from "../Images/taxi.png";
import "./MainPage.css";
import "./Dropdown.css";

const Navbar = (props) => {
  // const { fetchedUserData2 , setFetchedUserData2 } = useStateContext();

  const location = useLocation();
  const [currentPage, setCurrentPage] = useState("");

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location]);

  let history = useNavigate();
  // const handleLogin =()=>{
  //   history('/');
  // }

  const handleClick = () => {
    // e.preventDefault();
    localStorage.removeItem("token");
    history("/login");
  };

  // hearder menu content
  //   const headerMenu = [
  //     { id : 1 ,
  //         name : 'Ride',
  //         icon : '/taxi.png'

  // },
  // {id : 2 ,
  //     name : 'Package',
  //     icon : '/taxi.png'}]
  const [selectedOption, setSelectedOption] = useState("");

  // Function to handle changes in the dropdown selection
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const dropdownDiv = document.querySelector(".dropdown-content")
  const dropdownDiv2 = document.querySelector(".dropdown-content2")

  const[opacityValue , setOpacityValue ] = useState("");
  const[visibilityValue , setVisibilityValue ] = useState("");
  const[opacityValue2 , setOpacityValue2 ] = useState("");
  const[visibilityValue2 , setVisibilityValue2 ] = useState("");
  const handleDropdown =()=>{
    setOpacityValue('1')
    // setVisibilityValue('visible')
    // setOpacityValue2('0')
    if(opacityValue == 1  ){
      setOpacityValue('0')
    }
    dropdownDiv.style.opacity = opacityValue ;
  
    console.log("aryann walia")
  }
  const handleDropdown2 =()=>{
    setOpacityValue2('1')
    // setOpacityValue('0')
    if(opacityValue2 == 1){
      setOpacityValue2('0')
    }
    dropdownDiv2.style.opacity = opacityValue2 ;
    // if( dropdownDiv.style.opacity == 1){
    //   dropdownDiv.style.opacity = "0";
    // }
    // else{dropdownDiv.style.opacity = "1";}
    console.log("aryann walia2")
  }
  return (
    <div id="navbar_sticky" className="">
      <header class="bg-dark">
        <div class="container">
          <div className="flex justify-between">
            <div className="">
              <a href="/taxi-scout" class="logo">
                <img src={logo} width={100} height={100} alt="logo" />
              </a>
            </div>
            <div id="nav_items" className="flex justify-around gap-5 items-center">
              <div className="dropdown-button">
                <Link to="/">Home</Link>
              </div>
              <div className="dropdown-container">
                <div onMouseEnter={handleDropdown}  onClick={handleDropdown} className="dropdown-button">
                  About
                </div>
                <div className="dropdown-content flex flex-col items-start gap-1">
                  <Link to="/about">About Us</Link>
                  <Link to="/ourpartners">Our Partners</Link>
                  <Link to="/pricing">Pricing</Link>
                  <Link to="/ourteam">Our Team</Link>
                  <Link to="/gallery">Gallery</Link>
                </div>
              </div>
              <div className="dropdown-button">
                <Link to="/howitworks">How It Works</Link>
              </div>
              <div className="dropdown-button">
                <Link to="/blogs">Blogs</Link>
              </div>
              <div className="dropdown-container">
                <div onMouseEnter={handleDropdown2}  onClick={handleDropdown2} className="dropdown-button">
                 Contact
                </div>
                <div className="dropdown-content2 flex flex-col items-start gap-1">
                  <Link to="/contact">Contact Us</Link>
                  <Link to="/faq">FAQ</Link>
                  <Link to="/privacypolicy">Privacy Policy</Link>
                  <Link to="/termofuse">Terms of Use</Link>
                  <Link to="/termofservices">Term of Services</Link>
                </div>
              </div>
            </div>

            {!localStorage.getItem("token") ? (
              <div className="d-flex">
                {currentPage !== "/home" && (
                  <Link className="nav-link" to="/">
                    <div className="mx-1">
                      <LoginButton
                        className="btn btn-primary log-btn"
                        id="button"
                        onClick={handleClick}
                      />
                    </div>
                  </Link>
                )}
                {currentPage !== "/Signup" && (
                  <Link className="nav-link" to="/Signup">
                    <div className="mx-1">
                      <SignupButton className="mt-9" />
                    </div>
                  </Link>
                )}
              </div>
            ) : (
        
              <LogoutButton onClick={handleClick} className="btn btn-primary">
                {" "}
                logout{" "}
              </LogoutButton>
          
            )}

            {/* <Link to="/sign" ><button className='btn btnn-primary' > page</button></Link>  */}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
