import React, { useContext, useState } from "react";
import InputItem from "./InputItem";
import LocationButton from "./LocationButton";
import { useNavigate } from "react-router-dom";
import banner from "../Images/3adb4519-1285-4d49-89ac-fae6820278d2.avif";
import taxi from "../Images/taxi.png";
import { SourceContext } from "../Context/SourceContext";
import { DestinationContext } from "../Context/DestinationContext";
import CarListOption from "./CarListOption";
import bg_1 from "../Images/bg_1.jpg";
import bg_2 from "../Images/bg_2.jpg";
import bg_3 from "../Images/OIG4.LOjK9uqO7Lj.OtzgY5XW.jpg";
import bg_4 from "../Images/serve_globally.jpg";
import bg_5 from "../Images/serve_globally2.jpg";
import ChatPopup from "./chatPopup";

const Landing = () => {
  const [distance, setDistance] = useState();
  const [carFetchFunc, setCarFetchFunc] = useState(null);

  const [options, setOptions] = useState({
    option1: null,
    option2: null,
    option3: null,
    option4: null,
  });
  const handleCheckboxChange = (option) => {
    setOptions({
      ...options,
      [option]: !options[option],
    });
  };

  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);
  const [address, setAddress] = useState("");
  const calculateDistance = () => {
    const distance =
      window.google.maps.geometry.spherical.computeDistanceBetween(
        { lat: source.lat, lng: source.lng },
        { lat: destination.lat, lng: destination.lng }
      );
    setDistance(distance * 0.000621374);
    setCarFetchFunc(true);
  };
  const token = sessionStorage.getItem("token");
  const history = useNavigate();
  const handleRedirect = () => {
    token != null || undefined ? history("/home") : history("/login");
  };

  
  return (
    <>
      <div id="landing_page" className="home2 w-full ">
        <div id="box" className="w-1/2">
          <div id="upper-box">
            <img
              src={taxi}
              style={{
                height: "50px",
                width: "50px",
            
              }}
            />
            <span
              class="css-bQCKjs"
              style={{ fontSize: "25px", fontWeight: "700" }}
            >
              Ride
            </span>
            <div id="outline"></div>
          </div>

          {/* main box */}
         
          <div id="main-box2" className="">
            <div class="css-hPnljU">
              <h2 class="css-jzIGNN">Request a ride now</h2>
            </div>
            <div class="search-input ">
              <div className="relative">
                <InputItem type="source" />
                <div id="current_location">
                  <LocationButton setAddress={setAddress} />
                </div>
              </div>
              <InputItem type="destination" />
            </div>
            <button className="w-4/5 my-2 px-10 "
              onClick={handleRedirect}
            >
              Search
            </button>
          </div>
        </div>
        <div className="bg_home_right w-1/2">
          <img src={bg_1}></img>
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className="flex justify-around items-center px-2 gap-3 sm:px-5 bg-white pt-5">
        <div className="w-50">
          <img className="rounded-xl" src={bg_2}></img>
        </div>
        <div className="w-50">
          <h1 className="font-bold">
            Be your own driver, choose <br></br> your own hours, and earn{" "}
            <br></br> what you need.
          </h1>
          <p className="px-2 text-sm sm:px-20 text-xl">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unk
          </p>
          <button type="button" className="egFkwj mt-2">
            Click me
          </button>
        </div>
      </div>
      <div className="flex justify-around items-center ] pr-[5vw] bg-white pt-5 pb-5">
        <div className="w-50">
          <h1 className="font-bold">
            Taxi Scout 24 extends its<br></br> services worldwide,<br></br>{" "}
            catering to diverse locations.
          </h1>
          <p className="px-2 text-sm sm:px-20 text-xl">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unk
          </p>
          <button type="button" className="egFkwj mt-2">
            Click me
          </button>
        </div>
        <div className="w-50">
          <img src={bg_3} width={700}className="rounded-lg"></img>
        </div>
      </div>
      <div className="flex justify-around items-center ] pl-[5vw] bg-white pb-5">
      <div className="w-50">
          <img src={bg_4} width={700} className="rounded-xl"></img>
        </div>
        <div className="w-50">
          <h1 className="font-bold">
            We Serve in ...<br></br> 
          </h1>
          <p className="px-2 text-sm sm:px-20 text-xl">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unk
          </p>
          <button type="button" className="egFkwj mt-2">
            Click me
          </button>
        </div>
       
      </div>
    </>
  );
};

export default Landing;
