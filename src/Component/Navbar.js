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
import UserProfile from "./UserProfile";

const Navbar = (props) => {
  const [userProfileClick , setUserProfileClick] = useState(false)
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
    // sessionStorage.removeItem("token");
    // history("/login");

 
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
  // const handleSelectChange = (event) => {
  //   setSelectedOption(event.target.value);
  // };
  const dropdownbtn1 = document.querySelector(".dropdownbtn1")
  const dropdownbtn2 = document.querySelector(".dropdownbtn2")
  const dropdownDiv = document.querySelector(".dropdown-content")
  const dropdownDiv2 = document.querySelector(".dropdown-content2")

  // const[opacityValue , setOpacityValue ] = useState("");
  // const[visibilityValue , setVisibilityValue ] = useState("");
  // const[opacityValue2 , setOpacityValue2 ] = useState("");
  // const[visibilityValue2 , setVisibilityValue2 ] = useState("");
  // const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter1 = () => {
    dropdownDiv.style.opacity = 1;
    
    
     setTimeout(()=>{
    dropdownDiv.style.opacity = 0;

    },3000)
  };

  const handleMouseLeave1 = () => {
    // setOpacityValue(0)
    dropdownDiv.style.opacity = 0;


  };
  const handleMouseEnter2 = () => {
    dropdownDiv2.style.opacity = 1;
    setTimeout(()=>{
      dropdownDiv2.style.opacity = 0;
  
      },3000)
  };
 


  const handleMouseLeave2 = () => {
    // setOpacityValue(0)
    dropdownDiv2.style.opacity = 0;


  };
 
  // const handleDropdown2 =()=>{
  //   setOpacityValue2('1')
  //   // setOpacityValue('0')
  //   if(opacityValue2 == 1){
  //     setOpacityValue2('0')
  //   }
  //   dropdownDiv2.style.opacity = opacityValue2 ;

  //   console.log("aryann walia2")
  // }
  return (
    <div id="navbar_sticky" className="">
      <header class="bg-dark">
        <div class="container">
          <div className="flex justify-between items-center">
            <div className="">
              <Link to="/" class="logo">
                <img src={logo} width={100} height={100} alt="logo" />
              </Link>
            </div>
            <div id="nav_items" className="flex justify-around gap-5 items-center">
              <div className="dropdown-button">
                <Link to="/">Home</Link>
              </div>
              <div className="dropdown-container" >
                <div 
             className="dropdownbtn1" onMouseEnter={handleMouseEnter1} >
                  About
                </div>
                <div className="dropdown-content flex flex-col items-start gap-1" onMouseLeave={handleMouseLeave1}>
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
              <div className="dropdown-container" >
                <div className="dropdownbtn2" onMouseEnter={handleMouseEnter2} >
                 Contact
                </div>
                <div className="dropdown-content2 flex flex-col items-start gap-1"  onMouseLeave={handleMouseLeave2}>
                  <Link to="/contact">Contact Us</Link>
                  <Link to="/faq">FAQ</Link>
                  <Link to="/privacypolicy">Privacy Policy</Link>
                  <Link to="/termofuse">Terms of Use</Link>
                  <Link to="/termofservices">Terms of Services</Link>
                </div>
              </div>
            </div>

            {!sessionStorage.getItem("token") ? (
              <div className="d-flex">
                {currentPage !== "/home" && (
                  <Link className="nav-link" to="/login">
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
           
               
        <UserProfile/> 
       
                   )}

            {/* <Link to="/sign" ><button className='btn btnn-primary' > page</button></Link>  */}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
