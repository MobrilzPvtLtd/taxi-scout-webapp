import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import img from "./IMG_5392.JPG"
import logout_img from "./log-out.png"
import user_img from "./user.png"
import edit_img from "./edit.png"

const UserProfile = () => {
  const history = useNavigate()
  const userProfile_dropdown = ()=>{
    alert("hello brother")
  }
  
  const menuToggle=(e)=> {
    e.preventDefault();
    
  }
  useEffect(()=>{

    
    const menuButton = document.querySelector(".profile"); 
    menuButton.addEventListener("click", () => {
      const toggleMenu = document.querySelector(".menu");
      toggleMenu.classList.toggle("active");
    });
    },[menuToggle])
const handleLogout = (e)=>{
e.preventDefault();
    sessionStorage.removeItem("token");
    history("/login");
}
  return (
    <div class="action">
      <div class="profile" onClick={menuToggle} >
        <img className='profile' src={img} />
      </div>
      <div class="menu">
      <ul>
          <li>
            <img src={user_img} /><Link to="#">My profile</Link>
          </li>
          <li>
            <img src={edit_img} /><Link to="#">Edit profile</Link>
          </li>
          
          
          <li>
            <img src={logout_img}/><Link to="#" onClick={handleLogout}>Logout</Link>
          </li>
        </ul>
      </div>
         </div>
  )
}

export default UserProfile