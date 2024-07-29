import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import img from "./IMG_5392.JPG";
import logout_img from "./log-out.png";
import user_img from "./user.png";
import edit_img from "./edit.png";

const UserProfile = () => {
  let url = "https://www.mobrilz.digital/admin/public/";

  let token = sessionStorage.token;
  const [fetchedUserData, setFetchedUserData] = useState([]);
  const history = useNavigate();
  const userProfile_dropdown = () => {
    alert("hello brother");
  };

  const menuToggle = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    const menuButton = document.querySelector(".profile");
    menuButton.addEventListener("click", () => {
      const toggleMenu = document.querySelector(".menu");
      toggleMenu.classList.toggle("active");
    });
  }, [menuToggle]);
  const handleLogout = (e) => {
    e.preventDefault();
    sessionStorage.removeItem("token");
    history("/login");
  };
  useEffect(() => {
    const userData = async () => {
      try {
        let response = await fetch(` ${url}api/v1/user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const DATA = await response.json();
          const convertedData = [DATA.data];

          setFetchedUserData(convertedData);
        } else {
          console.error(`HTTP error! Status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error creating request:", error);
      }
    };
    userData();
  }, [window]);
  // console.log("user profile data", fetchedUserData[0].profile_picture);
  return (
    <>
      
        <div class="action">
          <div class="profile" onClick={menuToggle}>
            <img className="profile" src={fetchedUserData[0]?.profile_picture} />
          </div>
          <div class="menu">
            <ul>
              <li>
                <img src={user_img} />
                <Link to="#">My profile</Link>
              </li>
              <li>
                <img src={edit_img} />
                <Link to="/edit-profile">Edit profile</Link>
              </li>

              <li>
                <img src={logout_img} />
                <Link to="#" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
     
    </>
  );
};

export default UserProfile;
