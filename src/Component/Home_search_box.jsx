import React, { useState, useEffect } from "react";
import InputItem from "./InputItem";
import { useNavigate } from "react-router-dom";

const Home_search_box = () => {
  const navigate = useNavigate();
  const [fetchedUserData, setFetchedUserData] = useState(null);
  const [fetchedUserData2, setFetchedUserData2] = useState(null);
  const [id, setId] = useState(null);

  const getTokenFromCookie = (cookieName) => {
    const cookies = document.cookie.split("; "); // Split cookies into an array
    for (const cookie of cookies) {
      const [name, value] = cookie.split("=");
      if (name === cookieName) {
        return value;
      }
    }
    return null;
  };
  const token = getTokenFromCookie("token"); // Replace with actual token
  let url = "https://admin.taxiscout24.com/";// Replace with actual API URL

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${url}api/v1/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setFetchedUserData([data.data]);
        setFetchedUserData2(data.data);
        setId(data.data.id);
      } else if (response.status === 401) {
        console.warn("Unauthorized! Redirecting to login...");
        navigate("/login");
      } else {
        console.error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch API every 5 seconds
  useEffect(() => {
    fetchUserData(); // Fetch immediately
    const interval = setInterval(fetchUserData, 5000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handleSubmit = () => {
    navigate("/login");
  };

  return (
    <div>
      <div id="main-box">
        <div className="css-hPnljU">
          <h2 className="css-jzIGNN">Request a ride now</h2>
        </div>
        <div className="search-input">
          <InputItem type="source" />
          <InputItem type="destination" />
        </div>
        <button
          style={{
            backgroundColor: "black",
            borderRadius: "10px",
            height: "70px",
            width: "220px",
            fontSize: "28px",
            marginTop: "20px",
            marginRight: "25px",
          }}
          onClick={handleSubmit}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Home_search_box;
