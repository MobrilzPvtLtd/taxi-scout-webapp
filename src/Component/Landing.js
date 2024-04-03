import React from "react";
import InputItem from "./InputItem";
import LocationButton from "./LocationButton";
import { useNavigate } from "react-router-dom";
import banner from "../Images/3adb4519-1285-4d49-89ac-fae6820278d2.avif"

const Landing = () => {
  const history = useNavigate();
  const handleSubmit = () => {
    history("/");
  };
  return (
    <div className="home2">
        <div id="banner_img_home" className="">
        <img  src={banner}></img>
      </div>
      <div id="main-box001">
        <div class="css-hPnljU">
          <h2 class="css-jzIGNN">Request a ride now</h2>
        </div>
        <div class="search-input ">
          {/* <div className="flex justify-center"> */}
          {/* <InputButton ></InputButton> */}
          <InputItem type="source" />

          {/* <LocationButton setAddress={setAddress} /> */}

          {/* </div> */}
          {/* <LocationButton onClick ={(()=> set(address))} /> */}
          {/* <div className="flex justify-center mr-9"> */}

          <InputItem type="destination" />
          {/* <InputButton/> */}
          {/* </div> */}
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

export default Landing;
